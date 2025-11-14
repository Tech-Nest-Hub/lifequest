"use client"

import { Zap, Coins, TrendingUp, Award } from "lucide-react"

export function RewardsBar() {
  const stats = {
    level: 23,
    xp: 8450,
    coins: 1336,
    streak: 7
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Adventure Progress
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
              <Award className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400">{stats.level}</div>
          <div className="text-cyan-400/70 text-sm uppercase tracking-wider">Level</div>
        </div>

        {/* XP */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Zap className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-400">{stats.xp.toLocaleString()}</div>
          <div className="text-purple-400/70 text-sm uppercase tracking-wider">XP</div>
        </div>

        {/* Coins */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
              <Coins className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-yellow-400">{stats.coins}</div>
          <div className="text-yellow-400/70 text-sm uppercase tracking-wider">Gold</div>
        </div>

        {/* Streak */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-red-400">{stats.streak}</div>
          <div className="text-red-400/70 text-sm uppercase tracking-wider">Streak</div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm text-cyan-400/70">
          <span>Next Level: {10000 - stats.xp} XP needed</span>
          <span>{stats.xp}/10,000</span>
        </div>
        <div className="w-full h-3 bg-cyan-900/50 rounded-full overflow-hidden border border-cyan-500/20">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
            style={{ width: `${(stats.xp / 10000) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}