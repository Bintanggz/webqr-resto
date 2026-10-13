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
    <div className="pt-2 pb-1">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span
          style={{ color: 'var(--text-muted)' }}
          className="text-xs font-medium mr-1 flex items-center gap-1 flex-shrink-0"
        >
          <Sparkles style={{ color: 'var(--primary)' }} className="w-3.5 h-3.5 stroke-[1.5]" />
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
                backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
                borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
              }}
              className={`h-9 px-3.5 text-xs font-semibold rounded-full border whitespace-nowrap transition-all flex items-center justify-center flex-shrink-0 ${
                isActive ? 'shadow-sm' : 'hover:border-neutral-400 hover:text-[var(--text)]'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
