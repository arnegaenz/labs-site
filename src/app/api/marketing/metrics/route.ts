import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get("campaign_id");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let query = supabase
      .from("marketing_daily_metrics")
      .select("*, marketing_campaigns(campaign_name, app_tag, platform)")
      .order("date", { ascending: false });

    if (campaignId) {
      query = query.eq("campaign_id", campaignId);
    }
    if (from) {
      query = query.gte("date", from);
    }
    if (to) {
      query = query.lte("date", to);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const body = await request.json();

    const required = ["campaign_id", "date"];
    const missing = required.filter((field) => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const row = {
      campaign_id: body.campaign_id,
      date: body.date,
      impressions: body.impressions || 0,
      clicks: body.clicks || 0,
      installs: body.installs || 0,
      signups: body.signups || 0,
      subscriptions: body.subscriptions || 0,
      revenue_cents: body.revenue_cents || 0,
      spend_cents: body.spend_cents || 0,
    };

    const { data, error } = await supabase
      .from("marketing_daily_metrics")
      .upsert(row, { onConflict: "campaign_id,date" })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
