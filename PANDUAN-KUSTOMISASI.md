# 🎨 Panduan Kustomisasi Menu Digital QR (Tanpa Koding)

Anda **TIDAK PERLU** memiliki keahlian koding untuk mengubah template ini. Seluruh tampilan, tulisan, nomor WhatsApp, dan menu dikendalikan oleh **2 file utama**:

1. **`src/config/site.config.ts`** ➔ Pengaturan profil restoran, nomor WhatsApp, tema warna, dan fitur.
2. **`src/data/menu.json`** ➔ Pengaturan daftar kategori, menu makanan/minuman, harga, dan foto.

Buka file-file tersebut menggunakan teks editor seperti **VS Code** (atau Notepad).

---

## 📌 ATURAN EMAS SAAT MENGEDIT FILE

Agar website tidak mengalami kesalahan (*error*), harap ingat 3 aturan sederhana ini:
1. **Jangan hapus tanda kutip (`"..."`)** yang mengapit tulisan.
2. **Jangan hapus tanda koma (`,`)** di akhir baris.
3. **Jangan hapus tanda kurung kurawal (`{` atau `}`)**.

Jika Anda membuat kesalahan ketik pada file, menu tidak akan rusak! Website akan otomatis menampilkan kotak peringatan ramah berwarna merah di layar yang memberi tahu baris mana yang perlu Anda periksa.

---

## 1. Mengubah Identitas Restoran

Buka file **`src/config/site.config.ts`**, cari bagian `restaurant`:

### Contoh Sebelum:
```typescript
restaurant: {
  name: "Warung Kopi Senja & Rasa",
  tagline: "Cita Rasa Otentik Nusantara Sejak 2018",
  logo: "/images/logo.svg",
  banner: "/images/banner.svg",
  address: "Jl. Kaliurang KM 5 No. 42, Sleman, D.I. Yogyakarta",
  openingHours: "09:00 - 22:00 WIB",
  mapsUrl: "https://maps.google.com/?q=-7.7654,110.3789",
  instagram: "kopisenjarasa",
},
```

### Contoh Sesudah (Usaha Milik Anda):
```typescript
restaurant: {
  name: "Bakso Berkah Cak Har",
  tagline: "Bakso Urat Asli Daging Sapi Pilihan",
  logo: "/images/logo-bakso.png",
  banner: "/images/banner-bakso.jpg",
  address: "Jl. Ahmad Yani No. 15, Surabaya, Jawa Timur",
  openingHours: "10:00 - 21:00 WIB",
  mapsUrl: "https://maps.google.com/?q=bakso+cak+har+surabaya",
  instagram: "baksocakhar_official",
},
```

> **Tips Foto Logo & Banner:**
> Masukkan file foto logo dan banner Anda ke dalam folder **`public/images/`**. Lalu tuliskan nama filenya persis seperti contoh di atas (misal: `"/images/logo-bakso.png"`).

---

## 2. Mengubah Nomor WhatsApp Admin / Kasir

Buka file **`src/config/site.config.ts`**, cari bagian `whatsapp`:

> ⚠️ **PENTING:** Nomor WhatsApp **WAJIB** diawali dengan angka **`62`** (kode negara Indonesia). Jangan gunakan tanda plus (`+`) atau angka nol (`0`) di depan.

### Contoh Sebelum:
```typescript
whatsapp: {
  number: "6281234567890",
  openingMessage: "Halo Kasir, saya ingin memesan menu berikut via QR Menu:",
  orderTemplate: "Mohon konfirmasi ketersediaan menu dan total pembayaran ya. Terima kasih! 🙏",
},
```

### Contoh Sesudah:
```typescript
whatsapp: {
  number: "6285712345678", // Ganti dengan nomor WhatsApp aktif kasir Anda
  openingMessage: "Halo Bakso Cak Har, saya mau order menu:",
  orderTemplate: "Ditunggu pesanannya ya kak. Terima kasih! 🙏",
},
```

---

## 3. Mengganti Tema Tampilan (3 Preset Siap Pakai)

Anda dapat mengubah gaya tampilan website secara instan hanya dengan mengubah 1 kata pada `preset`:

Pilihan preset yang tersedia:
- `"modern"` ➔ Tampilan cerah, warna oranye/kuning hangat, sudut membulat modern. Cocok untuk kafe, resto kekinian, boba, bakery.
- `"classic"` ➔ Tampilan klasik berwibawa, warna emas amber, font serif elegan. Cocok untuk restoran keluarga, steakhouse, seafood.
- `"dark"` ➔ Mode gelap mewah, warna aksen emas elegan, latar hitam pekat. Cocok untuk lounge, bar, coffee shop malam, fine dining.

### Contoh Mengganti ke Tema Klasik:
```typescript
theme: {
  preset: "classic", // Cukup ubah kata ini: "modern" | "classic" | "dark"
  primaryColor: "#b45309",
  secondaryColor: "#1e293b",
  backgroundColor: "#fffdf5",
  textColor: "#0f172a",
  fontFamily: "'Playfair Display', Georgia, serif",
  borderRadius: "rounded-xl",
},
```

---

## 4. Mengaktifkan atau Mematikan Fitur

Semua fitur dapat Anda nyalakan (`true`) atau matikan (`false`) sesuai kebutuhan bisnis Anda di bagian `features`:

