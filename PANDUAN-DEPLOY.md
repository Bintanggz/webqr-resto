# 🌐 Panduan Deploy Website Menu Digital (100% Gratis Selamanya)

Setelah Anda selesai mengedit nama restoran dan daftar menu di laptop Anda, saatnya menaruh website menu digital ini ke internet agar bisa diakses oleh pelanggan melalui kode QR.

Template ini berjenis **Static Web App**, artinya Anda **TIDAK PERLU** menyewa server/hosting bulanan yang mahal. Anda bisa menggunakan layanan hosting cloud kelas dunia secara **GRATIS 100% selamanya**!

Ada 3 pilihan hosting gratis terbaik yang kami rekomendasikan:
1. **Vercel** *(Paling Populer & Mudah)*
2. **Netlify** *(Bisa Drag-and-Drop Folder tanpa Git)*
3. **Cloudflare Pages** *(Super Cepat & Unlimited Bandwidth)*

---

## Persiapan Wajib: Menghasilkan Folder `dist/`

Sebelum mengunggah, Anda harus menghasilkan folder produksi (`dist/`) terlebih dahulu:

1. Buka terminal di folder proyek Anda.
2. Jalankan perintah:
   ```bash
   npm run build
   ```
3. Tunggu beberapa detik hingga muncul pesan `✓ built in ...ms`.
4. Anda sekarang memiliki folder bernama **`dist/`** di dalam folder proyek Anda. Folder `dist/` inilah yang berisi seluruh website menu Anda.

---

## Opsi 1: Deploy ke Vercel (Sangat Direkomendasikan)

Vercel adalah platform hosting modern yang sangat cepat dan otomatis.

### Cara Melalui Akun GitHub (Otomatis):
1. Buat akun gratis di [https://github.com/](https://github.com/).
2. Buat repositori baru (*New Repository*), lalu unggah (*push*) folder proyek Anda ke sana.
3. Buka situs [https://vercel.com/](https://vercel.com/) dan daftar menggunakan akun GitHub Anda.
4. Di dashboard Vercel, klik tombol **"Add New..."** ➔ **"Project"**.
5. Pilih repositori menu Anda, lalu klik **"Import"**.
6. Pada bagian pengaturan proyek:
   - **Framework Preset**: Pilih **Vite**.
   - **Build Command**: `npm run build` (otomatis terisi).
   - **Output Directory**: `dist` (otomatis terisi).
7. Klik tombol biru **"Deploy"**.
8. Tunggu sekitar 1 menit. Website menu Anda sudah online dengan alamat seperti:
   👉 `https://nama-resto-anda.vercel.app`

---

## Opsi 2: Deploy ke Netlify (Metode Termudah Tanpa Koding)

Jika Anda tidak ingin repot menggunakan GitHub, Anda bisa langsung menarik (*drag-and-drop*) folder `dist/` ke Netlify!

### Langkah-langkah Drag-and-Drop:
1. Buka situs [https://www.netlify.com/](https://www.netlify.com/) dan buat akun gratis.
2. Masuk ke halaman dashboard Netlify Anda.
3. Pilih menu **"Sites"**.
4. Cari area bertuliskan **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**.
5. Buka File Explorer di laptop Anda, tarik (*drag*) folder **`dist/`** dari komputer Anda dan lepaskan (*drop*) ke kotak di layar Netlify tersebut.
6. Tunggu beberapa detik hingga proses upload selesai.
7. Website Anda langsung tayang dengan alamat seperti:
   👉 `https://random-name.netlify.app`
8. Anda bisa mengganti nama alamat tersebut di menu **Site Configuration** ➔ **Change Site Name** (contoh: `https://menu-baksocakhar.netlify.app`).

---

## Opsi 3: Deploy ke Cloudflare Pages

Cloudflare terkenal dengan kecepatan server lokal di Indonesia dan bandwidth gratis tanpa batas.

### Langkah-langkah:
1. Buka situs [https://pages.cloudflare.com/](https://pages.cloudflare.com/) dan daftar akun gratis.
2. Di dashboard, pilih **Workers & Pages** ➔ **Create application** ➔ **Pages**.
3. Pilih **Upload assets** (jika ingin upload folder `dist/` langsung) atau **Connect to Git**.
4. Beri nama proyek restoran Anda (misal: `menu-kedaikopi`).
5. Upload folder **`dist/`** Anda.
6. Klik **"Deploy site"**.
7. Website Anda langsung online di alamat:
   👉 `https://menu-kedaikopi.pages.dev`

---

## 🏷️ Cara Memasang Domain Sendiri (Contoh: `www.restoku.com`)

Jika Anda sudah memiliki nama domain sendiri (seperti `menuresto.com` atau `kedaikopi.id`), Anda bisa menghubungkannya dengan mudah:

### Di Vercel:
1. Masuk ke dashboard proyek Vercel Anda.
2. Klik tab **Settings** ➔ **Domains**.
3. Ketik nama domain Anda (misal: `menu.restoku.com` atau `restoku.com`) lalu klik **Add**.
4. Vercel akan menampilkan petunjuk DNS (biasanya berupa catatan **CNAME** `cname.vercel-dns.com` atau **A Record** `76.76.21.21`).
5. Buka dashboard tempat Anda membeli domain (misal: Niagahoster, Domainesia, Rumahweb, GoDaddy), masuk ke menu **DNS Management**, dan masukkan catatan CNAME/A tersebut.
6. Tunggu proses propagasi (biasanya 5–30 menit). Domain Anda sudah aktif dan bersertifikat SSL (gembok hijau) gratis!

### Di Netlify:
1. Buka dashboard situs Anda di Netlify.
2. Masuk ke **Domain management** ➔ **Add a domain**.
3. Masukkan nama domain Anda, lalu ikuti instruksi pengaturan DNS yang diberikan Netlify.

---

Setelah website menu Anda online dan memiliki tautan resmi (misal: `https://menu.restoku.com`), lanjutkan ke panduan berikutnya untuk mencetak kartu barcode QR meja:
👉 **[PANDUAN-QR.md](./PANDUAN-QR.md)**
