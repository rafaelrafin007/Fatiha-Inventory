import { getProfile, getUser } from "@/lib/auth";
import TopbarClient from "@/components/TopbarClient";

export default async function Topbar() {
  const [user, profile] = await Promise.all([getUser(), getProfile()]);
  const displayName =
    profile?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email ?? "";

  return <TopbarClient displayName={displayName} email={email} />;
}
