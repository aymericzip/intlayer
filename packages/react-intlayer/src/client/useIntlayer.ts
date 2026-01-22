'use client';

import type {
  DeclaredLocales,
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types';
import { useContext, useMemo } from 'react';
import { getIntlayer } from '../getIntlayer';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Client-side hook that picks one dictionary by its key and returns its content.
 *
 * If the locale is not provided, it will use the locale from the client context.
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param locale - Optional locale to override the current context locale.
 * @returns The dictionary content for the specified locale.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'react-intlayer';
 *
 * const MyComponent = () => {
 *   const content = useIntlayer('my-dictionary-key');
 *
 *   return <div>{content.myField.value}</div>;
 * };
 * ```
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);

  return useMemo(() => {
    const localeTarget = locale ?? (currentLocale as L);

    return getIntlayer<T, L>(key, localeTarget);
  }, [key, currentLocale, locale]);
};
