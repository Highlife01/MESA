// MESA İş Makinaları Service Worker (PWA)
// Strateji:
//  - Sayfa gezinmeleri: önce ağ, çevrimdışıysa önbellekteki uygulama kabuğu.
//  - /assets/* (Vite hash'li, değişmez dosyalar): önce önbellek.
//  - Diğer aynı-origin GET istekleri (görseller, manifest, sitemap…): stale-while-revalidate,
//    böylece güncellemeler bir sonraki ziyarette kullanıcıya ulaşır.
const CACHE_NAME = 'mesa-erp-v6';
const SHELL_URL = '/index.html';
const STATIC_ASSETS = [
  '/',
  SHELL_URL,
  '/manifest.json',
  '/images/mesa-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

const isCacheable = (response) => response && response.status === 200 && response.type === 'basic';

async function putInCache(request, response) {
  if (!isCacheable(response)) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Yalnızca kendi origin'imiz; Firebase, Google Fonts, analytics vb. tarayıcıya bırakılır.
  if (url.origin !== self.location.origin) return;

  // 1) Sayfa gezinmeleri: network-first, çevrimdışı yedek
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        return (await caches.match(SHELL_URL)) || (await caches.match('/')) || Response.error();
      }
    })());
    return;
  }

  // 2) Hash'li derleme çıktıları: cache-first
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        event.waitUntil(putInCache(request, response.clone()));
        return response;
      } catch {
        return Response.error();
      }
    })());
    return;
  }

  // 3) Diğer statik dosyalar: stale-while-revalidate
  event.respondWith((async () => {
    const cached = await caches.match(request);
    const network = fetch(request)
      .then((response) => {
        event.waitUntil(putInCache(request, response.clone()));
        return response;
      })
      .catch(() => null);
    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return (await network) || Response.error();
  })());
});
