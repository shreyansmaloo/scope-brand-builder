import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { partners } from '../src/data/partners.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.scope-india.com';

const staticRoutes = [
  '/',
  '/about',
  '/pharma',
  '/cosmetics',
  '/food',
  '/products',
  '/principals',
  '/contact',
  '/careers',
  '/news',
  '/request-sample'
];

async function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map((route) => {
      return `<url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('\n  ')}
  ${partners
    .map((partner) => {
      return `<url>
    <loc>${BASE_URL}/principals/${partner.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n  ')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap successfully generated at public/sitemap.xml');
}

generateSitemap();
