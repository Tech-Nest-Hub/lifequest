"use client"

import { Gamepad2, Zap, Trophy } from "lucide-react"

const features = [
  {
    icon: Gamepad2,
    title: "Track Like An RPG",
    subtitle: "Progress Tracking",
    description:
      "Watch your character level up as you complete daily habits and achieve milestones. See your real-world progress transform into epic achievements.",
  },
  {
    icon: Zap,
    title: "Earn XP & Power Up",
    subtitle: "Experience System",
    description:
      "Every completed quest earns you experience points. Gain levels, unlock abilities, and master new skills in your personal journey.",
  },
  {
    icon: Trophy,
    title: "Conquer Real Quests",
    subtitle: "Quest Completion",
    description:
      "Transform daily tasks into epic quests. Earn achievements, collect loot, and watch your legend grow with every victory.",
  },
]

export function Features() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/5 backdrop-blur-sm">
              <p className="text-sm font-medium text-cyan-300 tracking-wide">Core Features</p>
            </div>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="text-white">Game-</span>
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Changing</span>
            <span className="text-white"> Features</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Everything you need to level up your real life</p>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-600/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
                <div className="relative border border-zinc-700/50 rounded-xl p-8 bg-zinc-900/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="mb-6">
                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-2">
                      {feature.subtitle}
                    </p>
                    <div className="inline-flex rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-600/20 p-3 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-colors">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-black text-white">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
