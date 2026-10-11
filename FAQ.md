# ❓ FAQ & Solusi Kendala Umum (Troubleshooting)

Berikut adalah daftar pertanyaan yang paling sering ditanyakan beserta solusi mudah langkah-demi-langkah jika Anda mengalami kendala saat menggunakan template ini.

---

### Q1: Mengapa foto menu atau logo saya tidak muncul (gambar pecah / icon tanda tanya)?
**Penyebab & Solusi:**
1. **Lokasi File Salah**: Pastikan semua foto Anda ditaruh di dalam folder **`public/images/`**. Jangan ditaruh di folder `src/`.
2. **Penulisan Huruf Besar/Kecil (Case Sensitivity)**: Di server internet (Linux), huruf besar dan kecil dianggap berbeda.
   - Jika nama file Anda `nasi-goreng.jpg`, jangan menulis `nasi-goreng.JPG` atau `Nasi-Goreng.jpg`.
3. **Penulisan Garis Miring**: Selalu awali dengan tanda garis miring di config/JSON:
   - ✅ Benar: `"/images/menu-1.jpg"`
   - ❌ Salah: `"images/menu-1.jpg"` atau `"./public/images/menu-1.jpg"`
4. **Format File**: Pastikan format file adalah format web standar: `.jpg`, `.jpeg`, `.png`, `.webp`, atau `.svg`.

---

### Q2: Mengapa tombol WhatsApp tidak terbuka atau nomor tujuan salah?
**Penyebab & Solusi:**
1. **Format Nomor Wajib 62**: Pastikan nomor WhatsApp di `site.config.ts` diawali dengan kode negara **`62`**:
   - ✅ Benar: `"6281234567890"`
   - ❌ Salah: `"081234567890"` (jangan pakai angka 0 di depan)
   - ❌ Salah: `"+6281234567890"` (jangan pakai tanda plus)
   - ❌ Salah: `"62 812-3456-7890"` (jangan pakai spasi atau tanda hubung)
2. **Pemblokir Pop-up Browser**: Beberapa browser HP memblokir tab baru secara otomatis. Klik tombol "Izinkan pop-up" jika muncul notifikasi di bagian atas layar HP Anda.

---

### Q3: Tampilan website muncul kotak merah peringatan di bagian atas, ada apa?
**Penyebab & Solusi:**
Jangan panik! Itu adalah fitur penyelamat otomatis (*Config Error Alert*). Fitur ini aktif jika ada salah ketik di `menu.json` atau `site.config.ts`.
- **Baca pesan di dalam kotak merah tersebut**. Pesan akan secara spesifik menyebutkan kesalahannya, contoh:
  - *"Nama restoran tidak boleh kosong"*
  - *"Item 'Mie Ayam': 'price' harus berupa angka"*
  - *"Item 'Es Teh': Memiliki categoryId yang tidak ada di daftar categories"*
- Buka file yang disebutkan, perbaiki bagian yang keliru, dan kotak merah akan otomatis hilang seketika saat data sudah benar.

---

### Q4: Mengapa nomor meja pelanggan tidak terkunci otomatis di keranjang?
**Penyebab & Solusi:**
Nomor meja hanya akan terkunci jika pelanggan membuka link yang memiliki kode meja di belakangnya:
- Pastikan QR code yang Anda cetak mengarah ke alamat dengan format:
  `https://domain-resto-anda.com/?meja=5` (bukan hanya `https://domain-resto-anda.com/`).
- Jika pelanggan membuka website biasa tanpa memindai QR meja, mereka tetap bisa mengetikkan nomor meja secara manual di dalam keranjang belanja.

---

### Q5: Saya sudah mengubah harga/menu di laptop dan deploy, tapi saat dibuka di HP kok menunya belum berubah?
**Penyebab & Solusi:**
Ini terjadi karena **Cache Browser di HP** atau **PWA Service Worker** masih menyimpan tampilan lama agar website cepat dibuka.
**Cara Mengatasinya:**
1. Buka browser di HP Anda (Chrome/Safari), lakukan **Refresh** halaman (tarik layar dari atas ke bawah).
2. Atau buka menu browser di HP ➔ pilih **"Buka di Tab Samaran" (Incognito Mode)** untuk melihat tampilan terbaru secara instan.
3. Di file `public/sw.js`, Anda bisa menaikkan angka versi cache jika ingin memaksa pembaruan untuk semua orang:
   ```javascript
   const CACHE_NAME = 'resto-qr-cache-v2'; // Ubah v1 ke v2
   ```

---

### Q6: Bagaimana jika saya ingin mematikan fitur pemesanan online dan hanya ingin memajang menu digital saja?
**Penyebab & Solusi:**
Buka file **`src/config/site.config.ts`**, ubah dua baris ini:
```typescript
features: {
  cart: false,          // Matikan keranjang belanja
  viewOnlyMode: true,   // Aktifkan mode katalog saja
  // ... fitur lainnya biarkan seperti biasa
}
```
Tombol keranjang floating akan hilang, tombol pesanan akan berubah menjadi tombol *"Detail"*, dan modal menu akan menampilkan keterangan ramah: *"Pemesanan langsung ke kasir atau pelayan"*.

---

### Q7: Apakah website ini bisa dibuka jika internet pelanggan sedang lambat?
**Penyebab & Solusi:**
**Ya, sangat bisa!** Template ini dibuat sangat ringan (skor performa Google Lighthouse 95/100). Ukuran file utamanya di bawah 100 kB dan gambar menggunakan sistem *lazy-loading* (hanya dimuat saat digulir ke layar). Selain itu, sistem Service Worker akan menyimpan cache data sehingga menu tetap bisa dibaca meskipun sinyal di restoran Anda kurang stabil.

---

### Q8: Bagaimana jika saya ingin mengganti mata uang atau format rupiah?
**Penyebab & Solusi:**
Secara default, template ini menggunakan mata uang resmi Indonesia (**Rupiah / IDR**) dengan format standar `RpXX.XXX`. Jika Anda memerlukan mata uang lain (misal RM / SGD / USD), Anda dapat mengubah format pada file `src/utils/currency.ts`.

---

Jika Anda memiliki pertanyaan lain yang belum terjawab di sini, silakan hubungi tim dukungan kami melalui kontak yang tertera pada platform tempat Anda membeli template ini. Selamat berjualan! 🌟
