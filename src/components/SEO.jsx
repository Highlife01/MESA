import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export function SEO({
  title,
  description = SITE_CONFIG.defaultMeta.description,
  keywords = SITE_CONFIG.defaultMeta.keywords,
  canonical = '',
  ogType = 'website',
  ogImage = SITE_CONFIG.ogImage,
  schema = null,
  breadcrumbs = null
}) {
  useEffect(() => {
    const fullTitle = title 
      ? ((title.includes('MESA') || title.includes(SITE_CONFIG.siteName)) ? title : `${title} | ${SITE_CONFIG.siteName}`)
      : SITE_CONFIG.defaultMeta.title;

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
    setMeta('author', SITE_CONFIG.legalName);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', SITE_CONFIG.siteName, true);
    setMeta('og:locale', 'tr_TR', true);
    setMeta('og:image', ogImage, true);

    const fullUrl = canonical 
      ? `${SITE_CONFIG.siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}` 
      : (typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.siteUrl);
      
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
    
    // Build combined graph schema
    const graph = [];
    
    // Organization / LocalBusiness Schema (Always include HQ & Turkey areaServed)
    graph.push({
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      'name': SITE_CONFIG.legalName,
      'alternateName': SITE_CONFIG.siteName,
      'url': SITE_CONFIG.siteUrl,
      'logo': SITE_CONFIG.logo,
      'image': SITE_CONFIG.ogImage,
      'telephone': SITE_CONFIG.phoneRaw,
      'email': SITE_CONFIG.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': SITE_CONFIG.headquarters.street,
        'addressLocality': SITE_CONFIG.headquarters.district,
        'addressRegion': SITE_CONFIG.headquarters.city,
        'postalCode': SITE_CONFIG.headquarters.postalCode,
        'addressCountry': 'TR'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': SITE_CONFIG.headquarters.latitude,
        'longitude': SITE_CONFIG.headquarters.longitude
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ],
          'opens': '00:00',
          'closes': '23:59'
        }
      ],
      'areaServed': [
        {
          '@type': 'Country',
          'name': 'Turkey'
        }
      ],
      'priceRange': '₺₺'
    });

    // Add breadcrumb list schema if provided
    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': b.name,
          'item': b.url ? `${SITE_CONFIG.siteUrl}${b.url.startsWith('/') ? b.url : `/${b.url}`}` : undefined
        }))
      });
    }

    // Add page specific schema if provided
    if (schema) {
      if (Array.isArray(schema)) {
        graph.push(...schema);
      } else {
        graph.push(schema);
      }
    }

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'page-structured-data';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });

  }, [title, description, keywords, canonical, ogType, ogImage, schema, breadcrumbs]);

  return null;
}
