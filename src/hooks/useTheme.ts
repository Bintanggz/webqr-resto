import { useEffect, useState } from 'react';
import { siteConfig } from '../config/site.config';
import { applyThemeVariables } from '../utils/theme';

/**
 * Hook untuk mengelola tema dinamis dan deteksi otomatis OS Dark Mode
 */
export function useTheme() {
  const [isSystemDark, setIsSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Terapkan tema awal
    applyThemeVariables(siteConfig.theme, siteConfig.features.darkMode);

    // Pantau perubahan mode gelap perangkat jika fitur darkMode aktif
    if (siteConfig.features.darkMode && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        setIsSystemDark(e.matches);
        applyThemeVariables(siteConfig.theme, true);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return {
    preset: siteConfig.theme.preset,
    isDarkModeActive:
      siteConfig.theme.preset === 'dark' ||
      (siteConfig.features.darkMode && isSystemDark),
  };
}
