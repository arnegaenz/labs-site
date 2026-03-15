import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  try {
    const { searchParams } = new URL(request.url);
    const appTag = searchParams.get("app_tag");
    const status = searchParams.get("status");

    let query = supabase
      .from("marketing_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (appTag) {
      query = query.eq("app_tag", appTag);
    }
    if (status) {
      query = query.eq("status", status);
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

    const required = ["app_tag", "platform", "campaign_name"];
    const missing = required.filter((field) => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("marketing_campaigns")
      .insert({
        app_tag: body.app_tag,
        platform: body.platform,
        campaign_name: body.campaign_name,
        campaign_external_id: body.campaign_external_id || null,
        creative_type: body.creative_type || null,
        target_audience: body.target_audience || null,
        status: body.status || "draft",
        budget_cents: body.budget_cents || 0,
        daily_budget_cents: body.daily_budget_cents || 0,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        notes: body.notes || null,
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
