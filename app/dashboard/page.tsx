import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma"

export default async function Dashboard() {
  const supabase = createClient(cookies())
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    // redirect to sign-in if no session
    return (
      <script>
        {`window.location.href = "/auth/sign-in"`}
      </script>
    )
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: data.session.user.id },
  })

  return (
    <div>
      <h1>Welcome {dbUser?.username}</h1>
      <p>Level: {dbUser?.level}</p>
    </div>
  )
}
