import React, { useState } from 'react';
import type { MenuItem } from '../../types/menu';
import { formatRupiah } from '../../utils/currency';
import { LazyImage } from '../common/LazyImage';
import { X, Plus, Minus, Check } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen?: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedVariants: Record<string, string>,
    selectedAddons: string[],
    notes: string,
    unitPrice: number
  ) => void;
  isViewOnly?: boolean;
  t?: (key: any) => string;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen = true,
  onClose,
  onAddToCart,
  isViewOnly = false,
}) => {
  // State untuk varian default
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (item?.variants) {
      item.variants.forEach((v) => {
        if (v.options.length > 0) {
          initial[v.name] = v.options[0].name;
        }
      });
    }
    return initial;
  });

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen || !item) return null;

  // Hitung unitPrice dengan penambahan harga varian & addons
  let unitPrice = item.price;

  if (item.variants) {
    item.variants.forEach((v) => {
      const selectedOptionName = selectedVariants[v.name];
      const opt = v.options.find((o) => o.name === selectedOptionName);
      if (opt && opt.priceDelta) {
        unitPrice += opt.priceDelta;
      }
    });
  }

  if (item.addons) {
    item.addons.forEach((a) => {
      if (selectedAddons.includes(a.name)) {
        unitPrice += a.price;
      }
    });
  }

  const totalPrice = unitPrice * quantity;

  const handleVariantChange = (variantName: string, optionName: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: optionName,
    }));
  };

  const toggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((name) => name !== addonName)
        : [...prev, addonName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(item, quantity, selectedVariants, selectedAddons, notes, unitPrice);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 backdrop-blur-[2px] transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
        }}
        className="w-full md:max-w-[640px] rounded-t-[28px] md:rounded-2xl max-h-[90vh] md:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden transition-transform"
      >
        {/* Handle bar bottom-sheet mobile */}
        <div className="w-full pt-3 pb-1 flex justify-center md:hidden">
          <div
            style={{ backgroundColor: 'var(--border)' }}
            className="w-12 h-1.5 rounded-full"
          />
        </div>

        {/* Header Gambar & Tombol Tutup */}
        <div className="relative">
          <div className="h-48 md:h-60 w-full relative bg-[var(--bg)]">
            <LazyImage
              src={item.image}
              alt={item.name}
              width={640}
              height={260}
              containerClassName="w-full h-full object-cover"
            />
            {/* Tombol Tutup Area Sentuh 44px */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup jendela"
              className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors z-10"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Konten Scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Judul & Deskripsi */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2
                id="modal-item-title"
                style={{ color: 'var(--text)' }}
                className="text-lg md:text-xl font-semibold leading-snug"
              >
                {item.name}
              </h2>
              <div
                style={{ color: 'var(--primary)' }}
                className="text-base font-semibold tabular-nums flex-shrink-0"
              >
                {formatRupiah(unitPrice)}
              </div>
            </div>

            <p
              style={{ color: 'var(--text-muted)' }}
              className="text-sm leading-[1.6] mt-2"
            >
              {item.description}
            </p>
          </div>

          {/* Pilihan Varian */}
          {item.variants && item.variants.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-[var(--border)]">
              {item.variants.map((variant) => (
                <div key={variant.name}>
                  <label
                    style={{ color: 'var(--text)' }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    {variant.name}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {variant.options.map((opt) => {
                      const isSelected = selectedVariants[variant.name] === opt.name;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => handleVariantChange(variant.name, opt.name)}
                          style={{
                            borderRadius: '8px',
                            backgroundColor: isSelected
                              ? 'var(--primary-light)'
                              : 'var(--surface)',
                            borderColor: isSelected
                              ? 'var(--primary)'
                              : 'var(--border)',
                            color: isSelected
                              ? 'var(--primary)'
                              : 'var(--text)',
                          }}
                          className="min-h-[44px] px-3 py-2 border text-left text-xs font-medium transition-colors flex items-center justify-between"
                        >
                          <span className="truncate">{opt.name}</span>
                          {opt.priceDelta ? (
                            <span className="text-[11px] font-normal opacity-80 ml-1">
                              +{formatRupiah(opt.priceDelta)}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pilihan Addons */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[var(--border)]">
              <label
                style={{ color: 'var(--text)' }}
                className="block text-xs font-semibold uppercase tracking-wider"
              >
                Tambahan / Topping
              </label>
              <div className="space-y-2">
                {item.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddon(addon.name)}
                      style={{
                        borderRadius: '8px',
                        backgroundColor: isChecked
                          ? 'var(--primary-light)'
                          : 'var(--surface)',
                        borderColor: isChecked
                          ? 'var(--primary)'
                          : 'var(--border)',
                        color: isChecked
                          ? 'var(--primary)'
                          : 'var(--text)',
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 border flex items-center justify-between text-xs font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            borderColor: isChecked ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: isChecked ? 'var(--primary)' : 'transparent',
                          }}
                          className="w-4 h-4 rounded border flex items-center justify-center text-white"
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[2]" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="tabular-nums">+{formatRupiah(addon.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Catatan Item */}
          <div className="pt-2 border-t border-[var(--border)]">
            <label
              htmlFor="item-notes-input"
              style={{ color: 'var(--text)' }}
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            >
              Catatan Pesanan
            </label>
            <input
              id="item-notes-input"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Kurangi manis, es dipisah..."
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
                borderRadius: '8px',
              }}
              className="w-full h-10 border px-3 text-xs focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* Footer Aksi Modal */}
        <div
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
          }}
          className="p-4 border-t flex items-center gap-3"
        >
          {isViewOnly ? (
            <div className="w-full flex items-center justify-between">
              <div>
                <p style={{ color: 'var(--text-muted)' }} className="text-xs">
                  Katalog Menu Digital
                </p>
                <p style={{ color: 'var(--primary)' }} className="text-sm font-semibold tabular-nums">
                  {formatRupiah(unitPrice)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  borderRadius: '10px',
                  height: '48px',
                }}
                className="px-6 text-sm font-medium transition-colors hover:bg-[var(--primary-hover)]"
              >
                Tutup
              </button>
            </div>
          ) : (
            <>
              {/* Stepper Kuantitas */}
              <div
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--bg)',
                  borderRadius: '10px',
                  height: '48px',
                }}
                className="flex items-center border px-1"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Kurangi jumlah"
                  style={{ color: 'var(--text)' }}
                  className="w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-opacity"
                >
                  <Minus className="w-4 h-4 stroke-[1.5]" />
                </button>
                <span
                  style={{ color: 'var(--text)' }}
                  className="w-8 text-center font-semibold text-sm tabular-nums select-none"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tambah jumlah"
                  style={{ color: 'var(--text)' }}
                  className="w-10 h-10 flex items-center justify-center transition-opacity"
                >
                  <Plus className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              {/* Tombol Tambah ke Keranjang */}
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                }}
                className="flex-1 font-bold text-sm px-5 h-12 rounded-full flex items-center justify-between transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
              >
                <span>Tambah ke Keranjang</span>
                <span className="tabular-nums font-extrabold">{formatRupiah(totalPrice)}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
