/** @module buildCreativeWorkJsonLd */

// ISO 8601 date formatter — Schema.org requires YYYY-MM-DD.
const formatDate = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a valid Date object');
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
            url: publisherLogoUrl,
          },
        },
      }
    : {}),
  name,
  headline: name,
  ...(ogImageUrl ? { image: ogImageUrl } : {}),
  text: content,
  description,
  url,
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
