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
      <div className="grid grid-cols-3">
    <section id="mylifeqest-profile-image" className="">
      <h2 className="text-lg font-medium mb-2">Your Stats</h2>
    </section>
    <section id="mylifeqest-radar-chart" className="col-span-1">
      <ChartRadarDots stats={stats} />
    </section>
      </div>
    </div>
  )
}
