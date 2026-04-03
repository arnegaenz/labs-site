import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/**
 * Ad Platform Metrics Auto-Sync
 *
 * Pulls yesterday's performance data from all connected ad platforms
 * and stores it in marketing_daily_metrics. Runs daily via Vercel Cron.
 *
 * Platforms:
 * 1. Google Ads (account 490-511-0744) — campaign spend, clicks, impressions, installs
 * 2. Google AdMob (ca-app-pub-2092614136459898) — ad revenue, impressions, clicks
 * 3. Meta/Facebook Ads — campaign spend, clicks, impressions, installs
 * 4. Apple Search Ads — campaign spend, impressions, taps, installs
 *
 * Setup:
 * - Vercel Cron: { "path": "/api/sync/ad-metrics", "schedule": "0 8 * * *" }
 * - Env vars per platform (see each sync function below)
 *
 * Each platform syncs independently — if one fails, the others still run.
 */

const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
};

// ─── Google Ads ─────────────────────────────────────────────
// Env: GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET,
//      GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_CUSTOMER_ID (490-511-0744 without dashes)

async function getGoogleAdsAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function syncGoogleAds(supabase: any, date: string) {
  if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN) return { skipped: "no credentials" };

  const accessToken = await getGoogleAdsAccessToken();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;

  // Google Ads Query Language (GAQL)
  const query = `
    SELECT campaign.id, campaign.name,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions
    FROM campaign
    WHERE segments.date = '${date}'
    AND campaign.status = 'ENABLED'
  `;

  const res = await fetch(
    `https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
  const data = await res.json();
  let synced = 0;

  for (const batch of data) {
    for (const row of batch.results || []) {
      const externalId = row.campaign.id;
      const metrics = row.metrics;

      // Find matching campaign in our DB
      const { data: campaigns } = await supabase
        .from("marketing_campaigns")
        .select("id")
        .eq("platform", "google")
        .eq("campaign_external_id", externalId)
        .limit(1);

      if (!campaigns || campaigns.length === 0) continue;

      await supabase.from("marketing_daily_metrics").upsert(
        {
          campaign_id: campaigns[0].id,
          date,
          impressions: parseInt(metrics.impressions || "0"),
          clicks: parseInt(metrics.clicks || "0"),
          spend_cents: Math.round(parseInt(metrics.costMicros || "0") / 10000),
          installs: Math.round(parseFloat(metrics.conversions || "0")),
        },
        { onConflict: "campaign_id,date" }
      );
      synced++;
    }
  }

  return { synced };
}

// ─── Google AdMob ───────────────────────────────────────────
// Env: ADMOB_CLIENT_ID, ADMOB_CLIENT_SECRET, ADMOB_REFRESH_TOKEN, ADMOB_PUBLISHER_ID

async function getAdMobAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.ADMOB_CLIENT_ID!,
      client_secret: process.env.ADMOB_CLIENT_SECRET!,
      refresh_token: process.env.ADMOB_REFRESH_TOKEN!,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function syncAdMob(supabase: any, date: string) {
  if (!process.env.ADMOB_PUBLISHER_ID) return { skipped: "no credentials" };

  const accessToken = await getAdMobAccessToken();
  const publisherId = process.env.ADMOB_PUBLISHER_ID!;

  const res = await fetch(
    `https://admob.googleapis.com/v1/accounts/${publisherId}/networkReport:generate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reportSpec: {
          dateRange: { startDate: { year: parseInt(date.slice(0, 4)), month: parseInt(date.slice(5, 7)), day: parseInt(date.slice(8, 10)) }, endDate: { year: parseInt(date.slice(0, 4)), month: parseInt(date.slice(5, 7)), day: parseInt(date.slice(8, 10)) } },
          dimensions: ["APP"],
          metrics: ["IMPRESSIONS", "CLICKS", "ESTIMATED_EARNINGS"],
        },
      }),
    }
  );

  if (!res.ok) throw new Error(`AdMob API: ${res.status} ${await res.text()}`);
  const data = await res.json();

  // AdMob revenue goes into a special "admob_revenue" campaign per app
  const appMap: Record<string, string> = {
    "ca-app-pub-2092614136459898~HEARVERSE_IOS": "hearverse",
    "ca-app-pub-2092614136459898~9037470779": "hearz",
  };

  let synced = 0;
  for (const row of data.rows || []) {
    const appId = row.dimensionValues?.APP?.value || "";
    const appTag = appMap[appId] || null;
    if (!appTag) continue;

    // Find or skip the admob revenue campaign
    const { data: campaigns } = await supabase
      .from("marketing_campaigns")
      .select("id")
      .eq("app_tag", appTag)
      .eq("platform", "google")
      .ilike("campaign_name", "%admob%")
      .limit(1);

    if (!campaigns || campaigns.length === 0) continue;

    const metrics = row.metricValues || {};
    await supabase.from("marketing_daily_metrics").upsert(
      {
        campaign_id: campaigns[0].id,
        date,
        impressions: parseInt(metrics.IMPRESSIONS?.integerValue || "0"),
        clicks: parseInt(metrics.CLICKS?.integerValue || "0"),
        revenue_cents: Math.round(parseFloat(metrics.ESTIMATED_EARNINGS?.microsValue || "0") / 10000),
      },
      { onConflict: "campaign_id,date" }
    );
    synced++;
  }

  return { synced };
}

