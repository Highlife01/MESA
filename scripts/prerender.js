import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { SITE_CONFIG } from '../src/config/siteConfig.js';
import { servicesData } from '../src/data/servicesData.js';
import { regionsData } from '../src/data/regionsData.js';
import { guidesData } from '../src/data/guidesData.js';
import { brandsData } from '../src/data/brandsData.js';
import { activeCitiesData } from '../src/data/citiesData.js';
import { cityGeoData } from '../src/data/cityGeoData.js';

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Hata: dist/index.html bulunamadı. Lütfen önce "npm run build" çalıştırın.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildBaseGraph(fullUrl, fullTitle, description, breadcrumbs = [], extraNodes = []) {
  const breadcrumbNode = breadcrumbs.length > 0 ? [{
    '@type': 'BreadcrumbList',
    '@id': `${fullUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.url.startsWith('http') ? b.url : `${SITE_CONFIG.siteUrl}${b.url === '/' ? '' : b.url}`
    }))
  }] : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'AutoRepair'],
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        name: SITE_CONFIG.siteName,
        legalName: SITE_CONFIG.legalName,
        url: SITE_CONFIG.siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: SITE_CONFIG.logo
        },
        image: SITE_CONFIG.ogImage,
        telephone: SITE_CONFIG.phoneRaw,
        email: SITE_CONFIG.email,
        priceRange: '₺₺',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.headquarters.street,
          addressLocality: SITE_CONFIG.headquarters.district,
          addressRegion: SITE_CONFIG.headquarters.city,
          postalCode: SITE_CONFIG.headquarters.postalCode,
          addressCountry: SITE_CONFIG.headquarters.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.headquarters.latitude,
          longitude: SITE_CONFIG.headquarters.longitude
        },
        areaServed: {
          '@type': 'Country',
          name: 'Turkey'
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: SITE_CONFIG.phoneRaw,
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['Turkish']
          },
          {
            '@type': 'ContactPoint',
            telephone: `+${SITE_CONFIG.whatsappRaw}`,
            contactType: 'emergency',
            areaServed: 'TR',
            availableLanguage: ['Turkish']
          }
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        },
        sameAs: Object.values(SITE_CONFIG.social || {})
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.siteUrl}/#website`,
        url: SITE_CONFIG.siteUrl,
        name: SITE_CONFIG.siteName,
        inLanguage: 'tr-TR',
        publisher: { '@id': `${SITE_CONFIG.siteUrl}/#organization` }
      },
      {
        '@type': 'WebPage',
        '@id': `${fullUrl}#webpage`,
        url: fullUrl,
        name: fullTitle,
        description: description,
        inLanguage: 'tr-TR',
        isPartOf: { '@id': `${SITE_CONFIG.siteUrl}/#website` },
        about: { '@id': `${SITE_CONFIG.siteUrl}/#organization` }
      },
      ...breadcrumbNode,
      ...extraNodes
    ]
  };
}

