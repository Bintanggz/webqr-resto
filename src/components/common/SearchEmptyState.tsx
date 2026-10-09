import React from 'react';
import { RotateCcw } from 'lucide-react';

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
          backgroundColor: 'var(--color-bg-page)',
          borderRadius: 'var(--radius-theme)',
        }}
        className="w-20 h-20 mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner"
      >
        🔍
      </div>
      <h3
        style={{ color: 'var(--color-text-main)' }}
        className="text-base font-extrabold"
      >
        {t('noMenuFound')}
      </h3>
      {query && (
        <p
          style={{ color: 'var(--color-primary)' }}
          className="text-xs font-bold mt-0.5"
        >
          &ldquo;{query}&rdquo;
        </p>
      )}
      <p
        style={{ color: 'var(--color-text-muted)' }}
        className="text-xs mt-1.5 max-w-xs mx-auto leading-relaxed"
      >
        {t('noMenuFoundDesc')}
      </p>

      <button
        type="button"
        onClick={onReset}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-text)',
          borderRadius: 'var(--radius-theme)',
        }}
        className="mt-5 min-h-[44px] px-5 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>{t('resetFilter')}</span>
      </button>
    </div>
  );
};
