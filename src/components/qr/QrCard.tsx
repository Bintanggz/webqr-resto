import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';
import { siteConfig } from '../../config/site.config';

interface QrCardProps {
  tableNumber: number;
  url: string;
}

export const QrCard: React.FC<QrCardProps> = ({ tableNumber, url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 220,
          margin: 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        },
        (err) => {
          if (!err && canvasRef.current) {
            setDataUrl(canvasRef.current.toDataURL('image/png'));
          }
        }
      );
    }
  }, [url]);

  // Download high-resolution PNG untuk dicetak per meja
  const handleDownloadPng = async () => {
    try {
      // Generate canvas resolusi tinggi (800x800) untuk hasil cetak profesional
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 600;
      tempCanvas.height = 780;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) return;

      // Background kartu putih
      ctx.fillStyle = '#ffffff';
      ctx.roundRect(0, 0, 600, 780, 24);
      ctx.fill();

      // Border halus kartu
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      // Header: Nama Restoran
      ctx.fillStyle = siteConfig.theme.primaryColor || '#d97706';
      ctx.font = 'bold 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(siteConfig.restaurant.name, 300, 60);

      // Subheader: Scan untuk lihat menu
      ctx.fillStyle = '#475569';
      ctx.font = '600 20px sans-serif';
      ctx.fillText('Scan untuk Lihat Menu', 300, 95);

      // Generate QR di tengah
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 380,
        margin: 2,
        errorCorrectionLevel: 'H',
      });

      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
      });
      ctx.drawImage(qrImg, 110, 120, 380, 380);

      // Kotak Badge Nomor Meja
      ctx.fillStyle = siteConfig.theme.primaryColor || '#d97706';
      ctx.roundRect(160, 520, 280, 70, 16);
      ctx.fill();

      // Teks Nomor Meja
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(`MEJA ${tableNumber}`, 300, 568);

      // Instruksi bawah
      ctx.fillStyle = '#64748b';
      ctx.font = '500 16px sans-serif';
      ctx.fillText('Arahkan kamera HP ke QR Code', 300, 630);
      ctx.fillText('Tanpa unduh aplikasi • Cepat & Praktis', 300, 658);

      // Trigger download
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-Meja-${tableNumber}-${siteConfig.restaurant.name.replace(/\s+/g, '_')}.png`;
      downloadLink.href = tempCanvas.toDataURL('image/png');
      downloadLink.click();
    } catch {
      // Fallback download canvas biasa jika error
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `QR-Meja-${tableNumber}.png`;
        link.href = dataUrl;
        link.click();
      }
    }
  };

  return (
    <div className="qr-card-printable relative bg-white text-slate-900 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xs transition-shadow hover:shadow-md">
      {/* Tombol Download PNG Pojok Kanan Atas (Hilang saat cetak) */}
      <button
        type="button"
        onClick={handleDownloadPng}
        title={`Unduh PNG Meja ${tableNumber}`}
        className="no-print absolute top-3 right-3 min-w-[38px] min-h-[38px] p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all flex items-center justify-center shadow-2xs"
      >
        <Download className="w-4 h-4" />
      </button>

      {/* Header Kartu: Logo & Nama Restoran */}
      <div className="text-center w-full px-2 pt-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          {siteConfig.restaurant.logo ? (
            <img
              src={siteConfig.restaurant.logo}
              alt=""
              className="w-7 h-7 object-contain rounded-full border border-slate-200 bg-white"
            />
          ) : (
            <span className="text-xl">🍽️</span>
          )}
          <h3 className="font-extrabold text-sm sm:text-base leading-tight text-slate-900 line-clamp-1">
            {siteConfig.restaurant.name}
          </h3>
        </div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Scan untuk lihat menu
        </p>
      </div>

      {/* QR Code di Tengah */}
      <div className="my-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center">
        <canvas ref={canvasRef} className="w-36 h-36 sm:w-40 sm:h-40 block" />
      </div>

      {/* Footer Kartu: Nomor Meja & Petunjuk */}
      <div className="w-full text-center pb-1 space-y-1">
        {/* Badge Nomor Meja Tebal */}
        <div
          style={{
            backgroundColor: 'var(--color-primary, #d97706)',
            color: 'var(--color-primary-text, #ffffff)',
          }}
          className="w-full py-1.5 px-3 rounded-xl font-extrabold text-base sm:text-lg tracking-wide shadow-xs"
        >
          MEJA {tableNumber}
        </div>

        <p className="text-[10px] text-slate-500 font-medium leading-tight">
          Arahkan kamera HP ke QR Code
        </p>
        <p className="text-[9px] text-slate-400 font-mono truncate px-1">
          {url}
        </p>
      </div>
    </div>
  );
};
