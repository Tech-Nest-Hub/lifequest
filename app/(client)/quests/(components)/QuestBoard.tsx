"use client"

import { useState, useEffect, JSX } from "react"
import { Check, Crown, Lock, Clock, Zap, Target, Brain, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Quest {
  id: string
  title: string
  description: string
  category: string
  xpReward: number
  status: string
  userQuestId?: string
  requiresGold?: boolean
}

export function QuestBoard() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    fetchDailyQuests()
    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000)
    return () => clearInterval(interval)
  }, [])

  const updateTimeLeft = () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    
    const diff = midnight.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    setTimeLeft(`${hours}h ${minutes}m`)
  }

  const fetchDailyQuests = async () => {
    try {
      const response = await fetch("/api/quests/daily")
      if (response.ok) {
        const data = await response.json()
        // Transform API data to match our UI structure
        const transformedQuests = data.quests.map((quest: any) => ({
          id: quest.id,
          title: quest.title,
          description: quest.description,
          category: quest.category,
          xpReward: quest.xpReward,
          status: quest.status,
          userQuestId: quest.userQuestId,
          requiresGold: quest.category === "Premium" // You can adjust this logic
        }))
        setQuests(transformedQuests)
      }
    } catch (error) {
      console.error("Failed to fetch quests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuestAction = async (action: string, questId: string, userQuestId?: string) => {
    try {
      const response = await fetch(`/api/quests/daily/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          questId: action === "start" ? questId : undefined,
          userQuestId: action !== "start" ? userQuestId : undefined
        })
      })

      if (response.ok) {
        fetchDailyQuests() // Refresh the list
      }
    } catch (error) {
      console.error(`Failed to ${action} quest:`, error)
    }
  }

  const completedQuests = quests.filter(q => 
    q.status === "COMPLETED" || q.status === "CLAIMED"
  ).length

  const regularQuests = quests.filter(q => !q.requiresGold)
  const goldQuests = quests.filter(q => q.requiresGold)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Physical": return <Zap className="h-4 w-4" />
      case "Mind": return <Brain className="h-4 w-4" />
      case "Learning": return <Target className="h-4 w-4" />
      case "Health": return <Heart className="h-4 w-4" />
      case "Mindfulness": return <Sparkles className="h-4 w-4" />
      case "Premium": return <Crown className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Physical": return "from-red-500 to-orange-500"
      case "Mind": return "from-blue-500 to-cyan-500"
      case "Learning": return "from-purple-500 to-pink-500"
      case "Health": return "from-green-500 to-emerald-500"
      case "Mindfulness": return "from-indigo-500 to-purple-500"
      case "Premium": return "from-yellow-500 to-amber-500"
      default: return "from-gray-500 to-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-cyan-950/20 p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-cyan-300/70">Loading quests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-cyan-950/20 p-6">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2000ms' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Daily Quest Board
          </h1>
          
          {/* Progress and Timer */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{completedQuests}/{quests.length}</div>
              <div className="text-cyan-300/70 text-sm">Quests Completed</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-2 text-amber-400">
                <Clock className="h-5 w-5" />
                <div className="text-2xl font-bold">{timeLeft}</div>
              </div>
              <div className="text-amber-300/70 text-sm">Ends Today</div>
            </div>
          </div>
        </div>

        {/* Regular Quests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-cyan-300 mb-4">Daily Quests</h2>
          <div className="space-y-3">
            {regularQuests.map((quest) => (
              <QuestCard 
                key={quest.id}
                quest={quest}
                onAction={handleQuestAction}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        </div>

        {/* Gold Pass Quests */}
        <div>
          <h2 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Gold Pass Quests
          </h2>
          <div className="space-y-3">
            {goldQuests.map((quest) => (
              <QuestCard 
                key={quest.id}
                quest={quest}
                onAction={handleQuestAction}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-cyan-400/60 text-sm">
            Complete quests to earn XP and level up your character
          </p>
        </div>
      </div>
    </div>
  )
}

// Quest Card Component
interface QuestCardProps {
  quest: Quest
  onAction: (action: string, questId: string, userQuestId?: string) => void
  getCategoryIcon: (category: string) => JSX.Element
  getCategoryColor: (category: string) => string
}

function QuestCard({ quest, onAction, getCategoryIcon, getCategoryColor }: QuestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "CLAIMED":
        return "bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border-yellow-400/40"
      case "IN_PROGRESS":
        return "bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-400/40"
      default:
        return quest.requiresGold
          ? "bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/30"
          : "bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40"
    }
  }

  const getTextColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "CLAIMED":
        return "text-yellow-200"
      case "IN_PROGRESS":
        return "text-blue-200"
      default:
        return quest.requiresGold ? "text-amber-200" : "text-cyan-200"
    }
  }

  const getDescriptionColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "CLAIMED":
        return "text-yellow-300/60"
      case "IN_PROGRESS":
        return "text-blue-300/70"
      default:
        return "text-cyan-300/70"
    }
  }

  const getButtonConfig = (status: string) => {
    switch (status) {
      case "NOT_STARTED":
        return {
          text: "Start",
          action: "start",
          className: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white",
          icon: null
        }
      case "IN_PROGRESS":
        return {
          text: "Complete",
          action: "complete",
          className: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white",
          icon: <Check className="h-4 w-4 mr-2" />
        }
      case "COMPLETED":
        return {
          text: "Claim Reward",
          action: "claim",
          className: "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white",
          icon: <Check className="h-4 w-4 mr-2" />
        }
      case "CLAIMED":
        return {
          text: "Claimed",
          action: "",
          className: "border-green-500/40 text-green-400",
          icon: <Check className="h-4 w-4 mr-2" />,
          disabled: true
        }
      default:
        return {
          text: "Start",
          action: "start",
          className: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white",
          icon: null
        }
    }
  }

  const buttonConfig = getButtonConfig(quest.status)

  return (
    <div
      className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${getStatusColor(quest.status)}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Category Icon */}
          <div className={`p-3 rounded-lg bg-gradient-to-br ${getCategoryColor(quest.category)}`}>
            {getCategoryIcon(quest.category)}
          </div>

          {/* Quest Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${getTextColor(quest.status)} ${
                (quest.status === "COMPLETED" || quest.status === "CLAIMED") ? "line-through" : ""
              }`}>
                {quest.title}
              </h3>
              {quest.requiresGold && quest.status === "NOT_STARTED" && (
                <Crown className="h-4 w-4 text-amber-400" />
              )}
            </div>
            <p className={`text-sm ${getDescriptionColor(quest.status)}`}>
              {quest.description}
            </p>
            
            {/* XP and Category */}
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${
                quest.status === "COMPLETED" || quest.status === "CLAIMED"
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  : quest.requiresGold
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
              }`}>
                {quest.category}
              </span>
              <span className={`text-sm font-semibold ${
                quest.status === "COMPLETED" || quest.status === "CLAIMED"
                  ? "text-yellow-400"
                  : quest.requiresGold
                  ? "text-amber-400"
                  : "text-cyan-400"
              }`}>
                +{quest.xpReward} XP
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="ml-4">
          {quest.requiresGold && quest.status === "NOT_STARTED" ? (
            <Button
              disabled
              variant="outline"
              className="border-amber-500/40 text-amber-400/60"
            >
              <Lock className="h-4 w-4 mr-2" />
              Gold Pass
            </Button>
          ) : (
            <Button
              onClick={() => onAction(buttonConfig.action, quest.id, quest.userQuestId)}
              className={buttonConfig.className}
              disabled={buttonConfig.disabled}
            >
              {buttonConfig.icon}
              {buttonConfig.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}