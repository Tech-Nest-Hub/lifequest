import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ChartRadarDots } from "@/components/profile/radarcharts"

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Correct: use the destructured 'session' variable
  if (!session) {
    // Use Next.js redirect instead of script tag
    redirect("/sign-in")
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id }, // Use session.user.id
  })

  // Handle case where user doesn't exist in database
  if (!dbUser) {
    return (
      <div>
        <h1>User not found</h1>
        <p>Please contact support.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome {dbUser.username}</h1>
      <ChartRadarDots/>
      <p>Level: {dbUser.level}</p>
    </div>
  )
}