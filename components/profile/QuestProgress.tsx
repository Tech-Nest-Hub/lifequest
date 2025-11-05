"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

interface QuestProgressProps {
  completedTasks: number
  totalTasks: number
}

export function QuestProgress({ completedTasks, totalTasks }: QuestProgressProps) {
  const centerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!centerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        centerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
      )

      // Floating animation
      gsap.to(centerRef.current, {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => ctx.revert()
  }, [])

  const completionPercent = (completedTasks / totalTasks) * 100

  return (
    <div ref={centerRef} className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/40" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/40" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/40" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/40" />
      
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl font-black text-cyan-400">{completedTasks}</div>
          <div className="text-sm text-cyan-300/60 uppercase tracking-widest">Quests Completed</div>
        </div>
        
        <div className="w-48 h-48 relative">
          <div className="absolute inset-0 rounded-full border-8 border-zinc-800/50"></div>
          <div 
            className="absolute inset-2 rounded-full border-8 border-transparent border-t-cyan-500 border-r-blue-500 transform -rotate-45 transition-all duration-1000 ease-out"
            style={{ 
              background: `conic-linear(from 0deg, transparent 0deg ${completionPercent * 3.6}deg, #1e40af20 ${completionPercent * 3.6}deg)`
            }}
          ></div>
          <div className="absolute inset-8 rounded-full bg-linear-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl font-bold text-cyan-400">{Math.round(completionPercent)}%</span>
          </div>
        </div>
        
        <div className="text-sm text-cyan-300/70">
          {totalTasks - completedTasks} quests remaining today
        </div>
      </div>
    </div>
  )
}