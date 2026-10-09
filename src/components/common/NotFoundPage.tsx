import React from 'react';
import { Home } from 'lucide-react';
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
        backgroundColor: 'var(--color-bg-page)',
        color: 'var(--color-text-main)',
      }}
      className="min-h-screen flex items-center justify-center p-4 text-center select-none"
    >
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
          borderRadius: 'var(--radius-theme)',
        }}
        className="w-full max-w-md p-8 border shadow-xl flex flex-col items-center"
      >
        <span className="text-6xl mb-4">🍽️</span>
        <h1
          style={{ color: 'var(--color-primary)' }}
          className="text-4xl font-black tracking-tight"
        >
          404
        </h1>
        <h2
          style={{ color: 'var(--color-text-main)' }}
          className="text-lg font-bold mt-2"
        >
          {t('pageNotFound')}
        </h2>
        <p
          style={{ color: 'var(--color-text-muted)' }}
          className="text-xs mt-1.5 max-w-xs leading-relaxed"
        >
          {t('pageNotFoundDesc')}
        </p>

        <button
          type="button"
          onClick={onBackHome}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-text)',
            borderRadius: 'var(--radius-theme)',
          }}
          className="mt-6 min-h-[44px] px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2 shadow-md active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>{t('backToHome')}</span>
        </button>

        <p
          style={{ color: 'var(--color-text-muted)' }}
          className="text-[11px] mt-6 opacity-60"
        >
          {siteConfig.restaurant.name}
        </p>
      </div>
    </div>
  );
};
