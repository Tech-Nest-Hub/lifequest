"use client"

import { useState, useRef, useEffect } from "react"
import { TrendingUp } from "lucide-react"
import gsap from "gsap"
import { LevelCard } from "./LevelCard"
import { CharacterAvatar } from "./CharacterAvatar"
import { QuestProgress } from "./QuestProgress"
import { Resources } from "./Resources"
import { Tasks } from "./Tasks"
import { ChartAreaInteractive } from "./AreaChart"
import { ChartRadarDots } from "./radarcharts"

interface Character {
  id: string
  raceId: string | null
  subraceId: string | null
  classId: string | null
  level: number
  xp: number
  stats: {
    physical: number
    mental: number
    emotional: number
    spiritual: number
    craft: number
  }
  health: number
  energy: number
  money: number
}

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
}

interface CharacterDashboardProps {
  characterData: Character
}

export default function CharacterDashboard({ characterData }: CharacterDashboardProps) {
  const [character] = useState<Character>(characterData)

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Yoga + Flexibility", category: "Health", completed: true },
    { id: "2", title: "Discipline Template Theme + Aesthetics", category: "Learning", completed: true },
    { id: "3", title: "Morning Pages + Insights", category: "Mindfulness", completed: true },
    { id: "4", title: "Vision Board + Mindset", category: "Goals", completed: false },
    { id: "5", title: "Meditation + Inner Peace", category: "Health", completed: false },
  ])

  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedTasks = tasks.filter((t) => t.completed).length

  return (
    <div ref={containerRef} className="min-h-screen bg-black p-6">
      {/* bg visuals omitted for brevity */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-8xl mx-auto relative z-10">
        {/* LEFT PANEL */}
        <div ref={statsRef} className="space-y-6">
          <LevelCard character={character} />

          <CharacterAvatar
            raceId={character.raceId}
            subraceId={character.subraceId}
            classId={character.classId}
          />

          <div className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Character Info</span>
            </div>

            <div className="space-y-2 text-sm mb-6 font-medium text-cyan-200/80">
              <div className="flex justify-between">
                <span>Race:</span>
                <span className="text-cyan-400 capitalize">{character.raceId}</span>
              </div>
              <div className="flex justify-between">
                <span>Subrace:</span>
                <span className="text-cyan-400 capitalize">{character.subraceId}</span>
              </div>
              <div className="flex justify-between">
                <span>Class:</span>
                <span className="text-cyan-400 capitalize">{character.classId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="flex flex-col gap-5">
          <ChartRadarDots stats={character.stats} />
          <QuestProgress completedTasks={completedTasks} totalTasks={tasks.length} />
          <ChartAreaInteractive />
        </div>

        {/* RIGHT PANEL */}
        <Tasks tasks={tasks} onTaskToggle={toggleTask} />
      </div>
    </div>
  )
}
