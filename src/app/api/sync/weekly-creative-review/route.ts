import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Weekly Creative Optimization Review
 *
 * Runs every Monday. Aurora acts as CTO analyzing ad performance
 * and generating the next round of creative variants to test.
 *
 * The loop:
 * 1. Pull last 7 days of metrics per campaign + creative variant
 * 2. Aurora analyzes: what's winning, what's losing, why
 * 3. Aurora generates new copy variants based on winning patterns
 * 4. Aurora generates image prompts for DALL-E based on winning imagery patterns
 * 5. Stores everything in marketing_creatives + marketing_ai_insights
 * 6. Results appear in your weekly summary email for approval
 *
 * Cron: Every Monday at 9 AM UTC
 * Schedule: "0 9 * * 1"
 */

const SEVEN_DAYS_AGO = () => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
};

async function generateCreativeInsights(
  anthropic: Anthropic,
  campaigns: any[],
  metrics: any[],
  creatives: any[],
  attributions: any[]
) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are Aurora, CTO of SkoobiLabs — a mobile app studio building audio apps for elderly users.

You're running the weekly creative optimization review. Analyze last week's ad performance and generate the next round of test variants.

## Our Apps
- HearZ: Audio news reader. Reads articles aloud with AI voices. Elderly-first design.
- HearVerse: Bible audio reader. KJV, verse navigation, Marantz hi-fi design. Elderly-first.
- Both are subscription apps: $4.99/mo, $29.99/yr, $79.99 lifetime. Free tier has ads.

## Brand Voice
- Warm, genuine, accessible. Never patronizing about age.
- Focus on capability ("hear every verse") not limitation ("for people who can't read small text")
- Premium feel — these aren't budget apps

## Active Campaigns (last 7 days)
${JSON.stringify(campaigns, null, 2)}

## Daily Metrics (last 7 days)
${JSON.stringify(metrics, null, 2)}

## Current Creative Variants
${JSON.stringify(creatives, null, 2)}

## Attribution Events (last 7 days)
${JSON.stringify(attributions?.slice(0, 50), null, 2)}

Respond with valid JSON in this exact format:
{
  "performance_summary": "2-3 paragraph analysis: what won, what lost, why. Include CPI comparisons, CTR analysis, demographic observations.",

  "winning_patterns": ["Pattern 1 that works", "Pattern 2 that works"],

  "losing_patterns": ["Pattern 1 to avoid", "Pattern 2 to avoid"],

  "budget_recommendations": [
    {"action": "increase|decrease|pause|launch", "campaign": "campaign name", "reason": "why", "suggested_daily_cents": 0}
  ],

  "new_copy_variants": [
    {
      "app_tag": "hearz|hearverse",
      "variant_label": "A descriptive label like 'capability-focused v2'",
      "headline": "Short headline for the ad (under 30 chars)",
      "body_copy": "Body text for the ad (under 90 chars)",
      "rationale": "Why this variant — what winning pattern it builds on"
    }
  ],

  "new_image_prompts": [
    {
      "app_tag": "hearz|hearverse",
      "variant_label": "Matching label",
      "dall_e_prompt": "A detailed DALL-E prompt for generating the ad image. Include style, mood, composition, colors. Warm, premium feel. No text in image.",
      "rationale": "Why this visual direction — what's working in current imagery"
    }
  ],

  "demographic_insights": [
    {"demographic": "description", "finding": "what we learned", "action": "what to do about it"}
  ],

  "aurora_weekly_note": "A brief personal note from Aurora to Arne — conversational, strategic, what she's excited about or concerned about this week."
}

If there's limited data, still provide the JSON with strategic recommendations for what to test first. Generate at least 3 copy variants and 2 image prompts per app that has active campaigns.`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text.trim() : "";
  const cleaned = text.replace(/^```json\n?/, "").replace(/\n?```$/, "");

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      performance_summary: "Could not parse analysis — raw output saved.",
      winning_patterns: [],
      losing_patterns: [],
      budget_recommendations: [],
      new_copy_variants: [],
      new_image_prompts: [],
      demographic_insights: [],
      aurora_weekly_note: text,
    };
  }
}

