import React, { useState, useMemo } from 'react';
import { siteConfig } from '../../config/site.config';
import { QrCard } from './QrCard';
import { Printer, ArrowLeft, Globe, Hash, Sparkles } from 'lucide-react';

interface QrGeneratorPageProps {
  onBackToMenu: () => void;
}

export const QrGeneratorPage: React.FC<QrGeneratorPageProps> = ({ onBackToMenu }) => {
  // Dapatkan URL saat ini atau default domain
  const defaultBaseUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}`;
    }
    return 'https://menu.restoran.com';
  }, []);

  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl);
  const [startTable, setStartTable] = useState(1);
  const [endTable, setEndTable] = useState(20);

  // Generate daftar nomor meja
  const tableNumbers = useMemo(() => {
    const list: number[] = [];
    const start = Math.max(1, startTable);
    const end = Math.max(start, endTable);
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  }, [startTable, endTable]);

  // Fungsi print browser
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 print:bg-white print:p-0">
      {/* ============================================================== */}
      {/* HEADER & KONTROL FORM (Disembunyikan saat cetak via .no-print) */}
      {/* ============================================================== */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToMenu}
              className="min-h-[44px] min-w-[44px] px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-2 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Menu Resto</span>
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Generator QR Meja Siap Cetak
              </h1>
              <p className="text-xs text-slate-500">
                {siteConfig.restaurant.name} • Siap cetak A4 (6 kartu per lembar)
              </p>
            </div>
          </div>

          {/* Tombol Cetak Utama */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              style={{
                backgroundColor: 'var(--color-primary, #d97706)',
                color: 'var(--color-primary-text, #ffffff)',
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Semua Meja ({tableNumbers.length} Kartu)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Kontrol Pengaturan QR (No Print) */}
      <section className="no-print max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Pengaturan Tautan & Rentang Meja
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Input URL Menu */}
            <div className="md:col-span-1">
              <label
                htmlFor="base-url-input"
                className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>URL Menu (Domain Web)</span>
              </label>
              <input
                id="base-url-input"
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://restoran-anda.com"
                className="w-full min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Otomatis disambung parameter <code className="text-amber-600 font-bold">?meja=N</code>
              </p>
            </div>

            {/* Input Meja Awal */}
            <div>
              <label
                htmlFor="start-table-input"
                className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"
              >
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span>Nomor Meja Awal</span>
              </label>
              <input
                id="start-table-input"
                type="number"
                min={1}
                max={500}
                value={startTable}
                onChange={(e) => setStartTable(Number(e.target.value) || 1)}
                className="w-full min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Input Meja Akhir */}
            <div>
              <label
                htmlFor="end-table-input"
                className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5"
              >
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span>Nomor Meja Akhir</span>
              </label>
              <input
                id="end-table-input"
                type="number"
                min={startTable}
                max={500}
                value={endTable}
                onChange={(e) => setEndTable(Number(e.target.value) || startTable)}
                className="w-full min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Info Format Cetak A4 */}
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-2 text-xs text-[var(--text-muted)]">
            <p className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--primary)] stroke-[1.5]" />
              <span><strong>Tips Cetak:</strong> Pilih kertas <strong>A4</strong>, orientasi <strong>Portrait</strong>, dan centang <em>&quot;Background graphics&quot;</em> pada dialog print browser.</span>
            </p>
            <p className="font-semibold text-[var(--text)]">
              Total {tableNumbers.length} kartu ({Math.ceil(tableNumbers.length / 6)} lembar A4)
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* GRID KARTU QR SIAP CETAK (Layout A4: 6 kartu per halaman)      */}
      {/* ============================================================== */}
      <main className="max-w-6xl mx-auto px-4 pb-16 print:max-w-none print:p-0 print:m-0">
        <div className="print-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
          {tableNumbers.map((tableNum, index) => {
            // Bersihkan base URL dari trailing slash
            const cleanBase = baseUrl.replace(/\/+$/, '');
            const targetUrl = `${cleanBase}/?meja=${tableNum}`;
            const isPageBreak = (index + 1) % 6 === 0 && index + 1 !== tableNumbers.length;

            return (
              <React.Fragment key={tableNum}>
                <div className="break-inside-avoid print:break-inside-avoid">
                  <QrCard tableNumber={tableNum} url={targetUrl} />
                </div>
                {/* Halaman baru setiap 6 kartu pada saat cetak A4 */}
                {isPageBreak && (
                  <div className="hidden print:block w-full break-after-page col-span-2 h-0" style={{ pageBreakAfter: 'always' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </main>

      {/* CSS KHUSUS PRINT A4 */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12mm 10mm !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .qr-card-printable {
            box-shadow: none !important;
            border: 2px dashed #94a3b8 !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            width: 100% !important;
            height: auto !important;
            min-height: 82mm !important;
            padding: 4mm !important;
          }
          .break-after-page {
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>
    </div>
  );
};
