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

const BASE_URL = SITE_CONFIG.siteUrl;
const TODAY = new Date().toISOString().split('T')[0];

function generateUrlBlock(loc, priority = '0.8', changefreq = 'weekly') {
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// 1. Pages Sitemap
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/turkiye-is-makinalari-servisi', priority: '0.98', changefreq: 'daily' },
  { path: '/hizmet-bolgeleri', priority: '0.92', changefreq: 'weekly' },
  { path: '/hizmetler', priority: '0.90', changefreq: 'weekly' },
  { path: '/bakim-hesaplayici', priority: '0.90', changefreq: 'weekly' },
  { path: '/ariza-kodu-cozucu', priority: '0.88', changefreq: 'weekly' },
  { path: '/yedek-parca', priority: '0.88', changefreq: 'weekly' },
  { path: '/markalar', priority: '0.85', changefreq: 'monthly' },
  { path: '/filo', priority: '0.85', changefreq: 'monthly' },
  { path: '/hakkimizda', priority: '0.80', changefreq: 'monthly' },
  { path: '/iletisim', priority: '0.85', changefreq: 'monthly' },
  { path: '/ariza-bildir', priority: '0.90', changefreq: 'daily' },
  { path: '/servis-takip', priority: '0.85', changefreq: 'daily' },
  { path: '/rehberler', priority: '0.85', changefreq: 'weekly' }
];

const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => generateUrlBlock(p.path, p.priority, p.changefreq)).join('\n')}
</urlset>`;

// 2. Services Sitemap (both direct root and /hizmetler/:slug)
const serviceUrls = [];
servicesData.forEach(s => {
  serviceUrls.push({ path: `/${s.slug}`, priority: '0.95', changefreq: 'weekly' });
  serviceUrls.push({ path: `/hizmetler/${s.slug}`, priority: '0.90', changefreq: 'weekly' });
});

const servicesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${serviceUrls.map(s => generateUrlBlock(s.path, s.priority, s.changefreq)).join('\n')}
</urlset>`;

// 3. Regions Sitemap
const regionUrls = [
  { path: '/hizmet-bolgeleri', priority: '0.90', changefreq: 'weekly' },
  { path: '/bolgeler', priority: '0.85', changefreq: 'weekly' }
];

const regionsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${regionUrls.map(r => generateUrlBlock(r.path, r.priority, r.changefreq)).join('\n')}
</urlset>`;

// 4. Cities Sitemap (12 Active Cities & Hub)
const cityUrls = [
  { path: '/sehirler', priority: '0.95', changefreq: 'daily' }
];

activeCitiesData.forEach(c => {
  cityUrls.push({ path: `/sehirler/${c.slug}`, priority: '0.92', changefreq: 'weekly' });
});

const citiesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cityUrls.map(c => generateUrlBlock(c.path, c.priority, c.changefreq)).join('\n')}
</urlset>`;

// 5. Guides Sitemap
const guideUrls = guidesData.map(g => ({
  path: `/rehberler/${g.slug}`,
  priority: '0.80',
  changefreq: 'monthly'
}));

const guidesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${guideUrls.map(g => generateUrlBlock(g.path, g.priority, g.changefreq)).join('\n')}
</urlset>`;

// 6. Sitemap Index
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-cities.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-regions.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-guides.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;

const publicDir = path.resolve(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), servicesXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-cities.xml'), citiesXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-regions.xml'), regionsXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-guides.xml'), guidesXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml, 'utf-8');

console.log('✓ Tüm XML sitemap dosyaları (sayfalar, hizmetler, 81 il, bölgeler, rehberler) başarıyla üretildi.');
