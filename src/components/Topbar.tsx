import { getProfile, getUser } from "@/lib/auth";

export default async function Topbar() {
  const [user, profile] = await Promise.all([getUser(), getProfile()]);
  const displayName =
    profile?.full_name || user?.email?.split("@")[0] || "User";
  const email = user?.email ?? "";

  return (
    <header className="topbar">
      <div>
        <div className="subtle" style={{ fontSize: 12, letterSpacing: 1 }}>
          INVENTORY CONTROL
        </div>
        <div className="page-title">Dashboard</div>
      </div>
      <div className="topbar-actions">
        <input className="input" placeholder="Search products or SKU" />
        <div className="topbar-user">
          <div className="topbar-avatar">FA</div>
          <div>
            <div style={{ fontWeight: 600 }}>{displayName}</div>
            <div className="subtle" style={{ fontSize: 12 }}>
              {email || " "}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
