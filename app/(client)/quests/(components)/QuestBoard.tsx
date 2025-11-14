"use client"

import { useState, useEffect, JSX } from "react"
import { Check, Crown, Lock, Clock, Zap, Target, Brain, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Quest {
  id: string
  title: string
  description: string
  category: string
  xp: number
  completed: boolean
  requiresGold: boolean
}

export function QuestBoard() {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness",
      category: "Mind",
      xp: 25,
      completed: true,
      requiresGold: false
    },
    {
      id: "2",
      title: "Daily Workout",
      description: "Complete a 30-minute physical activity",
      category: "Physical",
      xp: 50,
      completed: false,
      requiresGold: false
    },
    {
      id: "3",
      title: "Learn Something New",
      description: "Spend 45 minutes learning a new skill",
      category: "Learning",
      xp: 75,
      completed: false,
      requiresGold: false
    },
    {
      id: "4",
      title: "Healthy Nutrition",
      description: "Track and maintain healthy eating habits",
      category: "Health",
      xp: 40,
      completed: false,
      requiresGold: false
    },
    {
      id: "5",
      title: "Evening Reflection",
      description: "Journal your thoughts and accomplishments",
      category: "Mindfulness",
      xp: 30,
      completed: false,
      requiresGold: false
    },
    {
      id: "6",
      title: "Advanced Training",
      description: "Complete an intensive 60-minute workout",
      category: "Physical",
      xp: 100,
      completed: false,
      requiresGold: true
    },
    {
      id: "7",
      title: "Master Class",
      description: "Attend an exclusive skill development session",
      category: "Learning",
      xp: 150,
      completed: false,
      requiresGold: true
    },
    {
      id: "8",
      title: "Elite Challenge",
      description: "Complete the daily elite performance challenge",
      category: "Premium",
      xp: 200,
      completed: false,
      requiresGold: true
    }
  ])

  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    // Calculate time until midnight
    const updateTimeLeft = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const diff = midnight.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      setTimeLeft(`${hours}h ${minutes}m`)
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const toggleQuest = (id: string) => {
    setQuests(quests.map(quest => 
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    ))
  }

  const completedQuests = quests.filter(q => q.completed).length
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

  return (
    <div className="min-h-screen bg-linear-to-br from-black to-cyan-950/20 p-6">
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
          <h1 className="text-4xl font-black bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Daily Quest Board
          </h1>
          
          {/* Progress and Timer */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{completedQuests}/8</div>
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
                onToggle={toggleQuest}
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
                onToggle={toggleQuest}
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
  onToggle: (id: string) => void
  getCategoryIcon: (category: string) => JSX.Element
  getCategoryColor: (category: string) => string
}

function QuestCard({ quest, onToggle, getCategoryIcon, getCategoryColor }: QuestCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
        quest.completed
          ? "bg-linear-to-br from-yellow-500/20 to-amber-500/10 border-yellow-400/40"
          : quest.requiresGold
          ? "bg-linear-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/30"
          : "bg-linear-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Category Icon */}
          <div className={`p-3 rounded-lg bg-linear-to-br ${getCategoryColor(quest.category)}`}>
            {getCategoryIcon(quest.category)}
          </div>

          {/* Quest Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${
                quest.completed 
                  ? "text-yellow-200 line-through" 
                  : quest.requiresGold 
                  ? "text-amber-200"
                  : "text-cyan-200"
              }`}>
                {quest.title}
              </h3>
              {quest.requiresGold && !quest.completed && (
                <Crown className="h-4 w-4 text-amber-400" />
              )}
            </div>
            <p className={`text-sm ${
              quest.completed ? "text-yellow-300/60" : "text-cyan-300/70"
            }`}>
              {quest.description}
            </p>
            
            {/* XP and Category */}
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${
                quest.completed 
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  : quest.requiresGold
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
              }`}>
                {quest.category}
              </span>
              <span className={`text-sm font-semibold ${
                quest.completed ? "text-yellow-400" : "text-cyan-400"
              }`}>
                +{quest.xp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="ml-4">
          {quest.requiresGold && !quest.completed ? (
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
              onClick={() => onToggle(quest.id)}
              className={`
                ${quest.completed 
                  ? "bg-linear-to-r from-yellow-500 to-amber-500 text-white" 
                  : "bg-linear-to-r from-cyan-500 to-blue-500 text-white"
                }
              `}
            >
              {quest.completed ? (
                <Check className="h-4 w-4" />
              ) : (
                "Complete"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}