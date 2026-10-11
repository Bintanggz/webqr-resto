import fs from 'fs';
import path from 'path';

const demoName = (process.argv[2] || '').toLowerCase().trim();
const validDemos = ['cafe', 'warung', 'seafood'];

if (!validDemos.includes(demoName)) {
  console.error(`❌ Nama demo tidak valid! Pilihan yang tersedia: ${validDemos.join(', ')}`);
  console.log('Contoh penggunaan: node scripts/switch-demo.js cafe');
  process.exit(1);
}

const rootDir = process.cwd();
const demoDir = path.join(rootDir, 'demos', demoName);
const targetConfig = path.join(rootDir, 'src', 'config', 'site.config.ts');
const targetMenu = path.join(rootDir, 'src', 'data', 'menu.json');

const sourceConfig = path.join(demoDir, 'site.config.ts');
const sourceMenu = path.join(demoDir, 'menu.json');

if (!fs.existsSync(sourceConfig) || !fs.existsSync(sourceMenu)) {
  console.error(`❌ File demo untuk '${demoName}' tidak lengkap di folder: ${demoDir}`);
  process.exit(1);
}

try {
  // Salin site.config.ts
  fs.copyFileSync(sourceConfig, targetConfig);
  // Salin menu.json
  fs.copyFileSync(sourceMenu, targetMenu);

  console.log('==================================================');
  console.log(`🎉 BERHASIL BERALIH KE DEMO: ${demoName.toUpperCase()}`);
  console.log(`📁 Sumber Config : demos/${demoName}/site.config.ts -> src/config/site.config.ts`);
  console.log(`📁 Sumber Menu   : demos/${demoName}/menu.json -> src/data/menu.json`);
  console.log('==================================================');
  console.log('Jalankan "npm run dev" untuk melihat perubahannya di browser.');
} catch (error) {
  console.error('❌ Gagal menyalin file demo:', error);
  process.exit(1);
}
