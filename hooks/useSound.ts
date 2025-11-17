"use client"

import { useRef, useCallback } from "react"

export default function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    // lazily create audio instance only when first used
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
    }

    const audio = audioRef.current
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [src])

  return play
}



