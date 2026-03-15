import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const supabase = getSupabase();
  try {
    const { id } = await context.params;

    const { data: campaign, error: campaignError } = await supabase
      .from("marketing_campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (campaignError) {
      if (campaignError.code === "PGRST116") {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }
      return NextResponse.json({ error: campaignError.message }, { status: 500 });
    }

    // Aggregate daily metrics totals for this campaign
    const { data: metrics, error: metricsError } = await supabase
      .from("marketing_daily_metrics")
      .select("impressions, clicks, installs, signups, subscriptions, revenue_cents, spend_cents")
      .eq("campaign_id", id);

    if (metricsError) {
      return NextResponse.json({ error: metricsError.message }, { status: 500 });
    }

    const totals = (metrics || []).reduce(
      (acc, row) => ({
        impressions: acc.impressions + (row.impressions || 0),
        clicks: acc.clicks + (row.clicks || 0),
        installs: acc.installs + (row.installs || 0),
        signups: acc.signups + (row.signups || 0),
        subscriptions: acc.subscriptions + (row.subscriptions || 0),
        revenue_cents: acc.revenue_cents + (row.revenue_cents || 0),
        spend_cents: acc.spend_cents + (row.spend_cents || 0),
      }),
      {
        impressions: 0,
        clicks: 0,
        installs: 0,
        signups: 0,
        subscriptions: 0,
        revenue_cents: 0,
        spend_cents: 0,
      }
    );

    return NextResponse.json({ ...campaign, metrics_totals: totals });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const supabase = getSupabase();
  try {
    const { id } = await context.params;
    const body = await request.json();

    const allowedFields = [
      "app_tag",
      "platform",
      "campaign_name",
      "campaign_external_id",
      "creative_type",
      "target_audience",
      "status",
      "budget_cents",
      "daily_budget_cents",
      "start_date",
      "end_date",
      "notes",
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("marketing_campaigns")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }
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

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const supabase = getSupabase();
  try {
    const { id } = await context.params;

    const { error } = await supabase
      .from("marketing_campaigns")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
