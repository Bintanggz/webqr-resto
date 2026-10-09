/**
 * Tipe data TypeScript untuk konfigurasi situs & restoran
 */

export interface PromoBanner {
  id: string;
  title: string;
  description: string;
  image?: string;
  isActive: boolean;
}

export interface OrderTypeConfig {
  dineIn: { enabled: boolean; label: string };
  takeAway: { enabled: boolean; label: string };
  delivery: { enabled: boolean; label: string };
}

export interface SiteConfig {
  // Informasi Restoran
  restaurant: {
    name: string;
    tagline: string;
    logo: string;
    banner: string;
    address: string;
    openingHours: string;
    mapsUrl: string;
    instagram: string;
  };

  // Konfigurasi WhatsApp
  whatsapp: {
    number: string; // Format: 628xxx
    openingMessage: string;
    orderTemplate: string;
  };

  // Tampilan & Tema Warna
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    borderRadius: string;
    preset: 'modern' | 'classic' | 'dark';
  };

  // Fitur On/Off
  features: {
    cart: boolean;
    search: boolean;
    tableNumber: boolean;
    promoBanner: boolean;
    darkMode: boolean;
    itemNotes: boolean;
    popularBadge: boolean;
  };

  // Pilihan Tipe Pemesanan (Makan di Tempat, Bawa Pulang, Antar)
  orderTypes: OrderTypeConfig;

  // Mata Uang
  currency: 'IDR';

  // Daftar Banner Promo
  promo: PromoBanner[];
}
