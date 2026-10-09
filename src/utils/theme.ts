import type { SiteConfig } from '../types/config';

// Tipe untuk Preset Tema
export type ThemePreset = 'modern' | 'classic' | 'dark';

export interface ThemeColors {
  primaryColor: string;
  primaryHover: string;
  primaryLight: string;
  primaryContrastText: string;
  secondaryColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  textMuted: string;
  borderColor: string;
  fontFamily: string;
  borderRadius: string;
}

// ----------------------------------------------------------------------------
// 1. DAFTAR 3 PRESET TEMA LENGKAP
// ----------------------------------------------------------------------------
export const THEME_PRESETS: Record<ThemePreset, ThemeColors> = {
  // Preset Modern: Bersih, cerah, sudut membulat modern (Rounded-2xl)
  modern: {
    primaryColor: '#f59e0b',
    primaryHover: '#d97706',
    primaryLight: 'rgba(245, 158, 11, 0.12)',
    primaryContrastText: '#ffffff',
    secondaryColor: '#0f172a',
    backgroundColor: '#f8fafc',
    cardColor: '#ffffff',
    textColor: '#0f172a',
    textMuted: '#64748b',
    borderColor: '#e2e8f0',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    borderRadius: '1rem',
  },

  // Preset Classic: Hangat, sentuhan font serif bernuansa tempo dulu & elegan
  classic: {
    primaryColor: '#b45309',
    primaryHover: '#92400e',
    primaryLight: 'rgba(180, 83, 9, 0.12)',
    primaryContrastText: '#ffffff',
    secondaryColor: '#78350f',
    backgroundColor: '#fffdf5',
    cardColor: '#ffffff',
    textColor: '#292524',
    textMuted: '#78716c',
    borderColor: '#e7e5e4',
    fontFamily: "'Playfair Display', Georgia, serif",
    borderRadius: '0.625rem',
  },

  // Preset Dark: Nuansa gelap obsidian mewah dengan aksen emas hangat
  dark: {
    primaryColor: '#fbbf24',
    primaryHover: '#f59e0b',
    primaryLight: 'rgba(251, 191, 36, 0.15)',
    primaryContrastText: '#0f172a',
    secondaryColor: '#cbd5e1',
    backgroundColor: '#090d16',
    cardColor: '#131b2e',
    textColor: '#f8fafc',
    textMuted: '#94a3b8',
    borderColor: '#1e293b',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    borderRadius: '1rem',
  },
};

// ----------------------------------------------------------------------------
// 2. HELPER FUNGSI WARNA & KONTRAAS AKSESIBILITAS (WCAG 2.1)
// ----------------------------------------------------------------------------

/**
 * Konversi Kode HEX ke Nilai RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Otomatis menghitung tingkat kecerahan warna (Brightness Adjustment)
 * percent: positif untuk mencerahkan, negatif untuk menggelapkan (misal -15)
 */
export function adjustBrightness(hex: string, percent: number): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    const amount = Math.round(2.55 * percent);

    const clamp = (val: number) => Math.min(255, Math.max(0, val));
    const newR = clamp(r + amount).toString(16).padStart(2, '0');
    const newG = clamp(g + amount).toString(16).padStart(2, '0');
    const newB = clamp(b + amount).toString(16).padStart(2, '0');

    return `#${newR}${newG}${newB}`;
  } catch {
    return hex;
  }
}

/**
 * Menghasilkan warna teks kontras terbaik (Hitam pekat atau Putih)
 * Berdasarkan standar WCAG Relative Luminance
 */
export function getContrastTextColor(hex: string): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    // Relative Luminance formula WCAG 2.1
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.55 ? '#0f172a' : '#ffffff';
  } catch {
    return '#ffffff';
  }
}

/**
 * Konversi HEX ke RGBA dengan transparansi
 */
export function hexToRgba(hex: string, alpha: number): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return hex;
  }
}

