import React, { useState } from 'react';
import type { CartItem, CustomerOrderInfo } from '../../types/cart';
import { siteConfig } from '../../config/site.config';
import { formatRupiah } from '../../utils/currency';
import { buildWhatsAppOrderUrl } from '../../utils/whatsapp';
import { LazyImage } from '../common/LazyImage';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Lock,
  UtensilsCrossed,
  ShoppingBag as BagIcon,
  Bike,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalItems: number;
  totalHarga: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  initialTableNumber: string;
  isTableLocked: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  totalItems,
  totalHarga,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem,
  onClearCart,
  initialTableNumber,
  isTableLocked,
}) => {
  const { orderTypes } = siteConfig;
  const availableOrderTypes: Array<{
    id: 'dineIn' | 'takeAway' | 'delivery';
    label: string;
    icon: typeof UtensilsCrossed;
  }> = [];

  if (orderTypes.dineIn.enabled) {
    availableOrderTypes.push({
      id: 'dineIn',
      label: orderTypes.dineIn.label,
      icon: UtensilsCrossed,
    });
  }
  if (orderTypes.takeAway.enabled) {
    availableOrderTypes.push({
      id: 'takeAway',
      label: orderTypes.takeAway.label,
      icon: BagIcon,
    });
  }
  if (orderTypes.delivery.enabled) {
    availableOrderTypes.push({
      id: 'delivery',
      label: orderTypes.delivery.label,
      icon: Bike,
    });
  }

  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>({
    namaPelanggan: '',
    tipePesanan: availableOrderTypes[0]?.id || 'dineIn',
    tipePesananLabel: availableOrderTypes[0]?.label || 'Dine In',
    nomorMeja: initialTableNumber || '',
    alamat: '',
    catatanUmum: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  if (!isOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) {
      setErrorMessage('Keranjang belanja Anda masih kosong.');
      return;
    }

    if (!customerInfo.namaPelanggan.trim()) {
      setErrorMessage('Harap isi Nama Pemesan terlebih dahulu.');
      return;
    }

    if (
      customerInfo.tipePesanan === 'dineIn' &&
      siteConfig.features.tableNumber &&
      !customerInfo.nomorMeja.trim()
    ) {
      setErrorMessage('Harap isi Nomor Meja Anda.');
      return;
    }

    if (
      customerInfo.tipePesanan === 'delivery' &&
      !customerInfo.alamat?.trim()
    ) {
      setErrorMessage('Harap cantumkan Alamat Lengkap untuk pengantaran.');
      return;
    }

    setErrorMessage(null);

    const waUrl = buildWhatsAppOrderUrl(
      siteConfig.whatsapp.number,
      siteConfig.restaurant.name,
      items,
      customerInfo,
      totalHarga,
      siteConfig.whatsapp.orderTemplate
    );

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const startEditNote = (item: CartItem) => {
    setEditingNoteId(item.id);
    setTempNoteText(item.catatan || '');
  };

  const saveEditNote = (itemId: string) => {
    onUpdateNotes(itemId, tempNoteText);
    setEditingNoteId(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-cart-title"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      className="fixed inset-0 z-50 flex items-end lg:items-stretch lg:justify-end backdrop-blur-[2px] transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
        }}
        className="w-full lg:w-[460px] rounded-t-[20px] lg:rounded-none max-h-[92vh] lg:max-h-screen lg:h-full flex flex-col shadow-2xl overflow-hidden transition-transform"
      >
        {/* Handle bar mobile */}
        <div className="w-full pt-3 pb-1 flex justify-center lg:hidden">
          <div
            style={{ backgroundColor: 'var(--border)' }}
            className="w-10 h-1 rounded-full"
          />
        </div>

        {/* Header Drawer */}
        <div
          style={{ borderColor: 'var(--border)' }}
          className="px-5 py-3.5 border-b flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: '8px',
              }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h2
                id="drawer-cart-title"
                style={{ color: 'var(--text)' }}
                className="text-base font-semibold leading-none"
              >
                Keranjang Pesanan
              </h2>
              <p
                style={{ color: 'var(--text-muted)' }}
                className="text-xs mt-1"
              >
                {totalItems} item dipilih
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Kosongkan semua pesanan di keranjang?')) {
                    onClearCart();
                  }
                }}
                title="Kosongkan keranjang"
                aria-label="Kosongkan keranjang"
                style={{ color: 'var(--text-muted)' }}
                className="w-9 h-9 flex items-center justify-center hover:text-[var(--color-danger)] transition-colors"
              >
                <Trash2 className="w-4 h-4 stroke-[1.5]" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup keranjang"
              style={{ color: 'var(--text-muted)' }}
              className="w-9 h-9 flex items-center justify-center hover:text-[var(--text)] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Konten Scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Pesan Kesalahan / Validasi */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(185, 28, 28, 0.08)',
                borderColor: 'var(--color-danger)',
                color: 'var(--color-danger)',
                borderRadius: '8px',
              }}
              className="p-3 border flex items-start gap-2 text-xs"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 stroke-[1.5]" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                aria-label="Tutup pesan error"
                className="p-1 opacity-70 hover:opacity-100"
              >
                <X className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          )}

          {/* Kondisi Jika Keranjang Kosong */}
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div
                style={{
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text-muted)',
                }}
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
              >
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3
                style={{ color: 'var(--text)' }}
                className="font-semibold text-base"
              >
                Keranjang Masih Kosong
              </h3>
              <p
                style={{ color: 'var(--text-muted)' }}
                className="text-xs mt-1 max-w-xs mx-auto leading-relaxed"
              >
                Silakan pilih hidangan atau minuman favorit Anda untuk memesan.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  borderRadius: '10px',
                  height: '48px',
                }}
                className="mt-6 px-6 text-sm font-medium transition-colors hover:bg-[var(--primary-hover)]"
              >
                Mulai Pilih Menu
              </button>
            </div>
          ) : (
            <>
              {/* 1. Daftar Item yang Dipesan */}
              <div className="space-y-3">
                <p
                  style={{ color: 'var(--text-muted)' }}
                  className="text-xs font-semibold uppercase tracking-wider"
                >
                  Menu Yang Dipesan
                </p>

                {items.map((item) => {
                  const variantKeys = Object.keys(item.varianTerpilih || {});
                  const isEditingNote = editingNoteId === item.id;

                  return (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                        borderRadius: 'var(--radius)',
                      }}
                      className="p-3 border flex flex-col gap-2.5"
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div
                          style={{
                            borderRadius: '8px',
                            backgroundColor: 'var(--surface)',
                          }}
                          className="w-16 h-16 overflow-hidden flex-shrink-0"
                        >
                          <LazyImage
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            containerClassName="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info Item */}
                        <div className="flex-1 min-w-0">
                          <h4
                            style={{ color: 'var(--text)' }}
                            className="font-medium text-sm leading-snug line-clamp-1"
                          >
                            {item.menuItem.name}
                          </h4>

                          {/* Detail Varian */}
                          {variantKeys.length > 0 && (
                            <p
                              style={{ color: 'var(--text-muted)' }}
                              className="text-xs mt-0.5 line-clamp-1"
                            >
                              {variantKeys
                                .map((k) => `${k}: ${item.varianTerpilih[k]}`)
                                .join(' • ')}
                            </p>
                          )}

                          {/* Catatan Item */}
                          {item.catatan && !isEditingNote && (
                            <p
                              style={{ color: 'var(--text-muted)' }}
                              className="text-xs italic mt-1 bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)] inline-block"
                            >
                              Catatan: {item.catatan}
                            </p>
                          )}

                          {/* Harga Item */}
                          <p
                            style={{ color: 'var(--primary)' }}
                            className="text-xs font-semibold tabular-nums mt-1"
                          >
                            {formatRupiah(item.subtotal)}
                          </p>
                        </div>
                      </div>

                      {/* Input Edit Catatan Inline */}
                      {isEditingNote ? (
                        <div className="flex gap-2 pt-1 border-t border-[var(--border)]">
                          <input
                            type="text"
                            value={tempNoteText}
                            onChange={(e) => setTempNoteText(e.target.value)}
                            placeholder="Tulis catatan (misal: jangan pedas)..."
                            style={{
                              backgroundColor: 'var(--surface)',
                              borderColor: 'var(--border)',
                              color: 'var(--text)',
                              borderRadius: '6px',
                            }}
                            className="flex-1 border px-2.5 py-1 text-xs focus:outline-none"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => saveEditNote(item.id)}
                            style={{
                              backgroundColor: 'var(--primary)',
                              color: '#ffffff',
                              borderRadius: '6px',
                            }}
                            className="px-3 py-1 text-xs font-medium"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : null}

                      {/* Kontrol Jumlah & Tambah Catatan */}
                      <div
                        style={{ borderColor: 'var(--border)' }}
                        className="pt-2 border-t flex items-center justify-between"
                      >
                        {siteConfig.features.itemNotes && !isEditingNote && (
                          <button
                            type="button"
                            onClick={() => startEditNote(item)}
                            style={{ color: 'var(--text-muted)' }}
                            className="text-xs hover:text-[var(--text)] flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5 stroke-[1.5]" />
                            <span>{item.catatan ? 'Ubah Catatan' : '+ Catatan'}</span>
                          </button>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                          {/* Tombol Kurang / Hapus */}
                          <button
                            type="button"
                            onClick={() => {
                              if (item.kuantitas === 1) {
                                onRemoveItem(item.id);
                              } else {
                                onUpdateQuantity(item.id, -1);
                              }
                            }}
                            style={{
                              backgroundColor: 'var(--surface)',
                              borderColor: 'var(--border)',
                              color: 'var(--text)',
                              borderRadius: '6px',
                            }}
                            aria-label="Kurangi jumlah"
                            className="w-7 h-7 border flex items-center justify-center hover:opacity-80 transition-opacity"
                          >
                            {item.kuantitas === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-[var(--color-danger)] stroke-[1.5]" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 stroke-[1.5]" />
                            )}
                          </button>

                          <span
                            style={{ color: 'var(--text)' }}
                            className="font-semibold text-xs tabular-nums min-w-[20px] text-center"
                          >
                            {item.kuantitas}
                          </span>

                          {/* Tombol Tambah */}
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            style={{
                              backgroundColor: 'var(--primary)',
                              color: '#ffffff',
                              borderRadius: '6px',
                            }}
                            aria-label="Tambah jumlah"
                            className="w-7 h-7 flex items-center justify-center hover:opacity-90 transition-opacity"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. Formulir Informasi Pemesan */}
              <div
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                }}
                className="p-3.5 border space-y-3.5"
              >
                <p
                  style={{ color: 'var(--text-muted)' }}
                  className="text-xs font-semibold uppercase tracking-wider"
                >
                  Informasi Pemesan
                </p>

                {/* Pilihan Tipe Pesanan */}
                {availableOrderTypes.length > 1 && (
                  <div>
                    <label
                      style={{ color: 'var(--text)' }}
                      className="block text-xs font-medium mb-1.5"
                    >
                      Tipe Pesanan
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableOrderTypes.map((type) => {
                        const IconComponent = type.icon;
                        const isSelected = customerInfo.tipePesanan === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              setCustomerInfo((prev) => ({
                                ...prev,
                                tipePesanan: type.id,
                                tipePesananLabel: type.label,
                              }))
                            }
                            style={{
                              borderRadius: '8px',
                              backgroundColor: isSelected
                                ? 'var(--primary)'
                                : 'var(--surface)',
                              color: isSelected ? '#ffffff' : 'var(--text)',
                              borderColor: isSelected
                                ? 'var(--primary)'
                                : 'var(--border)',
                            }}
                            className="p-2 border text-center transition-colors flex flex-col items-center gap-1 text-xs font-medium"
                          >
                            <IconComponent className="w-4 h-4 stroke-[1.5]" />
                            <span className="truncate w-full">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Input Nama Pemesan */}
                <div>
                  <label
                    htmlFor="customer-name"
                    style={{ color: 'var(--text)' }}
                    className="block text-xs font-medium mb-1"
                  >
                    Nama Pemesan <span className="text-[var(--color-danger)]">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerInfo.namaPelanggan}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        namaPelanggan: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Budi Santoso"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                      borderRadius: '8px',
                    }}
                    className="w-full h-10 border px-3 text-xs focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                {/* Input Nomor Meja (Khusus Dine In & Fitur Aktif) */}
                {customerInfo.tipePesanan === 'dineIn' && siteConfig.features.tableNumber && (
                  <div>
                    <label
                      htmlFor="table-number"
                      style={{ color: 'var(--text)' }}
                      className="block text-xs font-medium mb-1"
                    >
                      Nomor Meja <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="table-number"
                        type="text"
                        value={customerInfo.nomorMeja}
                        readOnly={isTableLocked}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            nomorMeja: e.target.value,
                          }))
                        }
                        placeholder="Contoh: 12"
                        style={{
                          backgroundColor: isTableLocked
                            ? 'var(--bg)'
                            : 'var(--surface)',
                          borderColor: 'var(--border)',
                          color: 'var(--text)',
                          borderRadius: '8px',
                        }}
                        className={`w-full h-10 border px-3 text-xs focus:outline-none ${
                          isTableLocked ? 'pr-9 cursor-not-allowed opacity-80' : ''
                        }`}
                      />
                      {isTableLocked && (
                        <div
                          style={{ color: 'var(--text-muted)' }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          title="Terkunci otomatis dari QR Code Meja"
                        >
                          <Lock className="w-3.5 h-3.5 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Input Alamat (Khusus Delivery) */}
                {customerInfo.tipePesanan === 'delivery' && (
                  <div>
                    <label
                      htmlFor="delivery-address"
                      style={{ color: 'var(--text)' }}
                      className="block text-xs font-medium mb-1"
                    >
                      Alamat Pengantaran <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <textarea
                      id="delivery-address"
                      rows={2}
                      value={customerInfo.alamat}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          alamat: e.target.value,
                        }))
                      }
                      placeholder="Masukkan alamat lengkap & patokan..."
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        color: 'var(--text)',
                        borderRadius: '8px',
                      }}
                      className="w-full border p-2.5 text-xs focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                )}

                {/* Catatan Umum Tambahan */}
                <div>
                  <label
                    htmlFor="general-notes"
                    style={{ color: 'var(--text)' }}
                    className="block text-xs font-medium mb-1"
                  >
                    Catatan Pesanan (Opsional)
                  </label>
                  <input
                    id="general-notes"
                    type="text"
                    value={customerInfo.catatanUmum}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        catatanUmum: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Mohon sertakan sendok & tisu..."
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                      borderRadius: '8px',
                    }}
                    className="w-full h-10 border px-3 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Sticky */}
        {items.length > 0 && (
          <div
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface)',
            }}
            className="p-4 border-t space-y-3"
          >
            {/* Rincian Total */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  style={{ color: 'var(--text-muted)' }}
                  className="text-xs font-medium"
                >
                  Total Pembayaran
                </p>
                <p
                  style={{ color: 'var(--text-muted)' }}
                  className="text-[11px]"
                >
                  ({totalItems} menu)
                </p>
              </div>
              <p
                style={{ color: 'var(--primary)' }}
                className="text-lg font-semibold tabular-nums"
              >
                {formatRupiah(totalHarga)}
              </p>
            </div>

            {/* Tombol Pesan via WhatsApp */}
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              style={{
                backgroundColor: 'var(--color-whatsapp)',
                color: '#ffffff',
              }}
              className="w-full font-bold text-sm px-4 h-12 rounded-full flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] shadow-md"
            >
              <Send className="w-4 h-4 stroke-[2]" />
              <span>Kirim Pesanan via WhatsApp</span>
            </button>

            <p
              style={{ color: 'var(--text-muted)' }}
              className="text-center text-[11px] leading-tight"
            >
              Pesanan akan otomatis terformat rapi dan dikirim ke nomor WhatsApp resmi restoran.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
