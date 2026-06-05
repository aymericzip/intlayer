import { notFound } from 'next/navigation';
import createMiddleware from 'next-intl/middleware';
import { createNavigation } from 'next-intl/navigation';

// Define supported locales with type safety
export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Load messages dynamically per locale to enable code-splitting
// Promise.all loads namespaces in parallel for better performance
async function loadMessages(locale: Locale) {
  // Load only the namespaces your layout/pages need
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Future JSON files should be added here
  ]);

  return { common, home, about } as const;
}

// Helper to generate localized URLs (e.g., /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig runs on every request and provides messages to server components
// This is where next-intl hooks into Next.js's server-side rendering
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
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
  localePrefix: 'as-needed', // Change /en/... route to /...
  // Optional: localized pathnames
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // prevent "/" -> "/en" redirects from cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
