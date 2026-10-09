import React from 'react';
import type { MenuItem } from '../../types/menu';
import { PriceTag } from '../common/PriceTag';
import { Badge } from '../common/Badge';
import { LazyImage } from '../common/LazyImage';
import { siteConfig } from '../../config/site.config';
import { Plus, ChevronRight } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  isViewOnly?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onSelect,
  isViewOnly = false,
}) => {
  const showPopular = siteConfig.features.popularBadge && item.isPopular;
  const isAvailable = item.isAvailable;

  return (
    <article
      onClick={() => isAvailable && onSelect(item)}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
        borderRadius: 'var(--radius-theme)',
      }}
      className={`p-3 sm:p-3.5 border shadow-2xs flex gap-3 sm:gap-3.5 transition-all select-none ${
        isAvailable
          ? 'hover:shadow-md cursor-pointer active:scale-[0.99]'
          : 'opacity-65 cursor-not-allowed'
      }`}
    >
      {/* Thumbnail Gambar dengan Skeleton Lazy Loading */}
      <div
        style={{ borderRadius: 'calc(var(--radius-theme) * 0.75)' }}
        className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-slate-100 flex-shrink-0 relative"
      >
        <LazyImage
          src={item.image}
          alt={item.name}
          width={112}
          height={112}
          containerClassName="w-full h-full"
        />

        {/* Overlay jika menu Habis */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex items-center justify-center p-1">
            <span className="text-[11px] font-extrabold text-white uppercase tracking-wider bg-rose-600 px-2.5 py-0.5 rounded-full shadow-sm">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Info Menu */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Baris Nama & Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3
              style={{ color: 'var(--color-text-main)' }}
              className="font-bold text-sm sm:text-base leading-snug line-clamp-1"
            >
              {item.name}
            </h3>
            {showPopular && isAvailable && (
              <Badge text="🔥 Terlaris" variant="warning" />
            )}
            {item.isNew && isAvailable && (
              <Badge text="✨ Baru" variant="primary" />
            )}
            {item.tags?.includes('pedas') && isAvailable && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-1.5 py-0.5 rounded">
                🌶️
              </span>
            )}
            {item.tags?.includes('vegetarian') && isAvailable && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                🥗
              </span>
            )}
          </div>

          {/* Deskripsi Singkat */}
          <p
            style={{ color: 'var(--color-text-muted)' }}
            className="text-xs mt-1 line-clamp-2 leading-relaxed"
          >
            {item.description}
          </p>
        </div>

        {/* Baris Harga & Tombol Aksi */}
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <PriceTag harga={item.price} />

          {/* Tombol Tambah Pesan atau Tombol Mode Lihat */}
          {isAvailable ? (
            isViewOnly ? (
              <div
                style={{
                  borderRadius: 'calc(var(--radius-theme) * 0.75)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                }}
                className="min-h-[44px] px-3 flex items-center gap-1 text-[11px] font-bold active:scale-95 transition-transform"
              >
                <span>Detail</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
                aria-label={`Pilih ${item.name}`}
                className="min-h-[44px] min-w-[44px] -m-1.5 flex items-center justify-center active:scale-90 transition-transform"
              >
                <span
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-text)',
                    borderRadius: 'calc(var(--radius-theme) * 0.75)',
                  }}
                  className="w-9 h-9 flex items-center justify-center shadow-md transition-opacity hover:opacity-90"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </span>
              </button>
            )
          ) : (
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-lg">
              Stok Habis
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
