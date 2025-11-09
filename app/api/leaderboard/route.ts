// /app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/leaderboard";

export async function GET() {
  try {
    const leaderboard = await getLeaderboard(20);
    return NextResponse.json(leaderboard);
  } catch (err: any) {
    console.error("Leaderboard error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
