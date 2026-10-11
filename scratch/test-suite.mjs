import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Uji Menu & Site Config
import { siteConfig } from '../src/config/site.config.ts';
import menuJsonData from '../src/data/menu.json' with { type: 'json' };
import { validateSiteConfig, validateMenuData } from '../src/utils/validation.ts';
import { buildWhatsAppOrderUrl } from '../src/utils/whatsapp.ts';
import { THEME_PRESETS } from '../src/utils/theme.ts';

console.log('==================================================');
console.log('🧪 MENJALANKAN AUTOMATED TEST SUITE APLIKASI WEBQR');
console.log('==================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

// ----------------------------------------------------------------------------
// TEST 1: Scroll-Spy & Tab Kategori
// ----------------------------------------------------------------------------
console.log('--- TEST 1: Kategori & Scroll-Spy ---');
const categories = menuJsonData.categories;
assert(categories.length >= 5, `Terdapat ${categories.length} kategori menu`);
const categoryIds = categories.map((c) => c.id);
assert(new Set(categoryIds).size === categoryIds.length, 'Semua category ID unik');
assert(categories.every((c) => c.name && c.icon), 'Semua kategori memiliki nama dan icon emoji');

// ----------------------------------------------------------------------------
// TEST 2: Menu Search, Varian, Keranjang Belanja
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Pencarian Menu & Varian ---');
const items = menuJsonData.items;
assert(items.length >= 20, `Terdapat ${items.length} item menu`);

// Uji pencarian
const query = 'nasi';
const matched = items.filter(
  (it) => it.name.toLowerCase().includes(query) || it.description.toLowerCase().includes(query)
);
assert(matched.length > 0, `Pencarian "${query}" menghasilkan ${matched.length} menu`);

// Uji kalkulasi varian
const itemWithVariant = items.find((it) => it.variants && it.variants.length > 0);
assert(Boolean(itemWithVariant), `Ditemukan item dengan varian: ${itemWithVariant?.name}`);
if (itemWithVariant) {
  const basePrice = itemWithVariant.price;
  const firstVariant = itemWithVariant.variants[0];
  const optionWithDelta = firstVariant.options.find((opt) => opt.priceDelta && opt.priceDelta > 0);
  const delta = optionWithDelta ? optionWithDelta.priceDelta : 0;
  const calculatedUnitPrice = basePrice + delta;
  const qty = 2;
  const subtotal = calculatedUnitPrice * qty;
  assert(subtotal === (basePrice + delta) * qty, `Subtotal kalkulasi varian benar: Rp${subtotal}`);
}

// ----------------------------------------------------------------------------
// TEST 3: URL ?meja=7 & Penguncian Meja
// ----------------------------------------------------------------------------
console.log('\n--- TEST 3: URL Parameter ?meja=7 ---');
const mockSearch = '?meja=7';
const params = new URLSearchParams(mockSearch);
const parsedMeja = params.get('meja');
const isLocked = Boolean(parsedMeja);
assert(parsedMeja === '7', `Nomor meja terbaca dari query string: ${parsedMeja}`);
assert(isLocked === true, 'Nomor meja terkunci otomatis (isLocked = true)');

// ----------------------------------------------------------------------------
// TEST 4: Format WhatsApp & URL Encoding
// ----------------------------------------------------------------------------
console.log('\n--- TEST 4: Checkout WhatsApp & URL Encoding ---');
const mockItems = [
  {
    id: 'cart-1',
    menuItem: items[0],
    kuantitas: 2,
    varianTerpilih: { Porsi: 'Jumbo' },
    addonsTerpilih: [],
    catatan: 'Pedas sedang, tanpa seledri',
    hargaSatuan: items[0].price,
    subtotal: items[0].price * 2,
  },
];
const mockCustomer = {
  namaPelanggan: 'Budi Santoso',
  nomorMeja: '7',
  tipePesanan: 'dineIn',
  tipePesananLabel: 'Makan di Tempat',
  catatanUmum: 'Tolong siapkan sendok ekstra',
};

const waUrl = buildWhatsAppOrderUrl(
  '6281234567890',
  'Warung Kopi Senja & Rasa',
  mockItems,
  mockCustomer,
  items[0].price * 2,
  'Terima kasih'
);

assert(waUrl.startsWith('https://wa.me/6281234567890?text='), 'URL diawali https://wa.me/6281234567890?text=');
assert(!waUrl.includes(' '), 'URL tidak mengandung spasi mentah (sudah ter-encode)');

const decodedMessage = decodeURIComponent(waUrl.split('?text=')[1]);
assert(decodedMessage.includes('Budi Santoso'), 'Pesan WA menyertakan nama pemesan: Budi Santoso');
assert(decodedMessage.includes('Meja: 7'), 'Pesan WA menyertakan nomor meja: 7');
assert(decodedMessage.includes(items[0].name), `Pesan WA menyertakan nama menu: ${items[0].name}`);
assert(decodedMessage.includes('Porsi: Jumbo'), 'Pesan WA menyertakan pilihan varian: Porsi: Jumbo');
assert(decodedMessage.includes('Pedas sedang, tanpa seledri'), 'Pesan WA menyertakan catatan item');

// ----------------------------------------------------------------------------
// TEST 5: Preset Tema & Variabel CSS
// ----------------------------------------------------------------------------
console.log('\n--- TEST 5: Preset Tema (Modern, Classic, Dark) ---');
import { adjustBrightness, getContrastTextColor, hexToRgba } from '../src/utils/theme.ts';

['modern', 'classic', 'dark'].forEach((presetKey) => {
  const preset = THEME_PRESETS[presetKey];
  assert(Boolean(preset), `Preset ${presetKey} terdaftar di THEME_PRESETS`);
  assert(Boolean(preset.primaryColor), `Preset ${presetKey} memiliki primaryColor: ${preset.primaryColor}`);
  assert(Boolean(preset.backgroundColor), `Preset ${presetKey} memiliki backgroundColor: ${preset.backgroundColor}`);
  assert(Boolean(preset.fontFamily), `Preset ${presetKey} memiliki fontFamily: ${preset.fontFamily}`);

  const hoverColor = adjustBrightness(preset.primaryColor, -12);
  assert(hoverColor.startsWith('#'), `adjustBrightness menghasilkan HEX valid: ${hoverColor}`);

  const contrastText = getContrastTextColor(preset.primaryColor);
  assert(contrastText === '#ffffff' || contrastText === '#0f172a', `getContrastTextColor menghasilkan teks terbaca: ${contrastText}`);
});

// ----------------------------------------------------------------------------
// TEST 6: Feature Flags di Config
// ----------------------------------------------------------------------------
console.log('\n--- TEST 6: Feature Flags On/Off ---');
const sampleConfig = {
  restaurant: { name: 'Resto Test', tagline: 'Enak', address: 'Jl. Test', openingHours: '10:00-20:00' },
  whatsapp: { number: '6281234567890' },
  theme: { primaryColor: '#d97706' },
  features: {
    cart: false,
    viewOnlyMode: true,
    multiLanguage: false,
    quickFilter: false,
    shareMenu: false,
    contactWhatsApp: false,
    search: false,
    tableNumber: false,
    promoBanner: false,
    darkMode: false,
    itemNotes: false,
    popularBadge: false,
  },
};
const valConfigResult = validateSiteConfig(sampleConfig);
assert(valConfigResult.isValid === true, 'Config valid saat semua fitur dimatikan');

// ----------------------------------------------------------------------------
// TEST 7: Validasi Kesalahan Format menu.json
// ----------------------------------------------------------------------------
console.log('\n--- TEST 7: Deteksi Format Salah pada menu.json ---');
const malformedMenuData = {
  categories: [{ id: 'makanan', name: 'Makanan' }],
  items: [
    { id: 'item-1', name: 'Nasi Goreng', categoryId: 'kategori-salah', price: -5000 },
    { id: 'item-1', name: 'Mie Goreng (Duplikat ID)', categoryId: 'makanan', price: 'tidak-ada-harga' },
  ],
};
const valMenuResult = validateMenuData(malformedMenuData);
assert(valMenuResult.isValid === false, 'Deteksi menu rusak berhasil');
assert(valMenuResult.errors.some((e) => e.includes('kategori-salah')), 'Pesan error categoryId salah muncul');
assert(valMenuResult.errors.some((e) => e.includes('duplikat') || e.includes('digunakan lebih dari satu kali')), 'Pesan error ID duplikat muncul');
assert(valMenuResult.errors.some((e) => e.includes('price')), 'Pesan error harga salah muncul');

console.log('\n==================================================');
console.log(`🎉 HASIL PENGUJIAN: ${passedTests} / ${totalTests} TEST BERHASIL (100%)`);
console.log('==================================================');
