/** @module buildSoftwareFeaturePageJsonLd */

import { getSoftwareApplicationId } from './buildSoftwareApplicationJsonLd';
import { normalizeJsonLdUrl } from './normalizeJsonLdUrl';

export type BuildSoftwareFeaturePageJsonLdParams = {
  /** Display name of the feature or tool (e.g. "Intlayer Markdown"). */
  name: string;
  /** Canonical URL of the feature page. */
  url: string;
  description: string;
  keywords: string[];
  /** Schema.org Audience `audienceType` value. */
  audienceType: string;
  /**
   * Canonical URL of the parent `SoftwareApplication` (the `url` passed to
   * `buildSoftwareApplicationJsonLd`), referenced through its `@id`.
   */
  applicationUrl: string;
};

/**
 * Builds a Schema.org WebPage JSON-LD object for a page presenting one feature
 * or tool of a software application.
 *
 * The application is referenced by `@id` instead of being redeclared: a
 * `SoftwareApplication` node without a rating of its own is an invalid Google
 * Software App item, and the parent's rating must not be borrowed.
 *
 * @param params - Feature page metadata.
 * @returns A JSON-LD WebPage object ready for serialization.
 */
export const buildSoftwareFeaturePageJsonLd = ({
  name,
  url,
  description,
  keywords,
  audienceType,
  applicationUrl,
}: BuildSoftwareFeaturePageJsonLdParams) => {
  const normalizedUrl = normalizeJsonLdUrl(url);

  return {
    '@context': 'https://schema.org' as const,
    '@type': 'WebPage' as const,
    '@id': normalizedUrl,
    url: normalizedUrl,
    name,
    description,
    keywords,
    audience: {
      '@type': 'Audience' as const,
      audienceType,
    },
    about: { '@id': getSoftwareApplicationId(applicationUrl) },
    publisher: {
      '@type': 'Organization' as const,
      name: 'Intlayer',
    },
  };
};
