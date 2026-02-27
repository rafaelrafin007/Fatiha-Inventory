"use client";

import { useLanguage } from "@/components/LanguageProvider";
import T from "@/components/T";

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="lang-select">
      <div className="subtle" style={{ fontSize: 12 }}>
        <T k="language" /> <span style={{ opacity: 0.6 }}>/</span> <T k="preference" />
      </div>
      <select
        className="select"
        value={language}
        onChange={(event) => setLanguage(event.target.value as "en" | "bn")}
      >
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  );
}
