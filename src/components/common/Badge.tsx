import React from 'react';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'default',
  className = '',
}) => {
  if (variant === 'primary' || variant === 'warning') {
    return (
      <span
        style={{
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
        }}
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border border-opacity-30 ${className}`}
      >
        {text}
      </span>
    );
  }

  const variantStyles = {
    success: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    danger: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${variantStyles[variant as 'success' | 'danger' | 'default'] || variantStyles.default} ${className}`}
    >
      {text}
    </span>
  );
};
