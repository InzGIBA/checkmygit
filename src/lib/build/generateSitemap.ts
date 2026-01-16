/**
 * Sitemap Generator
 * 
 * Generates a sitemap.xml file for the static site with all available pages and template variants.
 */

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(entry => {
      const parts = [
        '  <url>',
        `    <loc>${escapeXml(entry.url)}</loc>`
      ];
      
      if (entry.lastmod) {
        parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      }
      
      if (entry.changefreq) {
        parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }
      
      if (entry.priority !== undefined) {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }
      
      parts.push('  </url>');
      return parts.join('\n');
    }),
    '</urlset>'
  ];
  
  return xml.join('\n');
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate sitemap entries for the site
 */
export function generateSitemapEntries(config: {
  basePath: string;
  customDomain: string;
  username: string;
}): SitemapEntry[] {
  const { basePath, customDomain, username } = config;
  
  // Determine the base URL
  let baseUrl: string;
  if (customDomain) {
    baseUrl = `https://${customDomain}`;
  } else {
    // GitHub Pages URL format: https://username.github.io/repo-name
    // If basePath is empty, it's a user/org site: https://username.github.io
    baseUrl = basePath 
      ? `https://${username}.github.io${basePath}`
      : `https://${username}.github.io`;
  }
  
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const entries: SitemapEntry[] = [
    // Main page
    {
      url: `${baseUrl}/`,
      lastmod,
      changefreq: 'daily',
      priority: 1.0
    },
    // Template variants
    {
      url: `${baseUrl}/?template=github`,
      lastmod,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/?template=bento`,
      lastmod,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/?template=minimal`,
      lastmod,
      changefreq: 'daily',
      priority: 0.8
    }
  ];
  
  return entries;
}

/**
 * Generate complete sitemap.xml content for the site
 */
export function generateSitemap(config: {
  basePath: string;
  customDomain: string;
  username: string;
}): string {
  const entries = generateSitemapEntries(config);
  return generateSitemapXML(entries);
}