async function generateImages(
  prompts: Array<{ app_tag: string; variant_label: string; dall_e_prompt: string }>
): Promise<Array<{ app_tag: string; variant_label: string; image_url: string | null }>> {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) return prompts.map((p) => ({ ...p, image_url: null }));

  const results = [];
  for (const prompt of prompts) {
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt.dall_e_prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        results.push({
          app_tag: prompt.app_tag,
          variant_label: prompt.variant_label,
          image_url: data.data?.[0]?.url || null,
        });
      } else {
        results.push({ app_tag: prompt.app_tag, variant_label: prompt.variant_label, image_url: null });
      }
    } catch {
      results.push({ app_tag: prompt.app_tag, variant_label: prompt.variant_label, image_url: null });
    }
  }
  return results;
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && token !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const fromDate = SEVEN_DAYS_AGO();

  try {
    // 1. Fetch all the data Aurora needs
    const [
      { data: campaigns },
      { data: metrics },
      { data: creatives },
      { data: attributions },
    ] = await Promise.all([
      supabase
        .from("marketing_campaigns")
        .select("*")
        .in("status", ["active", "paused"])
        .order("created_at", { ascending: false }),
      supabase
        .from("marketing_daily_metrics")
        .select("*, marketing_campaigns(campaign_name, app_tag, platform)")
        .gte("date", fromDate)
        .order("date", { ascending: false }),
      supabase
        .from("marketing_creatives")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("marketing_attributions")
        .select("*")
        .gte("attributed_at", `${fromDate}T00:00:00`)
        .order("attributed_at", { ascending: false })
        .limit(200),
    ]);

    // 2. Aurora analyzes everything and generates new variants
    const insights = await generateCreativeInsights(
      anthropic,
      campaigns || [],
      metrics || [],
      creatives || [],
      attributions || []
    );

    // 3. Generate images for the new variants
    let generatedImages: any[] = [];
    if (insights.new_image_prompts?.length > 0) {
      generatedImages = await generateImages(insights.new_image_prompts);
    }

    // 4. Store new copy variants in marketing_creatives
    const storedCopy = [];
    for (const variant of insights.new_copy_variants || []) {
      const { data } = await supabase
        .from("marketing_creatives")
        .insert({
          app_tag: variant.app_tag,
          creative_type: "headline",
          content: `${variant.headline}\n---\n${variant.body_copy}`,
          variant_label: variant.variant_label,
        })
        .select()
        .single();
      if (data) storedCopy.push(data);

      // Also store body copy separately
      await supabase.from("marketing_creatives").insert({
        app_tag: variant.app_tag,
        creative_type: "body_copy",
        content: variant.body_copy,
        variant_label: variant.variant_label,
      });
    }

    // 5. Store generated images
    for (const img of generatedImages) {
      if (img.image_url) {
        await supabase.from("marketing_creatives").insert({
          app_tag: img.app_tag,
          creative_type: "image_url",
          content: img.image_url,
          variant_label: img.variant_label,
        });
      }
    }

    // 6. Save the full insight report
    const { data: insight } = await supabase
      .from("marketing_ai_insights")
      .insert({
        analysis_date: new Date().toISOString().slice(0, 10),
        app_tag: null, // cross-app analysis
        insight_type: "weekly_report",
        title: `Weekly Creative Review — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        body: insights.performance_summary,
        recommendations: {
          winning_patterns: insights.winning_patterns,
          losing_patterns: insights.losing_patterns,
          budget_recommendations: insights.budget_recommendations,
          demographic_insights: insights.demographic_insights,
          new_variants_count: (insights.new_copy_variants || []).length,
          new_images_count: generatedImages.filter((i) => i.image_url).length,
          aurora_note: insights.aurora_weekly_note,
        },
      })
      .select()
      .single();

    // 7. Send the weekly creative review email
    await sendWeeklyEmail(insights, generatedImages);

    return NextResponse.json({
      ok: true,
      insight_id: insight?.id,
      new_copy_variants: storedCopy.length,
      new_images: generatedImages.filter((i) => i.image_url).length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendWeeklyEmail(insights: any, images: any[]) {
  // Use the Skoobi email pipeline (Zoho SMTP) for the weekly email
  // This calls a small helper endpoint on the Skoobi project
  const emailEndpoint = process.env.WEEKLY_EMAIL_ENDPOINT;
  if (!emailEndpoint) return;

  const lines: string[] = [];
  lines.push("Good morning, Arne!\n");
  lines.push("Here's your weekly creative optimization review from Aurora.\n");

  // Performance summary
  lines.push("--- PERFORMANCE SUMMARY ---\n");
  lines.push(insights.performance_summary || "No campaigns with data this week.");
  lines.push("");

  // Winning patterns
  if (insights.winning_patterns?.length > 0) {
    lines.push("WHAT'S WORKING:");
    for (const p of insights.winning_patterns) lines.push(`  ✓ ${p}`);
    lines.push("");
  }

  // Losing patterns
  if (insights.losing_patterns?.length > 0) {
    lines.push("WHAT'S NOT:");
    for (const p of insights.losing_patterns) lines.push(`  ✗ ${p}`);
    lines.push("");
  }

  // Budget recommendations
  if (insights.budget_recommendations?.length > 0) {
    lines.push("--- BUDGET MOVES ---\n");
    for (const rec of insights.budget_recommendations) {
      lines.push(`  ${rec.action.toUpperCase()}: ${rec.campaign}`);
      lines.push(`    Reason: ${rec.reason}`);
      if (rec.suggested_daily_cents > 0) {
        lines.push(`    Suggested daily: $${(rec.suggested_daily_cents / 100).toFixed(2)}`);
      }
      lines.push("");
    }
  }

  // Demographic insights
  if (insights.demographic_insights?.length > 0) {
    lines.push("--- AUDIENCE INSIGHTS ---\n");
    for (const d of insights.demographic_insights) {
      lines.push(`  ${d.demographic}: ${d.finding}`);
      lines.push(`    → ${d.action}`);
    }
    lines.push("");
  }

  // New copy variants for approval
  if (insights.new_copy_variants?.length > 0) {
    lines.push("--- NEW VARIANTS TO TEST (approve to launch) ---\n");
    for (const v of insights.new_copy_variants) {
      lines.push(`  [${v.app_tag}] "${v.headline}"`);
      lines.push(`    Body: "${v.body_copy}"`);
      lines.push(`    Why: ${v.rationale}`);
      lines.push("");
    }
    lines.push('  → Reply "approve all" to launch all variants');
    lines.push('  → Reply "approve 1,3" to launch specific ones');
    lines.push('  → Reply "edit 2" with your changes');
    lines.push("");
  }

  // Image variants
  const generatedCount = images.filter((i) => i.image_url).length;
  if (generatedCount > 0) {
    lines.push(`--- ${generatedCount} NEW AD IMAGES GENERATED ---\n`);
    lines.push("View them in the marketing dashboard at labs.skoobi.com/marketing");
    lines.push("");
  }

  // Aurora's personal note
  if (insights.aurora_weekly_note) {
    lines.push("--- AURORA'S NOTE ---\n");
    lines.push(insights.aurora_weekly_note);
    lines.push("");
  }

  lines.push("---");
  lines.push("— Aurora, CTO @ SkoobiLabs");

  try {
    await fetch(emailEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "arne@skoobi.com",
        subject: `Weekly Creative Review — ${new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`,
        body: lines.join("\n"),
      }),
    });
  } catch {
    // Email send failed — insights still saved to DB
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "weekly-creative-review" });
}
