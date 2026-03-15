import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabase();
  try {
    // Total active campaigns
    const { count: activeCampaigns, error: campaignsError } = await supabase
      .from("marketing_campaigns")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    if (campaignsError) {
      return NextResponse.json({ error: campaignsError.message }, { status: 500 });
    }

    // Last 30 days date boundary
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const fromDate = thirtyDaysAgo.toISOString().split("T")[0];

    // Fetch all metrics from last 30 days
    const { data: metrics, error: metricsError } = await supabase
      .from("marketing_daily_metrics")
      .select("campaign_id, impressions, clicks, installs, signups, subscriptions, revenue_cents, spend_cents")
      .gte("date", fromDate);

    if (metricsError) {
      return NextResponse.json({ error: metricsError.message }, { status: 500 });
    }

    const rows = metrics || [];

    const totalSpendCents = rows.reduce((sum, r) => sum + (r.spend_cents || 0), 0);
    const totalInstalls = rows.reduce((sum, r) => sum + (r.installs || 0), 0);
    const totalRevenueCents = rows.reduce((sum, r) => sum + (r.revenue_cents || 0), 0);

    // Find top performing campaign (by installs)
    const byCampaign: Record<string, number> = {};
    for (const row of rows) {
      if (row.campaign_id) {
        byCampaign[row.campaign_id] = (byCampaign[row.campaign_id] || 0) + (row.installs || 0);
      }
    }

    let topCampaign: { id: string; name: string; installs: number } | null = null;

    const campaignEntries = Object.entries(byCampaign);
    if (campaignEntries.length > 0) {
      const [topId, topInstalls] = campaignEntries.reduce((a, b) =>
        b[1] > a[1] ? b : a
      );

      const { data: campaignData } = await supabase
        .from("marketing_campaigns")
        .select("id, campaign_name")
        .eq("id", topId)
        .single();

      if (campaignData) {
        topCampaign = {
          id: campaignData.id,
          name: campaignData.campaign_name,
          installs: topInstalls,
        };
      }
    }

    return NextResponse.json({
      active_campaigns: activeCampaigns || 0,
      total_spend_cents: totalSpendCents,
      total_installs: totalInstalls,
      total_revenue_cents: totalRevenueCents,
      cost_per_install_cents: totalInstalls > 0 ? Math.round(totalSpendCents / totalInstalls) : 0,
      top_campaign: topCampaign,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
