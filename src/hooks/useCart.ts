import { useState, useEffect } from 'react';
import type { CartItem } from '../types/cart';
import type { MenuItem } from '../types/menu';

const STORAGE_KEY = 'resto_cart_items_v2';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Simpan keranjang ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Gagal menyimpan keranjang:', e);
    }
  }, [items]);

  // Tambah item ke keranjang
  const addItem = (
    menuItem: MenuItem,
    kuantitas = 1,
    varianTerpilih: Record<string, string> = {},
    addonsTerpilih: string[] = [],
    catatan = '',
    customUnitPrice?: number
  ) => {
    const finalUnitPrice = customUnitPrice ?? menuItem.price;

    const variantKey = Object.entries(varianTerpilih)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');

    const addonsKey = [...addonsTerpilih].sort().join(',');
    const uniqueId = `${menuItem.id}__${variantKey}__${addonsKey}__${catatan.trim()}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].kuantitas + kuantitas;
        updated[existingIndex] = {
          ...updated[existingIndex],
          kuantitas: newQty,
          subtotal: newQty * finalUnitPrice,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: uniqueId,
          menuItem,
          kuantitas,
          varianTerpilih,
          addonsTerpilih,
          catatan,
          hargaSatuan: finalUnitPrice,
          subtotal: kuantitas * finalUnitPrice,
        },
      ];
    });
  };

  // Ubah kuantitas item
  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.kuantitas + delta;
            return {
              ...item,
              kuantitas: newQty,
              subtotal: newQty * item.hargaSatuan,
            };
          }
          return item;
        })
        .filter((item) => item.kuantitas > 0)
    );
  };

  // Ubah catatan per item di keranjang
  const updateNotes = (id: string, newNotes: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            catatan: newNotes,
          };
        }
        return item;
      })
    );
  };

  // Hapus satu item
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Kosongkan keranjang
  const clearCart = () => {
    setItems([]);
  };

  // Total kuantitas semua item
  const totalItems = items.reduce((sum, item) => sum + item.kuantitas, 0);

  // Total harga
  const totalHarga = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items,
    addItem,
    updateQuantity,
    updateNotes,
    removeItem,
    clearCart,
    totalItems,
    totalHarga,
  };
}
