import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { SITE_CONFIG } from '../src/config/siteConfig.js';
import { servicesData } from '../src/data/servicesData.js';
import { regionsData } from '../src/data/regionsData.js';
import { guidesData } from '../src/data/guidesData.js';
import { activeCitiesData } from '../src/data/citiesData.js';
import { cityGeoData } from '../src/data/cityGeoData.js';

const distDir = path.resolve(__dirname, '../dist');
const pagesDir = path.resolve(__dirname, '../src/pages');
const templatePath = path.join(distDir, 'index.html');
const EMPTY_ROOT = '<div id="root"></div>';

if (!fs.existsSync(templatePath)) {
  console.error('Hata: dist/index.html bulunamadı. Lütfen önce "npm run build" çalıştırın.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');

if (!templateHtml.includes(EMPTY_ROOT)) {
  // dist/index.html daha önce prerender ile doldurulmuş — şablon olarak kullanılamaz.
  console.error('Hata: dist/index.html zaten prerender edilmiş. Önce "vite build" ile yeniden üretin.');
  process.exit(1);
}

// ─── Güvenlik: tüm dinamik değerler HTML'e kaçışlanarak basılır ───────────────
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// JSON-LD içinde "</script>" kırılmasını engeller
function safeJsonLd(schema) {
  return JSON.stringify(schema, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

// Regex replace'te "$" özel karakterlerini etkisizleştirir
function literal(value) {
  return () => value;
}

/**
 * Sayfa bileşenindeki ilk <SEO ... /> bloğundan sabit string prop'ları okur.
 * Böylece başlık/açıklama tek kaynaktan (bileşenin kendisi) gelir.
 */
function extractSeo(pageFile) {
  const source = fs.readFileSync(path.join(pagesDir, pageFile), 'utf-8');
  const start = source.indexOf('<SEO');
  if (start === -1) return {};
  const end = source.indexOf('/>', start);
  const block = source.slice(start, end === -1 ? undefined : end);
  const read = (prop) => {
    const match = block.match(new RegExp(`\\b${prop}="([^"]*)"`));
    return match ? match[1] : undefined;
  };
  return { title: read('title'), description: read('description'), canonical: read('canonical') };
}

function requireSeo(pageFile, fallbackCanonical) {
  const seo = extractSeo(pageFile);
  if (!seo.title || !seo.description) {
    throw new Error(`${pageFile}: <SEO> içinde sabit title/description bulunamadı.`);
  }
  return { ...seo, canonical: seo.canonical || fallbackCanonical };
}

const CRAWL_LINKS = [
  ['/', 'Ana Sayfa'],
  ['/hizmetler', 'Hizmetler'],
  ['/turkiye-is-makinalari-servisi', 'Türkiye Geneli Servis'],
  ['/sehirler', 'Şehirler'],
  ['/hizmet-bolgeleri', 'Hizmet Bölgeleri'],
  ['/markalar', 'Markalar'],
  ['/yedek-parca', 'Yedek Parça'],
  ['/bakim-hesaplayici', 'Bakım Hesaplayıcı'],
  ['/ariza-kodu-cozucu', 'Arıza Kodu Çözücü'],
  ['/rehberler', 'Teknik Rehberler'],
  ['/hakkimizda', 'Hakkımızda'],
  ['/iletisim', 'İletişim'],
  ['/ariza-bildir', 'Arıza Bildir']
];

const writtenRoutes = [];
let homePageHtml = null;

function createPrerenderedPage(routePath, {
  title,
  description,
  canonical,
  h1,
  intro,
  schema,
  highlights = [],
  highlightsTitle = 'Teknik Hizmet Kapsamı',
  geo = null
}) {
  const fullTitle = (title.includes('MESA') || title.includes('Mesa') || title.includes(SITE_CONFIG.siteName)) ? title : `${title} | ${SITE_CONFIG.siteName}`;
  const canonicalPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
  const fullUrl = `${SITE_CONFIG.siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;

  const safeTitle = escapeHtml(fullTitle);
  const safeDescription = escapeHtml(description);
  const safeUrl = escapeHtml(fullUrl);

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, literal(`<title>${safeTitle}</title>`));

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, literal(`<meta name="description" content="${safeDescription}" />`));
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, literal(`<meta property="og:description" content="${safeDescription}" />`));
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, literal(`<meta name="twitter:description" content="${safeDescription}" />`));

  // Replace OG & Twitter Title
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, literal(`<meta property="og:title" content="${safeTitle}" />`));
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, literal(`<meta name="twitter:title" content="${safeTitle}" />`));

  // Replace Canonical & OG URL
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, literal(`<link rel="canonical" href="${safeUrl}" />`));
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, literal(`<meta property="og:url" content="${safeUrl}" />`));

  // Replace GEO meta tags (per-city local SEO — fallback: HQ koordinatları)
  if (geo) {
    const geoRegion = escapeHtml(geo.region || 'TR-01');
    const geoPlacename = escapeHtml(geo.placename || SITE_CONFIG.headquarters.geoPlacename || 'Seyhan, Adana');
    const geoPosition = escapeHtml(`${geo.latitude};${geo.longitude}`);
    const icbm = escapeHtml(`${geo.latitude}, ${geo.longitude}`);
    html = html.replace(/<meta name="geo\.region" content=".*?" \/>/i, literal(`<meta name="geo.region" content="${geoRegion}" />`));
    html = html.replace(/<meta name="geo\.placename" content=".*?" \/>/i, literal(`<meta name="geo.placename" content="${geoPlacename}" />`));
    html = html.replace(/<meta name="geo\.position" content=".*?" \/>/i, literal(`<meta name="geo.position" content="${geoPosition}" />`));
    html = html.replace(/<meta name="ICBM" content=".*?" \/>/i, literal(`<meta name="ICBM" content="${icbm}" />`));
  }

  // Inject JSON-LD Schema
  if (schema) {
    const schemaScript = `\n    <script id="page-structured-data" type="application/ld+json">\n${safeJsonLd(schema)}\n    </script>`;
    html = html.replace('</head>', literal(`${schemaScript}\n  </head>`));
  }

  const breadcrumb = canonicalPath === '/'
    ? ''
    : ` &gt; <span>${escapeHtml(h1 || title)}</span>`;

  // Inject Pre-rendered Semantic Body into #root for crawlers
  const semanticBody = `
    <div id="root">
      <header style="padding:16px;background:#fff;border-bottom:1px solid #e2e8f0;">
        <nav aria-label="Breadcrumb">
          <a href="/" style="color:#dc2626;text-decoration:none;font-weight:bold;">MESA İş Makinaları</a>${breadcrumb}
        </nav>
      </header>
      <main style="max-width:1100px;margin:30px auto;padding:0 20px;font-family:sans-serif;color:#0f172a;">
        <h1 style="font-size:2.2rem;font-weight:900;color:#0f172a;line-height:1.2;margin-bottom:16px;">${escapeHtml(h1)}</h1>
        <p style="font-size:1.1rem;color:#475569;line-height:1.6;margin-bottom:24px;">${escapeHtml(intro)}</p>
        ${highlights.length > 0 ? `
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">${escapeHtml(highlightsTitle)}</h2>
          <ul style="line-height:1.8;color:#334155;margin-bottom:24px;">
            ${highlights.map(h => {
              if (h && typeof h === 'object' && h.href) {
                return `<li><a href="${escapeHtml(h.href)}" style="color:#0f172a;">${escapeHtml(h.label)}</a></li>`;
              }
              return `<li>${escapeHtml(h)}</li>`;
            }).join('\n            ')}
          </ul>
        ` : ''}
        <section style="margin-top:36px;padding:24px;background:#f8fafc;border-radius:16px;border:1px solid #e2e8f0;">
          <h2 style="font-size:1.2rem;font-weight:800;margin-bottom:10px;">7/24 Kesintisiz Mobil Saha Müdahalesi</h2>
          <p style="color:#475569;font-size:0.95rem;margin-bottom:16px;">Türkiye genelinde şantiyenizde arızalanan tüm ağır iş makineleri için mobil servis araçlarımızla yerinde arıza tespiti ve hidrolik tamir hizmeti veriyoruz.</p>
          <p><strong>7/24 Acil Çağrı:</strong> <a href="tel:${escapeHtml(SITE_CONFIG.phoneRaw)}" style="color:#dc2626;font-weight:bold;">${escapeHtml(SITE_CONFIG.phone)}</a> | <strong>WhatsApp:</strong> <a href="https://wa.me/${escapeHtml(SITE_CONFIG.whatsappRaw)}" style="color:#16a34a;font-weight:bold;">${escapeHtml(SITE_CONFIG.whatsapp)}</a></p>
        </section>
      </main>
      <footer style="max-width:1100px;margin:0 auto 40px;padding:0 20px;font-family:sans-serif;">
        <nav aria-label="Site haritası">
          ${CRAWL_LINKS.map(([href, label]) => `<a href="${href}" style="margin-right:12px;color:#334155;">${escapeHtml(label)}</a>`).join('\n          ')}
        </nav>
      </footer>
    </div>
  `;

  html = html.replace(EMPTY_ROOT, literal(semanticBody));

  // Ana sayfa şablonun kendisi olduğundan en sona yazılır
  if (routePath === '/') {
    homePageHtml = html;
    writtenRoutes.push('/');
    return;
  }

  // Determine output directory
  const cleanRoute = routePath.replace(/^\//, '');
  const targetDir = path.join(distDir, cleanRoute);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
  writtenRoutes.push(routePath);
}

const providerSchema = {
  '@type': 'LocalBusiness',
  'name': SITE_CONFIG.legalName,
  'telephone': SITE_CONFIG.phoneRaw
};

// 0. Ana Sayfa
{
  const seo = requireSeo('HomePage.jsx', '/');
  createPrerenderedPage('/', {
    ...seo,
    canonical: '/',
    h1: 'MESA İş Makinaları — Türkiye Geneli Mobil Teknik Servis & Hidrolik',
    intro: seo.description,
    highlightsTitle: 'Hizmetlerimiz',
    highlights: servicesData.map(s => ({ href: `/${s.slug}`, label: s.title })),
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': SITE_CONFIG.legalName,
      'url': SITE_CONFIG.siteUrl,
      'telephone': SITE_CONFIG.phoneRaw,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': SITE_CONFIG.headquarters.street,
        'addressLocality': SITE_CONFIG.headquarters.district,
        'addressRegion': SITE_CONFIG.headquarters.city,
        'postalCode': SITE_CONFIG.headquarters.postalCode,
        'addressCountry': 'TR'
      },
      'areaServed': { '@type': 'Country', 'name': 'Turkey' }
    }
  });
}

// 1. National Landing Page
createPrerenderedPage('/turkiye-is-makinalari-servisi', {
  title: 'Türkiye İş Makinaları Servisi | MESA İş Makinaları',
  description: 'Türkiye genelinde 81 ilde şantiyede 7/24 yerinde mobil iş makinası tamiri, hidrolik revizyon, ekskavatör ve telehandler servisi.',
  canonical: '/turkiye-is-makinalari-servisi',
  h1: 'Türkiye Geneli İş Makinaları Teknik Servis',
  intro: 'MESA İş Makinaları; Türkiye’nin tüm bölgelerindeki inşaat, madencilik ve altyapı şantiyelerine 5 mobil servis aracı ve 450 Bar hidrolik test standı ile 7/24 yerinde teknik müdahale sağlar.',
  highlights: [
    'Türkiye genelinde 81 il şantiye sahasına yerinde mobil teknik müdahale',
    'Ekskavatör, loder, bekoloder ve teleskopik yükleyici komple revizyonu',
    'Yerinde 1/4" - 2" 4 telli hidrolik hortum presleme imkanı',
    'OEM lisanslı elektronik diagnostik cihazları ile anında arıza tespiti',
    '12 ay veya 2.000 çalışma saati resmi MESA servis garantisi'
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Türkiye Geneli İş Makinaları Servisi',
    'provider': providerSchema,
    'areaServed': { '@type': 'Country', 'name': 'Turkey' }
  }
});

// 2. Regional Hub Page
createPrerenderedPage('/hizmet-bolgeleri', {
  title: 'Hizmet Bölgelerimiz (7 Coğrafi Bölge) | MESA İş Makinaları',
  description: 'MESA İş Makinaları Türkiye\'nin 7 bölgesinde mobilize teknik servis araçlarıyla şantiyelerde 7/24 yerinde iş makinası tamiri ve hidrolik servis desteği sağlamaktadır.',
  canonical: '/hizmet-bolgeleri',
  h1: 'Türkiye Genelinde Bölgesel Servis Ağı',
  intro: 'Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu ve Güneydoğu Anadolu bölgelerindeki tüm sanayi ve maden şantiyelerine en yakın sevk noktamızdan hızlı mobil intikal sağlıyoruz.',
  highlights: regionsData.map(r => `${r.name}: ${r.focusSectors.join(', ')} - ${r.dispatchTime}`),
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'MESA Bölgesel İş Makinası Servis Ağı',
    'provider': { '@type': 'LocalBusiness', 'name': SITE_CONFIG.legalName }
  }
});

// 3. Target Services Pages
servicesData.forEach(service => {
  const pageData = {
    title: `${service.title} | MESA Türkiye Servisi`,
    description: `${service.shortDesc} Türkiye genelinde 7/24 yerinde teknik servis, ${service.warranty}.`,
    canonical: `/${service.slug}`,
    h1: service.title,
    intro: service.content,
    highlights: service.highlights || [],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': service.title,
      'serviceType': service.category,
      'provider': providerSchema,
      'areaServed': { '@type': 'Country', 'name': 'Turkey' }
    }
  };

  // Direct root URL (e.g. /is-makinalari-servisi) — tek kanonik sürüm
  createPrerenderedPage(`/${service.slug}`, pageData);

  // Hizmetler sub URL (e.g. /hizmetler/is-makinalari-servisi)
  // Kopya içerik: kanonik etiket kök URL'ye işaret eder (SEO konsolidasyonu)
  createPrerenderedPage(`/hizmetler/${service.slug}`, {
    ...pageData,
    canonical: `/${service.slug}`
  });
});

// 4. Cities Hub Page (/sehirler)
createPrerenderedPage('/sehirler', {
  title: 'Türkiye Geneli İş Makinaları Servis Bölgeleri | MESA',
  description: 'MESA İş Makinaları Türkiye genelinde 12 aktif sanayi ve lojistik merkezinde tam donanımlı mobil araçlarla 7/24 yerinde teknik servis sunmaktadır.',
  canonical: '/sehirler',
  h1: 'Türkiye Geneli İş Makinaları Servis Bölgeleri',
  intro: 'MESA İş Makinaları; İstanbul, Ankara, İzmir, Bursa, Kocaeli, Konya, Adana, Mersin, Antalya, Gaziantep, Kayseri ve Diyarbakır başta olmak üzere Türkiye\'nin tüm şantiyelerine seyyar hidrolik pres, elektronik arıza teşhis cihazları ve uzman teknisyenleriyle yerinde teknik müdahale sağlar.',
  highlightsTitle: 'Servis Verilen Şehirler',
  highlights: activeCitiesData.map(c => ({ href: `/sehirler/${c.slug}`, label: `${c.name} (${c.plate}) İş Makinaları Servisi` })),
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Türkiye Geneli İş Makinaları Servis Bölgeleri',
    'provider': providerSchema,
    'areaServed': { '@type': 'Country', 'name': 'Turkey' }
  }
});

// 5. 81 City SEO Landing Pages (/sehirler/:slug) — şehir bazlı GEO koordinatları ile
activeCitiesData.forEach(city => {
  const canonical = `/sehirler/${city.slug}`;
  const cityGeo = cityGeoData[city.id] || { latitude: SITE_CONFIG.headquarters.latitude, longitude: SITE_CONFIG.headquarters.longitude };
  createPrerenderedPage(canonical, {
    title: city.seoTitle,
    description: city.seoDescription,
    canonical: canonical,
    h1: city.h1,
    intro: `${city.intro} ${city.industryContext}`,
    highlights: [
      `${city.name} ve çevre şantiyelere yerinde tam donanımlı mobil servis müdahalesi`,
      `Sahada 500 Bar hidrolik hortum presleme ve basınç testi imkanı`,
      ...city.servicedMachinery.map(m => `${city.name} ${m} tamir ve bakım desteği`),
      `12 ay veya 2.000 çalışma saati yazılı MESA teknik servis garantisi`
    ],
    geo: {
      region: `TR-${city.plate}`,
      placename: `${city.name}, Turkey`,
      latitude: cityGeo.latitude,
      longitude: cityGeo.longitude
    },
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          'name': `${city.name} İş Makinaları Teknik Servisi`,
          'serviceType': 'Ağır İş Makinaları Mobil Tamir, Bakım ve Hidrolik Revizyon',
          'description': city.seoDescription,
          'provider': {
            '@type': 'LocalBusiness',
            'name': SITE_CONFIG.legalName,
            'telephone': SITE_CONFIG.phoneRaw,
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
              'latitude': cityGeo.latitude,
              'longitude': cityGeo.longitude
            }
          },
          'areaServed': {
            '@type': 'AdministrativeArea',
            'name': `${city.name}, Turkey`
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': SITE_CONFIG.siteUrl },
            { '@type': 'ListItem', 'position': 2, 'name': 'Hizmet Bölgeleri', 'item': `${SITE_CONFIG.siteUrl}/sehirler` },
            { '@type': 'ListItem', 'position': 3, 'name': `${city.name} İş Makinaları Servisi`, 'item': `${SITE_CONFIG.siteUrl}${canonical}` }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': city.faq.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
          }))
        }
      ]
    }
  });
});

// 6. Statik kurumsal & araç sayfaları — başlık/açıklama sayfanın kendi <SEO> bileşeninden okunur
const STATIC_PAGES = [
  { file: 'ServicesPage.jsx', route: '/hizmetler', h1: 'İş Makinası Tamiri & Hidrolik Servis Hizmetlerimiz', highlightsTitle: 'Hizmetlerimiz', highlights: servicesData.map(s => ({ href: `/${s.slug}`, label: s.title })) },
  { file: 'AboutPage.jsx', route: '/hakkimizda', h1: 'Kurumsal ve Atölye Altyapımız' },
  { file: 'ContactPage.jsx', route: '/iletisim', h1: 'İletişim ve Şantiye Servis Talebi' },
  { file: 'BrandsPage.jsx', route: '/markalar', h1: 'Desteklenen İş Makinası Markaları' },
  { file: 'FleetPage.jsx', route: '/filo', h1: 'Mobil Servis Filomuz' },
  { file: 'GuidesPage.jsx', route: '/rehberler', h1: 'Teknik Rehberler ve Bilgi Bankası', highlightsTitle: 'Rehberler', highlights: guidesData.map(g => ({ href: `/rehberler/${g.slug}`, label: g.title })) },
  { file: 'MaintenanceCalculatorPage.jsx', route: '/bakim-hesaplayici', h1: 'İş Makinası Periyodik Bakım & Maliyet Hesaplayıcı' },
  { file: 'FaultDiagnosticPage.jsx', route: '/ariza-kodu-cozucu', h1: 'İş Makinası Arıza Kodu (DTC) Çözücü' },
  { file: 'PartsShopPage.jsx', route: '/yedek-parca', h1: 'Orijinal İş Makinası Yedek Parça' }
];

STATIC_PAGES.forEach(({ file, route, h1, highlights, highlightsTitle }) => {
  const seo = requireSeo(file, route);
  createPrerenderedPage(route, {
    ...seo,
    canonical: route,
    h1,
    intro: seo.description,
    highlights,
    highlightsTitle,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': seo.title,
      'description': seo.description,
      'url': `${SITE_CONFIG.siteUrl}${route}`,
      'publisher': providerSchema
    }
  });
});

// 7. Teknik rehber detay sayfaları
guidesData.forEach(guide => {
  const canonical = `/rehberler/${guide.slug}`;
  createPrerenderedPage(canonical, {
    title: `${guide.title} | Mesa İş Makinaları Teknik Rehber`,
    description: guide.shortDesc,
    canonical,
    h1: guide.title,
    intro: guide.summary || guide.shortDesc,
    highlightsTitle: 'Konu Başlıkları',
    highlights: Array.isArray(guide.tags) ? guide.tags : [],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': guide.title,
      'description': guide.shortDesc,
      'mainEntityOfPage': `${SITE_CONFIG.siteUrl}${canonical}`,
      'author': { '@type': 'Organization', 'name': SITE_CONFIG.legalName },
      'publisher': { '@type': 'Organization', 'name': SITE_CONFIG.legalName }
    }
  });
});

// 8. SPA fallback (firebase.json → "**" → /spa.html)
// Prerender edilmemiş/dinamik URL'ler ve 404'ler bu dosyayı alır: canonical yok, noindex.
const spaHtml = templateHtml
  .replace(/\s*<link rel="canonical" href=".*?" \/>/i, '')
  .replace(/<meta name="robots" content=".*?" \/>/i, '<meta name="robots" content="noindex, follow" />');
fs.writeFileSync(path.join(distDir, 'spa.html'), spaHtml, 'utf-8');

// Ana sayfa en son yazılır (şablon dosyasının üzerine)
if (homePageHtml) {
  fs.writeFileSync(templatePath, homePageHtml, 'utf-8');
}

console.log(`✓ ${writtenRoutes.length} sayfa için statik SSG prerender HTML dosyası ve dist/spa.html üretildi.`);
