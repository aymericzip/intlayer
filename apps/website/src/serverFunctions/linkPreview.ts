import { createServerFn } from '@tanstack/react-start';
import { type LinkPreview, parseLinkPreview } from '~/utils/linkPreview';
import { assertSafeRemoteMarkdownUrl } from '~/utils/remoteMarkdownUrl';

/** Upper bound on the whole fetch, so a stalled host cannot hang the card. */
const LINK_PREVIEW_TIMEOUT_MS = 5000;

/** Redirect hops followed, each one re-checked against the SSRF guard. */
const MAX_REDIRECTS = 5;

/** Bytes read at most: Open Graph tags live in `<head>`. */
const MAX_HTML_BYTES = 512 * 1024;

/** How long a resolved preview is served from memory. */
const LINK_PREVIEW_REVALIDATION_INTERVAL_MS = 24 * 60 * 60 * 1000;

/** Entries kept at most, the oldest is evicted first. */
const MAX_MEMOIZED_PREVIEWS = 500;

/**
 * Fetches `url`, following redirects by hand so that every hop goes through
 * the SSRF guard rather than only the first one.
 */
const fetchSafely = async (url: string): Promise<Response> => {
  let currentUrl = assertSafeRemoteMarkdownUrl(url);
  const signal = AbortSignal.timeout(LINK_PREVIEW_TIMEOUT_MS);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const response = await fetch(currentUrl, {
      redirect: 'manual',
      signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent':
          'Mozilla/5.0 (compatible; IntlayerLinkPreview/1.0; +https://intlayer.org)',
      },
    });

    const location = response.headers.get('location');
    if (response.status < 300 || response.status >= 400 || !location) {
      return response;
    }

    await response.body?.cancel();
    currentUrl = assertSafeRemoteMarkdownUrl(
      new URL(location, currentUrl).toString()
    );
  }

  throw new Error('Too many redirects');
};

/** Reads the body up to `</head>` or {@link MAX_HTML_BYTES}. */
const readHtmlHead = async (response: Response): Promise<string> => {
  if (!response.body) return '';

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let html = '';
  let byteCount = 0;

  while (byteCount < MAX_HTML_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;

    byteCount += value.byteLength;
    html += decoder.decode(value, { stream: true });

    if (/<\/head>/i.test(html)) break;
  }

  await reader.cancel();
  return html;
};

const fetchLinkPreview = async (url: string): Promise<LinkPreview | null> => {
  try {
    const response = await fetchSafely(url);
    const contentType = response.headers.get('content-type') ?? '';

    if (!response.ok || !contentType.includes('html')) {
      await response.body?.cancel();
      return null;
    }

    const html = await readHtmlHead(response);
    return parseLinkPreview(html, response.url || url);
  } catch {
    return null;
  }
};

type MemoizedLinkPreview = {
  readonly preview: Promise<LinkPreview | null>;
  readonly fetchedAt: number;
};

/**
 * Previews shared by every visitor, so a popular doc page calls each linked
 * site once a day rather than once per page view. Failures are not memoized,
 * the next caller retries them.
 */
const memoizedLinkPreviews = new Map<string, MemoizedLinkPreview>();

const fetchLinkPreviewCached = async (
  url: string
): Promise<LinkPreview | null> => {
  const now = Date.now();
  const cached = memoizedLinkPreviews.get(url);

  if (
    cached &&
    now - cached.fetchedAt < LINK_PREVIEW_REVALIDATION_INTERVAL_MS
  ) {
    return cached.preview;
  }

  const memoized: MemoizedLinkPreview = {
    preview: fetchLinkPreview(url),
    fetchedAt: now,
  };

  memoizedLinkPreviews.delete(url);
  memoizedLinkPreviews.set(url, memoized);

  if (memoizedLinkPreviews.size > MAX_MEMOIZED_PREVIEWS) {
    const oldestUrl = memoizedLinkPreviews.keys().next().value;
    if (oldestUrl !== undefined) memoizedLinkPreviews.delete(oldestUrl);
  }

  const preview = await memoized.preview;

  if (preview === null && memoizedLinkPreviews.get(url) === memoized) {
    memoizedLinkPreviews.delete(url);
  }

  return preview;
};

/**
 * Open Graph metadata of an external page, for the doc link preview cards.
 *
 * Request-time on purpose (no `staticFunctionMiddleware`): the cards load it
 * from the browser, and baking every linked site into the build would make
 * the prerender depend on third-party availability.
 */
export const loadLinkPreview = createServerFn({ method: 'GET' })
  .validator((data: { url: string }) => data)
  .handler(({ data: { url } }) => fetchLinkPreviewCached(url));
