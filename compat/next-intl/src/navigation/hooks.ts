'use client';

import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from 'next/navigation';
import { useLocale } from 'next-intlayer';
import { localizeHref, type NextIntlHref } from './localizeHref';

/**
 * Options accepted by the locale-aware router methods: the standard Next.js
 * navigate options plus an optional target `locale`.
 */
type NavigateOptions = { locale?: string } & Record<string, unknown>;

/**
 * Drop-in for the `usePathname` returned by next-intl's `createNavigation`.
 * Returns the current pathname with the locale prefix stripped.
 */
export const usePathname = (): string => {
  const pathname = useNextPathname();
  const { locale } = useLocale();
  const prefix = `/${locale}`;

  if (pathname === prefix) return '/';
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
};

/**
 * Drop-in for the `useRouter` returned by next-intl's `createNavigation`.
 * Wraps the Next.js router so `push`/`replace`/`prefetch` localize their href
 * (honouring an optional `locale` option) before navigating.
 */
export const useRouter = () => {
  const router = useNextRouter();
  const { locale: currentLocale } = useLocale();

  const localize = (href: NextIntlHref, locale?: string): string =>
    localizeHref(href, locale ?? (currentLocale as string));

  return {
    ...router,
    push: (href: NextIntlHref, options?: NavigateOptions) =>
      router.push(
        localize(href, options?.locale),
        options as Parameters<typeof router.push>[1]
      ),
    replace: (href: NextIntlHref, options?: NavigateOptions) =>
      router.replace(
        localize(href, options?.locale),
        options as Parameters<typeof router.replace>[1]
      ),
    prefetch: (href: NextIntlHref, options?: NavigateOptions) =>
      router.prefetch(
        localize(href, options?.locale),
        options as Parameters<typeof router.prefetch>[1]
      ),
  };
};
