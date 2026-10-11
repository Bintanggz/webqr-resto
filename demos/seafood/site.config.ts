import type { SiteConfig } from '../../src/types/config';

export const siteConfig: SiteConfig = {
  restaurant: {
    name: "Restoran Seafood Muara Segar",
    tagline: "Live Seafood Hidup Segar dari Laut Lepas",
    logo: "/images/logo.svg",
    banner: "/images/banner.svg",
    address: "Kawasan Wisata Bahari Pantai Indah Kapuk (PIK), Jakarta Utara",
    openingHours: "11:00 - 22:30 WIB",
    mapsUrl: "https://maps.google.com/?q=Pantai+Indah+Kapuk",
    instagram: "muarasegar_seafood",
  },
  whatsapp: {
    number: "6281234567890",
    openingMessage: "Halo Muara Segar Seafood, saya ingin memesan menu olahan laut berikut:",
    orderTemplate: "Mohon konfirmasi timbangan gramatur ikan/kepiting ya kak. Terima kasih! 🦀",
  },
  theme: {
    preset: "fresh-seafood",
    primaryColor: "#0F4C5C",
    borderRadius: "12px",
  },
  orderTypes: {
    dineIn: { enabled: true, label: "Dine In (Meja Resto)", iconName: "Utensils" },
    takeAway: { enabled: true, label: "Take Away (Bungkus)", iconName: "ShoppingBag" },
    delivery: { enabled: true, label: "Delivery (Pengantaran)", iconName: "Truck" },
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
      id: "promo-seafood-1",
      title: "🦀 Pesta Kepiting Saus Padang",
      description: "Diskon 20% untuk Kepiting Jantan Papua size XL setiap pemesanan hari Senin - Kamis!",
      image: "/images/banner.svg",
      isActive: true,
    },
  ],
};

export default siteConfig;
