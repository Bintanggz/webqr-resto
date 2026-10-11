import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface SearchEmptyStateProps {
  query?: string;
  onReset: () => void;
  t: (key: any) => string;
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  query,
  onReset,
  t,
}) => {
  return (
    <div className="text-center py-16 px-4">
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
        className="w-16 h-16 mx-auto rounded-full border flex items-center justify-center mb-4"
      >
        <Search className="w-7 h-7 stroke-[1.5]" style={{ color: 'var(--text-muted)' }} />
      </div>
      <h3
        style={{ color: 'var(--text)' }}
        className="text-base font-semibold"
      >
        {t('noMenuFound')}
      </h3>
      {query && (
        <p
          style={{ color: 'var(--primary)' }}
          className="text-xs font-medium mt-1"
        >
          &ldquo;{query}&rdquo;
        </p>
      )}
      <p
        style={{ color: 'var(--text-muted)' }}
        className="text-xs mt-1.5 max-w-xs mx-auto leading-relaxed"
      >
        {t('noMenuFoundDesc')}
      </p>

      <button
        type="button"
        onClick={onReset}
        style={{
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          borderRadius: '10px',
          height: '48px',
        }}
        className="mt-6 px-5 font-medium text-xs inline-flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
        <span>{t('resetFilter')}</span>
      </button>
    </div>
  );
};
