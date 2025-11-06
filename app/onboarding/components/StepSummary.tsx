"use client"

import { Button } from "@/components/ui/button"

interface StepSummaryProps {
  name: string
  raceName: string
  className: string
  raceId: string
  classId: string
  onComplete: () => void
}

export function StepSummary({ name, raceName, className, raceId, classId, onComplete }: StepSummaryProps) {
  const handleComplete = async () => {
    await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, raceId, classId }),
    })
    onComplete()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Review your Character</h2>
      <p>Name: {name}</p>
      <p>Race: {raceName}</p>
      <p>Class: {className}</p>
      <Button onClick={handleComplete}>Start Adventure</Button>
    </div>
  )
}
