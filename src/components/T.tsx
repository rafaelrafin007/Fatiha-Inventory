"use client";

import { translations } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

type TProps = {
  k: keyof typeof translations.en;
};

export default function T({ k }: TProps) {
  const { language } = useLanguage();
  return <>{translations[language][k]}</>;
}
