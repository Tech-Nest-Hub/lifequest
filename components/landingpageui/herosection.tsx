"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Stagger animations for content
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0
      )

      // Title words animation
      const titleWords = titleRef.current?.querySelectorAll(".title-word")
      if (titleWords && titleWords.length > 0) {
        tl.fromTo(
          titleWords,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out" },
          0.2
        )
      }

      // Visual element slide and scale
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.8, x: 50 },
          { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: "power3.out" },
          0.3
        )
      }

      // CTA buttons
      const ctaElements = ctaRef.current?.querySelectorAll("a, button")
      if (ctaElements && ctaElements.length > 0) {
        tl.fromTo(
          ctaElements,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          0.5
        )
      }

      // Floating animation for visual element
      if (visualRef.current) {
        gsap.to(visualRef.current, {
          y: 30,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        // Mouse move parallax effect
        const handleMouseMove = (e: MouseEvent) => {
          const x = ((e.clientX / window.innerWidth) - 0.5) * 20
          const y = ((e.clientY / window.innerHeight) - 0.5) * 20
          gsap.to(visualRef.current, { x, y, duration: 0.5, ease: "power1.out" })
        }

        document.addEventListener("mousemove", handleMouseMove)

        // Cleanup event listener
        return () => {
          document.removeEventListener("mousemove", handleMouseMove)
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2000ms' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '4000ms' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="z-10">
            <div className="mb-8 inline-block">
              <div className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/5 backdrop-blur-sm">
                <p className="text-sm font-medium text-cyan-300 tracking-wide">THE FUTURE OF GAMING</p>
              </div>
            </div>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tighter"
            >
              <span className="title-word block text-white">GAMIFY YOUR</span>
              <span className="title-word inline-block bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                LIFE
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 mb-6 max-w-md font-light leading-relaxed">
              Transform your daily goals into epic quests. Level up your real life while competing with players
              worldwide.
            </p>

            <p className="text-sm text-zinc-400 mb-8 max-w-md">
              Join thousands of players in the metagame layer. Earn XP, unlock achievements, and rise through the ranks.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-base px-8 py-6 rounded-lg gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  START QUEST
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                className="w-full sm:w-auto border-2 border-zinc-600 hover:border-cyan-500/50 bg-zinc-900/50 hover:bg-zinc-900 text-white font-bold text-base px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                WATCH INTRO
              </Button>
            </div>
          </div>

          {/* Right Visual Element */}
          <div ref={visualRef} className="relative h-96 lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-lg mx-auto">
              {/* Glowing card background */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-900/40 via-transparent to-blue-900/40 backdrop-blur-sm border border-cyan-500/20" />

                {/* Animated grid */}
                <div className="absolute inset-0 opacity-30">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-linear(rgba(0,217,255,0.05) 1px, transparent 1px),
                        linear-linear(90deg, rgba(0,217,255,0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                </div>

                {/* Animated corners */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/40" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/40" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/40" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/40" />

                {/* Main content */}
                <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-8">
                  {/* Character level display */}
                  <div className="text-center space-y-4">
                    <div className="text-7xl sm:text-8xl font-black">
                      <span className="text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text">
                        LV
                      </span>
                      <span className="text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text">
                        1
                      </span>
                    </div>
                    <p className="text-cyan-300 font-bold tracking-widest">YOUR ADVENTURE BEGINS</p>
                  </div>

                  {/* XP Bar */}
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>EXPERIENCE</span>
                      <span>0/1000</span>
                    </div>
                    <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                      <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 rounded-full" />
                    </div>
                  </div>

                  {/* Stats display */}
                  <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                      <div className="text-xs text-zinc-400 mb-1">STRENGTH</div>
                      <div className="text-2xl font-bold text-cyan-400">10</div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                      <div className="text-xs text-zinc-400 mb-1">AGILITY</div>
                      <div className="text-2xl font-bold text-cyan-400">12</div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                      <div className="text-xs text-zinc-400 mb-1">WISDOM</div>
                      <div className="text-2xl font-bold text-cyan-400">14</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-cyan-600/20 to-blue-600/20 blur-2xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}