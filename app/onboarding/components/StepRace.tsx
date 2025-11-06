"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Race {
  id: string
  name: string
}

interface StepRaceProps {
  selectedRace: string | null
  onSelectRace: (raceId: string) => void
}

export function StepRace({ selectedRace, onSelectRace }: StepRaceProps) {
  const [races, setRaces] = useState<Race[]>([])

  useEffect(() => {
    async function fetchRaces() {
      const res = await fetch("/api/races")
      const data = await res.json()
      setRaces(data)
    }
    fetchRaces()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Choose your Race</h2>
      <div className="grid grid-cols-2 gap-4">
        {races.map((race) => (
          <Button
            key={race.id}
            variant={selectedRace === race.id ? "default" : "outline"}
            onClick={() => onSelectRace(race.id)}
          >
            {race.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
