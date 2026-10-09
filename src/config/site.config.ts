import type { SiteConfig } from '../types/config';

/**
 * ==============================================================================
 * PANDUAN PENGATURAN RESTORAN / KAFE / WARUNG (site.config.ts)
 * ==============================================================================
 * File ini adalah pusat kendali tampilan dan identitas restoran Anda.
 * Anda TIDAK PERLU memahami kode pemrograman untuk mengeditnya.
 * Cukup ubah teks di dalam tanda kutip ("...") atau nilai true/false sesuai kebutuhan.
 * 
 * ATURAN PENTING:
 * 1. Jangan hapus tanda kutip (" ") atau kurung kurawal ({ }).
 * 2. Nomor WhatsApp WAJIB diawali kode negara 62 (contoh: "6281234567890"), JANGAN gunakan tanda + atau angka 0 di depan.
 * 3. Untuk menyalakan fitur, gunakan nilai: true
 *    Untuk mematikan fitur, gunakan nilai: false
 * ==============================================================================
 */

export const siteConfig: SiteConfig = {
  // ----------------------------------------------------------------------------
  // 1. INFORMASI RESTORAN (restaurant)
  // ----------------------------------------------------------------------------
  restaurant: {
    // Nama restoran yang akan tampil di header dan struk pesanan
    name: "Warung Kopi Senja & Rasa",

    // Slogan singkat atau deskripsi singkat brand Anda
    tagline: "Cita Rasa Otentik Nusantara Sejak 2018",

    // URL atau lokasi file logo restoran (disimpan di folder public/images/)
    logo: "/images/logo.svg",

    // Foto banner sampul atas (disimpan di folder public/images/)
    banner: "/images/banner.svg",

    // Alamat fisik lengkap restoran
    address: "Jl. Kaliurang KM 5 No. 42, Sleman, D.I. Yogyakarta",

    // Jam operasional restoran (contoh: "09:00 - 22:00 WIB")
    openingHours: "09:00 - 22:00 WIB",

    // Tautan link Google Maps untuk memudahkan pelanggan mencari rute
    mapsUrl: "https://maps.google.com/?q=-7.7654,110.3789",

    // Username akun Instagram (tanpa tanda @)
    instagram: "kopisenjarasa",
  },

  // ----------------------------------------------------------------------------
  // 2. INTEGRASI WHATSAPP (whatsapp)
  // ----------------------------------------------------------------------------
  whatsapp: {
    // Nomor WhatsApp admin/kasir penerima pesanan (Format wajib: 628xxx)
    number: "6281234567890",

    // Kalimat pembuka pesan saat pelanggan pertama kali mengirim pesanan
    openingMessage: "Halo Kasir, saya ingin memesan menu berikut via QR Menu:",

    // Template keterangan penutup di bagian bawah pesan WhatsApp
    orderTemplate: "Mohon konfirmasi ketersediaan menu dan total pembayaran ya. Terima kasih! 🙏",
  },

  // ----------------------------------------------------------------------------
  // 3. TEMA & WARNA (theme)
  // ----------------------------------------------------------------------------
  theme: {
    // Warna utama (brand primary): tombol pesan, badge harga, aksen aktif (Kode HEX)
    primaryColor: "#f59e0b", // Amber cerah

    // Warna sekunder: tombol pendukung, judul aksen, border aktif (Kode HEX)
    secondaryColor: "#78350f", // Cokelat kopi hangat

    // Warna latar belakang utama halaman (Kode HEX)
    backgroundColor: "#f8fafc", // Slate lembut / putih bersih

    // Warna teks utama agar kontras dan mudah dibaca (Kode HEX)
    textColor: "#0f172a", // Slate gelap pekat

    // Pilihan font tulisan (default: system sans-serif yang cepat dimuat)
    fontFamily: "system-ui, -apple-system, sans-serif",

    // Kelengkungan sudut elemen/tombol/kartu (pilihan: "rounded-lg", "rounded-xl", "rounded-2xl")
    borderRadius: "rounded-2xl",

    // Preset gaya tampilan: "modern" (bersih & cerah), "classic" (elegan), atau "dark" (gelap)
    preset: "modern",
  },

  // ----------------------------------------------------------------------------
  // 4. PENGATURAN FITUR (features)
  // Ubah menjadi true untuk mengaktifkan, atau false untuk menonaktifkan
  // ----------------------------------------------------------------------------
  features: {
    // Aktifkan keranjang belanja & tombol kirim pesanan ke WhatsApp
    cart: true,

    // Aktifkan kolom pencarian menu secara langsung
    search: true,

    // Aktifkan input nomor meja pelanggan (otomatis deteksi jika ada ?meja=XX di URL)
    tableNumber: true,

    // Tampilkan banner promo berjalan di bagian atas halaman
    promoBanner: true,

    // Aktifkan tombol beralih ke mode gelap (dark mode)
    darkMode: false,

    // Mode hanya lihat menu (katalog): tanpa tombol keranjang & tanpa checkout WhatsApp
    viewOnlyMode: false,

    // Izinkan pelanggan menulis catatan khusus per item (misal: "tanpa seledri")
    itemNotes: true,

    // Tampilkan lencana bintang/favorit pada menu yang sedang populer
    popularBadge: true,

    // Aktifkan tombol ganti bahasa (Bahasa Indonesia / English)
    multiLanguage: true,

    // Aktifkan baris filter cepat (Terlaris, Baru, Pedas, Vegetarian)
    quickFilter: true,

    // Aktifkan tombol Bagikan Menu (Web Share API / Salin Tautan)
    shareMenu: true,

    // Aktifkan tombol Hubungi Kasir langsung via WhatsApp
    contactWhatsApp: true,
  },

  // ----------------------------------------------------------------------------
  // 5. PILIHAN TIPE PESANAN (orderTypes)
  // Bisa diaktifkan (true) atau dimatikan (false) sesuai model bisnis Anda
  // ----------------------------------------------------------------------------
  orderTypes: {
    // Makan di tempat (Dine In) - otomatis menampilkan input nomor meja
    dineIn: {
      enabled: true,
      label: "Makan di Tempat (Dine In)",
    },
    // Bawa pulang (Take Away) - tanpa input meja
    takeAway: {
      enabled: true,
      label: "Bawa Pulang (Take Away)",
    },
    // Pesan antar ke rumah (Delivery) - otomatis memunculkan input alamat pengantaran
    delivery: {
      enabled: true,
      label: "Pesan Antar (Delivery)",
    },
  },

  // ----------------------------------------------------------------------------
  // 6. MATA UANG (currency)
  // ----------------------------------------------------------------------------
  currency: "IDR",

  // ----------------------------------------------------------------------------
  // 7. DAFTAR BANNER PROMO (promo)
  // Tampilkan promo spesial yang sedang berlangsung di restoran Anda
  // ----------------------------------------------------------------------------
  promo: [
    {
      id: "promo-1",
      // Judul promo yang mencolok
      title: "Paket Hemat Sarapan & Kopi",
      // Keterangan syarat & diskon promo
      description: "Diskon 20% untuk Nasi Goreng + Kopi Susu setiap hari sebelum jam 11:00 WIB!",
      // Foto ilustrasi promo (opsional, bisa dikosongkan atau diisi "")
      image: "/images/placeholder.svg",
      // true jika promo sedang berlangsung, false jika promo telah selesai
      isActive: true,
    },
    {
      id: "promo-2",
      title: "Jumat Berkah Diskon 15%",
      description: "Dapatkan potongan harga langsung 15% untuk semua menu cemilan setiap hari Jumat.",
      image: "/images/placeholder.svg",
      isActive: true,
    },
  ],
};

export type { SiteConfig };
