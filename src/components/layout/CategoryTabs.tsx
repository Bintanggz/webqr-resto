import React, { useRef, useEffect } from 'react';
import type { MenuCategory } from '../../types/menu';

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  totalAllItems?: number;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  totalAllItems,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll tab aktif agar selalu terlihat di tengah layar smartphone
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategoryId]);

  return (
    <nav
      aria-label="Kategori Menu"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
      className="sticky top-0 z-30 backdrop-blur-md border-b shadow-xs transition-colors"
    >
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-2"
      >
        {/* Tombol 'Semua' */}
        <button
          type="button"
          ref={activeCategoryId === 'all' ? activeTabRef : null}
          onClick={() => onSelectCategory('all')}
          style={{
            backgroundColor:
              activeCategoryId === 'all'
                ? 'var(--color-primary)'
                : 'var(--color-primary-light)',
            color:
              activeCategoryId === 'all'
                ? 'var(--color-primary-text)'
                : 'var(--color-text-main)',
            borderRadius: 'var(--radius-theme)',
          }}
          className="min-h-[44px] px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shadow-2xs"
        >
          <span>🍽️</span>
          <span>Semua {totalAllItems ? `(${totalAllItems})` : ''}</span>
        </button>

        {/* Tab Tiap Kategori */}
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                backgroundColor: isActive
                  ? 'var(--color-primary)'
                  : 'var(--color-primary-light)',
                color: isActive
                  ? 'var(--color-primary-text)'
                  : 'var(--color-text-main)',
                borderRadius: 'var(--radius-theme)',
              }}
              className="min-h-[44px] px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shadow-2xs"
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
