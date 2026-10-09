import React from 'react';
import { siteConfig } from '../../config/site.config';
import { useIsOpen } from '../../hooks/useIsOpen';
import { Clock, MapPin, ExternalLink } from 'lucide-react';

interface HeaderProps {
  nomorMeja?: string;
}

export const Header: React.FC<HeaderProps> = ({ nomorMeja }) => {
  const { restaurant, features } = siteConfig;
  const isOpen = useIsOpen(restaurant.openingHours);

  return (
    <header
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
      className="relative shadow-xs border-b transition-colors"
    >
      {/* Banner Sampul */}
      <div className="h-32 sm:h-40 w-full overflow-hidden bg-slate-900 relative">
        <img
          src={restaurant.banner}
          alt={restaurant.name}
          width={480}
          height={160}
          className="w-full h-full object-cover opacity-90"
          loading="eager"
          decoding="async"
        />
        {/* Label nomor meja jika fitur aktif & ada nomor meja */}
        {features.tableNumber && nomorMeja && (
          <div
            style={{
              borderRadius: 'var(--radius-theme)',
              color: 'var(--color-primary)',
            }}
            className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 shadow text-xs font-bold flex items-center gap-1.5 border border-amber-200 dark:border-amber-900"
          >
            <span>Meja #{nomorMeja}</span>
          </div>
        )}
      </div>

      {/* Profil & Identitas Restoran */}
      <div className="px-4 pb-4 pt-2 max-w-lg mx-auto">
        <div className="flex items-start gap-3.5 -mt-8 relative z-10">
          <div
            style={{
              borderRadius: 'var(--radius-theme)',
              backgroundColor: 'var(--color-bg-card)',
            }}
            className="w-16 h-16 shadow-md p-1 border-2 border-white dark:border-slate-800 flex-shrink-0 overflow-hidden"
          >
            <img
              src={restaurant.logo}
              alt={`Logo ${restaurant.name}`}
              width={64}
              height={64}
              style={{ borderRadius: 'calc(var(--radius-theme) * 0.75)' }}
              className="w-full h-full object-cover"
              decoding="async"
            />
          </div>

          <div className="pt-8 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  style={{ color: 'var(--color-text-main)' }}
                  className="text-xl font-bold leading-tight"
                >
                  {restaurant.name}
                </h1>
                {/* Status Buka/Tutup Real-time */}
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isOpen
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                    }`}
                  />
                  <span>{isOpen ? 'BUKA' : 'TUTUP'}</span>
                </span>
              </div>

              {restaurant.instagram && (
                <a
                  href={`https://instagram.com/${restaurant.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 bg-pink-50 dark:bg-pink-950/40 dark:text-pink-300 px-2.5 py-0.5 rounded-full hover:opacity-80 transition-opacity"
                  title="Kunjungi Instagram"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@{restaurant.instagram}</span>
                </a>
              )}
            </div>
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-xs mt-0.5 line-clamp-1"
            >
              {restaurant.tagline}
            </p>
          </div>
        </div>

        {/* Info Lokasi & Jam Buka */}
        <div
          style={{ borderColor: 'var(--color-border)' }}
          className="mt-3.5 pt-3 border-t flex items-center justify-between text-xs gap-2"
        >
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--color-text-muted)' }}
            className="flex items-center gap-1 min-w-0 truncate hover:opacity-80 transition-opacity"
            title="Buka di Google Maps"
          >
            <MapPin
              style={{ color: 'var(--color-primary)' }}
              className="w-3.5 h-3.5 flex-shrink-0"
            />
            <span className="truncate">{restaurant.address}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-50 flex-shrink-0" />
          </a>
          <div
            style={{ color: 'var(--color-text-main)' }}
            className="flex items-center gap-1 flex-shrink-0 font-medium"
          >
            <Clock
              style={{ color: 'var(--color-primary)' }}
              className="w-3.5 h-3.5"
            />
            <span>{restaurant.openingHours}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
