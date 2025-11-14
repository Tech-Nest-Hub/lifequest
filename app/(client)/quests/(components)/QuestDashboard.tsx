"use client"

import { DailyQuests } from "./DailyQuests"
import { PomodoroQuest } from "./PomodoroQuest"
import { QuestCategories } from "./QuestCategories"
import { RewardsBar } from "./RewardsBar"

export default function QuestDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-cyan-950/20 p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2000ms' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4000ms' }}
        />
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Quest Board
          </h1>
          <p className="text-cyan-300/70 max-w-2xl mx-auto">
            Embark on daily adventures, complete quests, and level up your real life. 
            Your journey to greatness starts here.
          </p>
        </div>

        {/* Rewards Bar */}
        <div className="mb-8">
          <RewardsBar />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <QuestCategories />
            <PomodoroQuest />
          </div>

          {/* Center Column - Daily Quests */}
          <div className="lg:col-span-2">
            <DailyQuests />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-40 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
    </div>
  )
}

// Export individual components
export { DailyQuests, PomodoroQuest, QuestCategories, RewardsBar }