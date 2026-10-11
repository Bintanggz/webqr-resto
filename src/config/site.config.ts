import type { SiteConfig } from '../../src/types/config';

export const siteConfig: SiteConfig = {
  restaurant: {
    name: "Kopi Senja & Artisan Bakery",
    tagline: "Specialty Coffee, Fresh Pastry & Cozy Working Space",
    logo: "/images/logo.svg",
    banner: "/images/banner.svg",
    address: "Jl. Senopati No. 28, Kebayoran Baru, Jakarta Selatan",
    openingHours: "08:00 - 23:00 WIB",
    mapsUrl: "https://maps.google.com/?q=Senopati+Jakarta",
    instagram: "kopisenja_artisan",
  },
  whatsapp: {
    number: "6281234567890",
    openingMessage: "Halo Kopi Senja, saya ingin order kopi & pastry berikut:",
    orderTemplate: "Pesanan akan disiapkan oleh barista kami. Terima kasih! ☕",
  },
  theme: {
    preset: "modern",
    primaryColor: "#d97706",
    secondaryColor: "#0f172a",
    backgroundColor: "#fafaf9",
    textColor: "#1c1917",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    borderRadius: "rounded-2xl",
  },
  orderTypes: {
    dineIn: { enabled: true, label: "Dine In (Ngopi di Tempat)", iconName: "Utensils" },
    takeAway: { enabled: true, label: "Take Away (Bawa Pulang)", iconName: "ShoppingBag" },
    delivery: { enabled: true, label: "Delivery (Pesan Antar)", iconName: "Truck" },
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
    darkMode: true,
    itemNotes: true,
    popularBadge: true,
  },
  currency: "IDR",
  promo: [
    {
      id: "promo-cafe-1",
      title: "☕ Morning Coffee Combo (Hemat 25%)",
      description: "Nikmati 1 Latte + 1 Butter Croissant hanya Rp45.000 setiap jam 08:00 - 11:00 WIB.",
      image: "/images/banner.svg",
      isActive: true,
    },
    {
      id: "promo-cafe-2",
      title: "🍰 Sweet Afternoon Treat",
      description: "Diskon 15% untuk semua varian Basque Cheesecake setiap pembelian Manual Brew.",
      image: "/images/banner.svg",
      isActive: true,
    },
  ],
};

export default siteConfig;
