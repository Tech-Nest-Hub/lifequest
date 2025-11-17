"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import StepRace from "./components/StepRace"
import StepClass from "./components/StepClass"
import StepName from "./components/StepName"
import { StepSummary } from "./components/StepSummary"
import { Button } from "@/components/ui/button"
import StepAge from "./components/StepAge"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)

  // race
  const [raceId, setRaceId] = useState<string | null>(null)
  const [raceName, setRaceName] = useState<string | null>(null)

  // class
  const [classId, setClassId] = useState<string | null>(null)
  const [className, setClassName] = useState<string | null>(null)
  const [age, setAge] = useState<number | null>(0)

  // name
  const [name, setName] = useState("")

  const router = useRouter()

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  return (
    <div className="p-6 mx-auto space-y-6 max-w-5xl">
      {step === 1 && (
        <StepRace
          selectedRace={raceId}
          onSelectRace={(id, name) => {
            setRaceId(id)
            setRaceName(name)
          }}
        />
      )}

      {step === 2 && (
        <StepClass
          selectedClass={classId}
          onSelectClass={(id, name) => {
            setClassId(id)
            setClassName(name)
          }}
        />
      )}

      {step === 3 && (
        <StepName
          name={name}
          onChangeName={setName}
        />
      )}
{step === 4 && (
  <StepAge
    {...({ age: age as number, onChangeAge: (value: any) => setAge(value) } as any)}
  />
)}

      {step === 5 && raceId && classId && (
        <StepSummary
          name={name}
          raceName={raceName || raceId}
          className={className || classId}
          raceId={raceId}
          classId={classId}
          onComplete={() => router.push("/dashboard")}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-3">
        {step > 1 && (
          <Button
            onClick={prevStep}
            variant="ghost"
            className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
          >
            Back
          </Button>
        )}

        {step < 4 && (
          <Button
            onClick={nextStep}
            disabled={
              (step === 1 && !raceId) ||
              (step === 2 && !classId) ||
              (step === 3 && !name)
            }
            variant="ghost"
            className="text-zinc-400 hover:text-cyan-500 border border-zinc-700/50 hover:border-cyan-600"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
