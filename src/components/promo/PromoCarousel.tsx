import React, { useState, useEffect } from 'react';
import type { PromoBanner } from '../../types/config';
import { Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface PromoCarouselProps {
  promos: PromoBanner[];
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ promos }) => {
  const activePromos = promos.filter((p) => p.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay berganti slide tiap 5 detik jika ada lebih dari 1 promo
  useEffect(() => {
    if (activePromos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activePromos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activePromos.length]);

  if (activePromos.length === 0) return null;

  const currentPromo = activePromos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activePromos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activePromos.length);
  };

  return (
    <div className="px-4 pt-3 select-none">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-lg p-4 sm:p-5">
        {/* Ornamen latar aesthetic */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-black/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between min-h-[105px]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
                <Tag className="w-3 h-3 text-amber-200" />
                <span>Promo Spesial</span>
              </span>

              {activePromos.length > 1 && (
                <div className="flex items-center gap-1">
                  {/* Tombol Navigasi dengan touch target minimal 44px */}
                  <button
                    onClick={handlePrev}
                    aria-label="Promo sebelumnya"
                    className="w-11 h-11 -mr-2 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                  >
                    <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Promo berikutnya"
                    className="w-11 h-11 -mr-1 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                  >
                    <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-1 text-white drop-shadow-sm">
              {currentPromo.title}
            </h3>
            <p className="text-xs text-amber-100 mt-1 line-clamp-2 leading-relaxed max-w-sm">
              {currentPromo.description}
            </p>
          </div>

          {/* Dots Indicator jika slide > 1 */}
          {activePromos.length > 1 && (
            <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/15">
              {activePromos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Lihat promo ke-${idx + 1}`}
                  className="min-h-[44px] min-w-[20px] flex items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
