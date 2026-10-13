/**
 * Tipe data TypeScript untuk Menu, Kategori, Varian, dan Add-on (Mendukung Multi-Bahasa ID/EN)
 */

export interface VariantOption {
  name: string;
  nameEn?: string;
  priceDelta?: number; // Tambahan biaya (misal: 0 untuk reguler, 3000 untuk jumbo)
}

export interface MenuVariant {
  name: string; // Contoh: "Ukuran Porsi", "Level Pedas", "Pilihan Suhu"
  nameEn?: string;
  options: VariantOption[];
}

export interface MenuAddon {
  id: string;
  name: string; // Contoh: "Ekstra Telur Ceplok", "Ekstra Keju", "Kerupuk Udang"
  nameEn?: string;
  price: number; // Harga tambahan add-on
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
  tags?: string[]; // Contoh: ["pedas", "vegetarian"]
  variants?: MenuVariant[];
  addons?: MenuAddon[];
}

export interface MenuCategory {
  id: string;
  name: string;
  nameEn?: string;
  icon: string; // Emoji unik, contoh: "🍚", "🍜", "🥟", "☕", "🥤"
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}
