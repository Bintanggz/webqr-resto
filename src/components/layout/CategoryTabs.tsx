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
      className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
    >
      <div
        ref={containerRef}
        className="app-container flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5"
      >
        {/* Tab 'Semua' */}
        <button
          type="button"
          ref={activeCategoryId === 'all' ? activeTabRef : null}
          onClick={() => onSelectCategory('all')}
          style={{
            backgroundColor: activeCategoryId === 'all' ? 'var(--primary)' : 'transparent',
            borderColor: activeCategoryId === 'all' ? 'var(--primary)' : 'var(--border)',
            color: activeCategoryId === 'all' ? '#ffffff' : 'var(--text-muted)',
          }}
          className={`min-h-[38px] px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full border whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-none flex-shrink-0 ${
            activeCategoryId === 'all' ? 'shadow-sm scale-[1.02]' : 'hover:border-neutral-400 hover:text-[var(--text)] bg-neutral-50 dark:bg-neutral-800/60'
          }`}
        >
          <span>Semua Menu</span>
          {totalAllItems ? (
            <span
              style={{
                backgroundColor: activeCategoryId === 'all' ? 'rgba(255, 255, 255, 0.25)' : 'var(--border)',
                color: activeCategoryId === 'all' ? '#ffffff' : 'var(--text-muted)',
              }}
              className="text-[11px] px-1.5 py-0.2 rounded-full font-bold ml-0.5"
            >
              {totalAllItems}
            </span>
          ) : null}
        </button>

        {/* Tab Kategori - Modern Rounded Pill Chips */}
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
              }}
              className={`min-h-[38px] px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full border whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-none flex-shrink-0 ${
                isActive ? 'shadow-sm scale-[1.02]' : 'hover:border-neutral-400 hover:text-[var(--text)] bg-neutral-50 dark:bg-neutral-800/60'
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
