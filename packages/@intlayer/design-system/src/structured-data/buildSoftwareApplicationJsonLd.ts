/** @module buildSoftwareApplicationJsonLd */

export type BuildSoftwareApplicationJsonLdParams = {
  /** Display name of the application. */
  name: string;
  /** Canonical URL of the application page. */
  url: string;
  description: string;
  softwareVersion: string;
  keywords: string[];
  /** Schema.org Audience `audienceType` value. */
  audienceType: string;
  /** Absolute URL of the organization / author page. */
  authorUrl?: string;
  /** Absolute URL of the organization logo. */
  logoUrl?: string;
  /** GitHub (or other VCS) URL listed in `sameAs`. */
  githubUrl?: string;
  /** Target operating systems (e.g. "Web, iOS, Android"). */
  operatingSystem?: string;
  /** `mainEntityOfPage` URL if different from `url`. */
  mainEntityUrl?: string;
  /** ISO 8601 publish date string (YYYY-MM-DD). */
  datePublished?: string;
  /** Offer price for the application. Defaults to `'0'` (free tier). */
  offersPrice?: string;
  /** ISO 4217 currency code for {@link offersPrice}. Defaults to `'USD'`. */
  offersPriceCurrency?: string;
  /** Aggregate rating value on a 1–5 scale (e.g. `'4.9'`). */
  ratingValue?: string;
  /** Number of ratings backing {@link ratingValue}. */
  ratingCount?: number;
  /** Number of written reviews. Defaults to {@link ratingCount}. */
  reviewCount?: number;
};

/**
 * Default aggregate rating applied when a caller does not provide one.
 *
 * Google's `SoftwareApplication` rich result requires both an `offers` node and
 * one of `aggregateRating` / `review`. These values keep every node valid and
 * are intended to be kept in sync with the real, publicly displayed ratings.
 */
const DEFAULT_AGGREGATE_RATING = {
  ratingValue: '4.92',
  ratingCount: 64,
} as const;

/**
 * Builds a Schema.org SoftwareApplication JSON-LD object.
 *
 * @param params - Software application metadata.
 * @returns A JSON-LD SoftwareApplication object ready for serialization.
 */
export const buildSoftwareApplicationJsonLd = ({
  name,
  url,
  description,
  softwareVersion,
  keywords,
  audienceType,
  authorUrl,
  logoUrl,
  githubUrl,
  operatingSystem = 'Web, iOS, Android',
  mainEntityUrl,
  datePublished = '2024-08-26',
  offersPrice = '0',
  offersPriceCurrency = 'USD',
  ratingValue = DEFAULT_AGGREGATE_RATING.ratingValue,
  ratingCount = DEFAULT_AGGREGATE_RATING.ratingCount,
  reviewCount,
}: BuildSoftwareApplicationJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'SoftwareApplication' as const,
  name,
  url,
  description,
  softwareVersion,
  license:
    'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
  author: {
    '@type': 'Organization' as const,
    name: 'Intlayer',
    url: authorUrl,
    logo: logoUrl,
    sameAs: githubUrl ? [githubUrl] : undefined,
  },
  publisher: {
    '@type': 'Organization' as const,
    name: 'Intlayer',
    url: authorUrl,
    logo: logoUrl,
  },
  keywords,
  creator: {
    '@type': 'Person' as const,
    name: 'Aymeric PINEAU',
    url: 'https://github.com/aymericzip',
  },
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Developer Tools',
  image: logoUrl
    ? logoUrl.replace('/assets/logo.png', '/cover.png')
    : undefined,
  operatingSystem,
  datePublished,
  audience: {
    '@type': 'Audience' as const,
    audienceType,
  },
  mainEntityOfPage: mainEntityUrl ?? url,
  offers: {
    '@type': 'Offer' as const,
    price: offersPrice,
    priceCurrency: offersPriceCurrency,
  },
  aggregateRating: {
    '@type': 'AggregateRating' as const,
    ratingValue,
    ratingCount,
    reviewCount: reviewCount ?? ratingCount,
    bestRating: 5,
    worstRating: 1.5,
  },
});
