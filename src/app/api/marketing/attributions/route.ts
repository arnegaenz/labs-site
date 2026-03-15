import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const { searchParams } = new URL(request.url);
    const appTag = searchParams.get("app_tag");
    const campaignId = searchParams.get("campaign_id");

    let query = supabase
      .from("marketing_attributions")
      .select("*, marketing_campaigns(campaign_name, platform)")
      .order("attributed_at", { ascending: false });

    if (appTag) {
      query = query.eq("app_tag", appTag);
    }
    if (campaignId) {
      query = query.eq("campaign_id", campaignId);
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

    const required = ["campaign_id", "app_tag", "event_type"];
    const missing = required.filter((field) => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("marketing_attributions")
      .insert({
        campaign_id: body.campaign_id,
        app_tag: body.app_tag,
        referral_code: body.referral_code || null,
        device_id: body.device_id || null,
        user_id: body.user_id || null,
        event_type: body.event_type,
        event_metadata: body.event_metadata || null,
        attributed_at: body.attributed_at || new Date().toISOString(),
      })
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
