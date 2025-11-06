import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { raceId, classId, name } = await request.json()

    if (!raceId || !classId || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username: name,
        raceId,
        classId,
        level: 1,
        xp: 0,
        health: 100,
        energy: 100,
        money: 0,
      },
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (err) {
    console.error("Error completing onboarding:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
