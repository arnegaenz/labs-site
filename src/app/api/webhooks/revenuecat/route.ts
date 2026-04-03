import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/**
 * RevenueCat Webhook Endpoint
 *
 * RevenueCat sends events here whenever a subscription event happens
 * across any SkoobiLabs app. We record it as a marketing attribution
 * so the dashboard updates automatically.
 *
 * Setup in RevenueCat Dashboard:
 * 1. Go to Project Settings → Integrations → Webhooks
 * 2. URL: https://labs.skoobi.com/api/webhooks/revenuecat
 * 3. Authorization: Bearer <REVENUECAT_WEBHOOK_SECRET>
 *
 * Events we track:
 * - INITIAL_PURCHASE → subscription (new paying customer)
 * - RENEWAL → subscription (existing customer renewed)
 * - CANCELLATION → cancellation
 * - EXPIRATION → cancellation
 * - PRODUCT_CHANGE → subscription (plan change)
 * - BILLING_ISSUE → stored in metadata
 * - SUBSCRIBER_ALIAS → ignored
 *
 * RevenueCat webhook docs: https://www.revenuecat.com/docs/webhooks
 */

// Map RevenueCat event types to our attribution event types
const EVENT_MAP: Record<string, string> = {
  INITIAL_PURCHASE: "subscription",
  RENEWAL: "subscription",
  PRODUCT_CHANGE: "subscription",
  CANCELLATION: "cancellation",
  EXPIRATION: "cancellation",
  BILLING_ISSUE: "subscription", // track but flag in metadata
  UNCANCELLATION: "subscription", // user resubscribed
};

// Map RevenueCat app_user_id prefixes or entitlement names to our app tags
function resolveAppTag(event: any): string {
  const entitlements = event.subscriber_attributes?.entitlements || {};
  const productId = event.product_id || "";

  if (
    productId.includes("hearverse") ||
    entitlements["HearVerse Pro"]
  ) {
    return "hearverse";
  }
  if (
    productId.includes("hearz") ||
    entitlements["HearZ Pro"]
  ) {
    return "hearz";
  }

  // Fall back to checking the app_id field
  const appId = event.app_id || "";
  if (appId.includes("hearverse")) return "hearverse";
  if (appId.includes("hearz")) return "hearz";

  return "unknown";
}

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.REVENUECAT_WEBHOOK_SECRET;

  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();

  try {
    const body = await request.json();
    const event = body.event;

    if (!event) {
      return NextResponse.json({ error: "No event in payload" }, { status: 400 });
    }

    const eventType = event.type;
    const mappedType = EVENT_MAP[eventType];

    // Skip events we don't track
    if (!mappedType) {
      return NextResponse.json({ ok: true, skipped: eventType });
    }

    const appTag = resolveAppTag(event);
    const userId = event.app_user_id || null;
    const productId = event.product_id || null;
    const priceInCents = event.price_in_purchased_currency
      ? Math.round(event.price_in_purchased_currency * 100)
      : null;

    const metadata: Record<string, any> = {
      revenuecat_event_type: eventType,
      product_id: productId,
      currency: event.currency || null,
      price_cents: priceInCents,
      store: event.store || null,
      environment: event.environment || null,
      period_type: event.period_type || null,
      purchased_at: event.purchased_at_ms
        ? new Date(event.purchased_at_ms).toISOString()
        : null,
      expiration: event.expiration_at_ms
        ? new Date(event.expiration_at_ms).toISOString()
        : null,
    };

    if (eventType === "BILLING_ISSUE") {
      metadata.billing_issue = true;
    }

    // Record the attribution
    const { error } = await supabase.from("marketing_attributions").insert({
      campaign_id: null, // organic — not attributed to a specific campaign
      app_tag: appTag,
      user_id: userId,
      event_type: mappedType,
      event_metadata: metadata,
      attributed_at: event.event_timestamp_ms
        ? new Date(event.event_timestamp_ms).toISOString()
        : new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      event_type: eventType,
      mapped_to: mappedType,
      app_tag: appTag,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// RevenueCat also sends GET requests to verify the endpoint is alive
export async function GET() {
  return NextResponse.json({ status: "ok", service: "revenuecat-webhook" });
}
