import { load } from 'cheerio';

export const analyzeSitemap = async (
  origin: string,
  discoveredLocales: Set<string>
): Promise<{
  sitemapPresent: boolean;
  hasXDefault: boolean;
  hasAlternates: boolean;
  noLocalizedUrlsForgotten: boolean;
  localizedUrlsFound: string[];
  errors: string[];
}> => {
  const errors: string[] = [];
  let sitemapPresent = false;
  let hasXDefault = false;
  let hasAlternates = false;
  let noLocalizedUrlsForgotten = true;
  const localizedUrlsFound: string[] = [];

  try {
    const sitemapUrl = `${origin}/sitemap.xml`;
    const response = await fetch(sitemapUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)' },
    });

    if (response.ok) {
      sitemapPresent = true;
      const sitemapContent = await response.text();
      const $ = load(sitemapContent, { xmlMode: true });

      const xDefaultLinks = $(
        'link[rel="alternate"][hreflang="x-default"], xhtml\\:link[rel="alternate"][hreflang="x-default"]'
      );
      if (xDefaultLinks.length > 0) {
        hasXDefault = true;
      }

      const alternateLinks = $(
        'link[rel="alternate"][hreflang], xhtml\\:link[rel="alternate"][hreflang]'
      );
      if (alternateLinks.length > 0) {
        hasAlternates = true;
      }

      if (discoveredLocales.size > 0) {
        const urlElements = $('url');
        const urlsWithMissingLocales: Array<{
          url: string;
          missingLocales: string[];
        }> = [];
        const allFoundLocales = new Set<string>();

        urlElements.each((_, urlElement) => {
          const locElement = $(urlElement).find('loc').first();
          const url = locElement.text().trim();
          if (!url) return;

          const hreflangLinks = $(urlElement).find(
            'link[rel="alternate"][hreflang], xhtml\\:link[rel="alternate"][hreflang]'
          );
          const localesInThisUrl = new Set<string>();

          hreflangLinks.each((_, linkEl) => {
            const hreflang = $(linkEl).attr('hreflang');
            if (hreflang && hreflang !== 'x-default') {
              localesInThisUrl.add(hreflang);
              allFoundLocales.add(hreflang);
            }
          });

          try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            if (pathParts.length > 0 && discoveredLocales.has(pathParts[0])) {
              localesInThisUrl.add(pathParts[0]);
              allFoundLocales.add(pathParts[0]);
              localizedUrlsFound.push(url);
            }
          } catch {
            // Invalid URL, skip
          }

          const missingInThisUrl: string[] = [];
          for (const locale of discoveredLocales) {
            if (!localesInThisUrl.has(locale)) {
              missingInThisUrl.push(locale);
            }
          }

          if (
            missingInThisUrl.length > 0 &&
            missingInThisUrl.length < discoveredLocales.size
          ) {
            urlsWithMissingLocales.push({
              url,
              missingLocales: missingInThisUrl,
            });
          }
        });

        if (urlsWithMissingLocales.length > 0) {
          noLocalizedUrlsForgotten = false;
          for (const { url, missingLocales } of urlsWithMissingLocales) {
            errors.push(
              `URL "${url}" is missing alternate links for locales: ${missingLocales.join(', ')}`
            );
          }
        }

        const completelyMissingLocales: string[] = [];
        for (const locale of discoveredLocales) {
          if (!allFoundLocales.has(locale)) {
            completelyMissingLocales.push(locale);
          }
        }

        if (completelyMissingLocales.length > 0) {
          noLocalizedUrlsForgotten = false;
          errors.push(
            `The following locales are completely missing from the sitemap: ${completelyMissingLocales.join(', ')}`
          );
        }
      }
    } else {
      errors.push(`sitemap.xml not found (HTTP ${response.status})`);
    }
  } catch (error) {
    errors.push(
      `Failed to fetch sitemap.xml: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  return {
    sitemapPresent,
    hasXDefault,
    hasAlternates,
    noLocalizedUrlsForgotten,
    localizedUrlsFound,
    errors,
  };
};