function createPrerenderedPage(routePath, {
  title,
  description,
  canonical,
  h1,
  intro,
  schema,
  highlights = [],
  geo = null,
  extraSectionsHtml = ''
}) {
  const fullTitle = (title.includes('MESA') || title.includes(SITE_CONFIG.siteName)) ? title : `${title} | ${SITE_CONFIG.siteName}`;
  const cleanCanonical = canonical === '/' ? '' : (canonical.startsWith('/') ? canonical : `/${canonical}`).replace(/\/+$/, '');
  const fullUrl = `${SITE_CONFIG.siteUrl}${cleanCanonical}`;
  const safeTitle = escapeHtml(fullTitle);
  const safeDesc = escapeHtml(description);

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${safeDesc}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${safeDesc}" />`);

  // Replace OG & Twitter Title & Image Alt
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${safeTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${safeTitle}" />`);

  // Replace Canonical, Hreflang & OG URL
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${fullUrl}" />`);
  html = html.replace(/<link rel="alternate" hreflang="tr" href=".*?" \/>/i, `<link rel="alternate" hreflang="tr" href="${fullUrl}" />`);
  html = html.replace(/<link rel="alternate" hreflang="x-default" href=".*?" \/>/i, `<link rel="alternate" hreflang="x-default" href="${fullUrl}" />`);
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

  const footerNavHtml = `
      <footer style="max-width:1100px;margin:40px auto 20px;padding:20px;border-top:1px solid #e2e8f0;font-family:sans-serif;font-size:0.85rem;color:#64748b;">
        <nav aria-label="Kurumsal Bağlantılar" style="display:flex;flex-wrap:wrap;gap:12px;">
          <a href="/">Ana Sayfa</a>
          <a href="/hizmetler">Tüm Hizmetler</a>
          <a href="/turkiye-is-makinalari-servisi">Türkiye Geneli Servis</a>
          <a href="/hizmet-bolgeleri">Bölgesel Servis Ağı</a>
          <a href="/sehirler">81 İl Şantiye Servisi</a>
          <a href="/markalar">Desteklenen Markalar</a>
          <a href="/filo">Mobil Servis Filosu</a>
          <a href="/rehberler">Teknik Rehberler</a>
          <a href="/bakim-hesaplayici">Bakım Hesaplayıcı</a>
          <a href="/ariza-kodu-cozucu">Arıza Kodu Çözücü</a>
          <a href="/yedek-parca">Orijinal Yedek Parça</a>
          <a href="/hakkimizda">Hakkımızda</a>
          <a href="/iletisim">İletişim</a>
        </nav>
      </footer>`;

  // Inject Pre-rendered Semantic Body into #root for crawlers
  const semanticBody = `
    <div id="root">
      <header style="padding:16px;background:#fff;border-bottom:1px solid #e2e8f0;">
        <nav aria-label="Breadcrumb">
          <a href="/" style="color:#dc2626;text-decoration:none;font-weight:bold;">MESA İş Makinaları</a>${routePath !== '/' ? ` &gt; <span>${escapeHtml(h1 || title)}</span>` : ''}
        </nav>
      </header>
      <main style="max-width:1100px;margin:30px auto;padding:0 20px;font-family:sans-serif;color:#0f172a;">
        <h1 style="font-size:2.2rem;font-weight:900;color:#0f172a;line-height:1.2;margin-bottom:16px;">${escapeHtml(h1)}</h1>
        <p style="font-size:1.1rem;color:#475569;line-height:1.6;margin-bottom:24px;">${escapeHtml(intro)}</p>
        ${highlights.length > 0 ? `
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">Teknik Hizmet Kapsamı</h2>
          <ul style="line-height:1.8;color:#334155;margin-bottom:24px;">
            ${highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('\n            ')}
          </ul>
        ` : ''}
        ${extraSectionsHtml}
        <section style="margin-top:36px;padding:24px;background:#f8fafc;border-radius:16px;border:1px solid #e2e8f0;">
          <h3 style="font-size:1.2rem;font-weight:800;margin-bottom:10px;">7/24 Kesintisiz Mobil Saha Müdahalesi</h3>
          <p style="color:#475569;font-size:0.95rem;margin-bottom:16px;">Türkiye genelinde şantiyenizde arızalanan tüm ağır iş makineleri için mobil servis araçlarımızla yerinde arıza tespiti ve hidrolik tamir hizmeti veriyoruz.</p>
          <p><strong>7/24 Acil Çağrı:</strong> <a href="tel:${SITE_CONFIG.phoneRaw}" style="color:#dc2626;font-weight:bold;">${SITE_CONFIG.phone}</a> | <strong>WhatsApp:</strong> <a href="https://wa.me/${SITE_CONFIG.whatsappRaw}" style="color:#16a34a;font-weight:bold;">${SITE_CONFIG.whatsapp}</a></p>
        </section>
      </main>${footerNavHtml}
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

const allServiceLinksHtml = `
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">Uzmanlık Alanlarımız ve Teknik Servis Hizmetlerimiz</h2>
          <ul style="line-height:1.8;color:#334155;margin-bottom:24px;">
            ${servicesData.map(s => `<li><a href="/${s.slug}"><strong>${escapeHtml(s.title)}</strong></a> — ${escapeHtml(s.shortDesc)}</li>`).join('\n            ')}
          </ul>`;

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
  extraSectionsHtml: allServiceLinksHtml,
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/turkiye-is-makinalari-servisi`,
    'Türkiye İş Makinaları Servisi | MESA İş Makinaları',
    'Türkiye genelinde 81 ilde şantiyede 7/24 yerinde mobil iş makinası tamiri, hidrolik revizyon, ekskavatör ve telehandler servisi.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Türkiye İş Makinaları Servisi', url: '/turkiye-is-makinalari-servisi' }
    ],
    [{
      '@type': 'Service',
      name: 'Türkiye Geneli İş Makinaları Servisi',
      provider: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
      areaServed: { '@type': 'Country', name: 'Turkey' }
    }]
  )
});

// 2. Regional Hub Page (/hizmet-bolgeleri ve /bolgeler)
const regionalHubConfig = {
  title: 'Hizmet Bölgelerimiz (7 Coğrafi Bölge) | MESA İş Makinaları',
  description: 'MESA İş Makinaları Türkiye\'nin 7 bölgesinde mobilize teknik servis araçlarıyla şantiyelerde 7/24 yerinde iş makinası tamiri ve hidrolik servis desteği sağlamaktadır.',
  canonical: '/hizmet-bolgeleri',
  h1: 'Türkiye Genelinde Bölgesel Servis Ağı',
  intro: 'Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu ve Güneydoğu Anadolu bölgelerindeki tüm sanayi ve maden şantiyelerine en yakın sevk noktamızdan hızlı mobil intikal sağlıyoruz.',
  highlights: regionsData.map(r => `${r.name}: ${r.focusSectors.join(', ')} - ${r.dispatchTime}`),
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/hizmet-bolgeleri`,
    'Hizmet Bölgelerimiz (7 Coğrafi Bölge) | MESA İş Makinaları',
    'MESA İş Makinaları Türkiye\'nin 7 bölgesinde mobilize teknik servis araçlarıyla şantiyelerde 7/24 yerinde iş makinası tamiri ve hidrolik servis desteği sağlamaktadır.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hizmet Bölgeleri', url: '/hizmet-bolgeleri' }
    ],
    [{
      '@type': 'Service',
      name: 'MESA Bölgesel İş Makinaları Servis Ağı',
      provider: { '@id': `${SITE_CONFIG.siteUrl}/#organization` }
    }]
  )
};
createPrerenderedPage('/hizmet-bolgeleri', regionalHubConfig);
createPrerenderedPage('/bolgeler', regionalHubConfig);

