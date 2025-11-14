"use client"

import { useState, useEffect } from "react"
import { Check, Clock, Zap, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Quest {
  id: string
  title: string
  category: string
  xp: number
  progress: number
  total: number
  completed: boolean
}

export function DailyQuests() {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "1",
      title: "Morning Meditation",
      category: "Mind",
      xp: 25,
      progress: 1,
      total: 1,
      completed: true
    },
    {
      id: "2",
      title: "30-min Workout",
      category: "Physical",
      xp: 50,
      progress: 20,
      total: 30,
      completed: false
    },
    {
      id: "3",
      title: "Learn New Skill",
      category: "Creative",
      xp: 75,
      progress: 0,
      total: 60,
      completed: false
    }
  ])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Physical": return <Zap className="h-4 w-4" />
      case "Mind": return <Target className="h-4 w-4" />
      case "Social": return <TrendingUp className="h-4 w-4" />
      case "Creative": return <Zap className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Physical": return "from-red-500 to-orange-500"
      case "Mind": return "from-blue-500 to-cyan-500"
      case "Social": return "from-green-500 to-emerald-500"
      case "Creative": return "from-purple-500 to-pink-500"
      default: return "from-gray-500 to-gray-600"
    }
  }

  const toggleQuest = (id: string) => {
    setQuests(quests.map(quest => 
      quest.id === id 
        ? { ...quest, completed: !quest.completed, progress: quest.total }
        : quest
    ))
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Daily Quests
        </h2>
        <div className="flex items-center gap-2 text-cyan-400/70 text-sm">
          <Clock className="h-4 w-4" />
          <span>Refreshes at midnight</span>
        </div>
      </div>

      <div className="space-y-4">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
              quest.completed
                ? "bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border-yellow-400/40 shadow-lg shadow-yellow-500/20"
                : "bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryColor(quest.category)}`}>
                  {getCategoryIcon(quest.category)}
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    quest.completed ? "text-yellow-200 line-through" : "text-cyan-200"
                  }`}>
                    {quest.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      quest.completed 
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    }`}>
                      {quest.category}
                    </span>
                    <span className="text-xs text-cyan-400/70">+{quest.xp} XP</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => toggleQuest(quest.id)}
                className={`
                  ${quest.completed 
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white" 
                    : quest.progress > 0
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  }
                `}
              >
                {quest.completed ? (
                  <Check className="h-4 w-4" />
                ) : quest.progress > 0 ? (
                  "Continue"
                ) : (
                  "Start"
                )}
              </Button>
            </div>

            {!quest.completed && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-cyan-400/70">
                  <span>Progress</span>
                  <span>{quest.progress}/{quest.total}</span>
                </div>
                <div className="w-full h-2 bg-cyan-900/50 rounded-full overflow-hidden border border-cyan-500/20">
                  <div
                    className={`h-full bg-gradient-to-r ${getCategoryColor(quest.category)} transition-all duration-500`}
                    style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}