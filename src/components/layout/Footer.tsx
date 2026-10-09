import React from 'react';
import { siteConfig } from '../../config/site.config';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  t: (key: any) => string;
  onOpenQr?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onOpenQr }) => {
  const { restaurant } = siteConfig;

  return (
    <footer
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg-page)',
        color: 'var(--color-text-muted)',
      }}
      className="mt-8 px-4 py-8 border-t text-xs space-y-4 text-center transition-colors"
    >
      {/* Profil Restoran */}
      <div>
        <h3
          style={{ color: 'var(--color-text-main)' }}
          className="font-extrabold text-sm"
        >
          {restaurant.name}
        </h3>
        <p className="text-[11px] mt-0.5 opacity-80">{restaurant.tagline}</p>
      </div>

      {/* Info Alamat & Google Maps */}
      <div className="flex flex-col items-center gap-1.5 max-w-sm mx-auto">
        <div className="flex items-start gap-1.5 justify-center">
          <MapPin
            style={{ color: 'var(--color-primary)' }}
            className="w-4 h-4 flex-shrink-0 mt-0.5"
          />
          <span className="leading-relaxed">{restaurant.address}</span>
        </div>

        {restaurant.mapsUrl && (
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-theme)',
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-card)',
            }}
            className="min-h-[44px] px-3.5 py-2 border inline-flex items-center gap-1.5 font-bold text-[11px] shadow-2xs hover:opacity-90 active:scale-95 transition-all mt-1"
          >
            <span>Buka Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Info Jam Operasional & Instagram */}
      <div className="flex items-center justify-center gap-4 flex-wrap pt-2 border-t border-dashed" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-1.5">
          <Clock
            style={{ color: 'var(--color-primary)' }}
            className="w-3.5 h-3.5"
          />
          <span>
            {t('footerHours')}: {restaurant.openingHours}
          </span>
        </div>

        {restaurant.instagram && (
          <a
            href={`https://instagram.com/${restaurant.instagram}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--color-text-main)' }}
            className="flex items-center gap-1 font-semibold hover:text-pink-600 transition-colors min-h-[44px] px-2"
          >
            <svg
              className="w-3.5 h-3.5 text-pink-500 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>@{restaurant.instagram}</span>
          </a>
        )}
      </div>

      {/* Tombol Akses Cetak QR Meja (Khusus Pengelola Restoran) */}
      {onOpenQr && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenQr}
            style={{
              borderRadius: 'var(--radius-theme)',
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-card)',
              color: 'var(--color-text-main)',
            }}
            className="min-h-[44px] px-4 py-2 border inline-flex items-center gap-2 font-bold text-xs shadow-2xs hover:opacity-90 active:scale-95 transition-all"
          >
            <span>🖨️ Cetak QR Meja Restoran (/qr)</span>
          </button>
        </div>
      )}

      {/* Copyright */}
      <div className="pt-2">
        <p className="text-[10px] opacity-60 font-medium">
          {t('footerRights')}
        </p>
      </div>
    </footer>
  );
};
