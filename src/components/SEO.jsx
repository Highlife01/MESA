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
  jsonLd = null,
  breadcrumbs = null,
  geo = null,
  noindex = false
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

    const setLink = (rel, href, extraAttrs = {}) => {
      const selectorParts = [`link[rel="${rel}"]`];
      Object.entries(extraAttrs).forEach(([k, v]) => {
        selectorParts.push(`[${k}="${v}"]`);
      });
      const selector = selectorParts.join('');
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('author', SITE_CONFIG.legalName);
    setMeta(
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // GEO & Local SEO Meta Tags
    const geoRegion = geo?.region || SITE_CONFIG.headquarters.geoRegion || 'TR-01';
    const geoPlacename = geo?.placename || SITE_CONFIG.headquarters.geoPlacename || 'Seyhan, Adana';
    const geoPosition = geo?.position || SITE_CONFIG.headquarters.geoPosition || `${SITE_CONFIG.headquarters.latitude};${SITE_CONFIG.headquarters.longitude}`;
    const icbm = geo?.icbm || SITE_CONFIG.headquarters.icbm || `${SITE_CONFIG.headquarters.latitude}, ${SITE_CONFIG.headquarters.longitude}`;

    setMeta('geo.region', geoRegion);
    setMeta('geo.placename', geoPlacename);
    setMeta('geo.position', geoPosition);
    setMeta('ICBM', icbm);
    setMeta('coverage', 'Turkey');
    setMeta('distribution', 'Global');

    // Resolve absolute OG image URL
    const resolvedOgImage = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`)
      : SITE_CONFIG.ogImage;

    // Normalize Canonical URL
    let cleanPath = canonical;
    if (!cleanPath && typeof window !== 'undefined') {
      cleanPath = window.location.pathname || '/';
    }
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
    const fullUrl = cleanPath === '/' ? `${SITE_CONFIG.siteUrl}/` : `${SITE_CONFIG.siteUrl}${cleanPath}`;

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', SITE_CONFIG.siteName, true);
    setMeta('og:locale', 'tr_TR', true);
    setMeta('og:image', resolvedOgImage, true);
    setMeta('og:image:alt', fullTitle, true);
    setMeta('og:url', fullUrl, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', resolvedOgImage);
    setMeta('twitter:image:alt', fullTitle);

    // Canonical & Hreflang
    setLink('canonical', fullUrl);
    if (!noindex) {
      setLink('alternate', fullUrl, { hreflang: 'tr' });
      setLink('alternate', fullUrl, { hreflang: 'x-default' });
    }

    // Structured Data JSON-LD
    let scriptEl = document.getElementById('page-structured-data');
    
    // Build combined graph schema
    const graph = [];
    
    // 1. Organization / LocalBusiness Schema (Always include HQ & Turkey areaServed)
    graph.push({
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'AutoRepair'],
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      'name': SITE_CONFIG.legalName,
      'alternateName': SITE_CONFIG.siteName,
      'url': SITE_CONFIG.siteUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': SITE_CONFIG.logo
      },
      'image': SITE_CONFIG.ogImage,
      'telephone': SITE_CONFIG.phoneRaw,
      'email': SITE_CONFIG.email,
      'sameAs': Object.values(SITE_CONFIG.social || {}),
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': SITE_CONFIG.phoneRaw,
          'contactType': 'customer service',
          'areaServed': 'TR',
          'availableLanguage': ['Turkish', 'English', 'Arabic'],
          'contactOption': 'TollFree',
          'hoursAvailable': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '00:00',
            'closes': '23:59'
          }
        }
      ],
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

    // 2. WebSite Schema
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.siteUrl}/#website`,
      'url': SITE_CONFIG.siteUrl,
      'name': SITE_CONFIG.siteName,
      'inLanguage': 'tr-TR',
      'publisher': {
        '@id': `${SITE_CONFIG.siteUrl}/#organization`
      }
    });

    // 3. WebPage Schema
    graph.push({
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`,
      'url': fullUrl,
      'name': fullTitle,
      'description': description,
      'inLanguage': 'tr-TR',
      'isPartOf': {
        '@id': `${SITE_CONFIG.siteUrl}/#website`
      },
      'about': {
        '@id': `${SITE_CONFIG.siteUrl}/#organization`
      }
    });

    // Extract page-specific items
    const activeSchema = schema || jsonLd;
    const customItems = [];
    if (activeSchema) {
      if (Array.isArray(activeSchema)) {
        customItems.push(...activeSchema);
      } else if (activeSchema['@graph'] && Array.isArray(activeSchema['@graph'])) {
        customItems.push(...activeSchema['@graph']);
      } else {
        const { '@context': _ctx, ...rest } = activeSchema;
        customItems.push(rest);
      }
    }

    const hasCustomBreadcrumb = customItems.some(item => item && item['@type'] === 'BreadcrumbList');

    // Add breadcrumb list schema if provided and not already in customItems
    if (!hasCustomBreadcrumb && breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${fullUrl}#breadcrumb`,
        'itemListElement': breadcrumbs.map((b, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': b.name,
          'item': b.url ? `${SITE_CONFIG.siteUrl}${b.url === '/' ? '' : (b.url.startsWith('/') ? b.url : `/${b.url}`)}` : undefined
        }))
      });
    }

    if (customItems.length > 0) {
      graph.push(...customItems);
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

  }, [title, description, keywords, canonical, ogType, ogImage, schema, jsonLd, breadcrumbs, geo, noindex]);

  return null;
}

