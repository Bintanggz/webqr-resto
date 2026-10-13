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
  // Preset Default: Warm Classic (modern, hangat, clean cafe vibes)
  'warm-classic': {
    bg: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#18181B',
    textMuted: '#71717A',
    primary: '#9A3412',
    accent: '#EA580C',
    border: '#E4E4E7',
    fontHeading: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    radius: '16px',
    shadowSm: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
    success: '#16A34A',
    danger: '#DC2626',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },

  // Preset Modern Cafe (natural, bersih, estetika modern coffeeshop ala Fore)
  'modern-cafe': {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    primary: '#0F766E',
    accent: '#D97706',
    border: '#E2E8F0',
    fontHeading: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    radius: '16px',
    shadowSm: '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)',
    success: '#16A34A',
    danger: '#DC2626',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },

  // Preset Dark Elegant (gelap eksklusif, obsidian, aksen emas hangat)
  'dark-elegant': {
    bg: '#09090B',
    surface: '#18181B',
    text: '#FAFAFA',
    textMuted: '#A1A1AA',
    primary: '#F59E0B',
    accent: '#D97706',
    border: '#27272A',
    fontHeading: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    radius: '16px',
    shadowSm: '0 4px 16px rgba(0, 0, 0, 0.4)',
    success: '#34D399',
    danger: '#F87171',
    whatsapp: '#25D366',
    instagram: '#E1306C',
  },

  // Preset Fresh Seafood (segar, maritim cerah, kontras tinggi)
  'fresh-seafood': {
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    textMuted: '#64748B',
    primary: '#0284C7',
    accent: '#EA580C',
    border: '#E2E8F0',
    fontHeading: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    radius: '16px',
    shadowSm: '0 2px 8px -2px rgba(2, 132, 199, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
    success: '#16A34A',
    danger: '#DC2626',
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
