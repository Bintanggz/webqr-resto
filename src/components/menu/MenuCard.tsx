import React from 'react';
import type { MenuItem } from '../../types/menu';
import { PriceTag } from '../common/PriceTag';
import { LazyImage } from '../common/LazyImage';
import { siteConfig } from '../../config/site.config';
import { Plus, Flame, Leaf } from 'lucide-react';

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
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)',
      }}
      className={`border p-4 transition-all select-none flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-stretch lg:justify-start ${
        isAvailable
          ? 'hover:border-[var(--primary)] cursor-pointer active:scale-[0.99]'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Di Mobile/Tablet: Teks di Kiri | Di Desktop: Teks di Bawah Foto */}
      <div className="flex-1 flex flex-col justify-between min-w-0 order-1 lg:order-2 lg:mt-3">
        <div>
          {/* Baris Nama & Badge Elegan */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3
              style={{ color: 'var(--text)' }}
              className="text-[16px] sm:text-[17px] font-medium leading-snug line-clamp-1"
            >
              {item.name}
            </h3>

            {/* Badge Terlaris (huruf kecil, latar 10% primary, teks primary) */}
            {showPopular && isAvailable && (
              <span
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                }}
                className="text-[11px] font-medium px-2 py-0.5 rounded-[4px] lowercase tracking-wide"
              >
                terlaris
              </span>
            )}

            {/* Badge Baru (huruf kecil, latar 10% primary, teks primary) */}
            {item.isNew && isAvailable && (
              <span
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                }}
                className="text-[11px] font-medium px-2 py-0.5 rounded-[4px] lowercase tracking-wide"
              >
                baru
              </span>
            )}

            {/* Ikon Pedas (Lucide Flame stroke 1.5, tanpa emoji) */}
            {item.tags?.includes('pedas') && isAvailable && (
              <span
                title="Pedas"
                style={{ color: 'var(--primary)' }}
                className="inline-flex items-center"
              >
                <Flame className="w-3.5 h-3.5 stroke-[1.5]" />
              </span>
            )}

            {/* Ikon Vegetarian (Lucide Leaf stroke 1.5, tanpa emoji) */}
            {item.tags?.includes('vegetarian') && isAvailable && (
              <span
                title="Vegetarian"
                style={{ color: 'var(--color-success)' }}
                className="inline-flex items-center"
              >
                <Leaf className="w-3.5 h-3.5 stroke-[1.5]" />
              </span>
            )}
          </div>

          {/* Deskripsi Menu */}
          <p
            style={{ color: 'var(--text-muted)' }}
            className="text-[14px] leading-[1.6] line-clamp-2 mt-1"
          >
            {item.description}
          </p>
        </div>

        {/* Baris Harga & Aksi */}
        <div className="flex items-center justify-between pt-2.5 mt-auto">
          <div className="text-[15px] tabular-nums font-semibold" style={{ color: 'var(--primary)' }}>
            <PriceTag harga={item.price} />
          </div>

          {/* Tombol Tambah / Aksi Cepat */}
          {!isViewOnly && isAvailable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: '8px',
              }}
              aria-label={`Tambah ${item.name}`}
              className="w-8 h-8 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[1.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Di Mobile/Tablet: Foto di Kanan | Di Desktop: Foto di Atas Teks */}
      <div
        style={{
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--bg)',
        }}
        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-full lg:h-44 overflow-hidden flex-shrink-0 relative order-2 lg:order-1"
      >
        <LazyImage
          src={item.image}
          alt={item.name}
          width={300}
          height={225}
          containerClassName="w-full h-full object-cover"
        />

        {/* Overlay jika menu Habis */}
        {!isAvailable && (
          <div
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
            className="absolute inset-0 flex items-center justify-center p-1 backdrop-blur-[1px]"
          >
            <span
              style={{
                backgroundColor: 'var(--color-danger)',
                color: '#ffffff',
              }}
              className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[4px]"
            >
              Habis
            </span>
          </div>
        )}
      </div>
    </article>
  );
};
