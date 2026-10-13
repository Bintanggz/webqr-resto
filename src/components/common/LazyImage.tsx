import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{ backgroundColor: 'var(--border)' }}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Shimmer skeleton while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}

      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
          <Utensils className="w-6 h-6 stroke-[1.5] mb-1 opacity-60" />
          <span className="text-[10px] line-clamp-1 font-medium">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      )}
    </div>
  );
};

