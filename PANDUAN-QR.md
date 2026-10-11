# 🖨️ Panduan Membuat & Mencetak QR Code Meja (Siap Pakai)

Template ini telah dilengkapi dengan sistem **Generator QR Code Otomatis** di halaman **`/qr`**. Anda tidak perlu repot membuat barcode satu per satu di situs generator luar yang berbayar atau dipenuhi iklan!

Dengan fitur ini, Anda bisa menghasilkan kartu nomor meja siap cetak yang rapi dan serasi dengan identitas restoran Anda.

---

## 🚀 Cara Mengakses Halaman Generator QR

Ada 2 cara mudah membuka halaman generator QR:

1. **Melalui Browser Langsung**:
   Buka alamat website Anda ditambah akhiran **`/qr`**:
   - Jika masih di laptop: `http://localhost:5173/qr`
   - Jika sudah online: `https://menu-resto-anda.vercel.app/qr`
2. **Melalui Tombol di Bagian Bawah Menu**:
   Buka website menu utama, gulir ke bagian paling bawah (footer), lalu klik tombol:
   👉 **`🖨️ Cetak QR Meja Restoran (/qr)`**

---

## ⚙️ Langkah Mengatur Nomor Meja

Di bagian atas halaman `/qr`, Anda akan melihat panel pengaturan sederhana:

1. **URL Menu (Domain Web)**:
   - Masukkan alamat website online restoran Anda (contoh: `https://menu-restoku.vercel.app`).
   - Barcode QR akan otomatis dihubungkan dengan parameter meja, misalnya:
     - Meja 1 ➔ `https://menu-restoku.vercel.app/?meja=1`
     - Meja 2 ➔ `https://menu-restoku.vercel.app/?meja=2`
     - Meja 20 ➔ `https://menu-restoku.vercel.app/?meja=20`
   - Saat pelanggan memindai barcode di meja mereka, nomor meja akan otomatis terisi dan terkunci di keranjang pesanan. Pelanggan tidak bisa salah memasukkan nomor meja!

2. **Nomor Meja Awal & Nomor Meja Akhir**:
   - Tentukan rentang meja di restoran Anda.
   - Contoh: Jika resto Anda memiliki 15 meja, isi:
     - Meja Awal: `1`
     - Meja Akhir: `15`
   - Seluruh 15 kartu QR meja akan otomatis dibuat seketika!

---

## 📄 Cara Mencetak Semua Kartu ke Kertas A4 (Sekali Klik)

Halaman ini sudah dirancang dengan **CSS Print Khusus Kertas A4** dengan format **6 kartu per lembar kertas**:

1. Klik tombol hijau/oranye di bagian atas:
   👉 **`Cetak Semua Meja (... Kartu)`**
   *(Atau tekan kombinasi keyboard `Ctrl + P` di Windows / `Cmd + P` di Mac).*
2. Kotak dialog cetak browser akan terbuka.
3. **Pengaturan Wajib di Dialog Print Browser**:
   - **Destination**: Pilih printer Anda atau pilih *"Save as PDF"* jika ingin menyimpan file dulu.
   - **Pages**: All (Semua).
   - **Layout**: **Portrait** (Tegak).
   - **Paper Size**: **A4**.
   - **Margins**: **Default** atau **Minimum**.
   - **Options (PENTING)**: Centang pilihan **`Background graphics`** (Grafis latar belakang) agar warna badge nomor meja dan border tercetak tajam.
4. Klik **Print** atau **Save**.

Setiap lembar A4 akan memuat persis 6 kartu dengan garis putus-putus (*cut line*) di sekelilingnya sehingga sangat mudah digunting lurus.

---

## 💾 Cara Mengunduh Gambar PNG Per Meja

Jika Anda ingin mendesain ulang kartu menggunakan Canva / CorelDraw / Photoshop:

1. Di setiap kartu meja di layar, terdapat tombol ikon unduh (**Download**) di pojok kanan atas.
2. Klik tombol tersebut untuk mengunduh gambar kartu meja dalam format **PNG Resolusi Tinggi (High-Resolution)**.
3. File gambar akan otomatis tersimpan di folder *Downloads* komputer Anda dengan nama `QR-Meja-1-...png`.

---

## 🖥️ Opsi Ekspor Batch Lewat Terminal (Skrip Node.js)

Bagi Anda yang ingin menyimpan gambar PNG seluruh meja ke folder komputer secara otomatis sekaligus:

1. Buka terminal di folder proyek.
2. Jalankan perintah:
   ```bash
   node scripts/generate-qr.js https://nama-resto-anda.com 20
   ```
   *(Ganti `https://nama-resto-anda.com` dengan alamat web Anda, dan `20` dengan jumlah meja).*
3. Seluruh file barcode meja akan otomatis tersimpan rapi di folder **`output-qr/`** komputer Anda.

---

## 💡 Tips & Rekomendasi Cetak Agar Tampil Mewah & Tahan Lama

Agar kartu QR di meja restoran Anda terlihat profesional dan tahan tumpahan air/kuah makanan:

1. **Gunakan Kertas Tebal**:
   Gunakan jenis kertas **Art Carton 260 gsm** atau **Kertas Buffalo/Ivory tebal**. Jangan gunakan kertas HVS biasa karena mudah kusut.
2. **Laminasi (Lamination)**:
   Minta tempat percetakan / fotokopi untuk menambahkan **Laminasi Doff** (kesan mewah matte) atau **Laminasi Glossy** (mengkilap). Ini membuat kartu tahan air dan bisa dilap jika terkena tumpahan saus atau minuman.
3. **Gunakan Akrilik Meja (Table Tent Acrylic)**:
   Beli dudukan akrilik bening model T-Stand atau L-Stand ukuran 3R / 4R di marketplace (Shopee / Tokopedia seharga Rp8.000 - Rp15.000). Masukkan kartu QR ke dalam akrilik agar berdiri tegak di tengah meja.

---

Kartu QR Anda siap dipajang di meja pelanggan! 🎉
