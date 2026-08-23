import type { RoutingConfig } from '@intlayer/types/config';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { checkIsURLAbsolute } from '../utils/checkIsURLAbsolute';
import { getMultilingualUrls } from './getMultilingualUrls';
import { type RoutingOptions, resolveRoutingConfig } from './getPrefix';

export type SitemapUrlEntry = {
  /** The canonical path, e.g. '/dashboard' */
  path: string;
  changefreq?: string;
  priority?: number;
  /** ISO date string, e.g. '2024-01-15' */
  lastmod?: string;
};

export type GenerateSitemapOptions = {
  /** Base site URL without trailing slash, e.g. 'https://example.com' */
  siteUrl: string;
  /**
   * Whether to include xhtml:link alternate tags for multilingual support.
   *
   * When enabled, alternate links are only generated for routing setups where
   * URLs differ per locale:
   * - 'prefix-no-default': included
   * - 'prefix-all': included
   * - 'search-params': included
   * - 'no-prefix': excluded, unless `domains` gives locales distinct hostnames
   *
   * @default true
   */
  xhtmlLinks?: boolean;
  /**
   * Whether to emit one `<url>` entry per locale instead of a single entry for
   * the default locale carrying the alternates.
   *
   * Both forms are valid for search engines, but only a URL listed as a `<loc>`
   * is reported as submitted: an alternate-only locale is discoverable, yet
   * Search Console attributes it no referring sitemap. Enabling this gives
   * every localized URL its own entry, each repeating the complete alternate
   * set, which is the form Google documents for large multilingual sites.
   *
   * Multiplies the entry count by the number of locales, so keep an eye on the
   * 50 000 URL / 50 MB per-file limits — split into a sitemap index beyond it.
   *
   * Only applies where alternates apply: locale URLs must be distinct (see
   * `xhtmlLinks`) and the path must not point at a file. Locales served from
   * their own domain are left out, as a sitemap may only submit URLs of the
   * site it is hosted on.
   *
   * @default false
   */
  entryPerLocale?: boolean;
  locales?: LocalesValues[];
  defaultLocale?: LocalesValues;
  mode?: RoutingConfig['mode'];
  rewrite?: RoutingConfig['rewrite'];
  domains?: RoutingConfig['domains'];
};

/**
 * Returns whether xhtml:link alternate tags should be generated for the given
 * routing mode and domain map.
 *
 * Alternates are meaningful only when locale URLs are distinct:
 * - 'no-prefix' produces identical URLs for all locales → no alternates, unless
 *   `routing.domains` serves some locales from their own hostname
 * - all other modes produce distinct URLs → alternates are generated
 */
const shouldIncludeAlternates = (
  mode: RoutingConfig['mode'],
  xhtmlLinks: boolean,
  domains: RoutingConfig['domains']
): boolean =>
  xhtmlLinks && (mode !== 'no-prefix' || hasConfiguredDomain(domains));

/** Whether at least one locale is mapped to a domain of its own. */
const hasConfiguredDomain = (domains: RoutingConfig['domains']): boolean =>
  Object.values(domains ?? {}).some(
    (domain) => typeof domain === 'string' && domain.length > 0
  );

/**
 * Assembles a single `<url>` block from an absolute location and its metadata.
 *
 * @param location - The absolute URL to declare as `<loc>`.
 * @param metadata - The optional `lastmod` / `changefreq` / `priority` values.
 * @param alternateLines - Pre-rendered `<xhtml:link>` lines, empty when none.
 * @returns A `<url>` XML string.
 */
