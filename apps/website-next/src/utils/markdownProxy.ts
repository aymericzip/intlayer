import { type NextRequest, NextResponse } from 'next/server';
import {
  getRawMarkdownPath,
  hasLocalePrefix,
  prefersMarkdown,
} from './markdownNegotiation';

/**
 * Serves the markdown representation of a documentation page to agents that ask
 * for it, without changing the URL.
 *
 * Runs last in the proxy chain and reads the rewrite target chosen by
 * `intlayerProxy`, so it inherits the resolved locale instead of re-deriving it.
 * The response is a rewrite, never a redirect: `GET /doc/get-started` with
 * `Accept: text/markdown` keeps its canonical URL and simply answers with the
 * markdown source. The explicit `.md` suffix stays available as the opt-in
 * alternative it already was.
 *
 * @param request - Incoming request.
 * @param _event - Unused Next.js fetch event.
 * @param response - Result accumulated by the preceding proxies.
 * @returns A rewrite to the `/raw/` route, or the untouched upstream response.
 */
export const markdownProxy = (
  request: NextRequest,
  _event?: unknown,
  response?: NextResponse
): NextResponse => {
  const passThrough = response ?? NextResponse.next();

  if (!prefersMarkdown(request.headers.get('accept'))) return passThrough;

  // Prefer the locale-resolved path an earlier proxy already settled on.
  const upstreamRewrite = passThrough.headers.get('x-middleware-rewrite');
  const pathname = upstreamRewrite
    ? new URL(upstreamRewrite, request.url).pathname
    : request.nextUrl.pathname;

  const rawPath = getRawMarkdownPath(pathname);

  if (!rawPath) return passThrough;

  // The `/raw/` routes live under `[locale]`, and a rewrite target is not sent
  // back through the proxy chain, so it never picks up a locale afterwards.
  // Without one the rewrite would resolve to a 404 — serving the HTML page is
  // the better failure mode.
  if (!hasLocalePrefix(rawPath)) return passThrough;

  const target = new URL(rawPath, request.url);

  target.search = request.nextUrl.search;

  // No `format` override is added here: Next.js does not carry a rewrite's own
  // query string through to the destination. The raw route performs the same
  // `Accept` negotiation instead, and the original header does reach it.
  return NextResponse.rewrite(target);
};
