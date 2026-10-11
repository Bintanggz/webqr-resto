import type { SiteConfig } from '../types/config';

// Tipe Preset Tema Resmi
export type ThemePreset =
  | 'warm-classic'
  | 'modern-cafe'
  | 'dark-elegant'
  | 'fresh-seafood'
  | 'modern'
  | 'classic'
  | 'dark';

export interface ThemeColors {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  primary: string;
  accent: string;
  border: string;
  fontHeading: string;
  fontBody: string;
  radius: string;
  shadowSm: string;
  // Status & Integrasi
  success: string;
  danger: string;
  whatsapp: string;
  instagram: string;
}

// ----------------------------------------------------------------------------
// 1. DAFTAR PRESET RESMI
// ----------------------------------------------------------------------------
export const THEME_PRESETS: Record<string, ThemeColors> = {
  // Preset Default: Warm Classic (hangat, mewah, klasik)
  'warm-classic': {
    bg: '#FAF6F0',
    surface: '#FFFFFF',
    text: '#2B2118',
    textMuted: '#7A6A5C',
    primary: '#8C3B1F',
    accent: '#C8963E',
    border: '#E8DFD3',
    fontHeading: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'DM Sans', system-ui, -apple-system, sans-serif",
    radius: '12px',
    shadowSm: '0 1px 3px rgba(43, 33, 24, 0.05)',
    success: '#2D6A4F',
    danger: '#B91C1C',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },

  // Preset Modern Cafe (natural, bersih, estetika coffeeshop)
  'modern-cafe': {
    bg: '#F7F5F2',
    surface: '#FFFFFF',
    text: '#1F1B16',
    textMuted: '#756F66',
    primary: '#3E4A3D',
    accent: '#B5835A',
    border: '#E6E1DA',
    fontHeading: "'Fraunces', serif",
    fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    radius: '12px',
    shadowSm: '0 1px 3px rgba(31, 27, 22, 0.05)',
    success: '#2D6A4F',
    danger: '#B91C1C',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },

  // Preset Dark Elegant (gelap eksklusif, obsidian, aksen emas)
  'dark-elegant': {
    bg: '#12100E',
    surface: '#1B1815',
    text: '#F2EBE2',
    textMuted: '#A39789',
    primary: '#D4A24C',
    accent: '#8C3B1F',
    border: '#2B2621',
    fontHeading: "'Playfair Display', Georgia, serif",
    fontBody: "'Inter', system-ui, -apple-system, sans-serif",
    radius: '12px',
    shadowSm: '0 1px 3px rgba(0, 0, 0, 0.35)',
    success: '#34D399',
    danger: '#F87171',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },

  // Preset Fresh Seafood (segar, laut, maritim premium)
  'fresh-seafood': {
    bg: '#F4F8F8',
    surface: '#FFFFFF',
    text: '#0F2A33',
    textMuted: '#5B7580',
    primary: '#0F4C5C',
    accent: '#E36414',
    border: '#DCE7E9',
    fontHeading: "'DM Serif Display', Georgia, serif",
    fontBody: "'Manrope', system-ui, -apple-system, sans-serif",
    radius: '12px',
    shadowSm: '0 1px 3px rgba(15, 42, 51, 0.05)',
    success: '#2D6A4F',
    danger: '#B91C1C',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },
};

// Alias kompatibilitas
THEME_PRESETS['classic'] = THEME_PRESETS['warm-classic'];
THEME_PRESETS['modern'] = THEME_PRESETS['modern-cafe'];
THEME_PRESETS['dark'] = THEME_PRESETS['dark-elegant'];

// ----------------------------------------------------------------------------
// 2. HELPER WARNA & KONTRAST
// ----------------------------------------------------------------------------
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

export function hexToRgba(hex: string, alpha: number): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return hex;
  }
}

export function getContrastTextColor(hex: string): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.55 ? '#1F1B16' : '#FFFFFF';
  } catch {
    return '#FFFFFF';
  }
}

