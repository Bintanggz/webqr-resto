import { useState, useEffect } from 'react';

/**
 * Mengecek apakah restoran sedang BUKA atau TUTUP secara real-time
 * Mendukung format string seperti "09:00 - 22:00 WIB", "08.00 - 23.00", dll.
 */
export function useIsOpen(openingHoursStr: string): boolean {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkOpenStatus = () => {
      if (!openingHoursStr) {
        setIsOpen(true);
        return;
      }

      try {
        // Ekstrak dua format waktu (contoh: "09:00" dan "22:00")
        const match = openingHoursStr.match(/(\d{1,2})[:.](\d{2})\s*[-–]\s*(\d{1,2})[:.](\d{2})/);
        if (!match) {
          setIsOpen(true);
          return;
        }

        const [, startHStr, startMStr, endHStr, endMStr] = match;
        const startH = parseInt(startHStr, 10);
        const startM = parseInt(startMStr, 10);
        const endH = parseInt(endHStr, 10);
        const endM = parseInt(endMStr, 10);

        const now = new Date();
        const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
        const startTotalMinutes = startH * 60 + startM;
        const endTotalMinutes = endH * 60 + endM;

        if (endTotalMinutes >= startTotalMinutes) {
          // Jam operasional dalam hari yang sama (misal 09:00 - 22:00)
          setIsOpen(
            currentTotalMinutes >= startTotalMinutes && currentTotalMinutes <= endTotalMinutes
          );
        } else {
          // Jam operasional melewati tengah malam (misal 18:00 - 02:00)
          setIsOpen(
            currentTotalMinutes >= startTotalMinutes || currentTotalMinutes <= endTotalMinutes
          );
        }
      } catch (err) {
        console.warn('Gagal membaca jam operasional:', err);
        setIsOpen(true);
      }
    };

    checkOpenStatus();
    // Periksa ulang tiap 60 detik
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, [openingHoursStr]);

  return isOpen;
}
