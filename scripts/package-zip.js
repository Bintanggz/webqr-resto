import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = packageJson.version || '1.0.0';
const zipName = `webqr-resto-v${version}.zip`;
const stagingDir = path.join(rootDir, 'temp-staging-package');

console.log('==================================================');
console.log('📦 MEMBUAT PAKET RILIS BERSIH UNTUK DISTRIBUSI');
console.log(`🏷️ Versi      : v${version}`);
console.log(`📁 Nama File  : ${zipName}`);
console.log('==================================================\n');

// Bersihkan folder staging dan file zip lama jika ada
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
const targetZipPath = path.join(rootDir, zipName);
if (fs.existsSync(targetZipPath)) {
  fs.unlinkSync(targetZipPath);
}

fs.mkdirSync(stagingDir, { recursive: true });

// Daftar file dan folder yang harus dimasukkan ke dalam rilis
const itemsToInclude = [
  'src',
  'public',
  'demos',
  'scripts',
  'index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  '.oxlintrc.json',
  '.gitignore',
  'README.md',
  'PANDUAN-KUSTOMISASI.md',
  'PANDUAN-DEPLOY.md',
  'PANDUAN-QR.md',
  'FAQ.md',
  'LICENSE.txt',
  'CHANGELOG.md',
];

// Salin file/folder ke folder staging
for (const item of itemsToInclude) {
  const srcPath = path.join(rootDir, item);
  const destPath = path.join(stagingDir, item);

  if (fs.existsSync(srcPath)) {
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
      console.log(`  📂 Disalin folder : ${item}`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  📄 Disalin file   : ${item}`);
    }
  } else {
    console.warn(`  ⚠️ Melewati (tidak ditemukan): ${item}`);
  }
}

console.log('\n⏳ Mengompres file ke ZIP...');

try {
  // Gunakan PowerShell Compress-Archive di Windows atau zip di Unix
  if (process.platform === 'win32') {
    const psCommand = `powershell -NoProfile -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${targetZipPath}' -Force"`;
    execSync(psCommand, { stdio: 'inherit' });
  } else {
    execSync(`cd "${stagingDir}" && zip -r "${targetZipPath}" .`, { stdio: 'inherit' });
  }

  // Bersihkan folder staging
  fs.rmSync(stagingDir, { recursive: true, force: true });

  const stats = fs.statSync(targetZipPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  const sizeKB = (stats.size / 1024).toFixed(0);

  console.log('\n==================================================');
  console.log(`🎉 BERHASIL! File ZIP bersih siap didistribusikan:`);
  console.log(`📦 Lokasi : ${targetZipPath}`);
  console.log(`📊 Ukuran : ${sizeKB} KB (${sizeMB} MB)`);
  console.log('✅ Bebas dari node_modules, .git, dan file sampah pengujian!');
  console.log('==================================================');
} catch (err) {
  console.error('❌ Gagal mengompres ZIP:', err);
  // Bersihkan folder staging jika gagal
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  process.exit(1);
}
