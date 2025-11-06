"use client"

import { useState } from "react"

interface StepSummaryProps {
  race: string | null
  subrace?: string | null
  charClass: string | null
  name: string
}

export default function StepSummary({ race, subrace, charClass, name }: StepSummaryProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!race || !charClass || !name) {
      setError("All fields are required")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raceId: race,
          classId: charClass,
          name,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      // ✅ Success — redirect to dashboard or main page
      window.location.href = "/dashboard"
    } catch (err) {
      console.error(err)
      setError("Failed to complete onboarding")
      setLoading(false)
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Your Character</h1>
      <p>Review your choices before beginning your adventure</p>

      <ul className="mt-4 space-y-2 text-left inline-block text-cyan-200">
        <li><strong>Name:</strong> {name || "-"}</li>
        <li><strong>Race:</strong> {race || "-"}</li>
        {subrace && <li><strong>Subrace:</strong> {subrace}</li>}
        <li><strong>Class:</strong> {charClass || "-"}</li>
      </ul>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded text-black font-semibold disabled:opacity-50"
      >
        {loading ? "Confirming..." : "Confirm & Begin Journey"}
      </button>
    </div>
  )
}
