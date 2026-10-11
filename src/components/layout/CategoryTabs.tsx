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

  // Auto-scroll tab aktif agar selalu terlihat di layar
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
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors"
    >
      <div
        ref={containerRef}
        className="app-container flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0"
      >
        {/* Tab 'Semua' */}
        <button
          type="button"
          ref={activeCategoryId === 'all' ? activeTabRef : null}
          onClick={() => onSelectCategory('all')}
          style={{
            color: activeCategoryId === 'all' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: activeCategoryId === 'all' ? '2px solid var(--primary)' : '2px solid transparent',
          }}
          className={`min-h-[44px] px-3 sm:px-4 py-2.5 text-sm sm:text-base font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 focus:outline-none ${
            activeCategoryId === 'all' ? 'font-semibold' : 'hover:text-[var(--text)]'
          }`}
        >
          <span>Semua Menu</span>
          {totalAllItems ? (
            <span
              style={{
                backgroundColor: activeCategoryId === 'all' ? 'var(--primary-light)' : 'transparent',
                color: activeCategoryId === 'all' ? 'var(--primary)' : 'var(--text-muted)',
              }}
              className="text-xs px-1.5 py-0.5 rounded-full font-normal"
            >
              {totalAllItems}
            </span>
          ) : null}
        </button>

        {/* Tab Kategori - Tanpa Emoji, Teks Bersih dengan Underline */}
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
              }}
              className={`min-h-[44px] px-3 sm:px-4 py-2.5 text-sm sm:text-base font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 focus:outline-none ${
                isActive ? 'font-semibold' : 'hover:text-[var(--text)]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
