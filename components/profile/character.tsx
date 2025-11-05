"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Zap, Heart, Coins, TrendingUp } from "lucide-react"
import gsap from "gsap"

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
  const tasksRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate stats panel
      tl.fromTo(
        statsRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0
      )

      // Animate center panel
      tl.fromTo(
        centerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        0.2
      )

      // Animate tasks panel
      tl.fromTo(
        tasksRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0.4
      )

      // Stagger animation for task items
      const taskItems = tasksRef.current?.querySelectorAll(".task-item")
      if (taskItems && taskItems.length > 0) {
        tl.fromTo(
          taskItems,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" },
          0.6
        )
      }

      // Floating animation for center panel
      gsap.to(centerRef.current, {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const maxXP = 10000
  const xpPercent = (character.xp / maxXP) * 100
  const completedTasks = tasks.filter((t) => t.completed).length
  const completionPercent = (completedTasks / tasks.length) * 100

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative z-10">
        {/* LEFT PANEL - Character Stats */}
        <div ref={statsRef} className="space-y-6">
          {/* Level Card */}
          <div className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/40" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
                Level {character.level}
              </span>
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

            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-300/80">{character.xp.toLocaleString()} XP</span>
                <span className="text-blue-300/80">{maxXP.toLocaleString()} XP</span>
              </div>
              <div className="w-full h-3 bg-zinc-800/50 rounded-full overflow-hidden border border-cyan-500/20">
                <div
                  className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Character Avatar */}
          <div className="relative bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl overflow-hidden h-64 flex items-center justify-center backdrop-blur-sm">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">LV</span>
              </div>
              <p className="text-sm text-cyan-300/60">High Elf Mage</p>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm space-y-4">
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
                  <span className="text-cyan-200/70">{character.health}</span>
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
                  <span className="text-cyan-200/70">{character.energy}</span>
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
                  <span className="text-cyan-200/70">{character.money}g</span>
                </div>
                <div className="w-full h-2 bg-zinc-800/50 rounded-full overflow-hidden border border-yellow-500/20">
                  <div className="h-full w-full bg-linear-to-r from-yellow-500 to-yellow-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Core Stats</span>
            </div>
            
            <div className="space-y-3">
              {Object.entries(character.stats).map(([stat, value]) => (
                <div key={stat} className="flex items-center justify-between">
                  <span className="text-sm text-cyan-200/80 capitalize">{stat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-zinc-800/50 rounded-full overflow-hidden border border-cyan-500/20">
                      <div 
                        className="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${(value / 400) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-cyan-400 w-8 text-right">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER PANEL - Quest Progress */}
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
              {tasks.length - completedTasks} quests remaining today
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Tasks */}
        <div ref={tasksRef} className="bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm overflow-hidden">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-widest mb-2">Daily Quests</h2>
            <p className="text-sm text-cyan-200/50">
              Complete quests to earn XP and level up your character
            </p>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="task-item flex items-start gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm transition-all duration-300 cursor-pointer group hover:border-cyan-500/40 hover:bg-cyan-500/10"
                onClick={() => toggleTask(task.id)}
              >
                {/* Checkbox */}
                <div
                  className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                    task.completed
                      ? "bg-linear-to-br from-cyan-500 to-blue-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/50"
                      : "border-cyan-400/40 group-hover:border-cyan-400/70 bg-black/20"
                  }`}
                >
                  {task.completed && <Check size={14} className="font-bold" />}
                </div>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium leading-snug transition-all duration-300 ${
                      task.completed 
                        ? "text-cyan-300/50 line-through" 
                        : "text-cyan-200 group-hover:text-cyan-100"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-2 h-2 bg-cyan-400/60 rounded-full"></div>
                    <p className="text-xs text-cyan-300/50">{task.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}