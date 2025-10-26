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

    // Loop through proxy functions
    for (const proxy of proxies) {
      // Execute proxy function and await the result
      const result = await proxy(req, event, response);

      // Check if the result is not okay and return it
      if (!result.ok) {
        return result;
      }

      // Push proxy headers to the array
      proxyHeader.push(result.headers);
    }

    // Merge all the headers to check if there is a redirection or rewrite
    const mergedHeaders = new Headers();

    // Merge all the custom headers added by the proxies
    const transmittedHeaders = new Headers();

    // Merge headers
    proxyHeader.forEach((header) => {
      for (const [key, value] of header.entries()) {
        mergedHeaders.append(key, value);

        // check if it's a custom header added by one of the proxies
        if (key.startsWith('x-middleware-request-')) {
          // remove the prefix to get the original key
          const fixedKey = key.replace('x-middleware-request-', '');

          // add the original key to the transmitted headers
          transmittedHeaders.append(fixedKey, value);
        }
      }
    });

    // Look for the 'x-middleware-request-redirect' header
    const redirect = mergedHeaders.get('x-middleware-request-redirect');

    // If a redirection is required based on the proxy headers
    if (redirect) {
      // Perform the redirection
      return NextResponse.redirect(new URL(redirect, req.url), {
        status: 307, // Temporary redirect
      });
    }

    // Look for the 'x-middleware-rewrite' header
    const rewrite = mergedHeaders.get('x-middleware-rewrite');
    if (rewrite) {
      // Perform the rewrite
      return NextResponse.rewrite(new URL(rewrite, req.url), {
        request: {
          headers: transmittedHeaders,
        },
      });
    }

    // Default: continue to next proxy
    return NextResponse.next({
      request: {
        headers: transmittedHeaders,
      },
    });
  };
