/** @module buildWebsiteJsonLd */

import { normalizeJsonLdUrl } from './normalizeJsonLdUrl';

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
  /** Display name of the RSS feed node. */
  rssName?: string;
  /**
   * Description of the RSS feed node. Google validates `DataFeed` as a
   * `Dataset` subtype, which makes `description` a required field.
   */
  rssDescription?: string;
};

/**
 * Fallback description for the RSS `DataFeed` node.
 *
 * `DataFeed` is a subtype of `Dataset`, so Search Console reports it under the
 * Dataset rich result and rejects it when `description` is missing. Google
 * expects a meaningful description of at least 50 characters.
 */
const DEFAULT_RSS_FEED_DESCRIPTION =
  'RSS feed of Intlayer publications: release notes, changelog entries, blog articles and documentation updates about internationalization (i18n) for React, Next.js, Vue, Svelte and Angular applications.';

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
  rssName = 'Intlayer RSS Feed',
  rssDescription = DEFAULT_RSS_FEED_DESCRIPTION,
}: BuildWebsiteJsonLdParams) => {
  const normalizedUrl = normalizeJsonLdUrl(url);

  return {
    '@context': 'https://schema.org' as const,
    '@type': 'WebSite' as const,
    url: normalizedUrl,
    name: 'Intlayer',
    potentialAction: {
      '@type': 'SearchAction' as const,
      target: `${normalizeJsonLdUrl(searchUrl)}?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: locales,
    keywords,
    ...(rssUrl
      ? {
          subjectOf: {
            '@type': 'DataFeed' as const,
            name: rssName,
            description: rssDescription,
            url: normalizeJsonLdUrl(rssUrl),
            encodingFormat: 'application/rss+xml',
            inLanguage: locales,
            creator: {
              '@type': 'Organization' as const,
              name: 'Intlayer',
              url: normalizedUrl,
            },
          },
        }
      : {}),
  };
};
