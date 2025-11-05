import { ChartRadarDots } from "@/components/profile/radarcharts"
import prisma from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/sign-in")
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!dbUser) {
    return (
      <div>
        <h1>User not found</h1>
        <p>Please contact support.</p>
      </div>
    )
  }

  // Example fallback if stats are empty
  const stats = dbUser.stats
    ? (dbUser.stats as Record<string, number>)
    : { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {dbUser.username}!</h1>
      <p>Level {dbUser.level} • XP: {dbUser.xp}</p>
      <ChartRadarDots stats={stats} />
    </div>
  )
}
