import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // When user visits /admin, redirect to /admin/dashboard
  redirect("/admin/dashboard");
}
