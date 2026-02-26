 "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/warehouses", label: "Warehouses" },
  { href: "/dashboard/movements", label: "Movements" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/users", label: "Users" },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="sidebar-logo">FI</div>
          <div>
            <div style={{ fontWeight: 600 }}>Fatiha Inventory</div>
            <div className="subtle" style={{ fontSize: 12 }}>
              Ops Console
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="sidebar-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div>
          <div className="subtle" style={{ fontSize: 12 }}>
            Status
          </div>
          <div style={{ fontWeight: 600 }}>All systems healthy</div>
        </div>
        <button
          type="button"
          className="button"
          style={{ marginTop: 12, width: "100%" }}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