// 3. Services Hub (/hizmetler) & 22 Target Service Pages
createPrerenderedPage('/hizmetler', {
  title: 'Ağır İş Makinası Servis ve Revizyon Hizmetlerimiz | MESA İş Makinaları',
  description: 'Ekskavatör, loder, bekoloder ve telehandler için 450 Bar hidrolik pompa revizyonu, şanzıman tamiri, motor rektifiye, seyyar borwerk ve 7/24 mobil saha servisi.',
  canonical: '/hizmetler',
  h1: 'Ağır İş Makinası Teknik Servis & Revizyon Hizmetlerimiz',
  intro: 'MESA İş Makinaları olarak 2.500 m² kapalı atölyemiz, 450 Bar dinamik hidrolik test istasyonumuz ve 5 tam donanımlı mobil servis aracımızla Türkiye genelinde uçtan uca teknik servis sağlıyoruz.',
  highlights: servicesData.slice(0, 10).map(s => `${s.title}: ${s.shortDesc}`),
  extraSectionsHtml: allServiceLinksHtml,
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/hizmetler`,
    'Ağır İş Makinası Servis ve Revizyon Hizmetlerimiz | MESA İş Makinaları',
    'Ekskavatör, loder, bekoloder ve telehandler için 450 Bar hidrolik pompa revizyonu, şanzıman tamiri, motor rektifiye, seyyar borwerk ve 7/24 mobil saha servisi.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hizmetlerimiz', url: '/hizmetler' }
    ]
  )
});

servicesData.forEach(service => {
  const faqNodes = service.faqs && service.faqs.length > 0 ? [{
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  }] : [];

  const pageData = {
    title: `${service.title} | MESA Türkiye Servisi`,
    description: `${service.shortDesc} Türkiye genelinde 7/24 yerinde teknik servis, ${service.warranty}.`,
    canonical: `/${service.slug}`,
    h1: service.title,
    intro: service.content,
    highlights: service.highlights || [],
    extraSectionsHtml: `
          <h2 style="font-size:1.3rem;font-weight:800;color:#1e293b;margin-top:24px;">Diğer Uzmanlık Hizmetlerimiz</h2>
          <ul style="line-height:1.8;color:#334155;">
            ${servicesData.filter(s => s.slug !== service.slug).slice(0, 8).map(s => `<li><a href="/${s.slug}">${escapeHtml(s.title)}</a></li>`).join('\n            ')}
          </ul>`,
    schema: buildBaseGraph(
      `${SITE_CONFIG.siteUrl}/${service.slug}`,
      `${service.title} | MESA Türkiye Servisi`,
      `${service.shortDesc} Türkiye genelinde 7/24 yerinde teknik servis, ${service.warranty}.`,
      [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/hizmetler' },
        { name: service.title, url: `/${service.slug}` }
      ],
      [
        {
          '@type': 'Service',
          name: service.title,
          serviceType: service.category,
          description: service.shortDesc,
          provider: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
          areaServed: { '@type': 'Country', name: 'Turkey' }
        },
        ...faqNodes
      ]
    )
  };

  // Direct root URL (e.g. /is-makinalari-servisi) — tek kanonik sürüm
  createPrerenderedPage(`/${service.slug}`, pageData);

  // Hizmetler sub URL (e.g. /hizmetler/is-makinalari-servisi) -> kanonik etiket kök URL'ye işaret eder
  createPrerenderedPage(`/hizmetler/${service.slug}`, {
    ...pageData,
    canonical: `/${service.slug}`
  });
});

// 4. Core Static & Interactive Tool Pages (/markalar, /filo, /hakkimizda, /iletisim, /rehberler, /rehberler/:slug, /bakim-hesaplayici, /ariza-kodu-cozucu, /yedek-parca)
createPrerenderedPage('/markalar', {
  title: 'Desteklenen İş Makinası Markaları & Diagnostik Teşhis | MESA İş Makinaları',
  description: 'JCB, Caterpillar (CAT), Hidromek, Komatsu, Volvo, Manitou, Merlo ve Bobcat iş makinelerine yetkili seviyesinde lisanslı diagnostik ve garantili tamir servisi.',
  canonical: '/markalar',
  h1: 'Desteklenen İş Makinası Markaları',
  intro: 'MESA İş Makinaları bünyesinde her markanın özel protokollerini okuyabilen lisanslı diagnostik arıza tespit cihazları, kabloları ve OEM servis yazılımları mevcuttur.',
  highlights: brandsData.map(b => `${b.name} (${b.origin}): ${b.specialty} — Diagnostik: ${b.diagnostics}`),
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/markalar`,
    'Desteklenen İş Makinası Markaları & Diagnostik Teşhis | MESA İş Makinaları',
    'JCB, Caterpillar (CAT), Hidromek, Komatsu, Volvo, Manitou, Merlo ve Bobcat iş makinelerine yetkili seviyesinde lisanslı diagnostik ve garantili tamir servisi.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Desteklenen Markalar', url: '/markalar' }
    ]
  )
});

