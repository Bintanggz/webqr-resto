/**
 * Skrip Node.js untuk Generate QR Code Meja Batch
 * Jalankan: node scripts/generate-qr.js [baseUrl] [totalMeja]
 * Contoh: node scripts/generate-qr.js https://resto-saya.com 20
 */

import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

// Parameter input dari argumen CLI atau default
const baseUrl = process.argv[2] || 'https://contoh-resto.com';
const totalMeja = parseInt(process.argv[3] || '20', 10);
const outputDir = path.resolve(process.cwd(), 'output-qr');

console.log('==================================================');
console.log('🚀 GENERATOR QR CODE MEJA RESTORAN');
console.log(`🌐 Base URL   : ${baseUrl}`);
console.log(`🪑 Total Meja : ${totalMeja}`);
console.log(`📁 Folder     : ${outputDir}`);
console.log('==================================================\n');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateAll() {
  const cleanBase = baseUrl.replace(/\/+$/, '');

  for (let meja = 1; meja <= totalMeja; meja++) {
    const tableUrl = `${cleanBase}/?meja=${meja}`;
    const filename = `qr-meja-${String(meja).padStart(2, '0')}.png`;
    const filePath = path.join(outputDir, filename);

    try {
      await QRCode.toFile(filePath, tableUrl, {
        width: 600,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });
      console.log(`✅ [Meja ${meja}] Disimpan ke: ${filename} -> ${tableUrl}`);
    } catch (err) {
      console.error(`❌ [Meja ${meja}] Gagal:`, err);
    }
  }

  console.log('\n🎉 Selesai! Semua QR Code meja berhasil digenerate.');
  console.log(`Cek file gambar di folder: ${outputDir}`);
}

generateAll();
