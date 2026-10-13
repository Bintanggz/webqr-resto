import React from 'react';
import { siteConfig } from '../../config/site.config';
import { useIsOpen } from '../../hooks/useIsOpen';
import { Clock, MapPin, ExternalLink, Star, QrCode } from 'lucide-react';

interface HeaderProps {
  nomorMeja?: string;
}

export const Header: React.FC<HeaderProps> = ({ nomorMeja }) => {
  const { restaurant, features } = siteConfig;
  const isOpen = useIsOpen(restaurant.openingHours);

  return (
    <header
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      className="relative border-b transition-colors"
    >
      {/* Banner Sampul dengan Gradien Vignette Halus */}
      <div className="h-44 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden relative bg-neutral-900">
        <img
          src={restaurant.banner}
          alt={restaurant.name}
          width={1280}
          height={480}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Soft bottom vignette gradient for seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

        {/* Floating Table Badge (Frosted glass pill ala modern QR dine-in) */}
        {features.tableNumber && nomorMeja && (
          <div className="absolute top-4 right-4 backdrop-blur-md bg-white/95 text-neutral-900 border border-white/40 px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-[var(--primary)] stroke-[2]" />
            <span>Meja #{nomorMeja}</span>
          </div>
        )}

        {/* Open / Closed live chip floating at top-left of banner */}
        <div className="absolute top-4 left-4 backdrop-blur-md bg-black/50 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
          <span
            style={{
              backgroundColor: isOpen ? 'var(--color-success)' : 'var(--color-danger)',
            }}
            className="w-2 h-2 rounded-full animate-pulse"
          />
          <span>{isOpen ? 'Buka Sekarang' : 'Sedang Tutup'}</span>
        </div>
      </div>

      {/* Profil Restoran */}
      <div className="app-container pb-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 relative z-10">
          {/* Logo Restoran: Mengambang elegan setengah di atas batas banner */}
          <div
            style={{
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--surface)',
              boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
            }}
            className="-mt-12 sm:-mt-16 w-20 h-20 sm:w-24 sm:h-24 p-1 border-4 flex-shrink-0 overflow-hidden relative z-10 bg-white"
          >
            <img
              src={restaurant.logo}
              alt={`Logo ${restaurant.name}`}
              width={96}
              height={96}
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
              className="w-full h-full object-cover"
              decoding="async"
            />
          </div>

          {/* Nama & Detail Restoran */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1
                style={{
                  color: 'var(--text)',
                  fontFamily: 'var(--font-heading)',
                }}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight"
              >
                {restaurant.name}
              </h1>
            </div>

            {/* Social Proof & Kategori Ala GoFood/GrabFood */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-[var(--text-muted)] font-medium mt-1">
              <span className="inline-flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/50">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                <span>4.9</span>
                <span className="text-neutral-400 font-normal">(500+ rating)</span>
              </span>
              <span>•</span>
              <span>Menu Resmi Dine-In</span>
            </div>

            {restaurant.tagline && (
              <p
                style={{ color: 'var(--text-muted)' }}
                className="text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed"
              >
                {restaurant.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Informasi Jam Buka & Lokasi (Pill Chips yang Rapi dan Bersih) */}
        <div
          style={{ borderColor: 'var(--border)' }}
          className="mt-5 pt-4 border-t flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-[var(--text-muted)]"
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Jam Buka */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 stroke-[1.5] text-[var(--primary)]" />
              <span>{restaurant.openingHours}</span>
            </div>

            {/* Alamat */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 stroke-[1.5] text-[var(--primary)]" />
              <span className="line-clamp-1">{restaurant.address}</span>
            </div>
          </div>

          {/* Link Google Maps */}
          {restaurant.mapsUrl && (
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary)' }}
              className="inline-flex items-center gap-1 hover:underline font-semibold text-xs ml-auto"
            >
              <span>Petunjuk Arah</span>
              <ExternalLink className="w-3 h-3 stroke-[1.5]" />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
