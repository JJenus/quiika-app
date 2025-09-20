// scripts/generate-seo-files.js
import fs from 'fs';
import path from 'path';
import { generateSitemap } from '../src/utils/sitemapGenerator';

// Generate sitemap.xml
const sitemap = generateSitemap();
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);

// Generate robots.txt
const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://quiika.com/sitemap.xml`;
fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), robots);