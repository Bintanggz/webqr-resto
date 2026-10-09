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
  // Ambil tipe pesanan yang diaktifkan di config
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

  // State Form Pemesan
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [nomorMeja, setNomorMeja] = useState(initialTableNumber);
  const [tipePesanan, setTipePesanan] = useState<'dineIn' | 'takeAway' | 'delivery'>(
    availableOrderTypes[0]?.id || 'dineIn'
  );
  const [alamat, setAlamat] = useState('');
  const [catatanUmum, setCatatanUmum] = useState('');

  // State catatan item yang sedang diedit
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  // State validasi error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTypeConfig = availableOrderTypes.find((t) => t.id === tipePesanan);
  const tipePesananLabel = currentTypeConfig ? currentTypeConfig.label : 'Makan di Tempat';

  // Handler Kirim Pesanan ke WhatsApp
  const handleCheckoutWhatsApp = () => {
    // 1. Validasi keranjang kosong
    if (items.length === 0) {
      setErrorMessage('Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu.');
      return;
    }

    // 2. Validasi nama pemesan wajib diisi
    if (!namaPelanggan.trim()) {
      setErrorMessage('Silakan masukkan Nama Pemesan sebelum mengirim pesanan.');
      const nameInput = document.getElementById('input-nama-pelanggan');
      if (nameInput) nameInput.focus();
      return;
    }

    // 3. Validasi nomor meja jika Dine In & tidak locked
    if (tipePesanan === 'dineIn' && !nomorMeja.trim()) {
      setErrorMessage('Silakan masukkan Nomor Meja Anda.');
      const tableInput = document.getElementById('input-nomor-meja');
      if (tableInput) tableInput.focus();
      return;
    }

    // 4. Validasi alamat jika tipe Delivery
    if (tipePesanan === 'delivery' && !alamat.trim()) {
      setErrorMessage('Silakan lengkapi Alamat Pengantaran untuk pesanan antar.');
      const addressInput = document.getElementById('input-alamat-antar');
      if (addressInput) addressInput.focus();
      return;
    }

    // Reset error jika semua valid
    setErrorMessage(null);

    const customerInfo: CustomerOrderInfo = {
      namaPelanggan,
      nomorMeja: tipePesanan === 'dineIn' ? nomorMeja : '',
      tipePesanan,
      tipePesananLabel,
      alamat: tipePesanan === 'delivery' ? alamat : undefined,
      catatanUmum,
    };

    const waUrl = buildWhatsAppOrderUrl(
      siteConfig.whatsapp.number,
      siteConfig.restaurant.name,
      items,
      customerInfo,
      totalHarga,
      siteConfig.whatsapp.orderTemplate
    );

    // Buka aplikasi WhatsApp
    window.open(waUrl, '_blank');
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-bg-card)',
          color: 'var(--color-text-main)',
        }}
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[94vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Handle bar mobile */}
        <div className="w-full pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header Drawer */}
        <div
          style={{ borderColor: 'var(--color-border)' }}
          className="px-5 py-3.5 border-b flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-text)',
                borderRadius: 'calc(var(--radius-theme) * 0.75)',
              }}
              className="w-9 h-9 flex items-center justify-center shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="drawer-cart-title"
                style={{ color: 'var(--color-text-main)' }}
                className="text-base sm:text-lg font-bold leading-none"
              >
                Keranjang Pesanan
              </h2>
              <p
                style={{ color: 'var(--color-text-muted)' }}
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
                  if (confirm('Yakin ingin mengosongkan semua pesanan di keranjang?')) {
                    onClearCart();
                  }
                }}
                title="Kosongkan keranjang"
                aria-label="Kosongkan keranjang"
                style={{ color: 'var(--color-text-muted)' }}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-rose-600 active:scale-95 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup keranjang"
              style={{ color: 'var(--color-text-muted)' }}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:opacity-80 active:scale-95 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Konten Scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Pesan Kesalahan / Validasi */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-2 text-xs text-rose-800 dark:text-rose-200 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">Perhatian</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                aria-label="Tutup pesan error"
                className="text-rose-400 hover:text-rose-700 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Kondisi Jika Keranjang Kosong */}
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div
                style={{
                  backgroundColor: 'var(--color-bg-page)',
                  color: 'var(--color-text-muted)',
                }}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-3"
              >
                🛒
              </div>
              <h3
                style={{ color: 'var(--color-text-main)' }}
                className="font-bold text-base"
              >
                Keranjang Masih Kosong
              </h3>
              <p
                style={{ color: 'var(--color-text-muted)' }}
                className="text-xs mt-1 max-w-xs mx-auto"
              >
                Silakan pilih makanan dan minuman favorit Anda di menu untuk memesan.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-text)',
                  borderRadius: 'var(--radius-theme)',
                }}
                className="mt-5 min-h-[44px] px-6 py-2.5 text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Mulai Pilih Menu
              </button>
            </div>
          ) : (
            <>
              {/* 1. Daftar Item yang Dipesan */}
              <div className="space-y-3">
                <p
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs font-bold uppercase tracking-wider"
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
                        backgroundColor: 'var(--color-bg-page)',
                        borderColor: 'var(--color-border)',
                        borderRadius: 'var(--radius-theme)',
                      }}
                      className="p-3 border flex flex-col gap-2.5 shadow-2xs"
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div
                          style={{ borderRadius: 'calc(var(--radius-theme) * 0.75)' }}
                          className="w-16 h-16 overflow-hidden bg-slate-200 flex-shrink-0"
                        >
                          <LazyImage
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            containerClassName="w-full h-full"
                          />
                        </div>

                        {/* Info Item */}
                        <div className="flex-1 min-w-0">
                          <h4
                            style={{ color: 'var(--color-text-main)' }}
                            className="font-bold text-xs sm:text-sm leading-snug line-clamp-1"
                          >
                            {item.menuItem.name}
                          </h4>
                          <p
                            style={{ color: 'var(--color-primary)' }}
                            className="text-xs font-extrabold mt-0.5"
                          >
                            {formatRupiah(item.hargaSatuan)}
                          </p>

                          {/* Chips Varian */}
                          {variantKeys.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {variantKeys.map((vk) => (
                                <span
                                  key={vk}
                                  style={{
                                    backgroundColor: 'var(--color-bg-card)',
                                    color: 'var(--color-text-main)',
                                    borderColor: 'var(--color-border)',
                                  }}
                                  className="text-[10px] border px-1.5 py-0.5 rounded-md font-medium"
                                >
                                  {vk}: {item.varianTerpilih[vk]}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Chips Addon */}
                          {item.addonsTerpilih && item.addonsTerpilih.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.addonsTerpilih.map((addonId) => {
                                const addonObj = item.menuItem.addons?.find(
                                  (a) => a.id === addonId
                                );
                                return (
                                  <span
                                    key={addonId}
                                    style={{
                                      backgroundColor: 'var(--color-primary-light)',
                                      color: 'var(--color-primary)',
                                    }}
                                    className="text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                                  >
                                    +{addonObj ? addonObj.name : addonId}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Baris Catatan Per Item */}
                      {isEditingNote ? (
                        <div className="flex items-center gap-1.5 pt-1">
                          <input
                            type="text"
                            value={tempNoteText}
                            onChange={(e) => setTempNoteText(e.target.value)}
                            placeholder="Catatan untuk menu ini..."
                            style={{
                              backgroundColor: 'var(--color-bg-card)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text-main)',
                            }}
                            className="flex-1 h-9 border rounded-lg px-2.5 text-xs focus:outline-none"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => saveEditNote(item.id)}
                            style={{
                              backgroundColor: 'var(--color-primary)',
                              color: 'var(--color-primary-text)',
                            }}
                            className="min-h-[36px] px-3 rounded-lg text-xs font-bold"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ color: 'var(--color-text-muted)' }}
                          className="flex items-center justify-between text-[11px] pt-1"
                        >
                          {item.catatan ? (
                            <p className="line-clamp-1 italic">
                              Catatan: &ldquo;{item.catatan}&rdquo;
                            </p>
                          ) : (
                            <span className="opacity-60">Tidak ada catatan</span>
                          )}
                          <button
                            type="button"
                            onClick={() => startEditNote(item)}
                            style={{ color: 'var(--color-primary)' }}
                            className="min-h-[32px] px-2 font-bold flex items-center gap-1 active:scale-95"
                          >
                            <FileText className="w-3 h-3" />
                            <span>{item.catatan ? 'Ubah' : '+ Catatan'}</span>
                          </button>
                        </div>
                      )}

                      {/* Baris Subtotal & Pengatur Jumlah */}
                      <div
                        style={{ borderColor: 'var(--color-border)' }}
                        className="flex items-center justify-between pt-2 border-t"
                      >
                        <span
                          style={{ color: 'var(--color-text-main)' }}
                          className="font-extrabold text-xs"
                        >
                          Subtotal: {formatRupiah(item.subtotal)}
                        </span>

                        <div className="flex items-center gap-1">
                          {/* Hapus Item (Area Sentuh 44px) */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Hapus ${item.menuItem.name}`}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-rose-500 hover:text-rose-700 active:scale-90"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Counter (-) dan (+) */}
                          <div
                            style={{
                              backgroundColor: 'var(--color-bg-card)',
                              borderColor: 'var(--color-border)',
                              borderRadius: 'var(--radius-theme)',
                            }}
                            className="flex items-center border shadow-2xs"
                          >
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              aria-label="Kurangi 1"
                              style={{ color: 'var(--color-text-main)' }}
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-90"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span
                              style={{ color: 'var(--color-text-main)' }}
                              className="w-6 text-center font-bold text-xs"
                            >
                              {item.kuantitas}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              aria-label="Tambah 1"
                              style={{ color: 'var(--color-text-main)' }}
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-90"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. Opsi Tipe Pesanan */}
              {availableOrderTypes.length > 1 && (
                <div className="pt-2">
                  <p
                    style={{ color: 'var(--color-text-muted)' }}
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                  >
                    Tipe Pesanan
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableOrderTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = tipePesanan === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setTipePesanan(type.id)}
                          style={{
                            borderRadius: 'calc(var(--radius-theme) * 0.75)',
                            borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-page)',
                            color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                          }}
                          className="min-h-[44px] p-2.5 border text-xs font-bold flex items-center gap-2 transition-all"
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Form Identitas Pemesan */}
              <div className="space-y-3 pt-2">
                <p
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Informasi Pemesan
                </p>

                {/* Input Nama Pemesan (Wajib) */}
                <div>
                  <label
                    htmlFor="input-nama-pelanggan"
                    style={{ color: 'var(--color-text-main)' }}
                    className="block text-xs font-bold mb-1"
                  >
                    Nama Pemesan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="input-nama-pelanggan"
                    type="text"
                    value={namaPelanggan}
                    onChange={(e) => setNamaPelanggan(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    style={{
                      backgroundColor: 'var(--color-bg-page)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-main)',
                      borderRadius: 'var(--radius-theme)',
                    }}
                    className="w-full h-11 border px-3.5 text-xs sm:text-sm placeholder:opacity-60 focus:outline-none"
                  />
                </div>

                {/* Input Nomor Meja (Khusus Dine In) */}
                {tipePesanan === 'dineIn' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="input-nomor-meja"
                        style={{ color: 'var(--color-text-main)' }}
                        className="text-xs font-bold flex items-center gap-1"
                      >
                        <span>Nomor Meja</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      {isTableLocked && (
                        <span
                          style={{
                            backgroundColor: 'var(--color-primary-light)',
                            color: 'var(--color-primary)',
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        >
                          <Lock className="w-2.5 h-2.5" />
                          <span>Terkunci dari QR</span>
                        </span>
                      )}
                    </div>
                    <input
                      id="input-nomor-meja"
                      type="text"
                      value={nomorMeja}
                      onChange={(e) => !isTableLocked && setNomorMeja(e.target.value)}
                      readOnly={isTableLocked}
                      placeholder="Contoh: 05"
                      style={{
                        backgroundColor: isTableLocked ? 'var(--color-border)' : 'var(--color-bg-page)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-main)',
                        borderRadius: 'var(--radius-theme)',
                      }}
                      className={`w-full h-11 px-3.5 text-xs sm:text-sm font-semibold border ${
                        isTableLocked ? 'cursor-not-allowed select-none opacity-80' : 'focus:outline-none'
                      }`}
                    />
                    {isTableLocked && (
                      <p
                        style={{ color: 'var(--color-text-muted)' }}
                        className="text-[11px] mt-1"
                      >
                        Nomor meja otomatis terbaca dari kode QR meja dan tidak dapat diubah.
                      </p>
                    )}
                  </div>
                )}

                {/* Input Alamat (Khusus Delivery) */}
                {tipePesanan === 'delivery' && (
                  <div>
                    <label
                      htmlFor="input-alamat-antar"
                      style={{ color: 'var(--color-text-main)' }}
                      className="block text-xs font-bold mb-1"
                    >
                      Alamat Pengantaran Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="input-alamat-antar"
                      rows={2}
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      placeholder="Jl. Merak No. 12, RT 02/04 (Pagar hitam samping minimarket)..."
                      style={{
                        backgroundColor: 'var(--color-bg-page)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-main)',
                        borderRadius: 'var(--radius-theme)',
                      }}
                      className="w-full border p-3 text-xs placeholder:opacity-60 focus:outline-none resize-none"
                    />
                  </div>
                )}

                {/* Catatan Tambahan Umum */}
                <div>
                  <label
                    htmlFor="input-catatan-umum"
                    style={{ color: 'var(--color-text-main)' }}
                    className="block text-xs font-bold mb-1"
                  >
                    Catatan Pesanan Tambahan (Opsional)
                  </label>
                  <input
                    id="input-catatan-umum"
                    type="text"
                    value={catatanUmum}
                    onChange={(e) => setCatatanUmum(e.target.value)}
                    placeholder="Contoh: Minta sendok garpu & sedotan dipisah"
                    style={{
                      backgroundColor: 'var(--color-bg-page)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-main)',
                      borderRadius: 'var(--radius-theme)',
                    }}
                    className="w-full h-11 border px-3.5 text-xs placeholder:opacity-60 focus:outline-none"
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
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg-card)',
            }}
            className="p-4 border-t space-y-3"
          >
            {/* Rincian Total */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs font-medium"
                >
                  Total Pembayaran
                </p>
                <p
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs"
                >
                  ({totalItems} menu)
                </p>
              </div>
              <p
                style={{ color: 'var(--color-text-main)' }}
                className="text-lg sm:text-xl font-extrabold"
              >
                {formatRupiah(totalHarga)}
              </p>
            </div>

            {/* Tombol Pesan via WhatsApp (Min touch target 48px) */}
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              style={{
                backgroundColor: '#16a34a',
                color: '#ffffff',
                borderRadius: 'var(--radius-theme)',
              }}
              className="w-full min-h-[48px] hover:bg-emerald-700 active:scale-[0.98] font-bold text-xs sm:text-sm px-4 py-3 flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Pesan via WhatsApp</span>
            </button>

            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-center text-[11px]"
            >
              Pesanan akan langsung terformat rapi dan dikirim ke nomor WhatsApp resmi restoran.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
