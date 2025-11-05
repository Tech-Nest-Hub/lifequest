"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

interface CharacterAvatarProps {
  raceId: string | null
  subraceId: string | null
  classId: string | null
}

export function CharacterAvatar({ raceId, subraceId, classId }: CharacterAvatarProps) {
  const avatarRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!avatarRef.current) return
    
    gsap.fromTo(
      avatarRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
    )
  }, [])

  return (
    <div ref={avatarRef} className="relative bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl overflow-hidden h-64 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5" />
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">LV</span>
        </div>
        <p className="text-sm text-cyan-300/60 capitalize">
          {subraceId || raceId} {classId}
        </p>
      </div>
    </div>
  )
}