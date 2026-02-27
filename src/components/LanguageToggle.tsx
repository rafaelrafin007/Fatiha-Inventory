"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const next = language === "en" ? "bn" : "en";

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => setLanguage(next)}
      aria-label="Toggle language"
    >
      {language.toUpperCase()}
    </button>
  );
}
