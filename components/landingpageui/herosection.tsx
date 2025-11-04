"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 top-0 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl animate-pulse" />
        <div className="absolute -right-1/2 -bottom-1/2 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 hover:bg-cyan-500/20 transition-colors">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Welcome to the Metagame Layer</span>
          </div>

          {/* Main heading with split text styling */}
          <h1 className="mb-6 text-6xl sm:text-7xl lg:text-8xl font-black leading-tight tracking-tighter">
            <span className="block text-white">GAMIFY YOUR</span>
            <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              LIFE
            </span>
          </h1>

          {/* Tagline */}
          <p className="mb-8 text-xl sm:text-2xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Turn your daily goals into quests. Level up your real life.
          </p>

          <p className="mb-12 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Enter the Metagame Layer. Unleash the Play Economy. Transform everyday activities into an epic RPG
            adventure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8"
              >
                START YOUR JOURNEY
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              className="w-full sm:w-auto border border-zinc-600/50 bg-transparent hover:bg-zinc-900/50 text-white font-semibold px-8"
            >
              WATCH TRAILER
            </Button>
          </div>
        </div>

        {/* Animated hero image placeholder */}
        <div className="mt-16 relative aspect-video rounded-2xl overflow-hidden border border-zinc-700/50 bg-linear-to-br from-cyan-900/30 via-transparent to-blue-900/30 backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-600/10 to-blue-600/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <p className="text-zinc-400">Your Adventure Starts Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
