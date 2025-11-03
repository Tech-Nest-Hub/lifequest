import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  let next = searchParams.get("next") ?? "/"
  if (!next.startsWith("/")) next = "/"

  if (code) {
    const supabase = createClient(cookies())
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Exchange error:", error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    const user = data.session?.user
    if (user) {
      try {
        // ✅ Upsert user record in your Prisma user table
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            email: user.email,
            username: user.user_metadata.full_name ?? null,
          },
          create: {
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name ?? null,
            avatar_url: user.user_metadata.avatar_url ?? null,
            // you can also set defaults for your game here:
            level: 1,
            xp: 0,
            health: 100,
            energy: 100,
            money: 0,
          },
        })
      } catch (err) {
        console.error("Error creating user in DB:", err)
      }
    }

    // ✅ Redirect user back to app after creating profile
    const forwardedHost = request.headers.get("x-forwarded-host")
    const isLocalEnv = process.env.NODE_ENV === "development"

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${next}`)
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`)
    } else {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
