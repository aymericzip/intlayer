import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';

/**
 * Utility to combine multiple Next.js proxies into one.
 *
 * It executes proxies in order, merges headers, and correctly handles
 * redirects and rewrites.
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
    // Array to store proxy headers
    const proxyHeader: Headers[] = [];
    let finalStatus = 200;
    let redirectLocation: string | null = null;

    for (const proxy of proxies) {
      const result = await proxy(req, event, response);

      // Only bail early on actual server errors (500+).
      // Do not bail on !result.ok because 30x redirects have ok=false.
      if (result.status >= 500) {
        return result;
      }

      // Capture redirect status and location to preserve them across the chain
      if (result.status >= 300 && result.status < 400) {
        finalStatus = result.status;
        const location = result.headers.get('location');

        if (location) redirectLocation = location;
      }

      proxyHeader.push(result.headers);
    }

    // Merge all the headers to check if there is a redirection or rewrite
    const mergedHeaders = new Headers();

    // Merge all the custom headers added by the proxies
    const transmittedHeaders = new Headers(req.headers);

    // Merge headers
    proxyHeader.forEach((header) => {
      for (const [key, value] of header.entries()) {
        // Prevent routing headers from concatenating and forming invalid URLs
        if (
          key === 'x-middleware-rewrite' ||
          key === 'x-middleware-request-redirect'
        ) {
          mergedHeaders.set(key, value);
        } else {
          mergedHeaders.append(key, value);
        }

        // check if it's a custom header added by one of the proxies
        if (key.startsWith('x-middleware-request-')) {
          // remove the prefix to get the original key
          const fixedKey = key.replace('x-middleware-request-', '');

          // add the original key to the transmitted headers using set() to prevent duplication
          transmittedHeaders.set(fixedKey, value);
        }
      }
    });

    let finalResponse: NextResponse;

    const redirectHeader = mergedHeaders.get('x-middleware-request-redirect');
    const rewriteHeader = mergedHeaders.get('x-middleware-rewrite');

    // Construct the base response type preserving redirects/rewrites
    if (redirectHeader || redirectLocation) {
      finalResponse = NextResponse.redirect(
        new URL((redirectHeader || redirectLocation) as string, req.url),
        { status: finalStatus >= 300 ? finalStatus : 307 }
      );
    } else if (rewriteHeader) {
      finalResponse = NextResponse.rewrite(new URL(rewriteHeader, req.url), {
        request: { headers: transmittedHeaders },
      });
    } else {
      finalResponse = NextResponse.next({
        request: { headers: transmittedHeaders },
      });
    }

    // Attach accumulated response headers to the final output
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
