/** @module buildOrganizationJsonLd */

import { normalizeJsonLdUrl, normalizeJsonLdUrls } from './normalizeJsonLdUrl';

export type BuildOrganizationJsonLdParams = {
  /** Canonical URL of the organization (e.g. "https://intlayer.org"). */
  url: string;
  /** Absolute URL of the organization logo image. */
  logoUrl: string;
  /** Short tagline / slogan. */
  slogan: string;
  /** Topics the organization is expert in. */
  knowsAbout: string[];
  /** Equivalent pages (GitHub, Twitter…). */
  sameAs: string[];
  /** BCP 47 locale codes the support team speaks. */
  availableLanguages: string[];
};

/**
 * Builds a Schema.org Organization JSON-LD object.
 *
 * @param params - Organization metadata.
 * @returns A JSON-LD Organization object ready for serialization.
 */
export const buildOrganizationJsonLd = ({
  url,
  logoUrl,
  slogan,
  knowsAbout,
  sameAs,
  availableLanguages,
}: BuildOrganizationJsonLdParams) => {
  const normalizedUrl = normalizeJsonLdUrl(url);

  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization' as const,
    name: 'Intlayer',
    url: normalizedUrl,
    logo: {
      '@type': 'ImageObject' as const,
      url: normalizeJsonLdUrl(logoUrl),
    },
    foundingDate: '2024',
    slogan,
    knowsAbout,
    sameAs: normalizeJsonLdUrls(sameAs),
    contactPoint: {
      '@type': 'ContactPoint' as const,
      email: 'contact@intlayer.org',
      contactType: 'customer support',
      url: normalizedUrl,
      availableLanguage: availableLanguages,
    },
  };
};
