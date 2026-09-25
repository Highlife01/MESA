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
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Hata: dist/index.html bulunamadı. Lütfen önce "npm run build" çalıştırın.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');

function createPrerenderedPage(routePath, { title, description, canonical, h1, intro, schema, highlights = [], geo = null }) {
  const fullTitle = (title.includes('MESA') || title.includes(SITE_CONFIG.siteName)) ? title : `${title} | ${SITE_CONFIG.siteName}`;
  const fullUrl = `${SITE_CONFIG.siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${description}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  // Replace OG & Twitter Title
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);

  // Replace Canonical & OG URL
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${fullUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${fullUrl}" />`);

  // Replace GEO meta tags (per-city local SEO — fallback: HQ koordinatları)
  if (geo) {
    const geoRegion = geo.region || 'TR-01';
    const geoPlacename = geo.placename || SITE_CONFIG.headquarters.geoPlacename || 'Seyhan, Adana';
    const geoPosition = `${geo.latitude};${geo.longitude}`;
    const icbm = `${geo.latitude}, ${geo.longitude}`;
    html = html.replace(/<meta name="geo\.region" content=".*?" \/>/i, `<meta name="geo.region" content="${geoRegion}" />`);
    html = html.replace(/<meta name="geo\.placename" content=".*?" \/>/i, `<meta name="geo.placename" content="${geoPlacename}" />`);
    html = html.replace(/<meta name="geo\.position" content=".*?" \/>/i, `<meta name="geo.position" content="${geoPosition}" />`);
    html = html.replace(/<meta name="ICBM" content=".*?" \/>/i, `<meta name="ICBM" content="${icbm}" />`);
  }

  // Inject JSON-LD Schema
  if (schema) {
    const schemaScript = `\n    <script id="page-structured-data" type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`;
    html = html.replace('</head>', `${schemaScript}\n  </head>`);
  }

  // Inject Pre-rendered Semantic Body into #root for crawlers
  const semanticBody = `
    <div id="root">
      <header style="padding:16px;background:#fff;border-bottom:1px solid #e2e8f0;">
        <nav aria-label="Breadcrumb">
          <a href="/" style="color:#dc2626;text-decoration:none;font-weight:bold;">MESA İş Makinaları</a> &gt; <span>${title}</span>
        </nav>
      </header>
      <main style="max-width:1100px;margin:30px auto;padding:0 20px;font-family:sans-serif;color:#0f172a;">
        <h1 style="font-size:2.2rem;font-weight:900;color:#0f172a;line-height:1.2;margin-bottom:16px;">${h1}</h1>
        <p style="font-size:1.1rem;color:#475569;line-height:1.6;margin-bottom:24px;">${intro}</p>
        ${highlights.length > 0 ? `
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">Teknik Hizmet Kapsamı</h2>
          <ul style="line-height:1.8;color:#334155;margin-bottom:24px;">
            ${highlights.map(h => `<li>${h}</li>`).join('\n')}
          </ul>
        ` : ''}
        <section style="margin-top:36px;padding:24px;background:#f8fafc;border-radius:16px;border:1px solid #e2e8f0;">
          <h3 style="font-size:1.2rem;font-weight:800;margin-bottom:10px;">7/24 Kesintisiz Mobil Saha Müdahalesi</h3>
          <p style="color:#475569;font-size:0.95rem;margin-bottom:16px;">Türkiye genelinde şantiyenizde arızalanan tüm ağır iş makineleri için mobil servis araçlarımızla yerinde arıza tespiti ve hidrolik tamir hizmeti veriyoruz.</p>
          <p><strong>7/24 Acil Çağrı:</strong> <a href="tel:${SITE_CONFIG.phoneRaw}" style="color:#dc2626;font-weight:bold;">${SITE_CONFIG.phone}</a> | <strong>WhatsApp:</strong> <a href="https://wa.me/${SITE_CONFIG.whatsappRaw}" style="color:#16a34a;font-weight:bold;">${SITE_CONFIG.whatsapp}</a></p>
        </section>
      </main>
    </div>
  `;

  html = html.replace('<div id="root"></div>', semanticBody);

  // Determine output directory
  const cleanRoute = routePath.replace(/^\//, '');
  const targetDir = cleanRoute ? path.join(distDir, cleanRoute) : distDir;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
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
    'provider': {
      '@type': 'LocalBusiness',
      'name': SITE_CONFIG.legalName,
      'telephone': SITE_CONFIG.phoneRaw
    },
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
      'provider': {
        '@type': 'LocalBusiness',
        'name': SITE_CONFIG.legalName,
        'telephone': SITE_CONFIG.phoneRaw
      },
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
  highlights: activeCitiesData.map(c => `${c.name} (${c.plate}): ${c.industryContext}`),
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Türkiye Geneli İş Makinaları Servis Bölgeleri',
    'provider': {
      '@type': 'LocalBusiness',
      'name': SITE_CONFIG.legalName,
      'telephone': SITE_CONFIG.phoneRaw
    },
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

console.log('✓ Tüm sayfalar için statik SSG prerender HTML dosyaları başarıyla üretildi.');
