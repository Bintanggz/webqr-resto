import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translationsData from '../data/translations.json';

export type LanguageCode = 'id' | 'en';

export type TranslationKey = keyof typeof translationsData.id;

export interface LanguageContextType {
  lang: LanguageCode;
  setLang: (newLang: LanguageCode) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const defaultContextValue: LanguageContextType = {
  lang: 'id',
  setLang: () => {},
  t: (key: TranslationKey, replacements?: Record<string, string | number>): string => {
    let text = (translationsData.id as Record<string, string>)[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return text;
  },
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'id';
    return (localStorage.getItem('resto_lang') as LanguageCode) || 'id';
  });

  const setLang = useCallback((newLang: LanguageCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem('resto_lang', newLang);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey, replacements?: Record<string, string | number>): string => {
      const dict = translationsData[lang] || translationsData.id;
      let text =
        (dict as Record<string, string>)[key] ||
        (translationsData.id as Record<string, string>)[key] ||
        key;

      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }

      return text;
    },
    [lang]
  );

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, t } },
    children
  );
};

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
