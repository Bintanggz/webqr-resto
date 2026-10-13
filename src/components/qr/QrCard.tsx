import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Loader2, UtensilsCrossed } from 'lucide-react';
import { siteConfig } from '../../config/site.config';

interface QrCardProps {
  tableNumber: number;
  url: string;
}

/**
 * Helper untuk menggambar rounded rect dengan fallback jika browser lama tidak mendukung ctx.roundRect
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

export const QrCard: React.FC<QrCardProps> = ({ tableNumber, url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

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
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 600;
      tempCanvas.height = 780;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Background kartu putih bersih
      drawRoundedRect(ctx, 0, 0, 600, 780, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // 2. Border luar kartu yang elegan
      drawRoundedRect(ctx, 0, 0, 600, 780, 28);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      // 3. Header: Nama Restoran
      ctx.fillStyle = siteConfig.theme.primaryColor || '#9A3412';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(siteConfig.restaurant.name, 300, 65);

      // 4. Subheader: Scan untuk lihat menu
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('SCAN UNTUK LIHAT MENU', 300, 98);

      // 5. Kotak Frame Putih untuk QR Code
      drawRoundedRect(ctx, 90, 125, 420, 420, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      drawRoundedRect(ctx, 90, 125, 420, 420, 20);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      // 6. Generate QR di tengah
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 380,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });

      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise<void>((resolve, reject) => {
        qrImg.onload = () => resolve();
        qrImg.onerror = reject;
      });

      // Gambar QR Code di atas frame putih
      ctx.drawImage(qrImg, 110, 145, 380, 380);

      // 7. Kotak Badge Nomor Meja (Penting: dipanggil terpisah dengan beginPath agar tidak mewarnai seluruh kanvas)
      drawRoundedRect(ctx, 160, 565, 280, 68, 16);
      ctx.fillStyle = siteConfig.theme.primaryColor || '#9A3412';
      ctx.fill();

      // 8. Teks Nomor Meja
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`MEJA ${tableNumber}`, 300, 612);

      // 9. Instruksi bawah
      ctx.fillStyle = '#475569';
      ctx.font = '600 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Arahkan kamera HP ke QR Code', 300, 668);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 13px sans-serif';
      ctx.fillText('Tanpa unduh aplikasi • Cepat & Praktis', 300, 694);

      // 10. Tautan teks kecil
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '400 11px monospace';
      ctx.fillText(url, 300, 722);

      // 11. Trigger download PNG
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-Meja-${tableNumber}-${siteConfig.restaurant.name.replace(/\s+/g, '_')}.png`;
      downloadLink.href = tempCanvas.toDataURL('image/png');
      downloadLink.click();
    } catch (err) {
      console.error('Gagal generate kartu QR lengkap, download QR dasar:', err);
      // Fallback download canvas biasa jika error
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `QR-Meja-${tableNumber}.png`;
        link.href = dataUrl;
        link.click();
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="qr-card-printable relative bg-white text-slate-900 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xs transition-shadow hover:shadow-md">
      {/* Tombol Download PNG Pojok Kanan Atas (Hilang saat cetak) */}
      <button
        type="button"
        onClick={handleDownloadPng}
        disabled={isDownloading}
        title={`Unduh PNG Meja ${tableNumber}`}
        className="no-print absolute top-3 right-3 min-w-[38px] min-h-[38px] p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all flex items-center justify-center shadow-2xs disabled:opacity-60"
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
        ) : (
          <Download className="w-4 h-4" />
        )}
      </button>

      {/* Header Kartu: Logo & Nama Restoran */}
      <div className="text-center w-full px-2 pt-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          {siteConfig.restaurant.logo ? (
            <img
              src={siteConfig.restaurant.logo}
              alt=""
              className="w-7 h-7 object-contain rounded-full border border-[var(--border)] bg-white"
            />
          ) : (
            <UtensilsCrossed className="w-5 h-5 stroke-[1.5]" style={{ color: 'var(--primary)' }} />
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
