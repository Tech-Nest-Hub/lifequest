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
      
      {/* Character Image */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img 
          src="/guy_image.jpg" 
          alt="Character Avatar"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with level badge */}
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
          <span className="text-white font-bold text-sm">MLQ</span>
        </div>
      </div>
    </div>
  )
}