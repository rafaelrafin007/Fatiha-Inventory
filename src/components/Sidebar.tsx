 "use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import LanguageSelect from "@/components/LanguageSelect";
import T from "@/components/T";

const navItems = [
  { href: "/dashboard", key: "overview" as const },
  { href: "/dashboard/products", key: "products" as const },
  { href: "/dashboard/warehouses", key: "warehouses" as const },
  { href: "/dashboard/movements", key: "movements" as const },
  { href: "/dashboard/reports", key: "reports" as const },
  { href: "/dashboard/users", key: "users" as const },
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
          <div className="sidebar-logo sidebar-logo--full">
            <Image src="/fatiha.png" alt="Fatiha logo" width={120} height={120} />
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="sidebar-link">
              <T k={item.key} />
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div>
          <div className="subtle" style={{ fontSize: 12 }}>
            <T k="status" />
          </div>
          <div style={{ fontWeight: 600 }}>
            <T k="systemsHealthy" />
          </div>
        </div>
        <LanguageSelect />
        <button
          type="button"
          className="button"
          style={{ marginTop: 12, width: "100%" }}
          onClick={handleLogout}
        >
          <T k="logout" />
        </button>
      </div>
    </aside>
  );
}
