"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface StepNameProps {
  name: string
  onChangeName: (name: string) => void
}

export function StepName({ name, onChangeName }: StepNameProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Choose your Character Name</h2>
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
      />
    </div>
  )
}
