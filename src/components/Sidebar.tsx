"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import LanguageSelect from "@/components/LanguageSelect";
import T from "@/components/T";
import { useSidebar } from "@/components/SidebarProvider";

const navItems = [
  { href: "/dashboard", key: "overview" as const },
  { href: "/dashboard/products", key: "products" as const },
  { href: "/dashboard/purchases", key: "purchases" as const },
  { href: "/dashboard/sales", key: "sales" as const },
  { href: "/dashboard/stock", key: "stock" as const },
  { href: "/dashboard/warehouses", key: "warehouses" as const },
  { href: "/dashboard/movements", key: "movements" as const },
  { href: "/dashboard/expenses", key: "expenses" as const },
  { href: "/dashboard/reports", key: "reports" as const },
  { href: "/dashboard/users", key: "users" as const },
];

export default function Sidebar() {
  const router = useRouter();
  const { isOpen, close } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "is-open" : ""}`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar-inner">
          <div className="sidebar-brand sidebar-brand--sticky">
            <div className="sidebar-logo sidebar-logo--full">
              <Image src="/fatiha.png" alt="Fatiha logo" width={120} height={120} />
            </div>
          </div>

          <div className="sidebar-scroll">
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="sidebar-link"
                  onClick={close}
                >
                  <T k={item.key} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="sidebar-footer">
            <button
              type="button"
              className="sidebar-settings-button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              aria-expanded={settingsOpen}
            >
              <T k="settings" />
            </button>
            <div className={`sidebar-settings ${settingsOpen ? "is-open" : ""}`}>
              <div>
                <div className="subtle" style={{ fontSize: 12 }}>
                  <T k="status" />
                </div>
                <div style={{ fontWeight: 600 }}>
                  <T k="systemsHealthy" />
                </div>
              </div>
              <LanguageSelect />
            </div>
            <button
              type="button"
              className="button"
              style={{ marginTop: 6, width: "100%" }}
              onClick={handleLogout}
            >
              <T k="logout" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
