interface StepRaceProps {
  race: string | null
  setRace: (val: string) => void
  subrace: string | null
  setSubrace: (val: string) => void
}

export default function StepRace({ race, setRace, subrace, setSubrace }: StepRaceProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Choose Your Race</h1>
      <p>Pick a race to start your journey</p>
      {/* Static placeholder */}
      <div className="mt-4 space-y-2">
        <button onClick={() => setRace("Elf")}>Elf</button>
        <button onClick={() => setRace("Dwarf")}>Dwarf</button>
        <button onClick={() => setRace("Human")}>Human</button>
        <button onClick={() => setRace("Halfling")}>Halfling</button>
      </div>
    </div>
  )
}
