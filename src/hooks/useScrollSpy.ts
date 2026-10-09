import { useState, useEffect } from 'react';

/**
 * Hook Scroll-Spy untuk mendeteksi section kategori mana yang sedang aktif di layar
 * @param categoryIds daftar ID kategori (contoh: ['makanan-nasi', 'mie-bakso'])
 * @param offsetPx offset toleransi header sticky (default 120px)
 */
export function useScrollSpy(categoryIds: string[], offsetPx = 120): string {
  const [activeId, setActiveId] = useState<string>('all');

  useEffect(() => {
    if (categoryIds.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + offsetPx;

          // Jika posisi scroll masih di bagian paling atas (sebelum section pertama)
          const firstSection = document.getElementById(`category-${categoryIds[0]}`);
          if (firstSection && window.scrollY < firstSection.offsetTop - offsetPx - 40) {
            setActiveId('all');
            ticking = false;
            return;
          }

          // Cari section yang posisinya paling sesuai
          let currentActive = categoryIds[0];
          for (const id of categoryIds) {
            const el = document.getElementById(`category-${id}`);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                currentActive = id;
              }
            }
          }

          setActiveId(currentActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger sekali saat mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [categoryIds, offsetPx]);

  return activeId;
}
