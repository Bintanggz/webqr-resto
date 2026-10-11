# 📋 Catatan Perubahan (Changelog)

Semua pembaruan dan riwayat versi resmi dari template **WebQR Resto** dicatat di dokumen ini.

Format penomoran versi mengikuti standar [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

---

## [1.0.0] - 2026-10-11 (Rilis Perdana Siap Komersial)

Ini adalah rilis komersial pertama yang siap dijual kepada UMKM, agensi, dan pemilik usaha kuliner di Indonesia.

### ✨ Fitur Utama (Core Features)
- **Arsitektur Zero-Code**: Seluruh identitas restoran dan daftar menu dikendalikan hanya melalui 2 file: `site.config.ts` dan `menu.json`.
- **Integrasi WhatsApp**: Tombol checkout menyusun rincian pesanan rapi (nama pelanggan, nomor meja, varian, add-on, catatan, dan total harga) yang langsung membuka aplikasi WhatsApp.
- **Kategori & Scroll-Spy**: Tab kategori sticky di bagian atas dengan scroll-spy yang otomatis menyorot kategori aktif saat halaman digulir.
- **Pencarian Real-Time**: Bar pencarian instan menyaring nama menu dan deskripsi tanpa delay.
- **Varian & Add-ons**: Dukungan opsi wajib (ukuran, tingkat kepedasan) dan add-on berbayar opsional.
- **Status Jam Operasional**: Otomatis mendeteksi waktu buka atau tutup restoran berdasarkan konfigurasi `openingHours`.
- **Kunci Nomor Meja dari QR**: Parameter query `?meja=N` otomatis mengisi dan mengunci nomor meja di header dan keranjang agar pelanggan tidak salah ketik.

### 🎨 Sistem Tema & Estetika
- **3 Preset Tema Siap Pakai**:
  - `modern`: Warna kuning/oranye hangat cerah, sudut membulat modern, font *Plus Jakarta Sans*.
  - `classic`: Warna amber/emas klasik, latar krem hangat, font serif *Playfair Display*.
  - `dark`: Mode gelap mewah elegan dengan kontras teks tinggi standar WCAG AA.
- **Dukungan Mode Gelap Otomatis**: Mendeteksi preferensi OS perangkat jika fitur `darkMode` diaktifkan.

### 🛠️ Fitur Fleksibel Tambahan (Toggleable)
- **Mode Hanya Lihat Menu (View-Only)**: Saklar `features.viewOnlyMode` untuk restoran yang hanya ingin memajang buku menu digital tanpa pesanan online.
- **Multi-Bahasa Ringan (ID / EN)**: Pilihan tombol saklar bahasa Indonesia dan Inggris dengan file terjemahan terpisah (`translations.json`).
- **Filter Cepat (Quick Filters)**: Filter instan berdasarkan tag menu: *"🔥 Terlaris"*, *"✨ Baru"*, *"🌶️ Pedas"*, dan *"🥗 Vegetarian"*.
- **Tombol Bagikan Menu**: Menggunakan native Web Share API dengan fallback salin tautan ke clipboard otomatis.
- **Tombol Hubungi Kasir**: Tautan langsung ke WhatsApp kasir untuk bertanya seputar reservasi atau menu.
- **Halaman 404 & State Pencarian Kosong**: Tampilan ramah pengguna dengan tombol kembali jika halaman atau menu tidak ditemukan.
- **Footer Lengkap**: Menampilkan alamat, tombol buka Google Maps, jam operasional, dan tautan Instagram.

### 🖨️ Generator & Pencetakan QR Meja (/qr)
- **Halaman `/qr` Client-Side**: Generator barcode instan dengan preview kartu siap cetak.
- **Tata Letak Kertas A4**: CSS `@media print` otomatis menata **6 kartu per lembar A4** lengkap dengan garis putus-putus (*cut line*).
- **Download PNG Resolusi Tinggi**: Tombol unduh file gambar kartu per meja (600×780 px).
- **Skrip Node.js CLI**: Perintah `node scripts/generate-qr.js` untuk mengekspor batch QR ke folder `output-qr/`.

### ⚡ Optimasi Performa & SEO (Google Lighthouse Mobile)
- **Skor Audit Resmi**:
  - 🚀 **Performance**: **95 / 100** (FCP: 2.4s, LCP: 2.4s, TBT: 0 ms)
  - ♿ **Accessibility**: **94 / 100** (Area sentuh tombol ≥ 44px)
  - 🛡️ **Best Practices**: **100 / 100**
  - 🔍 **SEO**: **92 / 100**
  - 📐 **Cumulative Layout Shift (CLS)**: **0** (Stabil total tanpa pergeseran layout)
- **PWA Ready**: Dilengkapi `manifest.json` (*Add to Home Screen*) dan Service Worker `sw.js` untuk cache offline.
- **Open Graph Preview**: Meta tags dinamis agar pratinjau tautan di WhatsApp dan media sosial tampil rapi dengan foto banner besar.
- **Code Splitting**: Modul generator QR code di-*lazy load* sehingga pelanggan HP tidak terbebani library yang tidak dibutuhkan.

### 📁 Paket Demo Siap Pakai
- **3 Data Demo Industri Kuliner**:
  - `demos/cafe/`: Demo Kafe Specialty Coffee & Artisan Bakery (Preset Modern).
  - `demos/warung/`: Demo Warung Makan Rumahan Nusantara (Preset Classic).
  - `demos/seafood/`: Demo Restoran Seafood Pantai (Preset Dark).
- **Perintah CLI Instan**:
  - `npm run demo:cafe`
  - `npm run demo:warung`
  - `npm run demo:seafood`

### 📚 Dokumentasi Lengkap
- `README.md` (Panduan instalasi dan persiapan).
- `PANDUAN-KUSTOMISASI.md` (Panduan sebelum-sesudah untuk pemilik resto).
- `PANDUAN-DEPLOY.md` (Panduan deploy gratis ke Vercel, Netlify, Cloudflare Pages, dan custom domain).
- `PANDUAN-QR.md` (Panduan cetak kartu QR meja A4).
- `FAQ.md` (Solusi kendala teknis umum).
- `LICENSE.txt` (Lisensi komersial resmi).
