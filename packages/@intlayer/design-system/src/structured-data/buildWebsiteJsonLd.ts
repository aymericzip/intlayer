/** @module buildWebsiteJsonLd */

export type BuildWebsiteJsonLdParams = {
  /** Canonical home URL of the website (e.g. "https://intlayer.org"). */
  url: string;
  /** URL template for the site-wide SearchAction. */
  searchUrl: string;
  /** BCP 47 locale codes the site is available in. */
  locales: string[];
  /** Site-level keywords. */
  keywords: string[];
  /** URL of the RSS feed. When provided, a `subjectOf` DataFeed node is added. */
  rssUrl?: string;
};

/**
 * Builds a Schema.org WebSite JSON-LD object.
 *
 * @param params - Website metadata.
 * @returns A JSON-LD WebSite object ready for serialization.
 */
export const buildWebsiteJsonLd = ({
  url,
  searchUrl,
  locales,
  keywords,
  rssUrl,
}: BuildWebsiteJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'WebSite' as const,
  url,
  name: 'Intlayer',
  potentialAction: {
    '@type': 'SearchAction' as const,
    target: `${searchUrl}?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  inLanguage: locales,
  keywords,
  ...(rssUrl
    ? {
        subjectOf: {
          '@type': 'DataFeed' as const,
          name: 'Intlayer RSS Feed',
          url: rssUrl,
          encodingFormat: 'application/rss+xml',
        },
      }
    : {}),
});
