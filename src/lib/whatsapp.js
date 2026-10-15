import { SITE_CONFIG } from '../config/siteConfig';
import { trackEvent } from './analytics';

/**
 * WhatsApp yardımcıları — tüm talepler tek merkezi numaraya (SITE_CONFIG.whatsappRaw) gider.
 * Metin her zaman encodeURIComponent ile kodlanır; müşteri girdisindeki `&`, `#`, `?`
 * gibi karakterler mesajı kesmez.
 */
export function whatsappUrl(text = '', number = SITE_CONFIG.whatsappRaw) {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * WhatsApp'ı yeni sekmede/uygulamada açar. Kullanıcı etkileşimi (submit/click)
 * sırasında senkron çağrılmalıdır; aksi halde tarayıcı açılır pencereyi engelleyebilir.
 * @returns {boolean} pencere açılabildiyse true
 */
export function openWhatsApp(text, eventName = 'whatsapp_dispatch') {
  if (typeof window === 'undefined') return false;
  const win = window.open(whatsappUrl(text), '_blank');
  if (win) {
    try { win.opener = null; } catch { /* cross-origin — yoksay */ }
  }
  trackEvent(eventName, { opened: Boolean(win) });
  return Boolean(win);
}