// ─── Meta / Facebook Ads ────────────────────────────────────
// Env: META_ACCESS_TOKEN, META_AD_ACCOUNT_ID

async function syncMeta(supabase: any, date: string) {
  if (!process.env.META_ACCESS_TOKEN) return { skipped: "no credentials" };

  const token = process.env.META_ACCESS_TOKEN!;
  const accountId = process.env.META_AD_ACCOUNT_ID!;

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${accountId}/insights?` +
      new URLSearchParams({
        level: "campaign",
        fields: "campaign_id,campaign_name,impressions,clicks,spend,actions",
        time_range: JSON.stringify({ since: date, until: date }),
        access_token: token,
      })
  );

  if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
  const data = await res.json();
  let synced = 0;

  for (const row of data.data || []) {
    const externalId = row.campaign_id;

    const { data: campaigns } = await supabase
      .from("marketing_campaigns")
      .select("id")
      .eq("platform", "facebook")
      .eq("campaign_external_id", externalId)
      .limit(1);

    if (!campaigns || campaigns.length === 0) continue;

    // Extract installs from actions array
    const installs = (row.actions || []).find(
      (a: any) => a.action_type === "mobile_app_install"
    );

    await supabase.from("marketing_daily_metrics").upsert(
      {
        campaign_id: campaigns[0].id,
        date,
        impressions: parseInt(row.impressions || "0"),
        clicks: parseInt(row.clicks || "0"),
        spend_cents: Math.round(parseFloat(row.spend || "0") * 100),
        installs: parseInt(installs?.value || "0"),
      },
      { onConflict: "campaign_id,date" }
    );
    synced++;
  }

  return { synced };
}

// ─── Apple Search Ads ───────────────────────────────────────
// Env: APPLE_SEARCH_ADS_CLIENT_ID, APPLE_SEARCH_ADS_CLIENT_SECRET,
//      APPLE_SEARCH_ADS_ORG_ID

async function getAppleSearchAdsToken(): Promise<string> {
  const res = await fetch("https://appleid.apple.com/auth/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.APPLE_SEARCH_ADS_CLIENT_ID!,
      client_secret: process.env.APPLE_SEARCH_ADS_CLIENT_SECRET!,
      scope: "searchadsorg",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function syncAppleSearchAds(supabase: any, date: string) {
  if (!process.env.APPLE_SEARCH_ADS_CLIENT_ID) return { skipped: "no credentials" };

  const token = await getAppleSearchAdsToken();
  const orgId = process.env.APPLE_SEARCH_ADS_ORG_ID!;

  const res = await fetch(
    "https://api.searchads.apple.com/api/v5/reports/campaigns",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AP-Context": `orgId=${orgId}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startTime: `${date}`,
        endTime: `${date}`,
        granularity: "DAILY",
        selector: { orderBy: [{ field: "countryOrRegion", sortOrder: "ASCENDING" }] },
        returnRowTotals: true,
        returnGrandTotals: false,
      }),
    }
  );

  if (!res.ok) throw new Error(`Apple Search Ads API: ${res.status} ${await res.text()}`);
  const data = await res.json();
  let synced = 0;

  for (const row of data.data?.reportingDataResponse?.row || []) {
    const meta = row.metadata;
    const totals = row.total;
    const externalId = meta?.campaignId?.toString();

    const { data: campaigns } = await supabase
      .from("marketing_campaigns")
      .select("id")
      .eq("platform", "apple_search")
      .eq("campaign_external_id", externalId)
      .limit(1);

    if (!campaigns || campaigns.length === 0) continue;

    await supabase.from("marketing_daily_metrics").upsert(
      {
        campaign_id: campaigns[0].id,
        date,
        impressions: totals?.impressions || 0,
        clicks: totals?.taps || 0,
        spend_cents: Math.round((totals?.localSpend?.amount || 0) * 100),
        installs: totals?.installs || 0,
      },
      { onConflict: "campaign_id,date" }
    );
    synced++;
  }

  return { synced };
}

// ─── Main Handler ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && token !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const date = yesterday();
  const results: Record<string, any> = {};

  // Run all syncs independently — one failure doesn't block others
  const syncs = [
    { name: "google_ads", fn: () => syncGoogleAds(supabase, date) },
    { name: "admob", fn: () => syncAdMob(supabase, date) },
    { name: "meta", fn: () => syncMeta(supabase, date) },
    { name: "apple_search_ads", fn: () => syncAppleSearchAds(supabase, date) },
  ];

  for (const sync of syncs) {
    try {
      results[sync.name] = await sync.fn();
    } catch (err) {
      results[sync.name] = {
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }

  return NextResponse.json({ ok: true, date, results });
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "ad-metrics-sync" });
}
