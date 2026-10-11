import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface ConfigErrorAlertProps {
  errors: string[];
  warnings: string[];
}

export const ConfigErrorAlert: React.FC<ConfigErrorAlertProps> = ({ errors, warnings }) => {
  if (errors.length === 0 && warnings.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-danger-light)',
        borderColor: 'var(--color-danger)',
        color: 'var(--color-danger-text)',
      }}
      className="m-4 p-4 rounded-2xl border-2 shadow-lg animate-in fade-in"
    >
      <div className="flex items-center gap-2 mb-2 font-bold text-sm">
        <AlertTriangle style={{ color: 'var(--color-danger)' }} className="w-5 h-5 flex-shrink-0" />
        <span>Kesalahan Konfigurasi Terdeteksi</span>
      </div>
      <p className="text-xs mb-3 leading-relaxed opacity-90">
        Ditemukan kekeliruan pada file <code
          style={{ backgroundColor: 'var(--color-bg-subtle)' }}
          className="px-1 py-0.5 rounded font-mono font-bold"
        >menu.json</code> atau <code
          style={{ backgroundColor: 'var(--color-bg-subtle)' }}
          className="px-1 py-0.5 rounded font-mono font-bold"
        >site.config.ts</code>. Silakan periksa kembali:
      </p>

      {errors.length > 0 && (
        <ul className="space-y-1 mb-2">
          {errors.map((err, i) => (
            <li key={i} className="text-xs flex items-start gap-1.5 font-medium">
              <span style={{ color: 'var(--color-danger)' }} className="font-bold">•</span>
              <span>{err}</span>
            </li>
          ))}
        </ul>
      )}

      {warnings.length > 0 && (
        <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p style={{ color: 'var(--color-primary)' }} className="text-[11px] font-semibold flex items-center gap-1 mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Peringatan:</span>
          </p>
          <ul className="space-y-0.5">
            {warnings.map((w, i) => (
              <li key={i} className="text-[11px] opacity-80">{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
