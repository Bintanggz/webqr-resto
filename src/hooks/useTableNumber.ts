import { useState, useEffect, useRef } from 'react';

/**
 * Mengambil nomor meja dari parameter URL (contoh: ?meja=5 atau ?table=05).
 * Jika ada di URL, isLockedFromUrl bernilai true dan tidak bisa diubah pelanggan.
 */
export function useTableNumber(): [string, (val: string) => void, boolean] {
  const isLockedRef = useRef(false);

  const [tableNumber, setTableNumber] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    const mejaParam = params.get('meja') || params.get('table');
    if (mejaParam) {
      isLockedRef.current = true;
      return mejaParam;
    }
    return localStorage.getItem('resto_table_number') || '';
  });

  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem('resto_table_number', tableNumber);
    }
  }, [tableNumber]);

  return [tableNumber, setTableNumber, isLockedRef.current];
}
