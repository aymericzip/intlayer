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
  /** When provided, a free-tier Offer node is added. */
  offersPrice?: string;
};

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
  offersPrice,
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
  ...(offersPrice !== undefined
    ? {
        offers: {
          '@type': 'Offer' as const,
          price: offersPrice,
          priceCurrency: 'USD',
        },
      }
    : {}),
});
