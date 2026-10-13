import type { CartItem, CustomerOrderInfo } from '../types/cart';
import { formatRupiah } from './currency';

/**
 * Membangun URL WhatsApp berisi rincian pesanan yang rapi sesuai format dan bahasa yang dipilih
 */
export function buildWhatsAppOrderUrl(
  waNumber: string,
  restoName: string,
  items: CartItem[],
  customerInfo: CustomerOrderInfo,
  totalHarga: number,
  orderTemplate?: string,
  lang: 'id' | 'en' = 'id'
): string {
  // Bersihkan karakter selain angka
  const cleanNumber = waNumber.replace(/\D/g, '');

  const lines: string[] = [];

  const isEn = lang === 'en';

  // 1. Salam Pembuka
  if (isEn) {
    lines.push(`Hello ${restoName}, I would like to order:`);
    lines.push(`Name: ${customerInfo.namaPelanggan.trim()}`);
    lines.push(`Order Type: ${customerInfo.tipePesananLabel}`);
  } else {
    lines.push(`Halo ${restoName}, saya mau pesan:`);
    lines.push(`Nama: ${customerInfo.namaPelanggan.trim()}`);
    lines.push(`Tipe Pesanan: ${customerInfo.tipePesananLabel}`);
  }

  // Tampilkan nomor meja jika makan di tempat (Dine In) atau jika ada nomor meja
  if (customerInfo.tipePesanan === 'dineIn' && customerInfo.nomorMeja.trim()) {
    lines.push(`${isEn ? 'Table' : 'Meja'}: ${customerInfo.nomorMeja.trim()}`);
  }

  // Tampilkan alamat pengantaran jika Pesan Antar (Delivery)
  if (customerInfo.tipePesanan === 'delivery' && customerInfo.alamat?.trim()) {
    lines.push(`${isEn ? 'Delivery Address' : 'Alamat Antar'}: ${customerInfo.alamat.trim()}`);
  }

  lines.push(isEn ? '\nOrders:' : '\nPesanan:');

  // 2. Daftar Item Menu
  items.forEach((item, index) => {
    const itemName = isEn && item.menuItem.nameEn ? item.menuItem.nameEn : item.menuItem.name;
    // Format: "1. Nasi Goreng x2 - Rp50.000"
    lines.push(
      `${index + 1}. ${itemName} x${item.kuantitas} - ${formatRupiah(item.subtotal)}`
    );

    // Keterangan varian jika ada
    const variantKeys = Object.keys(item.varianTerpilih || {});
    if (variantKeys.length > 0) {
      const variantText = variantKeys
        .map((k) => `${k}: ${item.varianTerpilih[k]}`)
        .join(', ');
      lines.push(`   • ${isEn ? 'Variant' : 'Varian'}: ${variantText}`);
    }

    // Keterangan addons jika ada
    if (item.addonsTerpilih && item.addonsTerpilih.length > 0) {
      const addonNames = item.addonsTerpilih.map((addonId) => {
        const found = item.menuItem.addons?.find((a) => a.id === addonId);
        if (found) {
          return isEn && found.nameEn ? found.nameEn : found.name;
        }
        return addonId;
      });
      lines.push(`   • Add-on: ${addonNames.join(', ')}`);
    }

    // Catatan khusus item
    if (item.catatan && item.catatan.trim()) {
      lines.push(`   • ${isEn ? 'Note' : 'Catatan'}: ${item.catatan.trim()}`);
    }
  });

  // 3. Total Harga
  lines.push(`\nTotal: ${formatRupiah(totalHarga)}`);

  // 4. Catatan Umum Tambahan jika ada
  if (customerInfo.catatanUmum && customerInfo.catatanUmum.trim()) {
    lines.push(`\n${isEn ? 'Additional Notes' : 'Catatan Tambahan'}: ${customerInfo.catatanUmum.trim()}`);
  }

  // 5. Template Penutup dari Config
  if (orderTemplate && orderTemplate.trim()) {
    lines.push(`\n${orderTemplate.trim()}`);
  }

  const fullMessage = lines.join('\n');
  const encodedMessage = encodeURIComponent(fullMessage);

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
