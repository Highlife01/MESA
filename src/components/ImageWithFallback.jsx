import React, { useState } from 'react';

/**
 * ImageWithFallback
 * Production-ready image wrapper that gracefully falls back to a reliable local image
 * if the primary source fails to load (404, network error, or ad-blocker).
 */
export function ImageWithFallback({
  src,
  fallbackSrc = '/images/mesa-workshop.png',
  alt = 'MESA İş Makinaları',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Update internal source if prop changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
}

export default ImageWithFallback;
