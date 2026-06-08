import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';

/**
 * Utility to combine multiple Next.js proxies into one.
 *
 * It executes proxies in order, passing each result as the `response` argument
 * to the next proxy. Routing instructions (redirects / rewrites) and custom
 * response headers are merged across the entire chain, so a later proxy that
 * returns `NextResponse.next()` does not accidentally discard a rewrite set by
 * an earlier proxy.
 *
 * @example
 * import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
 * import { NextResponse } from "next/server";
 *
 * const authMiddleware = (req: NextRequest) => {
 *   if (!req.cookies.get("token")) {
 *     return NextResponse.redirect(new URL("/login", req.url));
 *   }
 *   return NextResponse.next();
 * };
 *
 * export default multipleProxies([
 *   intlayerProxy,
 *   authMiddleware,
 * ]);
 *
 * @param proxies - An array of proxy functions to execute in order.
 * @returns A single proxy function that runs all provided proxies.
 */
export const multipleProxies =
  (
    proxies: ((
      req: NextRequest,
      event?: NextFetchEvent,
      response?: NextResponse
    ) => NextResponse | Promise<NextResponse>)[]
  ) =>
  async (req: NextRequest, event?: NextFetchEvent, response?: NextResponse) => {
    // Snapshots of each proxy's response headers, collected in order.
    const proxyHeaders: Headers[] = [];
    let finalStatus = 200;
    let redirectLocation: string | null = null;

    // Each proxy receives the previous proxy's result so it can inspect or
    // augment it. Start with the caller-supplied response (or a plain next()).
    let currentResponse: NextResponse = response ?? NextResponse.next();

    for (const proxy of proxies) {
      const result = await proxy(req, event, currentResponse);

      // Bail immediately on server errors.
      if (result.status >= 500) {
        return result;
      }

      // Track the strongest redirect in the chain.
      if (result.status >= 300 && result.status < 400) {
        finalStatus = result.status;
        const location = result.headers.get('location');
        if (location) redirectLocation = location;
      }

      // Snapshot headers *now* to avoid later mutations to the same object
      // corrupting already-recorded entries from earlier proxies.
      proxyHeaders.push(new Headers(result.headers));
      currentResponse = result;
    }

    // ── Merge all collected headers ───────────────────────────────────────────

    // mergedHeaders: response headers visible to the browser / Next.js routing.
    const mergedHeaders = new Headers();
    // transmittedHeaders: request headers forwarded to the next route handler.
    const transmittedHeaders = new Headers(req.headers);

    proxyHeaders.forEach((headers) => {
      for (const [key, value] of headers.entries()) {
        // Routing headers must not be concatenated — last writer wins.
        if (
          key === 'x-middleware-rewrite' ||
          key === 'x-middleware-request-redirect'
        ) {
          mergedHeaders.set(key, value);
        } else {
          mergedHeaders.append(key, value);
        }

        // x-middleware-request-<name> → forwarded as <name> to route handlers.
        if (key.startsWith('x-middleware-request-')) {
          const stripped = key.slice('x-middleware-request-'.length);
          transmittedHeaders.set(stripped, value);
        }
      }
    });

    // ── Construct the final response ──────────────────────────────────────────

    const redirectHeader = mergedHeaders.get('x-middleware-request-redirect');
    const rewriteHeader = mergedHeaders.get('x-middleware-rewrite');

    let finalResponse: NextResponse;

    if (redirectHeader || redirectLocation) {
      const rawRedirect = (redirectHeader ?? redirectLocation) as string;
      const target = new URL(rawRedirect, req.url);
      // Prevent open redirect: strip to same-origin path/search/hash if the
      // resolved origin differs from the request origin.
      const safeTarget =
        target.origin === req.nextUrl.origin
          ? target
          : new URL(
              `${target.pathname}${target.search}${target.hash}`,
              req.url
            );

      finalResponse = NextResponse.redirect(safeTarget, {
        status: finalStatus >= 300 ? finalStatus : 307,
      });
    } else if (rewriteHeader) {
      finalResponse = NextResponse.rewrite(new URL(rewriteHeader, req.url), {
        request: { headers: transmittedHeaders },
      });
    } else {
      finalResponse = NextResponse.next({
        request: { headers: transmittedHeaders },
      });
    }

    // Copy all accumulated custom response headers onto the final response,
    // skipping internal Next.js routing headers (already handled above).
    mergedHeaders.forEach((value, key) => {
      if (
        key !== 'x-middleware-rewrite' &&
        key !== 'x-middleware-request-redirect' &&
        !key.startsWith('x-middleware-request-') &&
        key !== 'location'
      ) {
        finalResponse.headers.set(key, value);
      }
    });

    return finalResponse;
  };
