import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(classes)
  } catch (err) {
    console.error("Error fetching classes:", err)
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 })
  }
}
