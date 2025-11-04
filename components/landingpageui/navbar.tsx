"use client"

import Link from "next/link"
import { GamepadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 p-2">
            <GamepadIcon className="h-5 w-5 text-white" />
          </div>
          <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MyLifeQuest</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-zinc-400 hover:text-white border border-zinc-700/50 hover:border-zinc-600"
          >
            Log In
          </Button>
          <Button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  )
}
