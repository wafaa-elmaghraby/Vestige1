import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, TextDirection, Dictionary, LocalizedText } from './types';
import { en } from './en';
import { ar } from './ar';

const dictionaries: Record<Language, Dictionary> = { en, ar };

interface LanguageContextType {
  language: Language;
  direction: TextDirection;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  localize: (obj: LocalizedText | string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'app_language';

export const LANGUAGES: Array<{ code: Language; label: string; flag: string }> = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇪🇬' },
];

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'en' || stored === 'ar') {
    return stored;
  }

  const browserLang = navigator.language?.toLowerCase() || '';
  if (browserLang.startsWith('ar')) return 'ar';

  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const direction: TextDirection = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
    } catch {
      // Ignore storage errors (private browsing)
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const localize = (obj: LocalizedText | string | undefined): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || obj.ar || '';
  };

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      direction,
      setLanguage,
      t: dictionaries[language] || dictionaries.en,
      localize,
    }),
    [language, direction]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useT(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useT must be used within a LanguageProvider');
  }
  return context;
}