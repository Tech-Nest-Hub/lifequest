import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

const AdminDashboard = async () => {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in"); // not logged in
  }

  // fetch user from DB to get role
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!dbUser || dbUser.role !== "ADMIN") {
    redirect("/unauthorized"); // not an admin
  }

  return (
    <div>
      <h1>Welcome, Admin {dbUser.username}</h1>
      {/* render admin panel components here */}
    </div>
  );
};

export default AdminDashboard;
