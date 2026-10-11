import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  width?: number;
  height?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  containerClassName = '',
  width,
  height,
}) => {
  return (
    <div
      style={{ backgroundColor: 'var(--color-bg-subtle)' }}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
    </div>
  );
};
