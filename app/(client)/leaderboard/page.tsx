"use client"

import { useEffect, useState, useRef } from "react"
import { Crown, Trophy, Star, TrendingUp, TrendingDown, Zap } from "lucide-react"

export default function Leaderboard() {
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

if (loading) return (
  <div className="fixed inset-0 z-50 bg-linear-to-br from-black to-cyan-950/20 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-cyan-300/70">Loading leaderboard...</p>
    </div>
  </div>
)


  const topThree = players.slice(0, 3)
  const restOfPlayers = players.slice(3)

  return (
    <div className="bg-linear-to-br from-black to-cyan-950/20 min-h-screen p-8 max-w-8xl inset-0 ">
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

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-wider mb-4">
          GLOBAL LEADERBOARD
        </h1>
        <div className="h-1 w-32 bg-linear-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        <p className="text-cyan-300/70 mt-4 max-w-2xl mx-auto">
          Compete with adventurers worldwide. Rise through the ranks and claim your place among the legends.
        </p>
      </div>

      {/* Podium - Top 3 */}
      <div className="flex items-end justify-center gap-8 mb-16 max-w-8xl mx-auto relative z-10">
        {/* 2nd Place */}
        {topThree[1] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shadow-2xl border-4 border-cyan-400/60 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
                <span className="text-4xl text-cyan-300">🥈</span>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-cyan-500 border-4 border-black flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="bg-linear-to-br from-cyan-900/40 to-blue-900/20 rounded-xl p-6 w-full border border-cyan-500/30 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-cyan-300" />
                  <span className="text-cyan-200 font-bold text-lg">TOP 2</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-cyan-300 text-sm">+0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-cyan-300 text-sm">x1</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {topThree[1].username?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <span className="text-cyan-200 font-bold truncate">{topThree[1].username}</span>
              </div>
              <div className="bg-black/30 rounded-lg p-3 border border-cyan-500/20">
                <div className="text-cyan-400/70 text-xs mb-1">Current Power</div>
                <div className="text-cyan-400 text-xl font-bold">
                  {topThree[1].xp.toLocaleString()} XP
                </div>
              </div>
              {(topThree[1].race || topThree[1].class) && (
                <div className="mt-2 text-center">
                  {topThree[1].race && (
                    <span className="text-xs text-cyan-400/80 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                      {topThree[1].race}
                    </span>
                  )}
                  {topThree[1].class && (
                    <span className="text-xs text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20 ml-2">
                      {topThree[1].class}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 1st Place */}
        {topThree[0] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-xl bg-linear-to-br from-yellow-400/30 to-yellow-600/20 flex items-center justify-center shadow-2xl border-4 border-yellow-400/60 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
                <span className="text-5xl text-yellow-300">👑</span>
              </div>
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-yellow-400 border-4 border-black flex items-center justify-center">
                <Crown className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
            <div className="bg-linear-to-br from-cyan-900/40 to-blue-900/20 rounded-xl p-6 w-full border border-yellow-400/40 shadow-2xl backdrop-blur-sm transform scale-110">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-200 font-bold text-xl">TOP 1</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-yellow-200 text-sm">+0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-200 text-sm">x{topThree[0].badges || 1}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {topThree[0].username?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <span className="text-yellow-200 font-bold text-lg truncate">{topThree[0].username}</span>
              </div>
              <div className="bg-black/30 rounded-lg p-3 border border-yellow-400/20">
                <div className="text-yellow-400/70 text-xs mb-1">Current Power</div>
                <div className="text-yellow-400 text-2xl font-bold">
                  {topThree[0].xp.toLocaleString()} XP
                </div>
              </div>
              {(topThree[0].race || topThree[0].class) && (
                <div className="mt-2 text-center">
                  {topThree[0].race && (
                    <span className="text-xs text-cyan-400/80 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                      {topThree[0].race}
                    </span>
                  )}
                  {topThree[0].class && (
                    <span className="text-xs text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20 ml-2">
                      {topThree[0].class}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-xl bg-linear-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center shadow-2xl border-4 border-amber-400/60 backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
                <span className="text-4xl text-amber-300">🥉</span>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-amber-500 border-4 border-black flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="bg-linear-to-br from-cyan-900/40 to-blue-900/20 rounded-xl p-6 w-full border border-amber-500/30 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-200 font-bold text-lg">TOP 3</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-amber-200 text-sm">+0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-amber-200 text-sm">x1</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {topThree[2].username?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <span className="text-amber-200 font-bold truncate">{topThree[2].username}</span>
              </div>
              <div className="bg-black/30 rounded-lg p-3 border border-amber-500/20">
                <div className="text-amber-400/70 text-xs mb-1">Current Power</div>
                <div className="text-amber-400 text-xl font-bold">
                  {topThree[2].xp.toLocaleString()} XP
                </div>
              </div>
              {(topThree[2].race || topThree[2].class) && (
                <div className="mt-2 text-center">
                  {topThree[2].race && (
                    <span className="text-xs text-cyan-400/80 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                      {topThree[2].race}
                    </span>
                  )}
                  {topThree[2].class && (
                    <span className="text-xs text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20 ml-2">
                      {topThree[2].class}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Rest of Leaderboard - Table Format */}
      {restOfPlayers.length > 0 && (
        <div className="max-w-8xl mx-auto bg-linear-to-br from-cyan-900/20 to-blue-900/10 rounded-xl border border-cyan-500/30 overflow-hidden backdrop-blur-sm shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 bg-cyan-900/30 border-b border-cyan-500/20 text-sm font-semibold">
            <div className="col-span-1 text-cyan-300 text-center">Rank</div>
            <div className="col-span-5 text-cyan-300">Player</div>
            <div className="col-span-3 text-cyan-300 text-center">Experience</div>
            <div className="col-span-1 text-cyan-300 text-center">Badges</div>
            <div className="col-span-2 text-cyan-300 text-right">Level</div>
          </div>

          {/* Rest of Players */}
          <div ref={listRef} className="divide-y divide-cyan-500/10">
            {restOfPlayers.map((player, index) => (
              <div
                key={player.username}
                className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-cyan-500/10 transition-all duration-300 group"
              >
                <div className="col-span-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                    <span className="text-cyan-300 font-bold text-sm">{player.rank}</span>
                  </div>
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">
                      {player.username?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-cyan-200 font-semibold truncate block">{player.username}</span>
                    {(player.race || player.class) && (
                      <div className="flex items-center gap-2 mt-2">
                        {player.race && (
                          <span className="text-xs text-cyan-400/80 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                            {player.race}
                          </span>
                        )}
                        {player.class && (
                          <span className="text-xs text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                            {player.class}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 font-bold text-lg">
                      {player.xp.toLocaleString()} XP
                    </span>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  {player.badges > 0 ? (
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 font-bold">{player.badges}</span>
                    </div>
                  ) : (
                    <span className="text-cyan-400/40">-</span>
                  )}
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-cyan-300 font-bold text-lg">Lvl {player.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center relative z-10">
        <p className="text-cyan-400/60 text-sm">
          Updated in real-time • Compete with players worldwide
        </p>
      </div>
    </div>
  )
}