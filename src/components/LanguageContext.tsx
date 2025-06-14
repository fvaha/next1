"use client";
import React, { createContext, useContext, useState, useMemo } from "react";
import { locales, languages } from "@/locales";
import { Translation } from "@/locales/types";

type LangContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: Translation;
  languages: typeof languages;
};
const LangContext = createContext<LangContextType | undefined>(undefined);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: locales[lang] || locales.en,
      languages,
    }),
    [lang]
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
