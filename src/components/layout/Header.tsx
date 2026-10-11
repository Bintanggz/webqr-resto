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
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      className="relative border-b transition-colors"
    >
      {/* Banner Sampul dengan Overlay Gelap Tipis (Bukan Gradien) */}
      <div className="h-44 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden relative bg-[var(--text)]">
        <img
          src={restaurant.banner}
          alt={restaurant.name}
          width={1280}
          height={480}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Overlay Gelap Tipis */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Label nomor meja jika berasal dari QR */}
        {features.tableNumber && nomorMeja && (
          <div
            style={{
              borderRadius: 'var(--radius)',
              color: 'var(--text)',
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
            className="absolute top-4 right-4 backdrop-blur-md px-3.5 py-1.5 shadow-sm text-xs font-semibold flex items-center gap-1.5 border"
          >
            <span>Meja #{nomorMeja}</span>
          </div>
        )}
      </div>

      {/* Profil Restoran dengan Banyak Ruang Kosong (Whitespace Mewah) */}
      <div className="app-container pb-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14 sm:-mt-16 relative z-10">
          {/* Logo Restoran */}
          <div
            style={{
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="w-20 h-20 sm:w-24 sm:h-24 p-1.5 border flex-shrink-0 overflow-hidden"
          >
            <img
              src={restaurant.logo}
              alt={`Logo ${restaurant.name}`}
              width={96}
              height={96}
              style={{ borderRadius: 'calc(var(--radius) - 4px)' }}
              className="w-full h-full object-cover"
              decoding="async"
            />
          </div>

          {/* Nama & Detail Restoran */}
          <div className="flex-1 min-w-0">
            {/* Tipografi Skala Responsif: 32px (mobile), 40px (tablet), 48px (desktop) */}
            <h1
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-heading)',
              }}
              className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-tight tracking-normal"
            >
              {restaurant.name}
            </h1>

            {restaurant.tagline && (
              <p
                style={{ color: 'var(--text-muted)' }}
                className="text-sm md:text-base mt-1 line-clamp-2"
              >
                {restaurant.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Informasi Jam Buka & Lokasi (Teks Minimalis, Bukan Blok Warna Besar) */}
        <div
          style={{ borderColor: 'var(--border)' }}
          className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs text-[var(--text-muted)]"
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Jam Buka & Status Tipis */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{restaurant.openingHours}</span>
              <span className="mx-1">•</span>
              <span className="inline-flex items-center gap-1">
                <span
                  style={{
                    backgroundColor: isOpen ? 'var(--color-success)' : 'var(--color-danger)',
                  }}
                  className="w-1.5 h-1.5 rounded-full"
                />
                <span style={{ color: isOpen ? 'var(--color-success)' : 'var(--color-danger)' }} className="font-medium">
                  {isOpen ? 'Buka' : 'Tutup'}
                </span>
              </span>
            </div>

            {/* Alamat */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
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
              className="inline-flex items-center gap-1 hover:underline font-medium text-xs ml-auto"
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
