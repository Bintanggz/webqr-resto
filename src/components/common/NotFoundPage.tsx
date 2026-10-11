import React from 'react';
import { Home, UtensilsCrossed } from 'lucide-react';
import { siteConfig } from '../../config/site.config';

interface NotFoundPageProps {
  onBackHome: () => void;
  t: (key: any) => string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackHome,
  t,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
      className="min-h-screen flex items-center justify-center p-4 text-center select-none"
    >
      <div
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-sm)',
        }}
        className="w-full max-w-md p-8 border flex flex-col items-center"
      >
        <div
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
          className="w-16 h-16 rounded-full border flex items-center justify-center mb-4"
        >
          <UtensilsCrossed className="w-8 h-8 stroke-[1.5]" style={{ color: 'var(--primary)' }} />
        </div>

        <h1
          style={{ color: 'var(--primary)' }}
          className="text-4xl font-semibold tracking-tight"
        >
          404
        </h1>
        <h2
          style={{ color: 'var(--text)' }}
          className="text-lg font-semibold mt-2"
        >
          {t('pageNotFound')}
        </h2>
        <p
          style={{ color: 'var(--text-muted)' }}
          className="text-xs mt-1.5 max-w-xs leading-relaxed"
        >
          {t('pageNotFoundDesc')}
        </p>

        <button
          type="button"
          onClick={onBackHome}
          style={{
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            borderRadius: '10px',
            height: '48px',
          }}
          className="mt-6 px-6 font-medium text-xs inline-flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-colors"
        >
          <Home className="w-4 h-4 stroke-[1.5]" />
          <span>{t('backToHome')}</span>
        </button>

        <p
          style={{ color: 'var(--text-muted)' }}
          className="text-[11px] mt-6 opacity-60"
        >
          {siteConfig.restaurant.name}
        </p>
      </div>
    </div>
  );
};
