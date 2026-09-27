/** @module buildSoftwareApplicationJsonLd */

import { normalizeJsonLdUrl } from './normalizeJsonLdUrl';

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
  /**
   * Aggregate rating value on a 1–5 scale (e.g. `'4.9'`). The rating node is
   * only emitted when both this and {@link ratingCount} are provided.
   */
  ratingValue?: string;
  /** Number of ratings backing {@link ratingValue}. */
  ratingCount?: number;
  /** Number of written reviews. Defaults to {@link ratingCount}. */
  reviewCount?: number;
};

/**
 * Intlayer's own aggregate rating, to keep in sync with the real, publicly
 * displayed ratings.
 *
 * Google's `SoftwareApplication` rich result needs `aggregateRating` or
 * `review`, but ratings must describe the entity the page is about. Only pages
 * presenting Intlayer itself pass it; tools, docs and other apps omit it rather
 * than borrowing a rating that is not theirs.
 */
export const INTLAYER_AGGREGATE_RATING = {
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
  ratingValue,
  ratingCount,
  reviewCount,
}: BuildSoftwareApplicationJsonLdParams) => {
  const normalizedUrl = normalizeJsonLdUrl(url);
  const normalizedLogoUrl = normalizeJsonLdUrl(logoUrl);
  const normalizedAuthorUrl = normalizeJsonLdUrl(authorUrl);

  return {
    '@context': 'https://schema.org' as const,
    '@type': 'SoftwareApplication' as const,
    name,
    url: normalizedUrl,
    description,
    softwareVersion,
    license:
      'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
    author: {
      '@type': 'Organization' as const,
      name: 'Intlayer',
      url: normalizedAuthorUrl,
      logo: normalizedLogoUrl,
      sameAs: githubUrl ? [normalizeJsonLdUrl(githubUrl)] : undefined,
    },
    publisher: {
      '@type': 'Organization' as const,
      name: 'Intlayer',
      url: normalizedAuthorUrl,
      logo: normalizedLogoUrl,
    },
    keywords,
    creator: {
      '@type': 'Person' as const,
      name: 'Aymeric PINEAU',
      url: 'https://github.com/aymericzip',
    },
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'Developer Tools',
    image: normalizedLogoUrl?.replace('/assets/logo.png', '/cover.png'),
    operatingSystem,
    datePublished,
    audience: {
      '@type': 'Audience' as const,
      audienceType,
    },
    mainEntityOfPage: normalizeJsonLdUrl(mainEntityUrl) ?? normalizedUrl,
    offers: {
      '@type': 'Offer' as const,
      price: offersPrice,
      priceCurrency: offersPriceCurrency,
    },
    aggregateRating:
      ratingValue && ratingCount
        ? {
            '@type': 'AggregateRating' as const,
            ratingValue,
            ratingCount,
            reviewCount: reviewCount ?? ratingCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
  };
};
