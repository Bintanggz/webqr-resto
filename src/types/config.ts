/**
 * Tipe data TypeScript untuk konfigurasi situs & restoran (Mendukung Multi-Bahasa)
 */

export interface PromoBanner {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  isActive: boolean;
}

export interface OrderTypeConfig {
  dineIn: { enabled: boolean; label: string; labelEn?: string; iconName?: string };
  takeAway: { enabled: boolean; label: string; labelEn?: string; iconName?: string };
  delivery: { enabled: boolean; label: string; labelEn?: string; iconName?: string };
}

export interface SiteConfig {
  // Informasi Restoran
  restaurant: {
    name: string;
    tagline: string;
    taglineEn?: string;
    logo: string;
    banner: string;
    address: string;
    addressEn?: string;
    openingHours: string;
    openingHoursEn?: string;
    mapsUrl: string;
    instagram: string;
  };

  // Konfigurasi WhatsApp
  whatsapp: {
    number: string; // Format: 628xxx
    openingMessage: string;
    openingMessageEn?: string;
    orderTemplate: string;
    orderTemplateEn?: string;
  };

  // Tampilan & Tema Warna
  theme: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    borderRadius?: string;
    preset: 'warm-classic' | 'modern-cafe' | 'dark-elegant' | 'fresh-seafood' | 'modern' | 'classic' | 'dark';
  };

  // Fitur On/Off
  features: {
    cart: boolean;
    viewOnlyMode: boolean; // Mode katalog hanya lihat menu (tanpa keranjang & tombol pesan)
    search: boolean;
    tableNumber: boolean;
    promoBanner: boolean;
    darkMode: boolean;
    itemNotes: boolean;
    popularBadge: boolean;
    multiLanguage: boolean; // Multi-bahasa ID/EN dengan tombol ganti bahasa
    quickFilter: boolean; // Filter cepat (Terlaris, Baru, Vegetarian, Pedas)
    shareMenu: boolean; // Tombol Bagikan Menu (Web Share API)
    contactWhatsApp: boolean; // Tombol Hubungi Kasir via WhatsApp
  };

  // Pilihan Tipe Pemesanan (Makan di Tempat, Bawa Pulang, Antar)
  orderTypes: OrderTypeConfig;

  // Mata Uang
  currency: 'IDR';

  // Daftar Banner Promo
  promo: PromoBanner[];
}
