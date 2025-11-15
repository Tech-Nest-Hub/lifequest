import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        userQuests: {
          include: {
            quest: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get daily quests
    const dailyQuests = await prisma.quest.findMany({
      where: {
        OR: [
          { isDaily: true },
          { type: "DAILY" }
        ]
      }
    })

    // Structure the response with user progress
    const questsWithProgress = dailyQuests.map(quest => {
      const userQuest = user.userQuests.find(uq => uq.questId === quest.id)
      
      return {
        id: quest.id,
        title: quest.title,
        description: quest.description,
        category: quest.category,
        xpReward: quest.xpReward,
        currencyReward: quest.currencyReward,
        requiredAction: quest.requiredAction,
        isRepeatable: quest.isRepeatable,
        
        // User-specific progress
        userQuestId: userQuest?.id,
        status: userQuest?.status || "NOT_STARTED",
        progress: userQuest?.progress || {},
        startedAt: userQuest?.startedAt,
        completedAt: userQuest?.completedAt,
        
        // Daily quest specific
        isDaily: quest.isDaily,
        type: quest.type
      }
    })

    return NextResponse.json({
      quests: questsWithProgress,
      total: dailyQuests.length,
      completed: user.userQuests.filter(uq => 
        uq.status === "COMPLETED" || uq.status === "CLAIMED"
      ).length
    })

  } catch (error) {
    console.error("Daily quests error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}