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

  // Jika semua fitur bar atas dinonaktifkan di config, jangan render
  if (
    !features.multiLanguage &&
    !features.shareMenu &&
    !features.contactWhatsApp
  ) {
    return null;
  }

  // Handler Bagikan Menu via Web Share API / Clipboard
  const handleShare = async () => {
    const shareData = {
      title: restaurant.name,
      text: `${restaurant.name} - ${restaurant.tagline}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
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

  // Handler Hubungi Kasir via WhatsApp Langsung
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
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
      className="px-4 py-2 border-b flex items-center justify-between gap-2 text-xs relative transition-colors"
    >
      {/* Toast Notifikasi Berhasil Salin Link */}
      {copiedToast && (
        <div className="absolute top-full left-4 right-4 mt-2 z-50 p-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span>{t('shareSuccess')}</span>
        </div>
      )}

      {/* Bagian Kiri: Tombol Bahasa ID / EN */}
      {features.multiLanguage ? (
        <div className="flex items-center gap-1">
          <span style={{ color: 'var(--color-text-muted)' }} className="flex items-center gap-1 font-semibold text-[11px] mr-1">
            <Globe className="w-3.5 h-3.5" />
          </span>
          <div
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-page)',
              borderRadius: 'var(--radius-theme)',
            }}
            className="flex items-center p-0.5 border"
          >
            <button
              type="button"
              onClick={() => onToggleLang('id')}
              style={{
                borderRadius: 'calc(var(--radius-theme) * 0.75)',
                backgroundColor: currentLang === 'id' ? 'var(--color-primary)' : 'transparent',
                color: currentLang === 'id' ? 'var(--color-primary-text)' : 'var(--color-text-muted)',
              }}
              className="min-h-[36px] min-w-[36px] px-2 text-[11px] font-bold transition-all"
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              style={{
                borderRadius: 'calc(var(--radius-theme) * 0.75)',
                backgroundColor: currentLang === 'en' ? 'var(--color-primary)' : 'transparent',
                color: currentLang === 'en' ? 'var(--color-primary-text)' : 'var(--color-text-muted)',
              }}
              className="min-h-[36px] min-w-[36px] px-2 text-[11px] font-bold transition-all"
            >
              EN
            </button>
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* Bagian Kanan: Tombol Bagikan & Hubungi WA */}
      <div className="flex items-center gap-1.5">
        {/* Tombol Bagikan Menu */}
        {features.shareMenu && (
          <button
            type="button"
            onClick={handleShare}
            aria-label={t('shareMenu')}
            style={{
              borderRadius: 'var(--radius-theme)',
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-page)',
              color: 'var(--color-text-main)',
            }}
            className="min-h-[44px] px-3 border flex items-center gap-1.5 text-xs font-bold active:scale-95 transition-all shadow-2xs hover:opacity-90"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">{t('shareMenu')}</span>
          </button>
        )}

        {/* Tombol Hubungi Kasir via WA */}
        {features.contactWhatsApp && (
          <button
            type="button"
            onClick={handleContactWhatsApp}
            aria-label={t('contactWA')}
            style={{
              borderRadius: 'var(--radius-theme)',
            }}
            className="min-h-[44px] px-3 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 text-xs font-bold active:scale-95 transition-all shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t('contactWA')}</span>
          </button>
        )}
      </div>
    </div>
  );
};
