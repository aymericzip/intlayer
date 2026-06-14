/** @module buildAuthorJsonLd */

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
  url: profile?.url ?? fallbackUrl,
  jobTitle: profile?.title ?? profile?.jobTitle,
  image: profile?.image,
  sameAs: profile?.socialMedias?.length
    ? profile.socialMedias
    : profile?.sameAs,
  knowsAbout: profile?.knowsAbout?.length ? profile.knowsAbout : undefined,
});
