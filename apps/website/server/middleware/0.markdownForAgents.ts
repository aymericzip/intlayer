/**
 * Nitro production middleware — Markdown for Agents on every page.
 *
 * A `GET` sent with `Accept: text/markdown` (preferred over `text/html`) gets a
 * `text/markdown` answer at the same URL:
 *
 * - doc / blog / FAQ pages were already rewritten to their markdown source by
 *   `0.mdAcceptRewrite`, so only `x-markdown-tokens` is added here;
 * - every other page is rendered as usual and its HTML converted.
 *
 * Every other request — browsers, search engines and AI crawlers, which all ask
 * for `text/html` or `*\/*` — returns before touching the response, so their
 * HTML is byte-for-byte unchanged.
 *
 * Runs first (files run in name order: `markdown` sorts before `md…`) so it
 * reads the public URL before the `/raw/` rewrites, then wraps every later
 * handler through `next()`, the prerendered-page server included.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import {
  convertHtmlToMarkdown,
  estimateMarkdownTokens,
} from '../htmlToMarkdown';
import {
  MARKDOWN_MEDIA_TYPE,
  prefersMarkdown,
  type RewritableEvent,
  rebindRequest,
} from '../markdownRewrite';

const MARKDOWN_CONTENT_TYPE = `${MARKDOWN_MEDIA_TYPE}; charset=utf-8`;

/** Downstream answers decompressed so the HTML body can be read as text. */
const withoutCompression = (request: Request): Request => {
  const headers = new Headers(request.headers);

  headers.delete('accept-encoding');

  return rebindRequest(request, { headers });
};

/** Copies headers that still describe the new body, then marks it markdown. */
const toMarkdownResponse = (
  response: Response,
  markdown: string,
  pageUrl: URL
): Response => {
  const headers = new Headers(response.headers);

  // Describe the HTML body, not the markdown one.
  headers.delete('content-length');
  headers.delete('content-encoding');
  headers.delete('etag');

  headers.set('Content-Type', MARKDOWN_CONTENT_TYPE);
  headers.set('x-markdown-tokens', String(estimateMarkdownTokens(markdown)));
  headers.append('Vary', 'Accept');
  // Search engines that fetch this variant fold it into the HTML page.
  headers.append('Link', `<${pageUrl.href}>; rel="canonical"`);

  return new Response(markdown, { status: response.status, headers });
};

/**
 * Duck-typed: srvx answers with its own `FastResponse`, which is not
 * guaranteed to pass `instanceof Response`.
 */
const isResponse = (value: unknown): value is Response =>
  typeof (value as Response | undefined)?.headers?.get === 'function' &&
  typeof (value as Response).text === 'function';

const getMediaType = (response: Response): string =>
  response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() ??
  '';

export default async (
  event: RewritableEvent,
  next: () => unknown
): Promise<unknown> => {
  if (event.req.method !== 'GET') return;
  if (!prefersMarkdown(event.req.headers.get('accept'))) return;

  // Captured before later middlewares rewrite it (`/raw/`, locale-internal).
  const pageUrl = new URL(event.url);
  pageUrl.search = '';

  event.req = withoutCompression(event.req);

  const response = await next();

  if (!isResponse(response) || response.status !== 200 || response.bodyUsed) {
    return response;
  }

  const mediaType = getMediaType(response);

  if (mediaType === MARKDOWN_MEDIA_TYPE) {
    if (response.headers.has('x-markdown-tokens')) return response;

    return toMarkdownResponse(response, await response.text(), pageUrl);
  }

  if (mediaType !== 'text/html') return response;

  const markdown = convertHtmlToMarkdown(await response.text(), pageUrl.href);

  return toMarkdownResponse(response, markdown, pageUrl);
};
