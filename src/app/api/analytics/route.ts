import { NextRequest, NextResponse } from "next/server";

// Switched from hearzee-api (legacy, retired 2026-04-26) to hear-api;
// /api/analytics/summary endpoint shape is identical post-monorepo migration.
const HEARZ_API = "https://hear-api.arneg-fb8.workers.dev";

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