// ----------------------------------------------------------------------------
// 3. INJEKSI CSS VARIABLES DENGAN DUKUNGAN DARK MODE & CUSTOM OVERRIDE
// ----------------------------------------------------------------------------

/**
 * Mengaplikasikan seluruh warna tema, font, dan radius ke document :root
 */
export function applyThemeVariables(
  themeConfig: SiteConfig['theme'],
  isDarkModeFeatureActive = false
): void {
  if (typeof document === 'undefined') return;

  // 1. Cek apakah perangkat pengguna sedang dalam mode gelap (OS Dark Mode)
  const isSystemDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const shouldUseDarkTheme =
    themeConfig.preset === 'dark' || (isDarkModeFeatureActive && isSystemDark);

  // 2. Ambil preset dasar
  const basePreset = shouldUseDarkTheme
    ? THEME_PRESETS.dark
    : THEME_PRESETS[themeConfig.preset] || THEME_PRESETS.modern;

  // 3. Gabungkan dengan kustomisasi manual jika ada (Custom Override)
  // Jika pembeli mengganti primaryColor secara manual, generate otomatis variannya
  const finalPrimary = themeConfig.primaryColor || basePreset.primaryColor;
  const finalPrimaryHover = adjustBrightness(
    finalPrimary,
    shouldUseDarkTheme ? 10 : -12
  );
  const finalPrimaryLight = hexToRgba(finalPrimary, 0.12);
  const finalPrimaryContrastText = getContrastTextColor(finalPrimary);

  const finalSecondary = themeConfig.secondaryColor || basePreset.secondaryColor;
  const finalBg = shouldUseDarkTheme
    ? THEME_PRESETS.dark.backgroundColor
    : themeConfig.backgroundColor || basePreset.backgroundColor;
  const finalCard = shouldUseDarkTheme
    ? THEME_PRESETS.dark.cardColor
    : basePreset.cardColor;
  const finalText = shouldUseDarkTheme
    ? THEME_PRESETS.dark.textColor
    : themeConfig.textColor || basePreset.textColor;
  const finalTextMuted = shouldUseDarkTheme
    ? THEME_PRESETS.dark.textMuted
    : basePreset.textMuted;
  const finalBorder = shouldUseDarkTheme
    ? THEME_PRESETS.dark.borderColor
    : basePreset.borderColor;
  const finalFont = themeConfig.fontFamily || basePreset.fontFamily;

  // Konversi format borderRadius (misal "rounded-2xl" atau "1rem")
  let finalRadius = basePreset.borderRadius;
  if (themeConfig.borderRadius) {
    if (themeConfig.borderRadius === 'rounded-lg') finalRadius = '0.5rem';
    else if (themeConfig.borderRadius === 'rounded-xl') finalRadius = '0.75rem';
    else if (themeConfig.borderRadius === 'rounded-2xl') finalRadius = '1rem';
    else if (themeConfig.borderRadius === 'rounded-3xl') finalRadius = '1.5rem';
    else finalRadius = themeConfig.borderRadius;
  }

  // 4. Injeksi ke Document Root
  const root = document.documentElement;
  root.style.setProperty('--color-primary', finalPrimary);
  root.style.setProperty('--color-primary-hover', finalPrimaryHover);
  root.style.setProperty('--color-primary-light', finalPrimaryLight);
  root.style.setProperty('--color-primary-text', finalPrimaryContrastText);
  root.style.setProperty('--color-secondary', finalSecondary);
  root.style.setProperty('--color-bg-page', finalBg);
  root.style.setProperty('--color-bg-card', finalCard);
  root.style.setProperty('--color-text-main', finalText);
  root.style.setProperty('--color-text-muted', finalTextMuted);
  root.style.setProperty('--color-border', finalBorder);
  root.style.setProperty('--radius-theme', finalRadius);
  root.style.setProperty('--font-theme', finalFont);

  // Set class 'dark' pada document jika tema gelap aktif
  if (shouldUseDarkTheme) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
