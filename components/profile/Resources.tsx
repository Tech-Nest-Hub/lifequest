"use client"

import { useRef, useEffect } from "react"
import { Zap, Heart, Coins } from "lucide-react"
import gsap from "gsap"

interface ResourcesProps {
  health: number
  energy: number
  money: number
}

export function Resources({ health, energy, money }: ResourcesProps) {
  const resourcesRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!resourcesRef.current) return
    
    gsap.fromTo(
      resourcesRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    )
  }, [])

  return (
    <div ref={resourcesRef} className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Resources</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-cyan-200">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Health</span>
            </div>
            <span className="text-cyan-200/70">{health}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800/50 rounded-full overflow-hidden border border-red-500/20">
            <div className="h-full w-full bg-linear-to-r from-red-500 to-red-400 rounded-full" />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-cyan-200">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Energy</span>
            </div>
            <span className="text-cyan-200/70">{energy}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800/50 rounded-full overflow-hidden border border-cyan-500/20">
            <div className="h-full w-full bg-linear-to-r from-cyan-500 to-cyan-400 rounded-full" />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-cyan-200">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>Gold</span>
            </div>
            <span className="text-cyan-200/70">{money}g</span>
          </div>
          <div className="w-full h-2 bg-zinc-800/50 rounded-full overflow-hidden border border-yellow-500/20">
            <div className="h-full w-full bg-linear-to-r from-yellow-500 to-yellow-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}