createPrerenderedPage('/filo', {
  title: '5 Araçlık Mobil Servis Filosu | MESA İş Makinaları',
  description: 'Adana, Mersin, Hatay, Osmaniye ve Türkiye geneli şantiyelere ulaşan 5 tam donanımlı mobil servis aracı, araç içi hortum presi ve arıza tespit teknolojisi.',
  canonical: '/filo',
  h1: '5 Tam Donanımlı Gezici Mobil Servis Filosu',
  intro: 'MESA İş Makinaları 5 araçlık modern mobil atölye filosuyla Finn-Power 500 bar hidrolik hortum presini, Kaeser kompresörü, seyyar borwerk tezgahını ve OEM diagnostik cihazlarını doğrudan şantiyenize taşır.',
  highlights: [
    'Ağır Şantiye 4x4 Acil Müdahale Araçları (Isuzu D-Max & Ford Ranger 4x4)',
    'Yüksek Tavanlı Entegre Mobil Atölye Panelvanları (Ford Transit & Iveco Daily)',
    'Ağır Parça ve Ataşman Nakil Kurtarıcısı (3.5 Ton Hidrolik Vinçli)',
    'Şantiye sahasında 1/4" - 2" 4 telli yüksek basınç hortum presleme',
    'CAT ET, JCB ServiceMaster, Volvo Tech Tool ve H-Diag bilgisayarlı teşhis'
  ],
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/filo`,
    '5 Araçlık Mobil Servis Filosu | MESA İş Makinaları',
    'Adana, Mersin, Hatay, Osmaniye ve Türkiye geneli şantiyelere ulaşan 5 tam donanımlı mobil servis aracı, araç içi hortum presi ve arıza tespit teknolojisi.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Mobil Servis Filosu', url: '/filo' }
    ]
  )
});

createPrerenderedPage('/hakkimizda', {
  title: 'Kurumsal ve Atölye Altyapımız | MESA İş Makinaları',
  description: '2008\'den bu yana Adana merkezli 2.500 m² kapalı atölye, 10 ton vinç, 450 bar test standı ve 5 mobil servis aracıyla Türkiye genelinde hizmet veren iş makinası revizyon merkezi.',
  canonical: '/hakkimizda',
  h1: 'Şantiyelerin Durmayan Gücü: MESA İş Makinaları',
  intro: '2008 yılında Adana Seyhan’da kurulan MESA İş Makinaları; ekskavatör, bekoloder, loder, dozer ve telehandler sınıfı ağır iş makinelerinin hidrolik, mekanik ve elektronik revizyonunda Türkiye’nin önde gelen özel servis merkezlerinden biridir.',
  highlights: [
    '2.500 m² Entegre Kapalı Revizyon Tesisi (Yeşiloba Mah. 46167. Sokak No: 19/A, Seyhan / Adana)',
    '450 Bar / 400 Lt/Dk Bilgisayarlı Dinamik Hidrolik Pompa Test İstasyonu',
    '10 Ton Kapasiteli Tavan Vinci ve CNC / Seyyar Borwerk Talaşlı İmalat Parkuru',
    'ISO 9001:2015, ISO 45001:2018, ISO 14001:2015 ve TSE Hizmet Yeterlilik Belgeli',
    '12 Ay / 2.000 Çalışma Saati Resmi Garantili Revizyon'
  ],
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/hakkimizda`,
    'Kurumsal ve Atölye Altyapımız | MESA İş Makinaları',
    '2008\'den bu yana Adana merkezli 2.500 m² kapalı atölye, 10 ton vinç, 450 bar test standı ve 5 mobil servis aracıyla Türkiye genelinde hizmet veren iş makinası revizyon merkezi.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hakkımızda', url: '/hakkimizda' }
    ]
  )
});

