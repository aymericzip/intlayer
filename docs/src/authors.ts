import { join, dirname as pathDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPackageJsonPath, getProjectRequire } from '@intlayer/config/utils';

// ─── Resolve base dir (same pattern as entry files) ──────────────────────────
const currentDir =
  typeof __dirname !== 'undefined'
    ? __dirname
    : pathDirname(fileURLToPath(import.meta.url));

let _baseDir: string | undefined;
const getBaseDir = (): string => {
  if (_baseDir) return _baseDir;
  try {
    const projectRequire = getProjectRequire(currentDir);
    const docEntryPath = projectRequire.resolve('@intlayer/docs');
    _baseDir = getPackageJsonPath(docEntryPath).baseDir;
  } catch {
    try {
      const projectRequire = getProjectRequire();
      const docEntryPath = projectRequire.resolve('@intlayer/docs');
      _baseDir = getPackageJsonPath(docEntryPath).baseDir;
    } catch {
      _baseDir = getPackageJsonPath(currentDir).baseDir;
    }
  }
  return _baseDir as string;
};

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
};

export type Authors = Record<string, AuthorProfile>;

// ─── Loader (lazy singleton) ──────────────────────────────────────────────────

let _authors: Authors | undefined;

const loadAuthors = (): Authors => {
  if (_authors) return _authors;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _authors = require(join(getBaseDir(), 'authors.json')) as Authors;
  } catch {
    _authors = {};
  }
  return _authors;
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Resolve a full author profile by GitHub handle.
 * Returns `undefined` if the handle is not found in `authors.json`.
 */
export const getAuthor = (github: string): AuthorProfile | undefined =>
  loadAuthors()[github];

/**
 * Returns the default (fallback) author when no github handle is provided or
 * when the handle cannot be resolved.
 */
export const getDefaultAuthor = (): AuthorProfile => ({
  name: 'Aymeric PINEAU',
  url: 'https://github.com/aymericzip',
  ...loadAuthors()['aymericzip'],
});

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