### Contoh Sebelum:
```typescript
features: {
  cart: true,             // Menyalakan keranjang belanja
  viewOnlyMode: false,    // Mode katalog saja tanpa keranjang (mati)
  multiLanguage: true,    // Tombol ganti bahasa ID/EN (aktif)
  quickFilter: true,      // Tombol filter cepat Terlaris/Pedas (aktif)
  shareMenu: true,        // Tombol bagikan link menu (aktif)
  contactWhatsApp: true,  // Tombol hubungi kasir (aktif)
  search: true,           // Bar pencarian menu (aktif)
  tableNumber: true,      // Fitur nomor meja (aktif)
  promoBanner: true,      // Carousel banner promo (aktif)
  darkMode: true,         // Deteksi mode gelap perangkat (aktif)
  itemNotes: true,        // Kolom catatan pada makanan (aktif)
  popularBadge: true,     // Label 'Terlaris' pada menu (aktif)
},
```

### Contoh Skenario: "Restoran Saya Hanya Ingin Menampilkan Buku Menu Digital (Tanpa Keranjang/Pemesanan Online)"
Jika Anda hanya ingin tamu melihat daftar menu dan memesan langsung ke pelayan:
```typescript
features: {
  cart: false,            // Matikan keranjang belanja
  viewOnlyMode: true,     // Nyalakan mode hanya lihat menu
  multiLanguage: true,    // Tetap aktifkan pilihan bahasa
  quickFilter: true,      // Tetap aktifkan filter
  shareMenu: true,
  contactWhatsApp: true,
  search: true,
  tableNumber: false,     // Matikan nomor meja
  promoBanner: true,
  darkMode: true,
  itemNotes: false,
  popularBadge: true,
},
```

---

## 5. Mengatur Banner Promo Diskon

Di file **`src/config/site.config.ts`**, cari bagian `promo`:

```typescript
promo: [
  {
    id: "promo-1",
    title: "🎉 Diskon 20% Hari Ini!",
    description: "Nikmati potongan harga spesial untuk pembelian menu Paket Hemat.",
    image: "/images/banner.svg",
    isActive: true, // Ubah ke false jika promo sudah berakhir
  },
]
```

---

## 6. Mengelola Menu (Menambah, Mengubah, Menghapus)

Buka file **`src/data/menu.json`**. File ini berisi dua bagian:
1. **`categories`** (Kategori Menu)
2. **`items`** (Daftar Makanan & Minuman)

### A. Mengelola Kategori
```json
{
  "categories": [
    { "id": "makanan-utama", "name": "Makanan Utama", "icon": "🍲" },
    { "id": "minuman", "name": "Minuman Segar", "icon": "🥤" },
    { "id": "camilan", "name": "Camilan & Snack", "icon": "🍟" }
  ]
}
```

### B. Menambah Item Menu Baru
Untuk menambahkan menu baru, cukup salin salah satu blok menu yang sudah ada, beri tanda koma di akhir blok sebelumnya, lalu tempel:

```json
{
  "id": "menu-bakso-urat",
  "categoryId": "makanan-utama",
  "name": "Bakso Urat Jumbo Spesial",
  "description": "Bakso urat sapi super kenyal disajikan dengan tahu, mie kuning, dan kuah kaldu sapi gurih.",
  "price": 28000,
  "image": "/images/menu-bakso.jpg",
  "isAvailable": true,
  "isPopular": true,
  "isNew": true,
  "tags": ["pedas", "terlaris"],
  "variants": [
    {
      "name": "Pilihan Kuah",
      "options": [
        { "name": "Kuah Original", "priceDelta": 0 },
        { "name": "Kuah Pedas Mercon", "priceDelta": 3000 }
      ]
    }
  ],
  "addons": [
    { "id": "add-pangsit", "name": "Pangsit Goreng Renyah (3 pcs)", "price": 5000 },
    { "id": "add-tetelan", "name": "Ekstra Tetelan Sapi Gurih", "price": 8000 }
  ]
}
```

#### Penjelasan Kolom Menu:
- **`id`**: Teks unik penanda menu (huruf kecil tanpa spasi, gunakan tanda hubung).
- **`categoryId`**: Wajib cocok dengan salah satu `id` kategori yang ada di atas.
- **`name`**: Nama makanan / minuman.
- **`description`**: Deskripsi lezat penjelas hidangan.
- **`price`**: Harga dalam angka rupiah tanpa titik (contoh: `28000` untuk Rp28.000).
- **`image`**: Lokasi file foto menu di folder `public/images/`.
- **`isAvailable`**: Isi `true` jika stok ada, atau `false` jika stok **Habis**.
- **`isPopular`**: Isi `true` jika ingin menampilkan badge **🔥 Terlaris**.
- **`isNew`**: Isi `true` jika ingin menampilkan badge **✨ Baru**.
- **`tags`**: Kata kunci filter cepat, misalnya `["pedas"]` atau `["vegetarian"]`.
- **`variants`**: Pilihan wajib pilih 1 (misal: ukuran mangkok, tingkat kuah, varian rasa). `priceDelta` adalah tambahan biaya jika opsi tersebut dipilih.
- **`addons`**: Pilihan tambahan opsional (misal: ekstra keju, es batu, pangsit).

### C. Menghapus Menu
Cukup hapus satu blok kurung kurawal `{ ... }` item yang tidak diinginkan, dan pastikan tanda koma sebelum atau sesudahnya tetap rapi.

---

Selesai! Simpan file Anda (`Ctrl + S` di Windows atau `Cmd + S` di Mac) dan lihat perubahannya langsung di browser! 🚀
