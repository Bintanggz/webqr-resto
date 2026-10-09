import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface ConfigErrorAlertProps {
  errors: string[];
  warnings?: string[];
}

export const ConfigErrorAlert: React.FC<ConfigErrorAlertProps> = ({
  errors,
  warnings = [],
}) => {
  if (errors.length === 0 && warnings.length === 0) return null;

  return (
    <div className="m-4 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 shadow-lg animate-in fade-in">
      <div className="flex items-center gap-2 mb-2 font-bold text-sm text-rose-800">
        <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
        <span>Pemberitahuan Format Konfigurasi</span>
      </div>

      <p className="text-xs text-rose-700 mb-3 leading-relaxed">
        Ditemukan kekeliruan pada file <code className="bg-rose-150 px-1 py-0.5 rounded font-mono font-bold">menu.json</code> atau <code className="bg-rose-150 px-1 py-0.5 rounded font-mono font-bold">site.config.ts</code>. Silakan periksa kembali:
      </p>

      {errors.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {errors.map((err, i) => (
            <li key={i} className="text-xs text-rose-800 flex items-start gap-1.5 font-medium">
              <span className="text-rose-500 font-bold">•</span>
              <span>{err}</span>
            </li>
          ))}
        </ul>
      )}

      {warnings.length > 0 && (
        <div className="mt-2 pt-2 border-t border-rose-200">
          <p className="text-[11px] font-semibold text-amber-800 flex items-center gap-1 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Saran Perbaikan:</span>
          </p>
          <ul className="space-y-1">
            {warnings.map((warn, i) => (
              <li key={i} className="text-[11px] text-amber-900 flex items-start gap-1">
                <span>-</span>
                <span>{warn}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
