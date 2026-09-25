// GA4 iskeleti: ölçüm kimliği VITE_GA_MEASUREMENT_ID ile verilir.
// Kimlik tanımlı değilse hiçbir ağ isteği yapılmaz (yerel/privat ortam güvenli).
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// gtag veri katmanını kur (script yüklenmese bile çağrılar güvenle kuyruğa alınır)
export function initAnalytics() {
    if (!MEASUREMENT_ID || typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
    }

    if (!document.getElementById('ga4-script')) {
        const script = document.createElement('script');
        script.id = 'ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        document.head.appendChild(script);
    }

    window.gtag('config', MEASUREMENT_ID, { send_page_view: true });
}

// SPA gezinmelerinde sayfa görüntüleme gönder
export function trackPageView(path) {
    if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', 'page_view', { page_path: path });
}

// Dönüşüm olayları: telefon, WhatsApp, form gönderimi vb.
export function trackEvent(name, params = {}) {
    if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', name, params);
}
