
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "./LoginForm"
import { getServerUser } from "@/utils/comps/getServerUser"
import { redirect } from "next/navigation"



export default async function LoginPage() {
  const user = await getServerUser(); // ✅ await here
  if (user) {
    return redirect("/dashboard"); // ✅ server-side redirect
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          My Life Quest
        </a>
        <LoginForm />
      </div>
    </div>
  )
}



