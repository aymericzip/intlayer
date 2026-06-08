import createMiddleware from 'next-intl/middleware';
import { createNavigation } from 'next-intl/navigation';

// Define supported locales with type safety
export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    'Path=/',
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 year
    'SameSite=Lax',
  ].join('; ');
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed' as const,
} as const;

// Locale-aware navigation helpers (Link, redirect, usePathname, useRouter)
// Routing is still handled by next-intl middleware; translations come from @intlayer/next-intl.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
