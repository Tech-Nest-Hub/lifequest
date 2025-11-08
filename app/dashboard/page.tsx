import { NavbarLoggedIn } from "@/components/loggedin/NavbarLoggedIn"
import CharacterDashboard from "@/components/profile/character"
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
    include: {
      race: true,
      class: true,
    }
  })

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
      <NavbarLoggedIn user={{
             id: dbUser.id,
             username: dbUser.username,
             email: dbUser.email,
             level: dbUser.level,
             health: dbUser.health,
             energy: dbUser.energy,
             money: dbUser.money,
             race: dbUser.race?.name ?? "No Race",
             class : dbUser.class?.name ?? "No Class",
           }} />
      <CharacterDashboard />
    </div>
  )
}
