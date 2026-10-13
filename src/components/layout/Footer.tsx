import React from 'react';
import { siteConfig } from '../../config/site.config';
import { useLanguage } from '../../hooks/useLanguage';
import { MapPin, Clock, ExternalLink, Printer } from 'lucide-react';

interface FooterProps {
  t?: (key: any) => string;
  onOpenQr?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQr }) => {
  const { restaurant } = siteConfig;
  const { lang, t } = useLanguage();

  const currentTagline = lang === 'en' && restaurant.taglineEn ? restaurant.taglineEn : restaurant.tagline;
  const currentAddress = lang === 'en' && restaurant.addressEn ? restaurant.addressEn : restaurant.address;
  const currentHours = lang === 'en' && restaurant.openingHoursEn ? restaurant.openingHoursEn : restaurant.openingHours;

  return (
    <footer
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--surface)',
        color: 'var(--text-muted)',
      }}
      className="mt-16 border-t text-xs transition-colors"
    >
      <div className="app-container py-10">
        <div className="footer-grid text-left">
          {/* Kolom 1: Profil Restoran */}
          <div>
            <h3
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-heading)',
              }}
              className="text-lg font-semibold leading-tight"
            >
              {restaurant.name}
            </h3>
            {currentTagline && (
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {currentTagline}
              </p>
            )}
          </div>

          {/* Kolom 2: Info Alamat & Google Maps */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 stroke-[1.5]" style={{ color: 'var(--primary)' }} />
              <span className="leading-relaxed">{currentAddress}</span>
            </div>

            {restaurant.mapsUrl && (
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--primary)',
                }}
                className="inline-flex items-center gap-1 font-medium text-xs hover:underline mt-0.5"
              >
                <span>{t('openGoogleMaps')}</span>
                <ExternalLink className="w-3 h-3 stroke-[1.5]" />
              </a>
            )}
          </div>

          {/* Kolom 3: Info Jam & Instagram */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 stroke-[1.5]" style={{ color: 'var(--primary)' }} />
              <span>
                {t('footerHours')}: {currentHours}
              </span>
            </div>

            {restaurant.instagram && (
              <a
                href={`https://instagram.com/${restaurant.instagram}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text)' }}
                className="inline-flex items-center gap-1.5 font-medium hover:underline"
              >
                <span>@{restaurant.instagram}</span>
              </a>
            )}
          </div>
        </div>

        {/* Akses Cetak QR Meja */}
        {onOpenQr && (
          <div className="pt-6 mt-6 border-t flex justify-center" style={{ borderColor: 'var(--border)' }}>
            <button
              type="button"
              onClick={onOpenQr}
              style={{
                borderRadius: '8px',
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
              }}
              className="px-4 py-2 border inline-flex items-center gap-2 font-medium text-xs hover:border-[var(--primary)] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{t('printQrCode')}</span>
            </button>
          </div>
        )}

        {/* Garis Pemisah & Hak Cipta */}
        <div className="pt-6 mt-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[11px] opacity-70">
            {t('footerRights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