// ----------------------------------------------------------------------------
// 3. INJEKSI CSS VARIABLES SESUAI SPEC BAGIAN A
// ----------------------------------------------------------------------------
export function applyThemeVariables(
  themeConfig: SiteConfig['theme'],
  isDarkModeFeatureActive = false
): void {
  if (typeof document === 'undefined') return;

  const isSystemDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const shouldUseDarkTheme =
    themeConfig.preset === 'dark' ||
    themeConfig.preset === 'dark-elegant' ||
    (isDarkModeFeatureActive && isSystemDark);

  // Ambil preset dasar (default ke warm-classic)
  const presetKey = shouldUseDarkTheme
    ? 'dark-elegant'
    : themeConfig.preset || 'warm-classic';
  const basePreset = THEME_PRESETS[presetKey] || THEME_PRESETS['warm-classic'];

  // Kustomisasi manual jika ada
  const finalPrimary = themeConfig.primaryColor || basePreset.primary;
  const finalPrimaryHover = adjustBrightness(
    finalPrimary,
    shouldUseDarkTheme ? 10 : -12
  );
  const finalPrimaryLight = hexToRgba(finalPrimary, 0.1);
  const finalPrimaryText = getContrastTextColor(finalPrimary);

  // Jika preset aktif atau mode gelap aktif, gunakan warna serasi dari preset
  const finalBg = shouldUseDarkTheme ? basePreset.bg : (themeConfig.backgroundColor || basePreset.bg);
  const finalSurface = basePreset.surface;
  const finalText = shouldUseDarkTheme ? basePreset.text : (themeConfig.textColor || basePreset.text);
  const finalTextMuted = basePreset.textMuted;
  const finalAccent = basePreset.accent;
  const finalBorder = basePreset.border;
  const finalRadius = themeConfig.borderRadius === 'rounded-2xl' ? '12px' : (basePreset.radius || '12px');

  const root = document.documentElement;

  // Injeksi Token Resmi Bagian A
  root.style.setProperty('--bg', finalBg);
  root.style.setProperty('--surface', finalSurface);
  root.style.setProperty('--text', finalText);
  root.style.setProperty('--text-muted', finalTextMuted);
  root.style.setProperty('--primary', finalPrimary);
  root.style.setProperty('--primary-hover', finalPrimaryHover);
  root.style.setProperty('--primary-light', finalPrimaryLight);
  root.style.setProperty('--primary-text', finalPrimaryText);
  root.style.setProperty('--accent', finalAccent);
  root.style.setProperty('--border', finalBorder);
  root.style.setProperty('--radius', finalRadius);
  root.style.setProperty('--shadow-sm', basePreset.shadowSm);
  root.style.setProperty('--font-heading', basePreset.fontHeading);
  root.style.setProperty('--font-body', basePreset.fontBody);

  // Status & Third-party
  root.style.setProperty('--color-success', basePreset.success);
  root.style.setProperty('--color-danger', basePreset.danger);
  root.style.setProperty('--color-whatsapp', basePreset.whatsapp);
  root.style.setProperty('--color-instagram', basePreset.instagram);

  // Alias kompatibilitas untuk kode yang sudah ada
  root.style.setProperty('--color-bg-page', finalBg);
  root.style.setProperty('--color-bg-card', finalSurface);
  root.style.setProperty('--color-bg-subtle', finalBg);
  root.style.setProperty('--color-text-main', finalText);
  root.style.setProperty('--color-text-muted', finalTextMuted);
  root.style.setProperty('--color-primary', finalPrimary);
  root.style.setProperty('--color-primary-hover', finalPrimaryHover);
  root.style.setProperty('--color-primary-light', finalPrimaryLight);
  root.style.setProperty('--color-primary-text', finalPrimaryText);
  root.style.setProperty('--color-secondary', finalText);
  root.style.setProperty('--color-border', finalBorder);
  root.style.setProperty('--radius-theme', finalRadius);
  root.style.setProperty('--font-theme', basePreset.fontBody);

  if (shouldUseDarkTheme) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
