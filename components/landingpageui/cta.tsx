"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="text-white">Ready to </span>
          <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Level Up</span>
          <span className="text-white">?</span>
        </h2>

        <p className="text-lg sm:text-xl text-zinc-300 mb-8 leading-relaxed">
          Join thousands of players already transforming their lives into epic adventures. Your journey to greatness
          starts now.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-in">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8"
            >
              BEGIN YOUR QUEST
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
