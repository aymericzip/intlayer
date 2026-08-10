/** @module buildCreativeWorkJsonLd */

import { normalizeJsonLdUrl } from './normalizeJsonLdUrl';


/**
 * Formats a date as ISO 8601 `YYYY-MM-DD`, the shape Schema.org expects.
 *
 * Dates originate from markdown frontmatter, so a typo (`2024-24-12`) yields an
 * `Invalid Date` whose `toISOString()` throws. A structured-data field is never
 * worth failing a page render — let alone a whole static export — so an
 * unusable date is simply omitted from the JSON-LD.
 *
 * @param date - Date to format, possibly invalid.
 * @returns The `YYYY-MM-DD` representation, or `undefined` when unusable.
 */
const formatDate = (date?: Date): string | undefined => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return undefined;
  }
  return date.toISOString().split('T')[0]!;
};

export type CreativeWorkType =
  | 'CreativeWork'
  | 'TechArticle'
  | 'Article'
  | 'BlogPosting'
  | 'WebPage';

/** Minimal Schema.org Person node accepted as author / creator. */
export type SchemaOrgPersonNode = {
  '@type': 'Person';
  '@id'?: string;
  name: string;
  url?: string;
  [key: string]: unknown;
};

export type BuildCreativeWorkJsonLdParams = {
  type?: CreativeWorkType;
  name: string;
  description: string;
  /** Full text / markdown body of the document. */
  content: string;
  keywords: string;
  datePublished?: Date;
  dateModified?: Date;
  url?: string;
  /** Pre-resolved Schema.org Person node (output of `buildAuthorJsonLd`). */
  author?: SchemaOrgPersonNode;
  /** Version string from the document revision history. */
  version?: string;
  /** Schema.org Audience `audienceType` value. */
  audienceType: string;
  /** Publisher organization name (defaults to "Intlayer"). */
  publisherName?: string;
  /** Absolute URL of the publisher logo. */
  publisherLogoUrl?: string;
  /** Absolute URL of the OG image. */
  ogImageUrl?: string;
};

/**
 * Builds a Schema.org CreativeWork (or subtype) JSON-LD object.
 *
 * @param params - Document / article metadata.
 * @returns A JSON-LD CreativeWork object ready for serialization.
 */
export const buildCreativeWorkJsonLd = ({
  type = 'CreativeWork',
  name,
  description,
  content,
  keywords,
  datePublished,
  dateModified,
  url,
  author,
  version,
  audienceType,
  publisherName = 'Intlayer',
  publisherLogoUrl,
  ogImageUrl,
}: BuildCreativeWorkJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': type,
  author,
  creator: author,
  ...(publisherLogoUrl
    ? {
        publisher: {
          '@type': 'Organization' as const,
          name: publisherName,
          logo: {
            '@type': 'ImageObject' as const,
            url: normalizeJsonLdUrl(publisherLogoUrl),
          },
        },
      }
    : {}),
  name,
  headline: name,
  ...(ogImageUrl ? { image: normalizeJsonLdUrl(ogImageUrl) } : {}),
  text: content,
  description,
  url: normalizeJsonLdUrl(url),
  datePublished: datePublished ? formatDate(datePublished) : undefined,
  dateModified: dateModified ? formatDate(dateModified) : undefined,
  version,
  keywords,
  license:
    'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
  audience: {
    '@type': 'Audience' as const,
    audienceType,
  },
});
