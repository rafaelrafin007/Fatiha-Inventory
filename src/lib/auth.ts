import { supabaseServer } from "@/lib/supabaseServer";

export type UserRole = "admin" | "manager" | "viewer";

export async function getUser() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function getProfile() {
  const user = await getUser();
  if (!user) return null;

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data as { id: string; role: UserRole; full_name: string | null };
}

export async function requireRole(role: UserRole) {
  const profile = await getProfile();
  if (!profile) return null;
  if (profile.role !== role) return null;
  return profile;
}
