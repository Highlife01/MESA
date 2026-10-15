import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { initAnalytics, trackPageView, trackEvent } from './lib/analytics';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// ── Analytics (GA4) — yalnızca VITE_GA_MEASUREMENT_ID tanımlıysa ağ isteği yapar ──
initAnalytics();
const reportPageView = () => trackPageView(window.location.pathname + window.location.search);
window.addEventListener('custom_navigate', reportPageView);
window.addEventListener('popstate', reportPageView);

// Dönüşüm takibi: sitedeki tüm telefon ve WhatsApp bağlantıları (tek merkezden)
document.addEventListener('click', (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.startsWith('tel:')) {
    trackEvent('phone_call_click', { phone: href.slice(4), page_path: window.location.pathname });
  } else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) {
    trackEvent('whatsapp_click', { page_path: window.location.pathname });
  }
}, { capture: true, passive: true });

// PWA Service Worker Handling
if ('serviceWorker' in navigator) {
  if (Boolean(import.meta.env?.DEV)) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) caches.delete(key);
      });
    }
  } else if (Boolean(import.meta.env?.PROD) || (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('PWA SW registration failed:', err);
      });
    });
  }
}

