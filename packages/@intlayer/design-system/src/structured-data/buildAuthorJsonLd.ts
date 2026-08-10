/** @module buildAuthorJsonLd */

import { normalizeJsonLdUrl, normalizeJsonLdUrls } from './normalizeJsonLdUrl';

export type SchemaOrgPersonNode = {
  '@type': 'Person';
  '@id'?: string;
  name: string;
  url?: string;
  jobTitle?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
};

export const buildAuthorJsonLd = (
  profile?: any,
  fallbackName = 'Aymeric Pineau',
  fallbackUrl?: string
) => ({
  '@type': 'Person' as const,
  '@id': profile?.id,
  name: profile?.name ?? fallbackName,
  url: normalizeJsonLdUrl(profile?.url ?? fallbackUrl),
  jobTitle: profile?.title ?? profile?.jobTitle,
  image: normalizeJsonLdUrl(profile?.image),
  sameAs: normalizeJsonLdUrls(
    profile?.socialMedias?.length ? profile.socialMedias : profile?.sameAs
  ),
  knowsAbout: profile?.knowsAbout?.length ? profile.knowsAbout : undefined,
});
