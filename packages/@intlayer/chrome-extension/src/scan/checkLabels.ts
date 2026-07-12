/**
 * Human-readable labels for each audit check type streamed by the backend.
 * Check types are namespaced (`url_`, `robots_`, `sitemap_`, `domain_`) and
 * URL-scoped checks carry a `\<url>` suffix that is stripped before lookup.
 */
export const checkLabels: Record<string, string> = {
  domain_localesCount: 'locales discovered on the domain',
  robots_robotsPresent: 'robots.txt present',
  robots_noLocalizedUrlsForgotten: 'robots.txt keeps locale paths crawlable',
  sitemap_sitemapPresent: 'sitemap.xml present',
  sitemap_noLocalizedUrlsForgotten: 'sitemap lists every locale',
  sitemap_hasAlternates: 'sitemap has alternate links',
  sitemap_hasXDefault: 'sitemap has x-default',
  url_htmlLang: 'html lang attribute',
  url_htmlDir: 'html dir attribute',
  url_hasCanonical: 'canonical link',
  url_hreflang: 'hreflang tags',
  url_hasLocalizedLinks: 'localized internal links',
  url_hasXDefault: 'x-default hreflang',
  url_allAnchorsLocalized: 'all internal links localized',
  url_currentLocale: 'current locale detected',
  url_hasLangSelector: 'language selector present',
  url_hasFlagIcons: 'flag icons usage',
  url_unusedBundleContent: 'unused bundle locale content',
};

/** Group a raw check type into a section of the results list. */
export const checkSection = (
  type: string
): 'page' | 'robots' | 'sitemap' | 'domain' => {
  if (type.startsWith('robots_')) return 'robots';
  if (type.startsWith('sitemap_')) return 'sitemap';
  if (type.startsWith('domain_')) return 'domain';
  return 'page';
};

/** Strip the `\<url>` suffix of URL-scoped check types. */
export const baseCheckType = (type: string): string =>
  type.split('\\')[0] ?? type;

/** Resolve the display label of a raw (possibly URL-scoped) check type. */
export const checkLabel = (type: string): string => {
  const base = baseCheckType(type);
  return checkLabels[base] ?? base.replace(/^(url|robots|sitemap|domain)_/, '');
};
