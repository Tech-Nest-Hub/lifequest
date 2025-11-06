"use client"

import { useState } from "react"

import { StepSummary } from "./components/StepSummary"
import { useRouter } from "next/navigation"
import StepClass from "./components/StepClass"
import StepName from "./components/StepName"
import StepRace from "./components/StepRace"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [raceId, setRaceId] = useState<string | null>(null)
  const [classId, setClassId] = useState<string | null>(null)
  const [name, setName] = useState("")

  const router = useRouter()

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
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

      <div className="flex justify-between">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 4 && <button onClick={nextStep} disabled={(step === 1 && !raceId) || (step === 2 && !classId) || (step === 3 && !name)}>Next</button>}
      </div>
    </div>
  )
}
