import type { SiteConfig } from '../../src/types/config';

export const siteConfig: SiteConfig = {
  restaurant: {
    name: "Kopi Senja & Artisan Bakery",
    tagline: "Specialty Coffee, Fresh Pastry & Cozy Working Space",
    logo: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1280&q=80",
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
    preset: "modern-cafe",
    primaryColor: "#0F766E",
    borderRadius: "16px",
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
    darkMode: false,
    itemNotes: true,
    popularBadge: true,
  },
  currency: "IDR",
  promo: [
    {
      id: "promo-cafe-1",
      title: "☕ Morning Coffee Combo (Hemat 25%)",
      description: "Nikmati 1 Latte + 1 Butter Croissant hanya Rp45.000 setiap jam 08:00 - 11:00 WIB.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      isActive: true,
    },
    {
      id: "promo-cafe-2",
      title: "🍰 Sweet Afternoon Treat",
      description: "Diskon 15% untuk semua varian Basque Cheesecake setiap pembelian Manual Brew.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      isActive: true,
    },
  ],
};

export default siteConfig;
