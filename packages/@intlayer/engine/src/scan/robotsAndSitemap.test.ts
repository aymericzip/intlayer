import { describe, expect, it } from 'vitest';
import { isPathAllowedByRobots, parseRobots } from './robots';
import { parseSitemap } from './sitemap';

describe('parseRobots', () => {
  const robotsContent = `
User-agent: *
Disallow: /admin
Disallow: /*?lang=
Allow: /admin/public

User-agent: Bingbot
Disallow: /

Sitemap: https://example.com/sitemap-index.xml
`;

  it('keeps the `*` group rules and the sitemap directives', () => {
    const robots = parseRobots(robotsContent);
    expect(robots.disallowedPaths).toEqual(['/admin', '/*?lang=']);
    expect(robots.allowedPaths).toEqual(['/admin/public']);
    expect(robots.sitemapUrls).toEqual([
      'https://example.com/sitemap-index.xml',
    ]);
  });

  it('prefers the googlebot group over `*`', () => {
    const robots = parseRobots(
      'User-agent: *\nDisallow: /\n\nUser-agent: Googlebot\nDisallow: /private'
    );
    expect(robots.disallowedPaths).toEqual(['/private']);
  });

  it('applies wildcards and the longest-match precedence', () => {
    const robots = parseRobots(robotsContent);
    expect(isPathAllowedByRobots('/fr/about', robots)).toBe(true);
    expect(isPathAllowedByRobots('/page?lang=fr', robots)).toBe(false);
    expect(isPathAllowedByRobots('/admin/users', robots)).toBe(false);
    expect(isPathAllowedByRobots('/admin/public/x', robots)).toBe(true);
  });
});

describe('parseSitemap', () => {
  it('parses url entries with xhtml alternates in both quote styles', () => {
    const { entries, childSitemapUrls } = parseSitemap(`
<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/about?a=1&amp;b=2</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel='alternate' hreflang='x-default' href='https://example.com/about'/>
  </url>
  <url><loc>https://example.com/fr/contact</loc></url>
</urlset>`);

    expect(childSitemapUrls).toEqual([]);
    expect(entries).toEqual([
      {
        loc: 'https://example.com/about?a=1&b=2',
        alternates: [
          { hreflang: 'fr', href: 'https://example.com/fr/about' },
          { hreflang: 'x-default', href: 'https://example.com/about' },
        ],
      },
      { loc: 'https://example.com/fr/contact', alternates: [] },
    ]);
  });

  it('lists the children of a sitemap index', () => {
    const { entries, childSitemapUrls } = parseSitemap(
      '<sitemapindex><sitemap><loc>https://example.com/s1.xml</loc></sitemap></sitemapindex>'
    );
    expect(entries).toEqual([]);
    expect(childSitemapUrls).toEqual(['https://example.com/s1.xml']);
  });
});