createPrerenderedPage('/iletisim', {
  title: 'İletişim ve Şantiye Servis Talebi | MESA İş Makinaları',
  description: 'MESA İş Makinaları Adana merkezli operasyonu ile Türkiye genelinde mobil servis, saha tamiri ve hidrolik sistem destekleri sunar. 7/24 Acil Çağrı Hattı: 0533 529 36 74.',
  canonical: '/iletisim',
  h1: '7/24 Kesintisiz İletişim & Acil Şantiye Servis Hattı',
  intro: `İster şantiyenize acil mobil servis çağırın, ister atölye revizyonu için teknik teklif alın. Merkez Atölye Adresimiz: ${SITE_CONFIG.headquarters.street}, ${SITE_CONFIG.headquarters.postalCode} ${SITE_CONFIG.headquarters.district} / ${SITE_CONFIG.headquarters.city}.`,
  highlights: [
    `7/24 Acil Servis Telefonu: ${SITE_CONFIG.phone}`,
    `WhatsApp Saha & Konum Hattı: ${SITE_CONFIG.whatsapp}`,
    `Kurumsal E-Posta: ${SITE_CONFIG.email}`,
    'Adana Merkez Atölye, Mersin Liman, İskenderun OSB ve Osmaniye OOSB Hızlı Sevk Noktaları'
  ],
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/iletisim`,
    'İletişim ve Şantiye Servis Talebi | MESA İş Makinaları',
    'MESA İş Makinaları Adana merkezli operasyonu ile Türkiye genelinde mobil servis, saha tamiri ve hidrolik sistem destekleri sunar. 7/24 Acil Çağrı Hattı: 0533 529 36 74.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'İletişim', url: '/iletisim' }
    ]
  )
});

createPrerenderedPage('/rehberler', {
  title: 'Teknik Rehberler ve Bilgi Bankası | MESA İş Makinaları',
  description: 'Ağır iş makinaları için hidrolik sistem bakımı, ISO 4406 yağ analizi, DPF rejenerasyonu, periyodik bakım çizelgeleri ve ekspertiz kılavuzları.',
  canonical: '/rehberler',
  h1: 'İş Makinaları Teknik Rehberleri & Bilgi Bankası',
  intro: 'Şantiyelerinizde arıza duruş sürelerini minimize etmek, parça ömrünü uzatmak ve doğru koruyucu bakım stratejilerini uygulamak için mühendislerimiz tarafından hazırlanan kapsamlı kılavuzlar.',
  highlights: guidesData.map(g => `${g.title} (${g.category} • ${g.readTime})`),
  extraSectionsHtml: `
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">Yayınlanan Teknik Makaleler</h2>
          <ul style="line-height:1.8;color:#334155;">
            ${guidesData.map(g => `<li><a href="/rehberler/${g.slug}"><strong>${escapeHtml(g.title)}</strong></a> — ${escapeHtml(g.shortDesc)}</li>`).join('\n            ')}
          </ul>`,
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/rehberler`,
    'Teknik Rehberler ve Bilgi Bankası | MESA İş Makinaları',
    'Ağır iş makinaları için hidrolik sistem bakımı, ISO 4406 yağ analizi, DPF rejenerasyonu, periyodik bakım çizelgeleri ve ekspertiz kılavuzları.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Teknik Rehberler', url: '/rehberler' }
    ]
  )
});

guidesData.forEach(guide => {
  const sectionsHtml = (guide.content || []).map(sec => `
          <section style="margin-top:24px;">
            <h2 style="font-size:1.35rem;font-weight:800;color:#1e293b;">${escapeHtml(sec.sectionTitle)}</h2>
            ${sec.text ? `<p style="color:#475569;line-height:1.6;">${escapeHtml(sec.text)}</p>` : ''}
            ${sec.checklist ? `<ul style="line-height:1.8;color:#334155;">${sec.checklist.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
          </section>`).join('\n');

  createPrerenderedPage(`/rehberler/${guide.slug}`, {
    title: `${guide.title} | MESA İş Makinaları Teknik Rehber`,
    description: guide.shortDesc,
    canonical: `/rehberler/${guide.slug}`,
    h1: guide.title,
    intro: guide.summary || guide.shortDesc,
    highlights: guide.tags || [],
    extraSectionsHtml: `${sectionsHtml}${guide.relatedServiceSlug ? `<p style="margin-top:20px;"><strong>İlgili Teknik Servis Hizmetimiz:</strong> <a href="/${guide.relatedServiceSlug}">Detaylı Hizmet Sayfasını İnceleyin</a></p>` : ''}`,
    schema: buildBaseGraph(
      `${SITE_CONFIG.siteUrl}/rehberler/${guide.slug}`,
      `${guide.title} | MESA İş Makinaları Teknik Rehber`,
      guide.shortDesc,
      [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Teknik Rehberler', url: '/rehberler' },
        { name: guide.title, url: `/rehberler/${guide.slug}` }
      ],
      [{
        '@type': 'TechArticle',
        headline: guide.title,
        description: guide.shortDesc,
        author: { '@type': 'Organization', name: guide.author || SITE_CONFIG.siteName },
        publisher: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
        mainEntityOfPage: `${SITE_CONFIG.siteUrl}/rehberler/${guide.slug}`
      }]
    )
  });
});

createPrerenderedPage('/bakim-hesaplayici', {
  title: 'İş Makinası OEM Periyodik Bakım & Maliyet Hesaplayıcı | MESA',
  description: 'CAT, JCB, Hidromek, Komatsu ve Volvo iş makinalarınız için 250, 500, 1000 ve 2000 saat OEM filtre, orijinal yağ ve mobil servis bakım maliyetlerini anında şeffaf hesaplayın.',
  canonical: '/bakim-hesaplayici',
  h1: 'İş Makinası OEM Periyodik Bakım Maliyeti Hesaplayıcı',
  intro: 'Makina modelinizi ve çalışma saatini seçin; gereken orijinal OEM filtre kodlarını, onaylı motor ve hidrolik yağ miktarlarını, tahmini servis süresini ve net maliyet tablosunu anında görün.',
  highlights: [
    'CAT 320D, JCB 3CX, Hidromek HMK 102B/220LC ve Komatsu PC200-8 Bakım Paketleri',
    '250, 500, 1.000 ve 2.000 Saatlik Orijinal OEM Filtre ve Yağ Spesifikasyonları',
    'Şantiyede Yerinde Mobil Servis ve 150 Nokta Diagnostik Kontrol Dahil'
  ],
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/bakim-hesaplayici`,
    'İş Makinası OEM Periyodik Bakım & Maliyet Hesaplayıcı | MESA',
    'CAT, JCB, Hidromek, Komatsu ve Volvo iş makinalarınız için 250, 500, 1000 ve 2000 saat OEM filtre, orijinal yağ ve mobil servis bakım maliyetlerini anında şeffaf hesaplayın.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'OEM Bakım Hesaplayıcı', url: '/bakim-hesaplayici' }
    ]
  )
});

