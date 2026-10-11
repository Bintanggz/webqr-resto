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
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
        }}
        className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium lowercase tracking-wide ${className}`}
      >
        {text}
      </span>
    );
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'rgba(45, 106, 79, 0.1)',
          color: 'var(--color-success)',
        };
      case 'danger':
        return {
          backgroundColor: 'rgba(185, 28, 28, 0.1)',
          color: 'var(--color-danger)',
        };
      default:
        return {
          backgroundColor: 'var(--bg)',
          color: 'var(--text-muted)',
          borderColor: 'var(--border)',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <span
      style={styles}
      className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium lowercase ${className}`}
    >
      {text}
    </span>
  );
};
