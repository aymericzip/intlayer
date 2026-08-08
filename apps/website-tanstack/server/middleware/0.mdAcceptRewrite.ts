/**
 * Nitro production middleware — serves the markdown representation of a
 * documentation page to agents that ask for it, without changing the URL.
 *
 * `GET /doc/get-started` with `Accept: text/markdown` keeps its canonical URL
 * and answers with the markdown source. This is a rewrite, not a redirect: the
 * `.md` suffix handled by `0.mdRawRewrite` stays the explicit opt-in it already
 * was.
 *
 * Runs before `0.mdRawRewrite` (which only matches `.md` URLs) and before the
 * redirect middleware, so a negotiated request never bounces through a 301.
 *
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps this
 * file runtime-agnostic and resolves without h3 in devDependencies.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

type H3EventLike = {
  readonly path: string;
  readonly node?: {
    readonly req?: { url?: string; headers?: Record<string, unknown> };
  };
  readonly headers?: { get?: (name: string) => string | null };
};

/** Media type agents send to request the markdown representation. */
const MARKDOWN_MEDIA_TYPE = 'text/markdown';

const NEGOTIABLE_SECTIONS = ['doc', 'blog', 'frequent-questions'] as const;

/**
 * Paths under a negotiable section that are interactive pages rather than
 * markdown documents, and therefore have no `/raw/` counterpart.
 */
const NON_DOCUMENT_PATHS = new Set(['doc/search', 'doc/chat']);

const NEGOTIABLE_PATH_PATTERN = new RegExp(
  String.raw`^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(${NEGOTIABLE_SECTIONS.join('|')})\/([^?]+)(\?.*)?$`
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
 * Compares quality values rather than merely looking for the substring, so a
 * browser's `text/html,...,*\/*;q=0.8` is never mistaken for a markdown
 * request.
 *
 * @param acceptHeader - Raw `Accept` request header, if any.
 * @returns `true` when the markdown representation should be served.
 */
const prefersMarkdown = (acceptHeader: string | undefined): boolean => {
  if (!acceptHeader) return false;

  let markdownQuality = 0;
  let htmlQuality = 0;

  for (const entry of acceptHeader.split(',')) {
    const trimmed = entry.trim();
    const mediaType = trimmed.split(';')[0]?.trim().toLowerCase();
    const quality = getQualityValue(trimmed);

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

/** Reads the `Accept` header from either h3 event shape. */
const readAcceptHeader = (event: H3EventLike): string | undefined => {
  const fromWebHeaders = event.headers?.get?.('accept');

  if (fromWebHeaders) return fromWebHeaders;

  const fromNodeHeaders = event.node?.req?.headers?.accept;

  return typeof fromNodeHeaders === 'string' ? fromNodeHeaders : undefined;
};

export default (event: H3EventLike): void => {
  if (!prefersMarkdown(readAcceptHeader(event))) return;

  const match = event.path.match(NEGOTIABLE_PATH_PATTERN);

  if (!match) return;

  const locale = match[1] ?? '';
  const section = match[2];
  const slug = match[3];
  const query = match[4] ?? '';

  // Already the raw representation — rewriting again would nest `/raw/raw/`.
  if (slug.startsWith('raw/')) return;

  if (NON_DOCUMENT_PATHS.has(`${section}/${slug}`)) return;

  // Rewrite in place. Mutating the underlying request URL keeps the address the
  // client sees unchanged while routing the request to the `/raw/` handler.
  const request = event.node?.req;

  if (request) {
    request.url = `${locale}/${section}/raw/${slug}${query}`;
  }
};
