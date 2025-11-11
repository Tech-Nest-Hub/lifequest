"use client"

import { useRef, useEffect, useState, TransitionStartFunction } from "react"
import gsap from "gsap"

interface Character {
  id: string
  raceId: string | null
  subraceId: string | null
  classId: string | null
  level: number
  xp: number
}

interface LevelCardProps {
  character: Character
}

export function LevelCard({ character }: LevelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [xp, setXp] = useState(character.xp)
  const [level, setLevel] = useState(character.level)
  const maxXP = 1000
  const xpPercent = (xp / maxXP) * 100

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
  }, [])

const handleGainXP = async () => {
  const res = await fetch("/api/xp", {
    method: "POST",
    body: JSON.stringify({ userId: character.id, amount: 200 }),
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    console.error("API error", res.status)
    return
  }

  const updatedUser = await res.json() // now this will succeed
  setXp(updatedUser.xp)
  setLevel(updatedUser.level)
}


  return (
    <div
      ref={cardRef}
      className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Frame corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/40" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/40" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
          Level {level}
        </span>
      </div>

      {/* XP Bar */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-cyan-300/80">{xp.toLocaleString()} XP</span>
          <span className="text-blue-300/80">{maxXP.toLocaleString()} XP</span>
        </div>
        <div className="w-full h-3 bg-zinc-800/50 rounded-full overflow-hidden border border-cyan-500/20">
          <div
            className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
            style={{ width: `${xpPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Simulate XP Gain */}
      <button
        onClick={handleGainXP}
        className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 transition"
      >
        Gain XP
      </button>
    </div>
  )
}
