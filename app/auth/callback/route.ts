import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  let next = searchParams.get("next") ?? "/"
  if (!next.startsWith("/")) next = "/"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Exchange error:", error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    const user = data.session?.user
    if (user) {
      // ✅ Ensure email exists
      const email = user.email
      if (!email) {
        console.error("No email returned from Supabase OAuth")
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      // ✅ Safe fallback for username
      const username =
        user.user_metadata.full_name ??
        email.split("@")[0] // use email prefix if full_name is missing
      const avatar_url = user.user_metadata.avatar_url ?? null

      try {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            email,
            username,
          },
          create: {
            id: user.id,
            email,
            username,
            // Optional: avatar_url if you added it to your model
            // avatar_url,
            level: 1,
            xp: 0,
            health: 100,
            energy: 100,
            money: 0,
            stats: {},  // if you want default JSON
            skills: {},
          },
        })
      } catch (err) {
        console.error("Error creating user in DB:", err)
      }
    }

    const forwardedHost = request.headers.get("x-forwarded-host")
    const isLocalEnv = process.env.NODE_ENV === "development"

    if (isLocalEnv) return NextResponse.redirect(`${origin}${next}`)
    else if (forwardedHost) return NextResponse.redirect(`https://${forwardedHost}${next}`)
    else return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
