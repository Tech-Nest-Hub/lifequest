"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Class {
  id: string
  name: string
}

interface StepClassProps {
  selectedClass: string | null
  onSelectClass: (classId: string) => void
}

export function StepClass({ selectedClass, onSelectClass }: StepClassProps) {
  const [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    async function fetchClasses() {
      const res = await fetch("/api/classes")
      const data = await res.json()
      setClasses(data)
    }
    fetchClasses()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Choose your Class</h2>
      <div className="grid grid-cols-2 gap-4">
        {classes.map((cls) => (
          <Button
            key={cls.id}
            variant={selectedClass === cls.id ? "default" : "outline"}
            onClick={() => onSelectClass(cls.id)}
          >
            {cls.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
