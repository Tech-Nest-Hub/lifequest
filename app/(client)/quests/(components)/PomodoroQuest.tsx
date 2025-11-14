"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Check, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PomodoroQuest() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setCompleted(true)
      setIsRunning(false)
    }

return () => {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current);
  }
}  }, [isRunning, timeLeft])

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
    setCompleted(false)
  }

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
          <Target className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Pomodoro Quest
        </h2>
      </div>

      {/* Timer Circle */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (progress * 283) / 100}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-cyan-300">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-cyan-400/70 text-sm mt-2">
            {completed ? "Completed! 🎉" : "Focus Time"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        {!completed ? (
          <>
            {!isRunning ? (
              <Button
                onClick={startTimer}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button
                onClick={pauseTimer}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button
              onClick={resetTimer}
              variant="outline"
              className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
            >
              Reset
            </Button>
          </>
        ) : (
          <Button
            onClick={resetTimer}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Start New Session
          </Button>
        )}
      </div>

      {/* Active Quest Link */}
      <div className="text-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
        <p className="text-cyan-300 text-sm mb-2">
          This session counts toward:
        </p>
        <p className="text-cyan-200 font-semibold">Learn New Skill Quest</p>
        <div className="flex justify-center gap-1 mt-3">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full ${
                num <= 2 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50"
                  : "bg-cyan-500/20 border border-cyan-500/30"
              }`}
            />
          ))}
        </div>
        <p className="text-cyan-400/70 text-xs mt-2">2/4 Pomodoros completed</p>
      </div>
    </div>
  )
}