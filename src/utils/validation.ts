import type { SiteConfig } from '../types/config';
import type { MenuData, MenuItem, MenuCategory } from '../types/menu';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Memvalidasi apakah file site.config.ts memiliki struktur lengkap
 */
export function validateSiteConfig(config: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!config || typeof config !== 'object') {
    return {
      isValid: false,
      errors: ['File konfigurasi restoran (site.config.ts) tidak terbaca atau kosong.'],
      warnings: [],
    };
  }

  const c = config as Partial<SiteConfig>;

  // Validasi restaurant
  if (!c.restaurant) {
    errors.push("Field 'restaurant' tidak ditemukan di site.config.ts.");
  } else {
    if (!c.restaurant.name?.trim()) errors.push("Nama restoran ('restaurant.name') tidak boleh kosong.");
    if (!c.restaurant.address?.trim()) warnings.push("Alamat restoran ('restaurant.address') sebaiknya diisi.");
    if (!c.restaurant.openingHours?.trim()) warnings.push("Jam operasional ('restaurant.openingHours') belum diisi.");
  }

  // Validasi whatsapp
  if (!c.whatsapp) {
    errors.push("Field 'whatsapp' tidak ditemukan di site.config.ts.");
  } else {
    if (!c.whatsapp.number?.trim()) {
      errors.push("Nomor WhatsApp ('whatsapp.number') wajib diisi.");
    } else if (!/^62\d{8,14}$/.test(c.whatsapp.number.replace(/\D/g, ''))) {
      warnings.push(
        `Nomor WhatsApp ('${c.whatsapp.number}') sebaiknya diawali dengan 62 (contoh: '6281234567890').`
      );
    }
  }

  // Validasi theme
  if (!c.theme) {
    errors.push("Field 'theme' tidak ditemukan di site.config.ts.");
  } else {
    if (!c.theme.primaryColor) errors.push("Warna utama ('theme.primaryColor') wajib diisi.");
  }

  // Validasi features
  if (!c.features) {
    errors.push("Field 'features' tidak ditemukan di site.config.ts.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Memvalidasi apakah file menu.json memiliki struktur kategori dan item yang benar
 */
export function validateMenuData(data: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['File menu.json tidak valid atau format JSON rusak.'],
      warnings: [],
    };
  }

  const m = data as Partial<MenuData>;

  // 1. Validasi Kategori
  if (!m.categories || !Array.isArray(m.categories)) {
    errors.push("Field 'categories' di menu.json wajib berupa daftar array.");
  } else if (m.categories.length === 0) {
    errors.push("Daftar kategori ('categories') tidak boleh kosong.");
  } else {
    const categoryIds = new Set<string>();
    m.categories.forEach((cat: MenuCategory, index: number) => {
      const label = cat.name || `Kategori ke-${index + 1}`;
      if (!cat.id || typeof cat.id !== 'string') {
        errors.push(`${label}: 'id' wajib diisi berupa teks unik.`);
      } else if (categoryIds.has(cat.id)) {
        errors.push(`Kategori dengan ID '${cat.id}' duplikat/ganda.`);
      } else {
        categoryIds.add(cat.id);
      }

      if (!cat.name || typeof cat.name !== 'string') {
        errors.push(`Kategori ID '${cat.id || index}': 'name' wajib diisi.`);
      }
      if (!cat.icon) {
        warnings.push(`Kategori '${cat.name}': Sebaiknya tambahkan icon emoji agar menarik.`);
      }
    });
  }

  // 2. Validasi Item Menu
  if (!m.items || !Array.isArray(m.items)) {
    errors.push("Field 'items' di menu.json wajib berupa daftar array.");
  } else if (m.items.length === 0) {
    errors.push("Daftar item menu ('items') tidak boleh kosong.");
  } else {
    const itemIds = new Set<string>();
    const validCategoryIds = new Set((m.categories || []).map((c) => c.id));

    m.items.forEach((item: MenuItem, index: number) => {
      const label = item.name ? `'${item.name}'` : `Item ke-${index + 1}`;

      if (!item.id || typeof item.id !== 'string') {
        errors.push(`${label}: 'id' wajib diisi.`);
      } else if (itemIds.has(item.id)) {
        errors.push(`ID menu '${item.id}' digunakan lebih dari satu kali.`);
      } else {
        itemIds.add(item.id);
      }

      if (!item.name || typeof item.name !== 'string') {
        errors.push(`Item ID '${item.id || index}': 'name' wajib diisi.`);
      }

      if (!item.categoryId || !validCategoryIds.has(item.categoryId)) {
        errors.push(
          `${label}: Memiliki 'categoryId' ('${item.categoryId}') yang tidak ada di daftar categories.`
        );
      }

      if (typeof item.price !== 'number' || isNaN(item.price) || item.price < 0) {
        errors.push(`${label}: 'price' harus berupa angka nominal harga (contoh: 25000).`);
      }

      if (typeof item.isAvailable !== 'boolean') {
        warnings.push(`${label}: 'isAvailable' sebaiknya bernilai true atau false.`);
      }

      // Validasi Varian jika ada
      if (item.variants && Array.isArray(item.variants)) {
        item.variants.forEach((v, vIdx) => {
          if (!v.name) errors.push(`${label}: Varian ke-${vIdx + 1} tidak memiliki 'name'.`);
          if (!v.options || !Array.isArray(v.options) || v.options.length === 0) {
            errors.push(`${label}: Varian '${v.name}' harus memiliki opsi pilihan ('options').`);
          }
        });
      }

      // Validasi Addons jika ada
      if (item.addons && Array.isArray(item.addons)) {
        item.addons.forEach((a, aIdx) => {
          if (!a.name) errors.push(`${label}: Addon ke-${aIdx + 1} tidak memiliki 'name'.`);
          if (typeof a.price !== 'number') errors.push(`${label}: Addon '${a.name}' harus memiliki harga ('price').`);
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
