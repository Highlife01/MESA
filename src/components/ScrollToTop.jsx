import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      className="fixed bottom-24 left-6 z-40 w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 animate-fadeIn"
      aria-label="Yukarı Çık"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
