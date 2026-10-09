import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Cari makanan, kopi, atau cemilan...',
  totalResults,
}) => {
  return (
    <div className="px-4 pt-3.5">
      <div className="relative flex items-center">
        {/* Ikon Pencarian */}
        <div
          style={{ color: 'var(--color-text-muted)' }}
          className="absolute left-3.5 pointer-events-none"
        >
          <Search className="w-4 h-4" />
        </div>

        {/* Input Text */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Cari menu"
          style={{
            backgroundColor: 'var(--color-bg-page)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-main)',
            borderRadius: 'var(--radius-theme)',
          }}
          className="w-full h-11 border pl-10 pr-12 text-xs sm:text-sm placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all shadow-inner"
        />

        {/* Tombol Hapus Input (Area sentuh 44px) */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Hapus pencarian"
            style={{ color: 'var(--color-text-muted)' }}
            className="absolute right-0 w-11 h-11 flex items-center justify-center hover:opacity-80 active:scale-95 transition-all"
          >
            <span
              style={{
                backgroundColor: 'var(--color-border)',
                color: 'var(--color-text-main)',
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </span>
          </button>
        )}
      </div>

      {/* Informasi Hasil Pencarian jika sedang mencari */}
      {value.trim() && typeof totalResults === 'number' && (
        <p
          style={{ color: 'var(--color-text-muted)' }}
          className="text-[11px] mt-1.5 px-1 font-medium"
        >
          Ditemukan{' '}
          <span style={{ color: 'var(--color-primary)' }} className="font-bold">
            {totalResults}
          </span>{' '}
          menu untuk pencarian &ldquo;{value}&rdquo;
        </p>
      )}
    </div>
  );
};
