import { useState, useEffect, useCallback } from 'react';
import translationsData from '../data/translations.json';

export type LanguageCode = 'id' | 'en';

type TranslationKey = keyof typeof translationsData.id;

export function useLanguage() {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'id';
    return (localStorage.getItem('resto_lang') as LanguageCode) || 'id';
  });

  const setLang = (newLang: LanguageCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem('resto_lang', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey, replacements?: Record<string, string | number>): string => {
      const dict = translationsData[lang] || translationsData.id;
      let text = (dict as Record<string, string>)[key] || (translationsData.id as Record<string, string>)[key] || key;

      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }

      return text;
    },
    [lang]
  );

  return { lang, setLang, t };
}
