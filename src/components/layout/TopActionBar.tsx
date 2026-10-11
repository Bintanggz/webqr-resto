import React, { useState } from 'react';
import { siteConfig } from '../../config/site.config';
import { Share2, MessageCircle, Globe, Check } from 'lucide-react';
import type { LanguageCode } from '../../hooks/useLanguage';

interface TopActionBarProps {
  currentLang: LanguageCode;
  onToggleLang: (lang: LanguageCode) => void;
  t: (key: any) => string;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({
  currentLang,
  onToggleLang,
  t,
}) => {
  const { features, restaurant, whatsapp } = siteConfig;
  const [copiedToast, setCopiedToast] = useState(false);

  if (
    !features.multiLanguage &&
    !features.shareMenu &&
    !features.contactWhatsApp
  ) {
    return null;
  }

  const handleShare = async () => {
    const shareData = {
      title: restaurant.name,
      text: `${restaurant.name} - ${restaurant.tagline}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 3000);
      } catch {
        // Fallback
      }
    }
  };

  const handleContactWhatsApp = () => {
    const cleanNumber = whatsapp.number.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Halo ${restaurant.name}, saya ingin bertanya perihal menu dan layanan meja.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      className="border-b relative transition-colors"
    >
      <div className="app-container py-2 flex items-center justify-between gap-3 text-xs">
        {/* Toast Notifikasi Berhasil Salin Link */}
        {copiedToast && (
          <div
            style={{
              backgroundColor: 'var(--primary)',
              borderRadius: '8px',
            }}
            className="absolute top-full left-4 right-4 mt-2 z-50 p-2.5 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>{t('shareSuccess')}</span>
          </div>
        )}

        {/* Bagian Kiri: Tombol Bahasa ID / EN */}
        {features.multiLanguage ? (
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 stroke-[1.5]" style={{ color: 'var(--text-muted)' }} />
            <div
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg)',
                borderRadius: '6px',
              }}
              className="flex items-center p-0.5 border"
            >
              <button
                type="button"
                onClick={() => onToggleLang('id')}
                style={{
                  borderRadius: '4px',
                  backgroundColor: currentLang === 'id' ? 'var(--primary)' : 'transparent',
                  color: currentLang === 'id' ? '#ffffff' : 'var(--text-muted)',
                }}
                className="px-2 py-0.5 text-[11px] font-medium transition-colors"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                style={{
                  borderRadius: '4px',
                  backgroundColor: currentLang === 'en' ? 'var(--primary)' : 'transparent',
                  color: currentLang === 'en' ? '#ffffff' : 'var(--text-muted)',
                }}
                className="px-2 py-0.5 text-[11px] font-medium transition-colors"
              >
                EN
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}

        {/* Bagian Kanan: Tombol Bagikan & Hubungi WA */}
        <div className="flex items-center gap-2">
          {features.shareMenu && (
            <button
              type="button"
              onClick={handleShare}
              aria-label={t('shareMenu')}
              style={{
                borderRadius: '6px',
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
              }}
              className="px-2.5 py-1.5 border flex items-center gap-1.5 text-xs font-medium hover:border-[var(--primary)] transition-colors"
            >
              <Share2 className="w-3 h-3 stroke-[1.5]" style={{ color: 'var(--primary)' }} />
              <span className="hidden sm:inline">{t('shareMenu')}</span>
            </button>
          )}

          {features.contactWhatsApp && (
            <button
              type="button"
              onClick={handleContactWhatsApp}
              aria-label={t('contactWA')}
              style={{
                borderRadius: '6px',
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
              }}
              className="px-2.5 py-1.5 border flex items-center gap-1.5 text-xs font-medium hover:border-[var(--primary)] transition-colors"
            >
              <MessageCircle className="w-3 h-3 stroke-[1.5]" style={{ color: 'var(--color-whatsapp)' }} />
              <span>{t('contactWA')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
