import type { MenuItem } from './menu';

export interface CartItem {
  id: string; // unique item id (kombinasi menuId + varian + addons + catatan)
  menuItem: MenuItem;
  kuantitas: number;
  varianTerpilih: Record<string, string>; // e.g. { "Level Pedas": "Sedang" }
  addonsTerpilih?: string[]; // IDs atau nama addon yang dipilih
  catatan?: string;
  hargaSatuan: number; // Harga per item setelah ditambah varian & addons
  subtotal: number;
}

export interface CustomerOrderInfo {
  namaPelanggan: string;
  nomorMeja: string;
  tipePesanan: 'dineIn' | 'takeAway' | 'delivery';
  tipePesananLabel: string;
  alamat?: string; // Khusus tipe delivery
  catatanUmum?: string;
}
