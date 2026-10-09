import React from 'react';
import type { QuickFilterType } from '../../hooks/useMenuSearch';
import { Sparkles } from 'lucide-react';

interface QuickFiltersProps {
  activeFilter: QuickFilterType;
  onSelectFilter: (filter: QuickFilterType) => void;
  t: (key: any) => string;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  activeFilter,
  onSelectFilter,
  t,
}) => {
  const filters: Array<{ id: QuickFilterType; label: string }> = [
    { id: 'all', label: t('quickFilterAll') },
    { id: 'popular', label: t('quickFilterPopular') },
    { id: 'new', label: t('quickFilterNew') },
    { id: 'pedas', label: t('quickFilterSpicy') },
    { id: 'vegetarian', label: t('quickFilterVegetarian') },
  ];

  return (
    <div className="px-4 pt-2.5 pb-1">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span
          style={{ color: 'var(--color-text-muted)' }}
          className="text-xs font-bold mr-1 flex items-center gap-1 flex-shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('quickFilterLabel')}:</span>
        </span>

        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onSelectFilter(f.id)}
              style={{
                borderRadius: 'var(--radius-theme)',
                backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-page)',
                borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                color: isActive ? 'var(--color-primary-text)' : 'var(--color-text-main)',
              }}
              className="min-h-[44px] px-3.5 text-xs font-bold border whitespace-nowrap active:scale-95 transition-all shadow-2xs flex items-center justify-center"
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
