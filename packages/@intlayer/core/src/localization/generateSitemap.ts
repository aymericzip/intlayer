import type { RoutingConfig } from '@intlayer/types/config';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
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
   * When enabled, alternate links are only generated for modes where URLs
   * differ per locale:
   * - 'prefix-no-default': included
   * - 'prefix-all': included
   * - 'search-params': included
   * - 'no-prefix': excluded (all locales share the same URL)
   *
   * @default true
   */
  xhtmlLinks?: boolean;
  locales?: LocalesValues[];
  defaultLocale?: LocalesValues;
  mode?: RoutingConfig['mode'];
  rewrite?: RoutingConfig['rewrite'];
};

/**
 * Returns whether xhtml:link alternate tags should be generated for the given routing mode.
 *
 * Alternates are meaningful only when locale URLs are distinct:
 * - 'no-prefix' produces identical URLs for all locales → no alternates
 * - all other modes produce distinct URLs → alternates are generated
 */
const shouldIncludeAlternates = (
  mode: RoutingConfig['mode'],
  xhtmlLinks: boolean
): boolean => xhtmlLinks && mode !== 'no-prefix';

/**
 * Generates a single `<url>` sitemap entry for the given path.
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
 * //     <xhtml:link rel="alternate" hrefLang="en" href="https://example.com/dashboard"/>
 * //     <xhtml:link rel="alternate" hrefLang="fr" href="https://example.com/fr/dashboard"/>
 * //     <xhtml:link rel="alternate" hrefLang="x-default" href="https://example.com/dashboard"/>
 * //   </url>
 * ```
 *
 * @param path - The canonical path to generate the entry for.
 * @param options - Configuration options.
 * @returns A `<url>` XML string.
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
    ...routingOptions
  } = options;

  const resolved = resolveRoutingConfig(routingOptions as RoutingOptions);
  const fullUrl = `${siteUrl}${path}`;

  const lines: (string | null)[] = [
    '  <url>',
    `    <loc>${fullUrl}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority !== undefined ? `    <priority>${priority}</priority>` : null,
  ];

  if (shouldIncludeAlternates(resolved.mode, xhtmlLinks)) {
    const alternates = getMultilingualUrls(
      path,
      routingOptions as RoutingOptions
    );

    for (const [lang, localePath] of Object.entries(alternates)) {
      lines.push(
        `    <xhtml:link rel="alternate" hrefLang="${lang}" href="${siteUrl}${localePath}"/>`
      );
    }

    lines.push(
      `    <xhtml:link rel="alternate" hrefLang="x-default" href="${fullUrl}"/>`
    );
  }

  lines.push('  </url>');

  return lines.filter(Boolean).join('\n');
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
  const { siteUrl, xhtmlLinks = true, ...routingOptions } = options;

  const resolved = resolveRoutingConfig(routingOptions as RoutingOptions);
  const includeAlternates = shouldIncludeAlternates(resolved.mode, xhtmlLinks);

  const xmlEntries = entries.map((entry) =>
    generateSitemapUrl(entry.path, {
      ...entry,
      siteUrl,
      xhtmlLinks,
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