createPrerenderedPage('/ariza-kodu-cozucu', {
  title: 'DTC Arıza Kodu Çözücü & AI Diagnostik Motoru | CAT, Komatsu, JCB, Hidromek',
  description: 'İş makinası arıza kodlarını (MID/CID/FMI, CA, P0087, E-041) anında çözün. Olası arıza sebepleri, saha test adımları ve 7/24 mobil servis desteği.',
  canonical: '/ariza-kodu-cozucu',
  h1: 'İş Makinası DTC Arıza Kodu Çözücü & Diagnostik Rehberi',
  intro: 'Caterpillar, Komatsu, JCB, Hidromek, Volvo ve Hitachi iş makinelerinde ekranda beliren arıza kodlarının Türkçe açıklamalarını, olası kök nedenlerini ve acil saha kontrol adımlarını sorgulayın.',
  highlights: [
    'CAT MID/CID/FMI, Komatsu CA/E, JCB, Hidromek ve Volvo Hata Kodları Veritabanı',
    'Hidrolik, Motor, Şanzıman, Elektrik ve DPF/SCR Emisyon Arıza Çözümleri',
    '7/24 Lisanslı Diagnostik Cihazla Şantiyede Yerinde Arıza Tespiti'
  ],
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/ariza-kodu-cozucu`,
    'DTC Arıza Kodu Çözücü & AI Diagnostik Motoru | MESA İş Makinaları',
    'İş makinası arıza kodlarını (MID/CID/FMI, CA, P0087, E-041) anında çözün. Olası arıza sebepleri, saha test adımları ve 7/24 mobil servis desteği.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'DTC Arıza Kodu Çözücü', url: '/ariza-kodu-cozucu' }
    ]
  )
});

createPrerenderedPage('/yedek-parca', {
  title: 'Orijinal İş Makinası Yedek Parça Satış & B2B Depo | CAT, Komatsu, JCB, Hidromek',
  description: 'Orijinal OEM filtreler, Parker 500 Bar hidrolik hortumlar, ana pompalar, Montabert kırıcı diyaframları ve Mobil hidrolik yağları. Adana merkez depodan aynı gün teslimat.',
  canonical: '/yedek-parca',
  h1: 'Orijinal İş Makinası Yedek Parça & B2B Tedarik Merkezi',
  intro: 'CAT, JCB, Komatsu, Hidromek ve Volvo makineleriniz için sertifikalı hidrolik pompalar, OEM filtre kitleri, 500 Bar hortumlar ve Türkiye geneli aynı gün sevkiyat desteği.',
  highlights: [
    'Orijinal OEM Filtre Kitleri, Parker 4SH/R15 Yüksek Basınç Hortumları',
    'Kawasaki & Rexroth Hidrolik Pompa Rotary Grupları ve Sızdırmazlık Keçeleri',
    'Adana Merkez Depodan Türkiye Geneli Şantiyelere Aynı Gün Sevkiyat'
  ],
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/yedek-parca`,
    'Orijinal İş Makinası Yedek Parça Satış & B2B Depo | MESA İş Makinaları',
    'Orijinal OEM filtreler, Parker 500 Bar hidrolik hortumlar, ana pompalar, Montabert kırıcı diyaframları ve Mobil hidrolik yağları. Adana merkez depodan aynı gün teslimat.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Orijinal Yedek Parça', url: '/yedek-parca' }
    ]
  )
});

