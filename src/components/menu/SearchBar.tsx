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
  placeholder = 'Cari menu atau minuman favorit...',
  totalResults,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto pt-4 pb-2">
      <div className="relative flex items-center">
        {/* Ikon Pencarian */}
        <div
          style={{ color: 'var(--text-muted)' }}
          className="absolute left-3.5 pointer-events-none flex items-center"
        >
          <Search className="w-4 h-4 stroke-[1.5]" />
        </div>

        {/* Input Text */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Cari menu"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-sm)',
          }}
          className="w-full h-11 border pl-10 pr-12 text-sm placeholder:opacity-60 focus:outline-none focus:border-[var(--primary)] transition-all"
        />

        {/* Tombol Hapus Input (Area sentuh 44px) */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Hapus pencarian"
            style={{ color: 'var(--text-muted)' }}
            className="absolute right-0 w-11 h-11 flex items-center justify-center hover:opacity-80 active:scale-95 transition-opacity"
          >
            <span
              style={{
                backgroundColor: 'var(--border)',
                color: 'var(--text)',
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 stroke-[1.5]" />
            </span>
          </button>
        )}
      </div>

      {/* Informasi Hasil Pencarian jika sedang mencari */}
      {value.trim() && typeof totalResults === 'number' && (
        <p
          style={{ color: 'var(--text-muted)' }}
          className="text-xs mt-2 px-1 font-medium"
        >
          Ditemukan{' '}
          <span style={{ color: 'var(--primary)' }} className="font-semibold">
            {totalResults}
          </span>{' '}
          menu untuk pencarian &ldquo;{value}&rdquo;
        </p>
      )}
    </div>
  );
};