const buildUrlEntry = (
  location: string,
  metadata: Omit<SitemapUrlEntry, 'path'>,
  alternateLines: string[]
): string => {
  const { lastmod, changefreq, priority } = metadata;

  return [
    '  <url>',
    `    <loc>${location}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority !== undefined ? `    <priority>${priority}</priority>` : null,
    ...alternateLines,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
};

/**
 * Generates the `<url>` sitemap entries for the given path.
 *
 * Emits a single entry for the default locale, or — with `entryPerLocale` — one
 * entry per localized URL, each repeating the same alternate set.
 *
 * Example:
 *
 * ```ts
 * generateSitemapUrl('/dashboard', {
 *   siteUrl: 'https://example.com',
 *   changefreq: 'weekly',
 *   priority: 0.8,
 *   xhtmlLinks: true,
 *   locales: ['en', 'fr'],
 *   defaultLocale: 'en',
 *   mode: 'prefix-no-default',
 * });
 * // Returns:
 * //   <url>
 * //     <loc>https://example.com/dashboard</loc>
 * //     <changefreq>weekly</changefreq>
 * //     <priority>0.8</priority>
 * //     <xhtml:link rel="alternate" hreflang="en" href="https://example.com/dashboard"/>
 * //     <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/dashboard"/>
 * //     <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/dashboard"/>
 * //   </url>
 * ```
 *
 * @param path - The canonical path to generate the entries for.
 * @param options - Configuration options.
 * @returns One or more `<url>` XML strings, joined by a newline.
 */
export const generateSitemapUrl = (
  path: string,
  options: SitemapUrlEntry & GenerateSitemapOptions
): string => {
  const {
    siteUrl,
    changefreq,
    priority,
    lastmod,
    xhtmlLinks = true,
    entryPerLocale = false,
    ...routingOptions
  } = options;

  const resolved = resolveRoutingConfig(routingOptions as RoutingOptions);
  const defaultLocaleUrl = `${siteUrl}${path}`;
  const metadata = { changefreq, priority, lastmod };

  // A path pointing at a file (`/llms.txt`) has no localized counterpart.
  const hasFileExtension = /\.[a-z0-9]+$/i.test(path);
  const includeAlternates =
    shouldIncludeAlternates(resolved.mode, xhtmlLinks, resolved.domains) &&
    !hasFileExtension;

  if (!includeAlternates) return buildUrlEntry(defaultLocaleUrl, metadata, []);

  const alternates = getMultilingualUrls(
    path,
    routingOptions as RoutingOptions
  );

  /**
   * A locale served from its own domain already yields an absolute URL —
   * prefixing it with `siteUrl` again would corrupt it.
   */
  const toAbsoluteUrl = (localeUrl: string): string =>
    checkIsURLAbsolute(localeUrl) ? localeUrl : `${siteUrl}${localeUrl}`;

  const alternateLines = [
    ...Object.entries(alternates).map(
      ([locale, localeUrl]) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${toAbsoluteUrl(localeUrl)}"/>`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLocaleUrl}"/>`,
  ];

  if (!entryPerLocale)
    return buildUrlEntry(defaultLocaleUrl, metadata, alternateLines);

  const localeUrls = Object.values(alternates)
    .map(toAbsoluteUrl)
    // A sitemap may only submit URLs of the site serving it, so locales living
    // on their own domain stay alternates and belong to their own sitemap.
    .filter((localeUrl) => localeUrl.startsWith(siteUrl))
    .filter((localeUrl, index, urls) => urls.indexOf(localeUrl) === index);

  return localeUrls
    .map((localeUrl) => buildUrlEntry(localeUrl, metadata, alternateLines))
    .join('\n');
};

/**
 * Generates a full XML sitemap string from an array of URL entries.
 *
 * Automatically adds `xmlns:xhtml` to the `<urlset>` declaration when
 * xhtml:link alternate tags are included.
 *
 * Example:
 *
 * ```ts
 * generateSitemap(
 *   [
 *     { path: '/', changefreq: 'daily', priority: 1.0 },
 *     { path: '/about', changefreq: 'monthly', priority: 0.5 },
 *   ],
 *   {
 *     siteUrl: 'https://example.com',
 *     xhtmlLinks: true,
 *     locales: ['en', 'fr'],
 *     defaultLocale: 'en',
 *     mode: 'prefix-no-default',
 *   }
 * );
 * ```
 *
 * @param entries - Array of URL entries to include in the sitemap.
 * @param options - Sitemap generation options.
 * @returns A full XML sitemap string.
 */
export const generateSitemap = (
  entries: SitemapUrlEntry[],
  options: GenerateSitemapOptions
): string => {
  const {
    siteUrl,
    xhtmlLinks = true,
    entryPerLocale = false,
    ...routingOptions
  } = options;

  const resolved = resolveRoutingConfig(routingOptions as RoutingOptions);
  const includeAlternates = shouldIncludeAlternates(
    resolved.mode,
    xhtmlLinks,
    resolved.domains
  );

  const xmlEntries = entries.map((entry) =>
    generateSitemapUrl(entry.path, {
      ...entry,
      siteUrl,
      xhtmlLinks,
      entryPerLocale,
      ...routingOptions,
    })
  );

  const xmlns = includeAlternates
    ? '\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${xmlns}
>
${xmlEntries.join('\n')}
</urlset>`;
};
