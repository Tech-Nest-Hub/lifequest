import { NavbarLoggedIn } from '@/components/loggedin/NavbarLoggedIn'
import CharacterDashboard from '@/components/profile/character'
import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'

export const ProfilePage = async () => {
  // In your page component
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Get user from your database
  const dbUser = await prisma.user.findUnique({
    where: { id: session?.user.id },
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
    <div className="">
      <NavbarLoggedIn user={{
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        level: dbUser.level,
        health: dbUser.health,
        energy: dbUser.energy,
        money: dbUser.money,
        raceId: dbUser.raceId,
        classId: dbUser.classId
      }} />
      <CharacterDashboard />
    </div>

  )
}

export default ProfilePage