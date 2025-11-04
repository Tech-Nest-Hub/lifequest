"use client"

import { Plus, Zap, Crown } from "lucide-react"

const steps = [
  {
    icon: Plus,
    number: "01",
    title: "Create Character",
    description:
      "Sign up and create your unique character. Choose your name, class, and starting stats to begin your adventure.",
    color: "from-cyan-500/20 to-cyan-600/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Zap,
    number: "02",
    title: "Add Quests",
    description:
      "Define your daily habits and goals as quests. Set difficulty levels and XP rewards for each challenge.",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Crown,
    number: "03",
    title: "Level Up",
    description:
      "Complete quests, earn XP, and watch yourself level up. Track your real-world progress and achievements.",
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
]

export function HowItWorks() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Getting Started</p>
          <h2 className="text-5xl sm:text-6xl font-black mb-4">
            <span className="text-white">How It </span>
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-zinc-400 text-lg">Three steps to your epic adventure</p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div
                  className={`relative border ${step.borderColor} rounded-xl p-8 bg-linear-to-br ${step.color} backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 group hover:-translate-y-1`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="inline-flex rounded-lg bg-black/40 p-3">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <span className="text-4xl font-black text-zinc-700 group-hover:text-zinc-600">{step.number}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-black text-white">{step.title}</h3>
                  <p className="text-zinc-300 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-linear-to-r from-cyan-500 to-transparent md:block" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
