/**
 * Content negotiation helpers that let a documentation URL answer with markdown
 * when an agent asks for it, while browsers keep receiving HTML from the exact
 * same URL.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

/** Media type agents send to request the markdown representation. */
export const MARKDOWN_MEDIA_TYPE = 'text/markdown';

/**
 * Sections whose pages are rendered from markdown sources and therefore have a
 * `/raw/` counterpart able to serve the original document.
 */
const NEGOTIABLE_SECTIONS = ['doc', 'blog', 'frequent-questions'] as const;

/**
 * Paths under a negotiable section that are interactive pages rather than
 * markdown documents. They have no `/raw/` counterpart, so they must keep
 * returning HTML instead of being rewritten into a 404.
 */
const NON_DOCUMENT_PATHS = ['doc/search', 'doc/chat'] as const;

/**
 * Matches an optional locale prefix, a negotiable section and a non-empty slug.
 *
 * The locale group is optional and the alternation is anchored on the section,
 * so `/doc/getting-started` (no locale) and `/fr/doc/getting-started` both
 * match and expose the same capture groups.
 */
const NEGOTIABLE_PATH_PATTERN = new RegExp(
  String.raw`^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(${NEGOTIABLE_SECTIONS.join('|')})\/(.+)$`
);

/** Extracts the quality value of a single `Accept` entry, defaulting to 1. */
const getQualityValue = (acceptEntry: string): number => {
  const quality = acceptEntry.match(/;\s*q=([0-9.]+)/)?.[1];

  if (quality === undefined) return 1;

  const parsed = Number.parseFloat(quality);

  return Number.isNaN(parsed) ? 1 : parsed;
};

/**
 * Decides whether a client prefers markdown over HTML.
 *
 * Compares quality values rather than merely looking for the substring, so the
 * common browser header `text/html,...,*\/*;q=0.8` is never mistaken for a
 * markdown request, while an agent sending
 * `text/markdown,text/html;q=0.9` is honoured.
 *
 * @param acceptHeader - Raw `Accept` request header, if any.
 * @returns `true` when the markdown representation should be served.
 */
export const prefersMarkdown = (acceptHeader: string | null): boolean => {
  if (!acceptHeader) return false;

  const entries = acceptHeader.split(',').map((entry) => entry.trim());

  let markdownQuality = 0;
  let htmlQuality = 0;

  for (const entry of entries) {
    const mediaType = entry.split(';')[0]?.trim().toLowerCase();
    const quality = getQualityValue(entry);

    if (mediaType === MARKDOWN_MEDIA_TYPE) {
      markdownQuality = Math.max(markdownQuality, quality);
    } else if (mediaType === 'text/html') {
      htmlQuality = Math.max(htmlQuality, quality);
    }
  }

  // A wildcard alone never implies markdown: HTML stays the default.
  if (markdownQuality === 0) return false;

  return markdownQuality >= htmlQuality;
};

/** Matches a leading locale segment such as `/fr` or `/en-GB`. */
const LOCALE_PREFIX_PATTERN = /^\/[a-z]{2}(?:-[A-Z]{2})?(?:\/|$)/;

/**
 * Reports whether a pathname already carries a locale segment.
 *
 * The `/raw/` routes live under `[locale]`, so a rewrite target without a
 * locale cannot match them. Every negotiable section name is longer than a
 * locale code, which is what makes this check unambiguous.
 *
 * @param pathname - Pathname to inspect.
 * @returns `true` when the first segment is a locale code.
 */
export const hasLocalePrefix = (pathname: string): boolean =>
  LOCALE_PREFIX_PATTERN.test(pathname);

/**
 * Maps a documentation URL onto the route that serves its markdown source.
 *
 * `/fr/doc/get-started` → `/fr/doc/raw/get-started`
 *
 * @param pathname - Request pathname, optionally locale-prefixed.
 * @returns The `/raw/` pathname, or `undefined` when the URL has no markdown
 * representation and must keep returning HTML.
 */
export const getRawMarkdownPath = (pathname: string): string | undefined => {
  const match = pathname.match(NEGOTIABLE_PATH_PATTERN);

  if (!match) return undefined;

  const [, locale = '', section, slug] = match;

  // Already the raw representation — rewriting again would nest `/raw/raw/`.
  if (slug.startsWith('raw/')) return undefined;

  if (
    NON_DOCUMENT_PATHS.some(
      (nonDocumentPath) => `${section}/${slug}` === nonDocumentPath
    )
  ) {
    return undefined;
  }

  return `${locale}/${section}/raw/${slug}`;
};
