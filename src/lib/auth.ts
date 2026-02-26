import { supabaseServer } from "@/lib/supabaseServer";

export async function getUser() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function requireRole(_role: string) {
  const user = await getUser();
  if (!user) return null;

  // TODO: fetch roles from your `profiles` table.
  return user;
}
