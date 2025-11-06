import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const races = await prisma.race.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(races)
  } catch (err) {
    console.error("Error fetching races:", err)
    return NextResponse.json({ error: "Failed to fetch races" }, { status: 500 })
  }
}
