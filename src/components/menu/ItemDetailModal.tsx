import React, { useState, useEffect } from 'react';
import type { MenuItem } from '../../types/menu';
import { LazyImage } from '../common/LazyImage';
import { formatRupiah } from '../../utils/currency';
import { siteConfig } from '../../config/site.config';
import { X, Plus, Minus, Check } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedVariants: Record<string, string>,
    selectedAddons: string[],
    notes: string,
    calculatedUnitPrice: number
  ) => void;
  isViewOnly?: boolean;
  t?: (key: any, vars?: any) => string;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  isViewOnly = false,
  t,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Reset state setiap kali modal dibuka dengan item baru
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setNotes('');
      setSelectedAddons([]);

      // Set varian pertama sebagai default jika ada varian
      const initialVariants: Record<string, string> = {};
      if (item.variants && item.variants.length > 0) {
        item.variants.forEach((v) => {
          if (v.options.length > 0) {
            initialVariants[v.name] = v.options[0].name;
          }
        });
      }
      setSelectedVariants(initialVariants);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Hitung tambahan harga dari varian
  let variantDelta = 0;
  if (item.variants) {
    item.variants.forEach((v) => {
      const chosenOptName = selectedVariants[v.name];
      const opt = v.options.find((o) => o.name === chosenOptName);
      if (opt && opt.priceDelta) {
        variantDelta += opt.priceDelta;
      }
    });
  }

  // Hitung tambahan harga dari addon
  let addonTotal = 0;
  if (item.addons) {
    item.addons.forEach((a) => {
      if (selectedAddons.includes(a.id)) {
        addonTotal += a.price;
      }
    });
  }

  const unitPrice = item.price + variantDelta + addonTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSelectVariant = (variantName: string, optionName: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: optionName,
    }));
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-bg-card)',
          color: 'var(--color-text-main)',
        }}
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Header Pegangan Bottom-sheet Mobile */}
        <div className="w-full pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header Konten dengan Tombol Tutup 44px */}
        <div className="relative">
          {/* Foto Besar */}
          <div className="h-48 sm:h-56 w-full relative bg-slate-100">
            <LazyImage
              src={item.image}
              alt={item.name}
              containerClassName="w-full h-full"
            />
            {/* Tombol Tutup Area Sentuh 44px */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup jendela"
              className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white bg-slate-900/60 hover:bg-slate-900/80 rounded-full backdrop-blur-md active:scale-90 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Konten Scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Informasi Pokok */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2
                id="modal-item-title"
                style={{ color: 'var(--color-text-main)' }}
                className="text-lg sm:text-xl font-bold leading-snug"
              >
                {item.name}
              </h2>
            </div>
            <p
              style={{ color: 'var(--color-primary)' }}
              className="text-base font-extrabold mt-1"
            >
              {formatRupiah(unitPrice)}
            </p>
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-xs sm:text-sm mt-2 leading-relaxed"
            >
              {item.description}
            </p>
          </div>

          {/* Pilihan Varian */}
          {item.variants && item.variants.length > 0 && (
            <div
              style={{ borderColor: 'var(--color-border)' }}
              className="space-y-4 pt-3 border-t"
            >
              {item.variants.map((v) => (
                <div key={v.name}>
                  <p
                    style={{ color: 'var(--color-text-main)' }}
                    className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between"
                  >
                    <span>{v.name}</span>
                    <span style={{ color: 'var(--color-text-muted)' }} className="text-[11px] font-normal">
                      Pilih 1
                    </span>
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {v.options.map((opt) => {
                      const isSelected = selectedVariants[v.name] === opt.name;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => handleSelectVariant(v.name, opt.name)}
                          style={{
                            borderRadius: 'calc(var(--radius-theme) * 0.75)',
                            borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-page)',
                            color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                          }}
                          className="min-h-[44px] px-3.5 py-2.5 text-xs font-semibold border text-left flex items-center justify-between transition-all"
                        >
                          <span className="line-clamp-1">{opt.name}</span>
                          {opt.priceDelta && opt.priceDelta > 0 ? (
                            <span style={{ color: 'var(--color-primary)' }} className="text-[11px] font-bold flex-shrink-0 ml-1">
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

          {/* Pilihan Add-ons */}
          {item.addons && item.addons.length > 0 && (
            <div
              style={{ borderColor: 'var(--color-border)' }}
              className="pt-3 border-t"
            >
              <p
                style={{ color: 'var(--color-text-main)' }}
                className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between"
              >
                <span>Pilihan Tambahan (Add-on)</span>
                <span style={{ color: 'var(--color-text-muted)' }} className="text-[11px] font-normal">
                  Opsional
                </span>
              </p>
              <div className="space-y-2">
                {item.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleToggleAddon(addon.id)}
                      style={{
                        borderRadius: 'calc(var(--radius-theme) * 0.75)',
                        borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                        backgroundColor: isChecked ? 'var(--color-primary-light)' : 'var(--color-bg-page)',
                        color: 'var(--color-text-main)',
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-xs font-semibold border flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          style={{
                            backgroundColor: isChecked ? 'var(--color-primary)' : 'transparent',
                            borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                            color: 'var(--color-primary-text)',
                          }}
                          className="w-4 h-4 rounded-md border flex items-center justify-center transition-colors"
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>{addon.name}</span>
                      </div>
                      <span style={{ color: 'var(--color-primary)' }} className="font-bold">
                        +{formatRupiah(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Catatan Tambahan */}
          {siteConfig.features.itemNotes && (
            <div
              style={{ borderColor: 'var(--color-border)' }}
              className="pt-3 border-t"
            >
              <label
                htmlFor="item-notes"
                style={{ color: 'var(--color-text-main)' }}
                className="block text-xs font-bold uppercase tracking-wider mb-1.5"
              >
                Catatan Khusus
              </label>
              <textarea
                id="item-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Jangan pakai seledri, kuah kaldu dipisah ya..."
                rows={2}
                style={{
                  backgroundColor: 'var(--color-bg-page)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-main)',
                  borderRadius: 'var(--radius-theme)',
                }}
                className="w-full border p-3 text-xs placeholder:opacity-60 focus:outline-none transition-all resize-none"
              />
            </div>
          )}
        </div>

        {/* Footer Bar: Counter & Tombol Tambah Pesanan / Mode Lihat Saja */}
        <div
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg-card)',
          }}
          className="p-4 border-t flex items-center gap-3"
        >
          {isViewOnly ? (
            <div className="w-full flex items-center justify-between gap-3">
              <div>
                <p style={{ color: 'var(--color-text-muted)' }} className="text-xs">
                  {t ? t('modal_view_only_note') : 'Mode Katalog Menu (Pemesanan di kasir / pelayan)'}
                </p>
                <p style={{ color: 'var(--color-primary)' }} className="text-sm font-bold">
                  {formatRupiah(unitPrice)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-text)',
                  borderRadius: 'var(--radius-theme)',
                }}
                className="min-h-[44px] px-6 py-2.5 font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-xs"
              >
                {t ? t('modal_close') : 'Tutup'}
              </button>
            </div>
          ) : (
            <>
              {/* Tombol Kuantitas (- / +) dengan Area Sentuh 44px */}
              <div
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg-page)',
                  borderRadius: 'var(--radius-theme)',
                }}
                className="flex items-center border shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Kurangi jumlah"
                  style={{ color: 'var(--color-text-main)' }}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  style={{ color: 'var(--color-text-main)' }}
                  className="w-8 text-center font-bold text-sm select-none"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tambah jumlah"
                  style={{ color: 'var(--color-text-main)' }}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tombol Tambah ke Keranjang */}
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-text)',
                  borderRadius: 'var(--radius-theme)',
                }}
                className="flex-1 min-h-[48px] active:scale-[0.98] font-bold text-xs sm:text-sm px-4 py-3 flex items-center justify-between shadow-md transition-opacity hover:opacity-90"
              >
                <span>{t ? t('modal_add_to_cart') : 'Tambah ke Keranjang'}</span>
                <span>{formatRupiah(totalPrice)}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
