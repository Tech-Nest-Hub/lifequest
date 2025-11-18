import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"

export async function POST(
  request: Request,
context: { params: Promise<{ action: string }> }
) {
  const { action } = await context.params
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (action === "start") {
      return await handleStartQuest(session.user.id, body)
    } else if (action === "complete") {
      return await handleCompleteQuest(session.user.id, body)
    } else if (action === "claim") {
      return await handleClaimQuest(session.user.id, body)
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

  } catch (error) {
    console.error("Quest action error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Handle starting a quest
async function handleStartQuest(userId: string, body: any) {
  const { questId } = body

  // Check if user already has this quest
  const existingUserQuest = await prisma.userQuest.findFirst({
    where: {
      userId: userId,
      questId: questId
    }
  })

  if (existingUserQuest) {
    // Update existing quest
    const updatedQuest = await prisma.userQuest.update({
      where: { id: existingUserQuest.id },
      data: {
        status: "IN_PROGRESS",
        startedAt: new Date()
      }
    })

    return NextResponse.json({ userQuest: updatedQuest })
  }

  // Create new user quest
  const userQuest = await prisma.userQuest.create({
    data: {
      userId: userId,
      questId: questId,
      status: "IN_PROGRESS",
      startedAt: new Date()
    }
  })

  return NextResponse.json({ userQuest })
}

// Handle completing a quest
async function handleCompleteQuest(userId: string, body: any) {
  const { userQuestId, proof } = body

  // Update user quest status
  const userQuest = await prisma.userQuest.update({
    where: { 
      id: userQuestId,
      userId: userId // Ensure user owns this quest
    },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      proof: proof || null
    },
    include: {
      quest: true
    }
  })

  return NextResponse.json({ 
    userQuest,
    xpGained: userQuest.quest.xpReward
  })
}

// Handle claiming a quest reward
async function handleClaimQuest(userId: string, body: any) {
  const { userQuestId } = body

  // Update user quest status and give rewards
  const userQuest = await prisma.userQuest.update({
    where: { 
      id: userQuestId,
      userId: userId,
      status: "COMPLETED" // Can only claim completed quests
    },
    data: {
      status: "CLAIMED",
      claimedAt: new Date()
    },
    include: {
      quest: true
    }
  })

  // Update user XP and currency
  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: {
        increment: userQuest.quest.xpReward
      },
      money: {
        increment: userQuest.quest.currencyReward || 0
      }
      // You can also update stats based on quest.statEffects
    }
  })

  return NextResponse.json({ 
    userQuest,
    xpGained: userQuest.quest.xpReward,
    currencyGained: userQuest.quest.currencyReward || 0
  })
}