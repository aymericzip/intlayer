import { type Locales, getConfiguration } from '@intlayer/config/client';
import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback } from 'react';
import { useLocaleCookie, useLocaleBase } from 'react-intlayer';

export const useLocale = () => {
  const {
    /**
     * Prefix default prefix the default locale to the path as other locales.
     *
     * Example with prefixDefault = true and defaultLocale = 'en':
     * path = /en/dashboard or /fr/dashboard
     *
     * Example with prefixDefault = false and defaultLocale = 'en':
     * path = /dashboard or /fr/dashboard
     *
     */
    prefixDefault,
  } = getConfiguration().middleware;
  const { setLocaleCookie } = useLocaleCookie();
  const reactLocaleHook = useLocaleBase();
  const { push, refresh } = useRouter();
  const pathname = usePathname();

  const {
    defaultLocale,
    availableLocales,
    locale: currentLocale,
    setLocale: setLocaleState,
  } = reactLocaleHook;

  const getPathWithoutLocale = () => {
    if (
      // If the locale is the default one and the prefixDefault is false, we don't need to add the locale to the path
      !prefixDefault &&
      currentLocale.toString() === defaultLocale.toString()
    ) {
      return pathname;
    }

    const slicedPath = pathname.slice(`/${currentLocale}`.length);

    // If the path without locale is not empty, we return it
    if (slicedPath) {
      return slicedPath;
    }

    // If the path without locale is empty, we return the root path
    return '/';
  };

  const pathWithoutLocale = getPathWithoutLocale();

  const setLocale = useCallback(
    (locale: Locales) => {
      if (!availableLocales.includes(locale)) {
        console.error(`Locale ${locale} is not available`);
        return;
      }

      setLocaleCookie(locale);
      setLocaleState(locale);

      if (!prefixDefault && locale.toString() === defaultLocale.toString()) {
        push(pathWithoutLocale);
      } else {
        push(`/${locale}${pathWithoutLocale}`);
      }

      return refresh();
    },
    [
      currentLocale,
      availableLocales,
      setLocaleCookie,
      setLocaleState,
      prefixDefault,
      defaultLocale,
      pathWithoutLocale,
    ]
  );

  return {
    ...reactLocaleHook,
    setLocale,
    pathWithoutLocale,
  };
};
