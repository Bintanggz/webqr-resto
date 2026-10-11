import type { SiteConfig } from '../../src/types/config';

export const siteConfig: SiteConfig = {
  restaurant: {
    name: "Warung Makan Berkah Rasa",
    tagline: "Masakan Rumahan Khas Jawa & Sunda Asli Sedap",
    logo: "/images/logo.svg",
    banner: "/images/banner.svg",
    address: "Jl. Kaliurang KM 6.5, Sleman, D.I. Yogyakarta",
    openingHours: "07:00 - 21:00 WIB",
    mapsUrl: "https://maps.google.com/?q=Kaliurang+Yogyakarta",
    instagram: "warungberkahrasa",
  },
  whatsapp: {
    number: "6281234567890",
    openingMessage: "Halo Warung Berkah Rasa, saya mau pesan makanan berikut:",
    orderTemplate: "Mohon siapkan ya bu/pak. Terima kasih banyak! 🙏",
  },
  theme: {
    preset: "warm-classic",
    primaryColor: "#8C3B1F",
    borderRadius: "12px",
  },
  orderTypes: {
    dineIn: { enabled: true, label: "Makan di Tempat", iconName: "Utensils" },
    takeAway: { enabled: true, label: "Bungkus (Take Away)", iconName: "ShoppingBag" },
    delivery: { enabled: true, label: "Antar ke Rumah", iconName: "Truck" },
  },
  features: {
    cart: true,
    viewOnlyMode: false,
    multiLanguage: true,
    quickFilter: true,
    shareMenu: true,
    contactWhatsApp: true,
    search: true,
    tableNumber: true,
    promoBanner: true,
    darkMode: false,
    itemNotes: true,
    popularBadge: true,
  },
  currency: "IDR",
  promo: [
    {
      id: "promo-warung-1",
      title: "🍗 Promo Paket Jumat Berkah",
      description: "Setiap pembelian Nasi Ayam Bakar Komplit GRATIS Es Teh Manis Jumbo segar!",
      image: "/images/banner.svg",
      isActive: true,
    },
  ],
};

export default siteConfig;
