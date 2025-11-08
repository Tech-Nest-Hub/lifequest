"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { GamepadIcon, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Fetch current user session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null)
    })

    // Realtime auth state listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <div className="rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 p-2">
            <GamepadIcon className="h-5 w-5 text-white" />
          </div>
          <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            MyLifeQuest
          </span>
        </Link>

        {/* Center Nav (Desktop Only) */}
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

        {/* Right Section */}
        <div className="flex items-center gap-8">
          {/* Socials */}
          <div className="hidden lg:flex items-center gap-4">
            {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="floating-icon w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-zinc-400 hover:text-cyan-400" />
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="ghost"
                  className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/sign-in")}
                  variant="ghost"
                  className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => router.push("/sign-in")}
                  className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
