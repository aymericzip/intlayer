import { type NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '@/i18n.config';

// Regex to match files with extensions (e.g., .js, .css, .png)
// Used to exclude static assets from locale routing
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Extract locale from Accept-Language header
 * Handles formats like "fr-CA", "en-US", etc.
 * Falls back to default locale if browser language is not supported
 */
const pickLocale = (accept: string | null) => {
  // Get first language preference (e.g., "fr-CA" from "fr-CA,en-US;q=0.9")
  const raw = accept?.split(',')[0] ?? defaultLocale;
  // Extract base language code (e.g., "fr" from "fr-CA")
  const base = raw.toLowerCase().split('-')[0];
  // Check if we support this locale, otherwise use default
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js proxy for locale detection and routing
 * Runs on every request before the page renders
 * Automatically redirects to locale-prefixed URLs when needed
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for Next.js internals, API routes, and static files
  // These should not be locale-prefixed
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Check if URL already has a locale prefix
  // Example: "/fr/about" or "/en" would return true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If the path is prefixed by the default locale, redirect to the unprefixed URL
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const url = request.nextUrl.clone();
    // Remove only the leading default locale segment
    url.pathname =
      pathname.replace(new RegExp(`^/${defaultLocale}(?=/|$)`), '') || '/';
    const res = NextResponse.redirect(url, 308);
    res.cookies.set('NEXT_LOCALE', defaultLocale, { path: '/' });
    return res;
  }

  // If there is no locale segment, rewrite internally to the default locale
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    const res = NextResponse.rewrite(url);
    res.cookies.set('NEXT_LOCALE', defaultLocale, { path: '/' });
    return res;
  }
}

export const config = {
  matcher: [
    // Match all paths except:
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Static files (/static/*)
    // - Files with extensions (.*\\..*)
    '/((?!api|_next|static|.*\\..*).*)',
  ],
};
