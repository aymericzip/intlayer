import type { Locale } from '@intlayer/types/allLocales';
import type { DictionarySelector } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import React from 'react';
import { useIntlayer as useIntlayerBase } from 'react-intlayer/server';
import { getLocale } from './getLocale';

const getCachedLocale =
  typeof React.cache === 'function' ? React.cache(getLocale) : getLocale;

export const safeUseLocale = (): Locale | undefined => {
  // getLocale returns a Promise based on your TS error
  const localeData = getCachedLocale() as Promise<Locale> | Locale;

  if (localeData instanceof Promise) {
    if (typeof React.use === 'function') {
      return React.use(localeData); // Safely unwraps in React 19+
    }

    // React < 19 cannot synchronously unwrap Promises in hooks.
    // Return undefined to trigger the localeTarget fallback.
    return undefined;
  }

  return localeData;
};

/**
 * On the server side, hook that picks one dictionary by its key and returns the
 * content for the given locale or selector (`{ item }`, `{ variant }`,
 * `{ id, ...meta }`, optionally combined with `locale`).
 *
 * If the locale is not provided, it will use the locale from the server context.
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): ReturnType<typeof useIntlayerBase<T, A>> => {
  const storedLocale = safeUseLocale();

  return useIntlayerBase<T, A>(key, localeOrSelector, storedLocale);
};
