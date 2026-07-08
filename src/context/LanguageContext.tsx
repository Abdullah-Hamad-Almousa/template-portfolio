import { createContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';
import type { Translation } from '../data/translations';

export type Lang = 'en' | 'ar';

export interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'en';
  });

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  const t = translations[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  const value: LanguageContextType = { lang, toggle, t, dir };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}