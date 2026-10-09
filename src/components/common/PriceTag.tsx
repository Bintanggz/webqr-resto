import React from 'react';
import { formatRupiah } from '../../utils/currency';

interface PriceTagProps {
  harga: number;
  hargaCoret?: number | null;
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  harga,
  hargaCoret,
  className = '',
}) => {
  return (
    <div className={`flex items-baseline gap-1.5 flex-wrap ${className}`}>
      <span
        style={{ color: 'var(--color-primary)' }}
        className="font-extrabold text-base tracking-tight"
      >
        {formatRupiah(harga)}
      </span>
      {hargaCoret && hargaCoret > harga && (
        <span className="text-xs text-theme-muted line-through opacity-70">
          {formatRupiah(hargaCoret)}
        </span>
      )}
    </div>
  );
};
