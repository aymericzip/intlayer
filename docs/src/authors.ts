import authorsData from '../authors.json' with { type: 'json' };

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthorProfile = {
  /** Full display name */
  name: string;
  /** Schema.org Person @id URI (optional) */
  id?: string;
  /** Professional title */
  title?: string;
  /** Canonical URL for this person */
  url?: string;
  /** Profile image URL */
  image?: string;
  /** List of equivalent profile URLs (LinkedIn, Twitter/X, GitHub…) */
  socialMedias?: string[];
  /** Areas of expertise */
  knowsAbout?: string[];
  /** GitHub username/handle */
  github?: string;
};

export type Authors = Record<string, AuthorProfile>;

// ─── Loader (lazy singleton) ──────────────────────────────────────────────────

const loadAuthors = (): Authors => authorsData as Authors;

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Resolve a full author profile by GitHub handle.
 * Returns `undefined` if the handle is not found in `authors.json`.
 */
export const getAuthor = (github: string): AuthorProfile | undefined => {
  const profile = loadAuthors()[github];
  if (!profile) return undefined;
  return {
    ...profile,
    github,
  };
};

export { loadAuthors as getAuthors };

/**
 * Build a Schema.org Person node suitable for JSON-LD.
 * Undefined fields are omitted automatically by JSON.stringify.
 */
export const buildAuthorJsonLd = (
  profile?: AuthorProfile,
  fallbackName = 'Aymeric Pineau',
  fallbackUrl?: string
) => ({
  '@type': 'Person' as const,
  '@id': profile?.id,
  name: profile?.name ?? fallbackName,
  url: profile?.url ?? fallbackUrl,
  jobTitle: profile?.title,
  image: profile?.image,
  sameAs: profile?.socialMedias?.length ? profile.socialMedias : undefined,
  knowsAbout: profile?.knowsAbout?.length ? profile.knowsAbout : undefined,
});
