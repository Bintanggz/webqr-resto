/**
 * Helper untuk memformat angka menjadi format Rupiah standar Indonesia
 * Contoh: 25000 -> "Rp25.000"
 */
export function formatRupiah(nominal: number): string {
  if (typeof nominal !== 'number' || isNaN(nominal)) {
    return 'Rp0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal).replace(/\s+/g, '');
}
