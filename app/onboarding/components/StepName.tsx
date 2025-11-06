interface StepNameProps {
  name: string
  setName: (val: string) => void
}

export default function StepName({ name, setName }: StepNameProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Choose Your Name</h1>
      <p>How shall the world know you?</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your character name"
        className="mt-4 p-2 border rounded"
      />
    </div>
  )
}
