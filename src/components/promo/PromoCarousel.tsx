import React, { useState, useEffect } from 'react';
import type { PromoBanner } from '../../types/config';
import { Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface PromoCarouselProps {
  promos: PromoBanner[];
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ promos }) => {
  const activePromos = promos.filter((p) => p.isActive);
  const [startIndex, setStartIndex] = useState(0);

  // Autoplay berganti slide tiap 6 detik jika promo > 1
  useEffect(() => {
    if (activePromos.length <= 1) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % activePromos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activePromos.length]);

  if (activePromos.length === 0) return null;

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? activePromos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % activePromos.length);
  };

  return (
    <section aria-label="Promo Restoran" className="pt-4 pb-2 select-none">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--primary)' }}>
          <Tag className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Promo Spesial</span>
        </div>

        {activePromos.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Promo sebelumnya"
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-[var(--primary)] text-[var(--text-muted)] hover:text-[var(--text)]"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
            >
              <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Promo berikutnya"
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-[var(--primary)] text-[var(--text-muted)] hover:text-[var(--text)]"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
            >
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Grid Responsif: 1 slide di Mobile, 2 di Tablet (md), 3 di Desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activePromos.map((promo, idx) => {
          // Hanya tampilkan slide yang relevan di mobile jika promo banyak
          const isCurrentMobile = idx === startIndex;
          return (
            <article
              key={promo.id}
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-sm)',
              }}
              className={`border p-4 transition-all flex flex-col justify-between ${
                isCurrentMobile ? 'flex' : 'hidden md:flex'
              }`}
            >
              <div>
                <h3
                  style={{ color: 'var(--text)' }}
                  className="text-[16px] font-semibold leading-snug line-clamp-1"
                >
                  {promo.title}
                </h3>
                <p
                  style={{ color: 'var(--text-muted)' }}
                  className="text-[14px] leading-[1.6] line-clamp-2 mt-1.5"
                >
                  {promo.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--primary)' }}>
                <span>Berlaku Terbatas</span>
                <span className="text-[11px] px-2 py-0.5 rounded-[4px]" style={{ backgroundColor: 'var(--primary-light)' }}>
                  Klaim Saat Order
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
