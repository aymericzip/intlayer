/**
 * Rewrite rules shared by the two markdown-negotiation middlewares.
 *
 * Documentation pages are rendered from markdown sources and every one of them
 * has a `/raw/` counterpart able to serve the original document. Two request
 * shapes must reach that counterpart:
 *
 * - `/doc/get-started.md` — the `.md` suffix, an explicit opt-in.
 * - `/doc/get-started` sent with `Accept: text/markdown` — content negotiation.
 *
 * Both are **rewrites**, not redirects: the address the client sees never
 * changes and the response is a plain `200`. That is what the Next.js site did
 * through `rewrites()` in `next.config.ts`, and agents depend on it — a client
 * fetching with `redirect: 'error'` (as the Intlayer CLI's skill installer
 * does) fails outright on a `301`.
 *
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps these
 * files runtime-agnostic and resolves without h3 in devDependencies.
 */

/**
 * Minimal shape of the h3 v2 event these middlewares consume.
 *
 * `url` is a plain, writable property on `H3Event` (not a getter), and `path`
 * derives from it, so replacing it is what performs the rewrite: the Nitro
 * router matches the new pathname while the client keeps the original URL.
 */
export type RewritableEvent = {
  /**
   * Parsed request URL. A plain, writable field on `H3Event` (`path` derives
   * from it), read by Nitro's own routing and route rules.
   */
  url: URL;
  /**
   * Incoming request. The SSR renderer is handed `event.req` — not `event.url`
   * — so a rewrite that only replaced `url` would never reach the application
   * router. Also a plain writable field, despite being typed `readonly` in h3.
   */
  req: Request;
};

/** Media type agents send to request the markdown representation. */
export const MARKDOWN_MEDIA_TYPE = 'text/markdown';

/**
 * Sections whose pages are rendered from markdown sources and therefore have a
 * `/raw/` counterpart.
 */
const NEGOTIABLE_SECTIONS = ['doc', 'blog', 'frequent-questions'] as const;

/**
 * Paths under a negotiable section that are interactive pages rather than
 * markdown documents. They have no `/raw/` counterpart, so they must keep
 * returning HTML instead of being rewritten into a 404.
 */
const NON_DOCUMENT_PATHS = new Set(['doc/search', 'doc/chat']);

/**
 * Matches an optional locale prefix, a negotiable section and a non-empty slug.
 *
 * The locale group is optional and the alternation is anchored on the section,
 * so `/doc/get-started` and `/fr/doc/get-started` both match and expose the
 * same capture groups.
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
 * markdown request, while an agent sending `text/markdown,text/html;q=0.9` is
 * honoured.
 *
 * @param acceptHeader - Raw `Accept` request header, if any.
 * @returns `true` when the markdown representation should be served.
 */
export const prefersMarkdown = (
  acceptHeader: string | null | undefined
): boolean => {
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

/**
 * Maps a documentation pathname onto the pathname that serves its markdown
 * source.
 *
 * `/fr/doc/get-started` → `/fr/doc/raw/get-started`
 *
 * @param pathname - Request pathname, optionally locale-prefixed, without query.
 * @returns The `/raw/` pathname, or `undefined` when the URL has no markdown
 * representation and must keep returning HTML.
 */
export const getRawMarkdownPathname = (
  pathname: string
): string | undefined => {
  const match = pathname.match(NEGOTIABLE_PATH_PATTERN);

  if (!match) return undefined;

  const [, locale = '', section, slug] = match;

  // Already the raw representation — rewriting again would nest `/raw/raw/`.
  if (slug.startsWith('raw/')) return undefined;

  if (NON_DOCUMENT_PATHS.has(`${section}/${slug}`)) return undefined;

  return `${locale}/${section}/raw/${slug}`;
};

/**
 * Rebinds a request to another URL, preserving every other property.
 *
 * Mirrors h3's own `requestWithURL`, reimplemented here because Nitro bundles
 * h3 internally and the package is not a dependency of this app. `Request.url`
 * is a read-only getter, so a proxy is the only way to move a request without
 * copying — and copying would consume its body stream.
 *
 * @param request - Request to rebind.
 * @param url - Absolute URL the rebound request reports.
 * @returns A proxy of `request` answering `url`.
 */
const requestWithUrl = (request: Request, url: URL): Request => {
  const overrides: Record<string | symbol, unknown> = {
    url: url.href,
    // h3 reads `_url` first when it re-derives the event URL; leaving the
    // original behind would resurrect the pre-rewrite pathname.
    _url: url,
  };

  return new Proxy(request, {
    get: (target, property) => {
      if (property in overrides) return overrides[property];

      const value = Reflect.get(target, property);

      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
};

/**
 * Points the event at its `/raw/` counterpart, leaving the client-visible URL
 * untouched.
 *
 * @param event - The h3 event to rewrite in place.
 * @param pathname - The `/raw/` pathname to route to.
 * @param format - Optional `format` query value forced on the raw handler; it
 * is never applied over a `format` the request already carries.
 */
export const rewriteToRawMarkdown = (
  event: RewritableEvent,
  pathname: string,
  format?: string
): void => {
  const rewritten = new URL(event.url);

  rewritten.pathname = pathname;

  if (format && !rewritten.searchParams.has('format')) {
    rewritten.searchParams.set('format', format);
  }

  event.url = rewritten;
  event.req = requestWithUrl(event.req, rewritten);
};