// 5. Cities Hub Page (/sehirler)
createPrerenderedPage('/sehirler', {
  title: 'Türkiye Geneli İş Makinaları Servis Bölgeleri (81 İl) | MESA',
  description: 'MESA İş Makinaları Türkiye genelinde 81 ilde tam donanımlı mobil araçlarla 7/24 yerinde iş makinası tamiri, hidrolik pompa revizyonu ve teknik servis sunmaktadır.',
  canonical: '/sehirler',
  h1: 'Türkiye Geneli (81 İl) İş Makinaları Servis Bölgeleri',
  intro: 'MESA İş Makinaları; İstanbul, Ankara, İzmir, Bursa, Kocaeli, Konya, Adana, Mersin, Antalya, Gaziantep, Kayseri, Hatay ve Diyarbakır başta olmak üzere Türkiye\'nin 81 ilindeki tüm şantiyelere seyyar hidrolik pres, elektronik arıza teşhis cihazları ve uzman teknisyenleriyle yerinde teknik müdahale sağlar.',
  highlights: activeCitiesData.slice(0, 15).map(c => `${c.name} (${c.plate}): ${c.industryContext}`),
  extraSectionsHtml: `
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">81 İl Mobil Şantiye Servis Noktalarımız</h2>
          <ul style="line-height:1.8;color:#334155;columns:3;">
            ${activeCitiesData.map(c => `<li><a href="/sehirler/${c.slug}">${escapeHtml(c.name)} İş Makinaları Servisi (${c.plate})</a></li>`).join('\n            ')}
          </ul>`,
  schema: buildBaseGraph(
    `${SITE_CONFIG.siteUrl}/sehirler`,
    'Türkiye Geneli İş Makinaları Servis Bölgeleri (81 İl) | MESA',
    'MESA İş Makinaları Türkiye genelinde 81 ilde tam donanımlı mobil araçlarla 7/24 yerinde iş makinası tamiri, hidrolik pompa revizyonu ve teknik servis sunmaktadır.',
    [
      { name: 'Ana Sayfa', url: '/' },
      { name: '81 İl Servis Bölgeleri', url: '/sehirler' }
    ],
    [{
      '@type': 'Service',
      name: 'Türkiye Geneli İş Makinaları Servis Bölgeleri',
      provider: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
      areaServed: { '@type': 'Country', name: 'Turkey' }
    }]
  )
});

// 6. 81 City SEO Landing Pages (/sehirler/:slug) — şehir bazlı GEO koordinatları ile
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
    extraSectionsHtml: `
          <h2 style="font-size:1.3rem;font-weight:800;color:#1e293b;margin-top:24px;">${escapeHtml(city.name)} Şantiyelerinde Sunduğumuz Başlıca Hizmetler</h2>
          <ul style="line-height:1.8;color:#334155;">
            ${servicesData.slice(0, 10).map(s => `<li><a href="/${s.slug}">${escapeHtml(city.name)} ${escapeHtml(s.title)}</a></li>`).join('\n            ')}
          </ul>`,
    geo: {
      region: `TR-${city.plate}`,
      placename: `${city.name}, Turkey`,
      latitude: cityGeo.latitude,
      longitude: cityGeo.longitude
    },
    schema: buildBaseGraph(
      `${SITE_CONFIG.siteUrl}${canonical}`,
      city.seoTitle,
      city.seoDescription,
      [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmet Bölgeleri', url: '/sehirler' },
        { name: `${city.name} İş Makinaları Servisi`, url: canonical }
      ],
      [
        {
          '@type': 'Service',
          name: `${city.name} İş Makinaları Teknik Servisi`,
          serviceType: 'Ağır İş Makinaları Mobil Tamir, Bakım ve Hidrolik Revizyon',
          description: city.seoDescription,
          provider: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: `${city.name}, Turkey`,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: cityGeo.latitude,
              longitude: cityGeo.longitude
            }
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: city.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        }
      ]
    )
  });
});

// 7. Root Homepage (/) — EN SON üretilir (templateHtml'i bozmamak için)
const priorityCities = ['adana', 'istanbul', 'ankara', 'izmir', 'mersin', 'bursa', 'kocaeli', 'konya', 'gaziantep', 'hatay', 'antalya', 'kayseri', 'osmaniye', 'diyarbakir'];
const priorityCityLinks = activeCitiesData.filter(c => priorityCities.includes(c.id));

