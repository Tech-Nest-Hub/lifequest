"use client"

import Link from "next/link"
import { GamepadIcon, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export function Navbar() {

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 p-2">
            <GamepadIcon className="h-5 w-5 text-white" />
          </div>
          <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MyLifeQuest</span>
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm font-medium">
            How It Works
          </a>
          <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm font-medium">
            Community
          </a>
        </div>

        {/* Right Section - Auth Buttons + Floating Social Icons */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="floating-icon">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10  duration-300">
                <Twitter className="h-4 w-4 text-zinc-400 hover:text-cyan-400" />
              </div>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="floating-icon">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                <Facebook className="h-4 w-4 text-zinc-400 hover:text-cyan-400" />
              </div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="floating-icon">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                <Instagram className="h-4 w-4 text-zinc-400 hover:text-cyan-400" />
              </div>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="floating-icon">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                <Youtube className="h-4 w-4 text-zinc-400 hover:text-cyan-400" />
              </div>
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
            >
              Log In
            </Button>
            <Button className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
