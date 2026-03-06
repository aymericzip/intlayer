import type { DeclaredLocales, DictionaryKeys } from '@intlayer/types';
// import React from 'react';
import { useIntlayer as useIntlayerBase } from 'react-intlayer/server';
// import { getLocale } from './getLocale';

// const getCachedLocale =
//   typeof React.cache === 'function' ? React.cache(getLocale) : getLocale;

// export const safeUseLocale = (): Locale | undefined => {
//   // getLocale returns a Promise based on your TS error
//   const localeData = getCachedLocale() as Promise<Locale> | Locale;

//   if (localeData instanceof Promise) {
//     if (typeof React.use === 'function') {
//       return React.use(localeData); // Safely unwraps in React 19+
//     }

//     // React < 19 cannot synchronously unwrap Promises in hooks.
//     // Return undefined to trigger the localeTarget fallback.
//     return undefined;
//   }

//   return localeData;
// };

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends DeclaredLocales = DeclaredLocales,
>(
  key: T,
  locale?: L
): ReturnType<typeof useIntlayerBase<T, L>> => {
  // const storedLocale = safeUseLocale();

  return useIntlayerBase<T, L>(
    key,
    locale
    // storedLocale
  );
};
