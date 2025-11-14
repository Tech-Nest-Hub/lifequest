"use client"

import { useState } from "react"
import { Sword, Brain, Heart, Sparkles, Clock, Book, Target } from "lucide-react"

const categories = [
  { id: "daily", name: "Daily", icon: Sword, count: 3 },
  { id: "main", name: "Main Quests", icon: Target, count: 5 },
  { id: "side", name: "Side Quests", icon: Book, count: 8 },
  { id: "pomodoro", name: "Pomodoro", icon: Clock, count: 2 },
  { id: "completed", name: "Completed", icon: Sparkles, count: 12 },
]

export function QuestCategories() {
  const [activeCategory, setActiveCategory] = useState("daily")

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Quest Categories
      </h2>
      
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                  : "bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/15"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
                    : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`font-semibold ${
                  isActive ? "text-cyan-200" : "text-cyan-300 group-hover:text-cyan-200"
                }`}>
                  {category.name}
                </span>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "bg-cyan-500/10 text-cyan-400/70 border border-cyan-500/20"
              }`}>
                {category.count}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}