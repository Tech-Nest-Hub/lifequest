import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`)

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("Exchange error:", error.message)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const user = data.session?.user
  if (!user?.email) {
    console.error("Missing email in OAuth response")
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const email = user.email
  const username = user.user_metadata.full_name ?? email.split("@")[0]

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!dbUser) {
    // 🆕 New user — create a base profile
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email,
        username,
        gender: "MALE", // default (can be updated during onboarding)
        age: null, // optional — user sets later
        stats: {
          strength: 5,
          agility: 5,
          intelligence: 5,
          luck: 5,
          endurance: 5,
        },
        skills: {},
        level: 0, // 0 = not started onboarding
        xp: 0,
        health: 100,
        energy: 100,
        money: 0,
      },
    })

    console.log("🆕 New user created — redirecting to onboarding")
    return NextResponse.redirect(`${origin}/onboarding`)
  }

  // ✅ Existing user — skip onboarding
  console.log("✅ Existing user found — redirecting to dashboard")
  return NextResponse.redirect(`${origin}/dashboard`)
}
