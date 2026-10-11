# 🍽️ Template Menu Digital QR Restoran & Kafe (WebQR Resto)

Selamat datang! Terima kasih telah membeli **Template Menu Digital QR**. Template ini dirancang khusus untuk pemilik restoran, kafe, warung makan, kedai kopi, dan UMKM kuliner di Indonesia yang ingin memiliki buku menu digital modern tanpa perlu bisa pemrograman (*no-coding required*).

Pelanggan cukup memindai (scan) kode QR di meja menggunakan kamera HP mereka, memilih menu, dan langsung mengirimkan pesanan rapi via WhatsApp ke kasir Anda!

---

## ✨ Apa Saja yang Ada di Dalam Produk Ini?

1. **Menu Digital Mobile-First**: Tampilan dirancang khusus pas di layar HP (ringan, cepat dibuka tanpa download aplikasi).
2. **Kustomisasi Tanpa Kode**: Semua informasi resto dan menu diatur hanya melalui 2 file:
   - `src/config/site.config.ts` (Identitas resto, nomor WhatsApp, tema, fitur)
   - `src/data/menu.json` (Daftar makanan, minuman, harga, foto, varian)
3. **Pesan Langsung via WhatsApp**: Rincian pesanan otomatis diformat rapi (nama pemesan, nomor meja, varian, catatan, dan total harga).
4. **3 Pilihan Tema Siap Pakai**:
   - `modern` (Cerah, hangat, rounded)
   - `classic` (Elegan, font klasik berwibawa)
   - `dark` (Mode gelap mewah & eksklusif)
5. **Mode "Hanya Lihat Menu" (View Only)**: Opsi mematikan keranjang jika restoran Anda hanya ingin memajang buku menu digital tanpa pesanan online.
6. **Multi-Bahasa Ringan (ID / EN)**: Pengunjung turis bisa mengganti bahasa dengan 1 tombol.
7. **Filter Cepat**: Tombol filter otomatis untuk menu "🔥 Terlaris", "✨ Baru", "🌶️ Pedas", dan "🥗 Vegetarian".
8. **Generator & Cetak QR Meja (/qr)**: Halaman khusus untuk mencetak kartu nomor meja siap cetak di kertas A4 (6 kartu per lembar).
9. **Siap Tambah ke Layar Utama (PWA)**: Bisa disimpan di layar utama HP selayaknya aplikasi.

---

## 💻 Persiapan Awal (Hanya Butuh Sekali Saja)

Sebelum mulai mengedit, pastikan komputer/laptop Anda sudah terpasang software **Node.js**.

### Langkah 1: Pasang Node.js
1. Buka situs resmi: [https://nodejs.org/](https://nodejs.org/)
2. Unduh versi **LTS (Recommended for Most Users)**.
3. Buka file installer yang baru diunduh, klik **Next** hingga selesai (biarkan semua pengaturan default).
4. Untuk memastikan sudah terpasang, buka **Terminal / Command Prompt (CMD)** dan ketik:
   ```bash
   node -v
   ```
   *(Jika muncul angka versi seperti `v20.x.x` atau `v22.x.x`, berarti instalasi berhasil).*

---

## 🚀 Cara Menjalankan di Komputer Sendiri (Mode Edit)

Ikuti 3 langkah mudah berikut untuk melihat tampilan menu di laptop Anda:

### Langkah 1: Buka Folder Proyek di Terminal
Buka folder proyek ini di VS Code atau terminal Command Prompt komputer Anda.

### Langkah 2: Pasang Paket Pendukung
Ketik perintah berikut lalu tekan **Enter**:
```bash
npm install
```
*(Tunggu sekitar 10-30 detik hingga proses pemasangan selesai. Langkah ini hanya perlu dijalankan sekali saat pertama kali).*

### Langkah 3: Jalankan Web Menu
Ketik perintah berikut lalu tekan **Enter**:
```bash
npm run dev
```

Di layar akan muncul tulisan:
```text
  ➜  Local:   http://localhost:5173/
```

Klik tautan tersebut atau buka browser (Chrome / Edge) dan ketik alamat:
👉 **`http://localhost:5173/`**

Selamat! Menu digital Anda sekarang sudah menyala di browser komputer Anda. Setiap kali Anda mengubah tulisan di file config atau menu, browser akan otomatis memperbarui tampilan tanpa perlu dimuat ulang (*auto-refresh*).

---

## 📦 Cara Mempersiapkan File untuk Diunggah (Build)

Setelah Anda selesai mengedit nama restoran, nomor WhatsApp, dan menu:

1. Buka terminal di folder proyek.
2. Jalankan perintah:
   ```bash
   npm run build
   ```
3. Folder baru bernama **`dist/`** akan otomatis dibuat. Folder `dist/` inilah yang berisi website siap tayang yang bisa diunggah ke hosting gratis (Vercel, Netlify, atau Cloudflare Pages).

---

## 📚 Buku Panduan Lengkap Lainnya

Kami telah menyediakan panduan langkah-demi-langkah terpisah yang sangat mudah dipahami:

1. 🎨 **[PANDUAN-KUSTOMISASI.md](./PANDUAN-KUSTOMISASI.md)**: Panduan mengganti nama restoran, logo, warna tema, nomor WhatsApp, menambah menu, foto, dan menyalakan/mematikan fitur.
2. 🌐 **[PANDUAN-DEPLOY.md](./PANDUAN-DEPLOY.md)**: Panduan menaruh menu ke internet secara gratis (Vercel, Netlify, Cloudflare Pages) dan memasang domain Anda sendiri (misal: `menuku.com`).
3. 🖨️ **[PANDUAN-QR.md](./PANDUAN-QR.md)**: Panduan membuat dan mencetak kartu barcode QR per meja ke kertas A4.
4. ❓ **[FAQ.md](./FAQ.md)**: Solusi untuk pertanyaan dan masalah umum yang sering dihadapi.
5. 📜 **[LICENSE.txt](./LICENSE.txt)**: Lisensi resmi penggunaan komersial template ini.

---

Semoga usaha kuliner Anda semakin laris, praktis, dan profesional bersama **WebQR Resto**! 🚀
