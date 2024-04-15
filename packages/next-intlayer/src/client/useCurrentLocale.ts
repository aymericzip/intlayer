'use client';

import type { Locales } from '@intlayer/config';
import { intlayerMiddlewareConfiguration } from '@intlayer/config/client';
import { usePathname } from 'next/navigation.js';

const { basePath, cookieName, noPrefix, prefixDefault } =
  intlayerMiddlewareConfiguration;

const locales = JSON.parse(
  process.env.INTLAYER_LOCALES ?? '[]'
) as unknown as Locales[];
const defaultLocale = process.env.INTLAYER_DEFAULT_LOCALE as Locales;

const getCookie = (name: string, documentCookie: string) => {
  const cookies = documentCookie;
  const cookieArray = cookies.split('; ');

  for (const element of cookieArray) {
    const cookiePair = element.split('=');
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }
  return null;
};

export const useCurrentLocale = (
  documentCookie?: string
): string | undefined => {
  if (!documentCookie && typeof window !== 'undefined') {
    documentCookie = document.cookie;
  }

  if (documentCookie) {
    const cookieLocale = getCookie(
      cookieName ?? 'NEXT_LOCALE',
      documentCookie
    ) as Locales;

    if (cookieLocale && locales.includes(cookieLocale)) {
      return cookieLocale;
    }
  }

  if (noPrefix) {
    return defaultLocale;
  }

  const currentPathname = usePathname();

  const locale = locales.find((locale) => {
    // remove trailing slash if present
    let base = basePath.replace(/\/$/, '');
    // server does not include basePath in usePathname
    // https://github.com/vercel/next.js/issues/46562
    if (typeof window === 'undefined') {
      base = '';
    }

    return (
      currentPathname === `${base}/${locale}` ||
      currentPathname.startsWith(`${base}/${locale}/`)
    );
  });

  if (locale) {
    return locale;
  }

  if (!prefixDefault) {
    return defaultLocale;
  } else {
    return undefined;
  }
};
