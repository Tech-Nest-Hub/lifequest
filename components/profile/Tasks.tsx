"use client"

import { useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"
import gsap from "gsap"
import { Button } from "../ui/button"

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
}

interface TasksProps {
  tasks: Task[]
  onTaskToggle: (id: string) => void
}

export function Tasks({ tasks, onTaskToggle }: TasksProps) {
  const tasksRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  
  useEffect(() => {
    if (!tasksRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tasksRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )

      // Stagger animation for task items
      const taskItems = tasksRef.current?.querySelectorAll(".task-item")
      if (taskItems && taskItems.length > 0) {
        gsap.fromTo(
          taskItems,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.6 }
        )
      }
    })

    return () => ctx.revert()
  }, [tasks])

  const completedTasks = tasks.filter((t) => t.completed).length

  return (
    <div className="relative">
      <div 
        ref={tasksRef} 
        className={`${
          expanded ? "max-h-[600px]" : "max-h-[250px]"
        } bg-linear-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm overflow-hidden transition-all duration-500`}
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-cyan-300 uppercase tracking-widest mb-2">Daily Quests</h2>
          <p className="text-sm text-cyan-200/50">
            {completedTasks} of {tasks.length} completed
          </p>
        </div>

        <div className="space-y-3 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="task-item flex items-start gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm transition-all duration-300 cursor-pointer group hover:border-cyan-500/40 hover:bg-cyan-500/10"
              onClick={() => onTaskToggle(task.id)}
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

        {/* linear fade for closed state */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-cyan-950/80 to-transparent pointer-events-none rounded-b-2xl" />
        )}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => setExpanded(!expanded)}
          variant="outline"
          className="border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/30 hover:text-cyan-200 transition-all duration-300"
        >
          {expanded ? "Show Less" : "Show All Quests"}
        </Button>
      </div>
    </div>
  )
}