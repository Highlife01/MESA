import { useEffect } from 'react';

const SITE_NAME = 'Mesa İş Makinaları';
const BASE_URL = 'https://mesaismak.web.app';
const DEFAULT_IMAGE = 'https://mesaismak.web.app/og-image.jpg';

export function SEO({
  title,
  description = 'Adana ve Çukurova genelinde 7/24 mobil iş makinası tamiri, hidrolik sistem, teleskopik yükleyici, şanzıman ve motor revizyon servisi.',
  keywords = 'adana iş makinası servisi, hidrolik pompa tamiri, jcb servisi, cat tamiri, manitou servisi, mobil saha servisi, hidrolik hortum pres adana',
  canonical = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema = null
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | 7/24 Mobil Teknik Servis & ERP`;
    document.title = fullTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('author', 'Mesa İş Makinaları San. ve Tic. Ltd. Şti.');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'tr_TR', true);
    setMeta('og:image', ogImage, true);

    const fullUrl = canonical ? `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : window.location.href;
    setMeta('og:url', fullUrl, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullUrl);

    // Structured Data JSON-LD
    let scriptEl = document.getElementById('page-structured-data');
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'page-structured-data';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonical, ogType, ogImage, schema]);

  return null;
}
