// utils/sitemapGenerator.ts
export const generateSitemap = (
	baseUrl: string = "https://quiika.com"
): string => {
	const pages = [
		{ url: "/", priority: 1.0, changefreq: "daily" },
		{ url: "/claim", priority: 0.9, changefreq: "weekly" },
		{ url: "/create", priority: 0.9, changefreq: "weekly" },
		{ url: "/withdraw", priority: 0.8, changefreq: "weekly" },
		{ url: "/rules", priority: 0.7, changefreq: "monthly" },
		{ url: "/transactions", priority: 0.7, changefreq: "monthly" },
		{ url: "/privacy", priority: 0.3, changefreq: "yearly" },
		{ url: "/terms", priority: 0.3, changefreq: "yearly" },
		{ url: "/cookies", priority: 0.3, changefreq: "yearly" },
		{ url: "/help", priority: 0.5, changefreq: "monthly" },
	];

	const urls = pages
		.map(
			(page) => `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `
		)
		.join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;
};
