import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Language } from "../types";
import { TRANSLATIONS } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("mathsguru_language");
    return (saved as Language) || "hi"; // defaults to Hinglish!
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("mathsguru_language", lang);
  };

  const t = (key: string): string => {
    const trans = TRANSLATIONS[language];
    if (trans && trans[key]) {
      return trans[key];
    }
    // Fallback to English
    const fallback = TRANSLATIONS["en"];
    return (fallback && fallback[key]) ? fallback[key] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
