import { NextRequest, NextResponse } from "next/server";

const HEARZ_API = "https://hearzee-api.arneg-fb8.workers.dev";

export async function GET(request: NextRequest) {
  try {
    const days = request.nextUrl.searchParams.get("days") || "7";

    const res = await fetch(`${HEARZ_API}/api/analytics/summary?days=${days}`, {
      headers: { "X-Device-ID": "dashboard" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `HearZ API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
