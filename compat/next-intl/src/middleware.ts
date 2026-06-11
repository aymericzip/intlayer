import type { NextFetchEvent, NextRequest } from 'next/server';
import type _createMiddleware from 'next-intl/middleware';
import { intlayerMiddleware } from 'next-intlayer/middleware';

/**
 * Drop-in replacement for next-intl's `createMiddleware`.
 *
 * Returns Intlayer's proxy/middleware, which handles locale detection and
 * routing from the Intlayer configuration. The `routing` argument is accepted
 * for API compatibility but ignored — locales come from `intlayer.config`.
 *
 * @example
 * ```ts
 * // proxy.ts (or middleware.ts on Next <= 15)
 * import createMiddleware from 'next-intl/middleware';
 * export default createMiddleware(routing);
 * export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
 * ```
 */
export const createMiddleware: typeof _createMiddleware =
  (_routing?: unknown) => (request: NextRequest, event?: NextFetchEvent) => {
    const response = intlayerMiddleware(request, event);

    if (response) {
      // Intlayer middleware writes the resolved locale to the x-intlayer-locale header
      // We read it and explicitly set the NEXT_LOCALE cookie to maintain compatibility with next-intl
      const resolvedLocale = response.headers.get('x-intlayer-locale');
      if (resolvedLocale) {
        response.cookies.set('NEXT_LOCALE', resolvedLocale, {
          path: '/',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365,
        });
      }
    }

    return response;
  };

export default createMiddleware;
