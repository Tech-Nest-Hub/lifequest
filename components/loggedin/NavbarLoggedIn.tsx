"use client"

import Link from "next/link"
import { GamepadIcon, Coins, Heart, Zap, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface UserData {
  id: string
  username: string
  email: string
  level: number
  health: number
  energy: number
  money: number
  race: String | null
  class: String | null
}

interface NavbarLoggedInProps {
  user: UserData
}

export function NavbarLoggedIn({ user }: NavbarLoggedInProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 p-2 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-shadow">
              <GamepadIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
                MyLifeQuest
              </span>
              <span className="text-xs text-cyan-400/60 -mt-1">Level Up Your Life</span>
            </div>
          </Link>

          {/* Center Stats */}
          <div className="hidden md:flex items-center gap-6">
            {/* Level Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-cyan-300">LV {user.level}</span>
            </div>

            {/* Resources */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-cyan-200">{user.health}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-200">{user.energy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-cyan-200">{user.money}g</span>
              </div>
            </div>
          </div>

          {/* Right Section - User Profile */}
          <div className="flex items-center gap-4">
            {/* Quick Stats for Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-cyan-300 font-bold">
                <span>LV</span>
                <span>{user.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-cyan-200">{user.money}</span>
              </div>
            </div>

            {/* User Avatar & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 rounded-xl bg-linear-to-r from-cyan-500/10 to-blue-500/10 px-4 py-2 border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                {/* Avatar */}
                <div className="h-8 w-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-white">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                
                {/* User Info */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-cyan-200 leading-none">
                    {user.username || 'Adventurer'}
                  </p>
                  <p className="text-xs text-cyan-400/70 leading-none mt-1">
                    {user.race && user.class ? `${user.race} ${user.class}` : 'New Adventurer'}
                  </p>
                </div>
                
                <ChevronDown 
                  className={`h-4 w-4 text-cyan-400 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-linear-to-br from-cyan-900/90 to-blue-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 overflow-hidden animate-in fade-in-80">
                  {/* User Summary */}
                  <div className="p-4 border-b border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-white">
                          {user.username?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-cyan-200 truncate">
                          {user.username || 'Adventurer'}
                        </p>
                        <p className="text-xs text-cyan-400/70 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cyan-300">Level {user.level}</span>
                      <span className="text-cyan-400/70">{user.race} {user.class}</span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-cyan-200 hover:bg-cyan-500/20 transition-all duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-cyan-200 hover:bg-cyan-500/20 transition-all duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="p-2 border-t border-cyan-500/20">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-200 hover:bg-red-500/20 transition-all duration-200 group"
                    >
                      <LogOut className="h-4 w-4 text-red-400" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}