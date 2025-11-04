// lib/supabase/getServerUser.ts
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export async function getServerUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;
  return data.user;
}
