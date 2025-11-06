interface StepClassProps {
  charClass: string | null
  setCharClass: (val: string) => void
}

export default function StepClass({ charClass, setCharClass }: StepClassProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Choose Your Class</h1>
      <p>Pick a class to define your abilities</p>
      {/* Static placeholder */}
      <div className="mt-4 space-y-2">
        <button onClick={() => setCharClass("Fighter")}>Fighter</button>
        <button onClick={() => setCharClass("Rogue")}>Rogue</button>
        <button onClick={() => setCharClass("Cleric")}>Cleric</button>
        <button onClick={() => setCharClass("Wizard")}>Wizard</button>
      </div>
    </div>
  )
}
