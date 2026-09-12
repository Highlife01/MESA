import React, { useRef, useEffect, useState } from 'react';

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  className = ''
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const dirClass = {
    up: 'scroll-reveal',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right',
    scale: 'scroll-reveal-scale'
  }[direction] || 'scroll-reveal';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`${dirClass} ${revealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
