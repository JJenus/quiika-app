import fs from "fs";
import path from "path";
import { loadEnv } from "vite";
import { generateSitemap } from "../src/utils/sitemapGenerator.ts";

console.log("Generating SEO files...");

// Load environment variables using Vite's loadEnv
const mode = process.env.NODE_ENV || "production"; // Default to 'production' if NODE_ENV is not set
const env = loadEnv(mode, process.cwd(), "VITE_"); // Load variables prefixed with VITE_
console.log("Environment: ", mode);

// Load base URL from environment variable, fallback to default
const baseUrl = env.VITE_PUBLIC_URL || "https://quiika.com";

// Generate sitemap.xml
const sitemap = generateSitemap(baseUrl);
fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);
console.log("✓ Generated sitemap.xml for:", baseUrl);

// Generate robots.txt
const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`;
fs.writeFileSync(path.join(process.cwd(), "public", "robots.txt"), robots);
console.log("✓ Generated robots.txt for:", baseUrl);

console.log("SEO files generated successfully");
