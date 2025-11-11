import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json()

    if (!userId || !amount) {
      return NextResponse.json({ error: "Missing userId or amount" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let xp = user.xp + amount
    let level = user.level
    let requiredXP = Math.round(Math.pow(level + 1, 1.8) + (level + 1) * 4)

    while (xp >= requiredXP) {
      xp -= requiredXP
      level++
      requiredXP = Math.round(Math.pow(level + 1, 1.8) + (level + 1) * 4)
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { xp, level },
    })

    // ✅ Return JSON
    return NextResponse.json(updatedUser)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
