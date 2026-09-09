import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from 'intlayer';
import { createContextKey, type Middleware } from 'remix/router';

/**
 * Type-safe context key to retrieve the resolved locale from Remix 3 RequestContext.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Intlayer middleware for Remix 3.
 *
 * Resolves the request locale following priority:
 * 1. URL path prefix (e.g. `/fr/...`) via `getLocaleFromPath`
 * 2. Storage & headers negotiation via Intlayer `getLocale` (cookie, custom header, Accept-Language negotiation, fallback defaultLocale)
 *
 * Attaches the resolved locale to the Remix 3 RequestContext.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // Path detection (/fr/about -> "fr", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get('cookie') ?? undefined),
    });

    // Resolve locale: path prefix takes precedence, otherwise stored locale, otherwise default locale
    const resolvedLocale = pathLocale ?? storedLocale ?? defaultLocale;

    // Attach resolved locale to Remix 3 request context
    context.set(localeKey, resolvedLocale);

    return next();
  };
};
