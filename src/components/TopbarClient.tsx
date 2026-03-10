"use client";

import LanguageToggle from "@/components/LanguageToggle";
import T from "@/components/T";
import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/lib/i18n";
import { useSidebar } from "@/components/SidebarProvider";

type TopbarClientProps = {
  displayName: string;
  email: string;
};

export default function TopbarClient({ displayName, email }: TopbarClientProps) {
  const { language } = useLanguage();
  const { toggle } = useSidebar();
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="hamburger"
          onClick={toggle}
          aria-label="Open menu"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
        <div>
          <div className="subtle" style={{ fontSize: 12, letterSpacing: 1 }}>
            <T k="inventoryControl" />
          </div>
          <div className="page-title">
            <T k="dashboard" />
          </div>
        </div>
      </div>
      <div className="topbar-actions">
        <LanguageToggle />
        <input
          className="input"
          placeholder={translations[language].searchPlaceholder}
        />
        <div className="topbar-user">
          <div className="topbar-avatar">{initials || "FI"}</div>
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
