"use client"

import { useState } from "react"

import { StepSummary } from "./components/StepSummary"
import { useRouter } from "next/navigation"
import StepClass from "./components/StepClass"
import StepName from "./components/StepName"
import StepRace from "./components/StepRace"
import { Button } from "@/components/ui/button"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [raceId, setRaceId] = useState<string | null>(null)
  const [classId, setClassId] = useState<string | null>(null)
  const [name, setName] = useState("")

  const router = useRouter()

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  return (
    <div className="p-6 mx-auto space-y-6">
      {step === 1 && <StepRace selectedRace={raceId} onSelectRace={setRaceId} />}
      {step === 2 && <StepClass selectedClass={classId} onSelectClass={setClassId} />}
      {step === 3 && <StepName name={name} onChangeName={setName} />}
      {step === 4 && raceId && classId && (
        <StepSummary
          name={name}
          raceName={raceId} // can replace with race name from API if needed
          className={classId} // can replace with class name from API if needed
          raceId={raceId}
          classId={classId}
          onComplete={() => router.push("/dashboard")}
        />
      )}

      <div className="text-center gap-2 flex items-center justify-center">
        <center> {step > 1 &&  <Button
            onClick={prevStep}
            disabled={(step === 1 && !raceId)
              || (step === 2 && !classId) ||
              (step === 3 && !name)}
            variant="ghost"
            className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
          >Back</Button>}</center>
        <center>{step < 4 &&
          <Button
            onClick={nextStep}
            disabled={(step === 1 && !raceId)
              || (step === 2 && !classId) ||
              (step === 3 && !name)}
            variant="ghost"
            className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
          >
            Next
          </Button>
        }</center>
      </div>
    </div>
  )
}
