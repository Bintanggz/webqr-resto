import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatRupiah } from '../../utils/currency';

interface CartFloatingBarProps {
  totalItems: number;
  totalHarga: number;
  onClick: () => void;
}

export const CartFloatingBar: React.FC<CartFloatingBarProps> = ({
  totalItems,
  totalHarga,
  onClick,
}) => {
  if (totalItems === 0) return null;

  return (
    <aside
      aria-label="Ringkasan Keranjang"
      className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:px-6 max-w-xl mx-auto pointer-events-none"
    >
      <button
        onClick={onClick}
        type="button"
        style={{
          backgroundColor: 'var(--primary)',
          borderRadius: '14px',
          height: '56px',
        }}
        className="w-full text-white px-4 shadow-lg flex items-center justify-between pointer-events-auto transition-transform active:scale-[0.98] hover:opacity-95"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span
              style={{
                backgroundColor: 'var(--color-danger)',
                borderColor: 'var(--primary)',
              }}
              className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border font-bold"
            >
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-[11px] opacity-80 leading-none">Total Pesanan</p>
            <p className="text-[15px] font-semibold tabular-nums mt-0.5 leading-tight">
              {formatRupiah(totalHarga)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-[10px]">
          <span>Lihat Pesanan</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
        </div>
      </button>
    </aside>
  );
};
