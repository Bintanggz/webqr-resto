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
    <aside aria-label="Ringkasan Pesanan" className="fixed bottom-4 left-0 right-0 z-40 px-4 max-w-lg mx-auto">
      <button
        onClick={onClick}
        type="button"
        className="w-full bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between hover:bg-slate-850 active:scale-[0.98] transition-all border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="relative bg-amber-500 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 font-extrabold">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Total Pesanan</p>
            <p className="font-bold text-sm text-white tracking-wide">
              {formatRupiah(totalHarga)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 transition-colors">
          <span>Lihat Pesanan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </aside>
  );
};
