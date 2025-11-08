"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Sparkles, Zap, Shield, Heart } from "lucide-react"

interface Race {
  id: string
  name: string
  description: string | null
  icon: string
}

interface StepRaceProps {
  selectedRace: string | null
  onSelectRace: (raceId: string) => void
}

const RaceIcon = ({ raceId, isSelected }: { raceId: string; isSelected: boolean }) => {
  const iconProps = {
    className: `h-6 w-6 ${isSelected ? "text-cyan-400" : "text-cyan-400/70 group-hover:text-cyan-400"}`
  }

  switch (raceId) {
    case "human":
      return <Sparkles {...iconProps} />
    case "elf":
      return <Zap {...iconProps} />
    case "dwarf":
      return <Shield {...iconProps} />
    case "halfling":
      return <Heart {...iconProps} />
    default:
      return <Sparkles {...iconProps} />
  }
}

export default function StepRace({ selectedRace, onSelectRace }: StepRaceProps) {
  const [races, setRaces] = useState<Race[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRaces() {
      try {
        const res = await fetch("/api/races")
        const data = await res.json()
        console.log("Fetched races:", data)
        setRaces(data)
      } catch (error) {
        console.error("Failed to fetch races:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRaces()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-cyan-300/70">Loading races...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Choose Your Race
        </h2>
        <p className="text-cyan-200/70 max-w-md mx-auto">
          Your race defines your innate abilities and strengths. Choose wisely, adventurer.
        </p>
      </div>

      {/* Race Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {races.map((race) => {
          const isSelected = selectedRace === race.id

          return (
            <div
              key={race.id}
              className={`relative p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 cursor-pointer group flex flex-col items-center text-center ${
                isSelected
                  ? "border-cyan-500 bg-linear-to-br from-cyan-500/20 to-blue-500/20 shadow-2xl shadow-cyan-500/20 scale-105"
                  : "border-cyan-500/30 bg-linear-to-br from-cyan-500/10 to-blue-500/10 hover:border-cyan-500/50 hover:scale-102"
              }`}
              onClick={() => onSelectRace(race.id)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-4 w-4 text-white" />
                </div>
              )}

              {/* Race Image Container */}
              <div className="w-48 h-48 mb-4 flex items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 overflow-hidden">
                {/* Placeholder for your image - replace with actual image */}
                <div className="text-cyan-400/40 text-sm">
                  {race.icon} Image
                </div>
                {/* When you have images, use this:
                <img 
                  src={`/images/races/${race.icon}.png`} 
                  alt={race.name}
                  className="w-full h-full object-cover"
                />
                */}
              </div>

              {/* Race Name */}
              <h3 className={`text-xl font-bold mb-2 transition-colors ${
                isSelected ? "text-cyan-300" : "text-cyan-200 group-hover:text-cyan-300"
              }`}>
                {race.name}
              </h3>

              {/* Description */}
              <p className="text-cyan-200/70 text-sm leading-relaxed flex-1">
                {race.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          )
        })}
      </div>

      {/* Selection Helper */}
      {selectedRace && (
        <div className="text-center animate-in fade-in duration-500">
          <p className="text-cyan-400 font-semibold">
            Selected: {races.find(r => r.id === selectedRace)?.name}
          </p>
          <p className="text-sm text-cyan-400/60 mt-1">
            Ready to continue your journey
          </p>
        </div>
      )}
    </div>
  )
}


// {/* Race Image Container */}
// <div className="w-48 h-48 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 overflow-hidden">
//   <img 
//     src={`/images/races/${race.icon}.png`} 
//     alt={race.name}
//     className="w-full h-full object-cover"
//   />
// </div>