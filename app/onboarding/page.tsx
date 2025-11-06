"use client"

import { useState } from "react"
import StepClass from "./components/StepClass"
import StepName from "./components/StepName"
import StepRace from "./components/StepRace"
import StepSummary from "./components/StepSummary"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)

  // Keep track of selected options
  const [race, setRace] = useState<string | null>(null)
  const [subrace, setSubrace] = useState<string | null>(null)
  const [charClass, setCharClass] = useState<string | null>(null)
  const [name, setName] = useState<string>("")

  const nextStep = () => setStep((s) => Math.min(s + 1, 4))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {step === 1 && <StepRace race={race} setRace={setRace} subrace={subrace} setSubrace={setSubrace} />}
      {step === 2 && <StepClass charClass={charClass} setCharClass={setCharClass} />}
      {step === 3 && <StepName name={name} setName={setName} />}
      {step === 4 && <StepSummary race={race} subrace={subrace} charClass={charClass} name={name} />}

      <div className="flex gap-4 mt-6">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 4 && <button onClick={nextStep}>Next</button>}
        {step === 4 && <button>Confirm & Begin Journey</button>}
      </div>
    </div>
  )
}
