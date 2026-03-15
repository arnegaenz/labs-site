import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Aggregate marketing insights from Supabase
  return NextResponse.json({
    totalCampaigns: 0,
    totalSpend: 0,
    totalInstalls: 0,
    totalRevenue: 0,
    costPerInstall: 0,
    topChannel: null,
  });
}
