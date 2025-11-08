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

export default function CharacterDashboard() {
  const [character] = useState<Character>({
    raceId: "elf",
    subraceId: "high-elf",
    classId: "mage",
    level: 23,
    xp: 8450,
    stats: {
      physical: 330,
      mental: 290,
      emotional: 215,
      spiritual: 222,
      craft: 148,
    },
    health: 950,
    energy: 750,
    money: 1336,
  })

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Yoga + Flexibility", category: "Health", completed: true },
    { id: "2", title: "Discipline Template Theme + Aesthetics", category: "Learning", completed: true },
    { id: "3", title: "Morning Pages + Insights", category: "Mindfulness", completed: true },
    { id: "4", title: "Vision Board + Mindset", category: "Goals", completed: false },
    { id: "5", title: "Meditation + Inner Peace", category: "Health", completed: false },
    { id: "6", title: "Guild Meeting Agenda + Contribution", category: "Work", completed: false },
    { id: "7", title: "Artist's Exercise + Cultivation", category: "Creative", completed: false },
    { id: "8", title: "Create Gamification Data dashboard + Concentration", category: "Tech", completed: false },
    { id: "9", title: "Tray room, take out trash + Environment", category: "Home", completed: false },
    { id: "10", title: "Practice Script + Resilience", category: "Learning", completed: false },
    { id: "11", title: "Prep Chicken", category: "Food", completed: false },
    { id: "12", title: "Take Colleges, Nourish + Nutrition", category: "Health", completed: false },
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2000ms' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4000ms' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-8xl mx-auto relative z-10">
        {/* LEFT PANEL - Character Stats */}
        <div ref={statsRef} className="space-y-6">
          <LevelCard character={character} />

          <CharacterAvatar
            raceId={character.raceId}
            subraceId={character.subraceId}
            classId={character.classId}
          />

          {/* Stats Component */}
          <div className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Character Info</span>
            </div>

            {/* Character Info */}
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

        {/* CENTER PANEL - Quest Progress */}
        <div className="flex flex-col gap-5">
          <ChartRadarDots stats={character.stats}/>
          <QuestProgress
            completedTasks={completedTasks}
            totalTasks={tasks.length}
          />

          <ChartAreaInteractive />
        </div>

        {/* RIGHT PANEL - Tasks */}
        <Tasks
          tasks={tasks}
          onTaskToggle={toggleTask}
        />
      </div>
    </div>
  )
}