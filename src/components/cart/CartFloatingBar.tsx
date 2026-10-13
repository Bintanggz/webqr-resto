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
      className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 px-4 sm:px-6 max-w-lg mx-auto pointer-events-none"
    >
      <button
        onClick={onClick}
        type="button"
        style={{
          backgroundColor: 'var(--primary)',
        }}
        className="w-full text-white px-5 py-3 rounded-full shadow-[0_12px_30px_-4px_rgba(0,0,0,0.3)] flex items-center justify-between pointer-events-auto transition-all active:scale-[0.98] hover:opacity-95 border border-white/15"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center border-2 border-[var(--primary)] font-extrabold shadow-sm">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-wider font-semibold opacity-90 leading-none">
              {totalItems} Menu Dipilih
            </p>
            <p className="text-[16px] font-extrabold tabular-nums mt-0.5 leading-tight">
              {formatRupiah(totalHarga)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold bg-white text-neutral-900 px-3.5 py-1.5 rounded-full shadow-sm">
          <span>Lihat Pesanan</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </button>
    </aside>
  );
};