createPrerenderedPage('/', {
  title: SITE_CONFIG.defaultMeta.title,
  description: SITE_CONFIG.defaultMeta.description,
  canonical: '/',
  h1: 'Türkiye Geneli İş Makinaları Teknik Servis & Mobil Saha Operasyonu',
  intro: 'MESA İş Makinaları; Türkiye genelinde 81 ildeki inşaat, maden, baraj ve altyapı şantiyelerine 5 tam donanımlı mobil servis aracı, 2.500 m² kapalı revizyon tesisi ve 450 Bar dinamik hidrolik pompa test istasyonu ile 7/24 yerinde iş makinası tamiri, hidrolik sistem revizyonu ve elektronik arıza tespiti sunar.',
  highlights: [
    '7/24 Gezici Mobil Servis Filosu ile Şantiyede Yerinde Arıza Tespiti ve Onarım',
    '450 Bar Bilgisayarlı Dinamik Test Tezgahında Kawasaki, Rexroth, Parker Hidrolik Pompa Revizyonu',
    'CAT, JCB, Hidromek, Komatsu, Volvo, Hitachi, Manitou ve Merlo Lisanslı Diagnostik Teşhis',
    'Sahada 1/4" - 2" 4 Telli Yüksek Basınç Hidrolik Hortum Presleme ve Seyyar Borwerk',
    '12 Ay / 2.000 Çalışma Saati Resmi MESA İş Makinaları Servis Garantisi'
  ],
  extraSectionsHtml: `${allServiceLinksHtml}
          <h2 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-top:28px;">81 İlde 7/24 Mobil Şantiye Servis Ağımız</h2>
          <p style="color:#475569;line-height:1.6;margin-bottom:12px;">Adana merkez atölyemiz ve bölgesel mobil ekiplerimizle Türkiye'nin 7 coğrafi bölgesinde kesintisiz saha desteği sağlıyoruz:</p>
          <ul style="line-height:1.8;color:#334155;columns:2;margin-bottom:24px;">
            ${priorityCityLinks.map(c => `<li><a href="/sehirler/${c.slug}">${escapeHtml(c.name)} İş Makinaları Servisi</a></li>`).join('\n            ')}
            <li><a href="/sehirler"><strong>Tüm 81 İl Servis Noktalarını Gör &rarr;</strong></a></li>
          </ul>`,
  schema: buildBaseGraph(
    SITE_CONFIG.siteUrl,
    SITE_CONFIG.defaultMeta.title,
    SITE_CONFIG.defaultMeta.description,
    [{ name: 'Ana Sayfa', url: '/' }],
    [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}/#service-catalog`,
        serviceType: 'Ağır İş Makinaları Tamir, Hidrolik Revizyon ve 7/24 Mobil Servis',
        provider: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
        areaServed: { '@type': 'Country', name: 'Turkey' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'İş Makinası Teknik Servis ve Revizyon Hizmetleri',
          itemListElement: servicesData.slice(0, 12).map((s, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.shortDesc,
              url: `${SITE_CONFIG.siteUrl}/${s.slug}`
            }
          }))
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_CONFIG.siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Şantiyede arızalanan iş makinası için mobil servisiniz ne kadar sürede gelir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Adana, Mersin, Hatay, Osmaniye ve Çukurova genelindeki şantiyelere 5 tam donanımlı mobil servis aracımızla ortalama 30 ila 45 dakika içinde ulaşıyoruz. Türkiye genelindeki 81 il şantiyelerine ise bölgesel acil saha ekiplerimizle aynı gün müdahale sağlıyoruz.'
            }
          },
          {
            '@type': 'Question',
            name: 'Revize edilen hidrolik pompa ve şanzımanlara garanti veriyor musunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Merkez atölyemizde revize edilen tüm hidrolik pompalar, valfler, tork konvertörleri ve dizel motorlar 450 Bar dinamik test istasyonumuzda yük altında test edilir ve 12 Ay / 2.000 Çalışma Saati yazılı MESA servis garantisi ile teslim edilir.'
            }
          },
          {
            '@type': 'Question',
            name: 'Patlayan hidrolik hortumu şantiyede yerinde basabiliyor musunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kesinlikle. Mobil servis araçlarımızın içinde Finn-Power 500 Bar seyyar hidrolik hortum presi ve zengin rakor stoğu bulunmaktadır. 1/4 inçten 2 inçe kadar 4 telli (4SP/4SH) yüksek basınç hortumlarını şantiyenizde yerinde imal edip montajını yapıyoruz.'
            }
          },
          {
            '@type': 'Question',
            name: 'Hangi iş makinası markalarına teknik servis ve arıza tespiti sunuyorsunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Caterpillar (CAT), JCB, Hidromek, Komatsu, Volvo CE, Hitachi, Liebherr, Manitou, Merlo ve Bobcat başta olmak üzere tüm ağır iş makinası ve telehandler markalarına lisanslı OEM diagnostik cihazlarımızla hizmet veriyoruz.'
            }
          }
        ]
      }
    ]
  )
});

console.log('✓ Tüm sayfalar (Ana Sayfa, 22 Hizmet, 81 İl, Rehberler ve Kurumsal Sayfalar) için statik SSG prerender HTML dosyaları başarıyla üretildi.');

