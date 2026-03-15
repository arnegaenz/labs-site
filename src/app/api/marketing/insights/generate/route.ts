import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const body = await request.json();
    const appTag = body.app_tag || null;

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Fetch active campaigns
    let campaignsQuery = supabase
      .from("marketing_campaigns")
      .select("*")
      .eq("status", "active");
    if (appTag) {
      campaignsQuery = campaignsQuery.eq("app_tag", appTag);
    }
    const { data: campaigns, error: campaignsError } = await campaignsQuery;
    if (campaignsError) {
      return NextResponse.json({ error: campaignsError.message }, { status: 500 });
    }

    // Fetch last 7 days of metrics
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fromDate = sevenDaysAgo.toISOString().split("T")[0];

    let metricsQuery = supabase
      .from("marketing_daily_metrics")
      .select("*, marketing_campaigns(campaign_name, app_tag, platform)")
      .gte("date", fromDate)
      .order("date", { ascending: false });

    if (campaigns && campaigns.length > 0) {
      const campaignIds = campaigns.map((c) => c.id);
      metricsQuery = metricsQuery.in("campaign_id", campaignIds);
    }

    const { data: metrics, error: metricsError } = await metricsQuery;
    if (metricsError) {
      return NextResponse.json({ error: metricsError.message }, { status: 500 });
    }

    // Fetch recent attributions
    let attribQuery = supabase
      .from("marketing_attributions")
      .select("*, marketing_campaigns(campaign_name, platform)")
      .gte("attributed_at", sevenDaysAgo.toISOString())
      .order("attributed_at", { ascending: false })
      .limit(200);
    if (appTag) {
      attribQuery = attribQuery.eq("app_tag", appTag);
    }
    const { data: attributions, error: attribError } = await attribQuery;
    if (attribError) {
      return NextResponse.json({ error: attribError.message }, { status: 500 });
    }

    // Build the prompt for Claude
    const prompt = `You are a marketing analytics expert for a mobile app studio called Skoobi Labs. Analyze the following marketing data and provide actionable insights.

## Active Campaigns
${JSON.stringify(campaigns, null, 2)}

## Daily Metrics (Last 7 Days)
${JSON.stringify(metrics, null, 2)}

## Recent Attributions (Last 7 Days)
${JSON.stringify(attributions, null, 2)}

Please analyze this data and provide:
1. **ROI Analysis** — Return on investment per campaign. Which campaigns are profitable?
2. **Platform Performance** — Which platforms (Apple Search Ads, Google Ads, Meta, TikTok, organic, etc.) are performing best?
3. **Audience Insights** — What can we infer about the best-performing target audiences?
4. **Budget Recommendations** — Where should we increase or decrease spend?
5. **Key Risks** — Any campaigns that are underperforming or burning budget without results?

Respond in this exact JSON format:
{
  "title": "A short headline summarizing the key finding",
  "body": "A 2-3 paragraph detailed analysis covering the points above",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
}

If there is no data or very little data, still provide the JSON with helpful suggestions about what data to collect and initial campaign strategies.`;

    // Call Claude API directly via fetch
    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!claudeResponse.ok) {
      const errorBody = await claudeResponse.text();
      return NextResponse.json(
        { error: `Claude API error: ${claudeResponse.status} — ${errorBody}` },
        { status: 502 }
      );
    }

    const claudeData = await claudeResponse.json();
    const rawText = claudeData.content?.[0]?.text || "";

    // Extract JSON from the response (handle markdown code blocks)
    let parsed: { title: string; body: string; recommendations: string[] };
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      parsed = {
        title: "AI Analysis Complete",
        body: rawText,
        recommendations: [],
      };
    }

    // Save insight to database
    const { data: insight, error: insertError } = await supabase
      .from("marketing_ai_insights")
      .insert({
        analysis_date: new Date().toISOString().split("T")[0],
        app_tag: appTag,
        insight_type: "ai_analysis",
        title: parsed.title,
        body: parsed.body,
        recommendations: parsed.recommendations,
        applied: false,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(insight, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
