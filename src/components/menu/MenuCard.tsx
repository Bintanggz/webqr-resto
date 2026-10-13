import React from 'react';
import type { MenuItem } from '../../types/menu';
import { PriceTag } from '../common/PriceTag';
import { LazyImage } from '../common/LazyImage';
import { siteConfig } from '../../config/site.config';
import { useLanguage } from '../../hooks/useLanguage';
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
  const { lang, t } = useLanguage();
  const showPopular = siteConfig.features.popularBadge && item.isPopular;
  const isAvailable = item.isAvailable;

  const itemName = lang === 'en' && item.nameEn ? item.nameEn : item.name;
  const itemDescription = lang === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

  return (
    <article
      onClick={() => isAvailable && onSelect(item)}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)',
      }}
      className={`group border transition-all duration-300 select-none flex flex-row items-center justify-between gap-3 p-3.5 sm:p-4 lg:flex-col lg:items-stretch lg:justify-start lg:p-0 overflow-hidden ${
        isAvailable
          ? 'hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md cursor-pointer active:scale-[0.99]'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* 1. Image Container (Di Desktop di Atas, Di Mobile di Kanan) */}
      <div
        style={{
          borderRadius: 'calc(var(--radius) - 4px)',
          backgroundColor: 'var(--bg)',
        }}
        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-full lg:h-48 overflow-hidden flex-shrink-0 relative order-2 lg:order-1 lg:rounded-none"
      >
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          <LazyImage
            src={item.image}
            alt={itemName}
            width={300}
            height={225}
            containerClassName="w-full h-full object-cover"
          />
        </div>

        {/* Floating Badges on Image */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {showPopular && isAvailable && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 tracking-tight">
              🔥 {t('bestSeller')}
            </span>
          )}
          {item.isNew && isAvailable && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-tight">
              ✨ {t('new')}
            </span>
          )}
        </div>

        {/* Overlay jika menu Habis */}
        {!isAvailable && (
          <div
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
            className="absolute inset-0 flex items-center justify-center p-1 backdrop-blur-[2px] z-20"
          >
            <span className="bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
              {t('soldOut')}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Info (Di Mobile di Kiri, Di Desktop di Bawah Foto) */}
      <div className="flex-1 flex flex-col justify-between min-w-0 order-1 lg:order-2 lg:p-4">
        <div>
          {/* Baris Nama & Tag Khusus */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3
              style={{ color: 'var(--text)' }}
              className="text-[15px] sm:text-[16px] font-bold leading-snug line-clamp-1 group-hover:text-[var(--primary)] transition-colors"
            >
              {itemName}
            </h3>

            {/* Ikon Pedas */}
            {item.tags?.includes('pedas') && isAvailable && (
              <span title={t('spicy')} className="text-rose-500 inline-flex items-center">
                <Flame className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            )}

            {/* Ikon Vegetarian */}
            {item.tags?.includes('vegetarian') && isAvailable && (
              <span title={t('vegetarian')} className="text-emerald-600 inline-flex items-center">
                <Leaf className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            )}
          </div>

          {/* Deskripsi Menu */}
          <p
            style={{ color: 'var(--text-muted)' }}
            className="text-[13px] leading-[1.5] line-clamp-2 mt-1"
          >
            {itemDescription}
          </p>
        </div>

        {/* Baris Harga & Tombol Tambah */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          <div className="text-[15px] sm:text-[16px] tabular-nums font-bold" style={{ color: 'var(--primary)' }}>
            <PriceTag harga={item.price} />
          </div>

          {/* Tombol Tambah */}
          {!isViewOnly && isAvailable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
              }}
              aria-label={`${t('add')} ${itemName}`}
              className="h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t('add')}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
