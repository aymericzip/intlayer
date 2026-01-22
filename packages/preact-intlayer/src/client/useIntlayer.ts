'use client';

import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types';
import { useContext, useMemo } from 'preact/hooks';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Preact hook that picks one dictionary by its key and returns its content.
 *
 * If the locale is not provided, it will use the locale from the client context.
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param locale - Optional locale to override the current context locale.
 * @returns The transformed dictionary content.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'preact-intlayer';
 *
 * const MyComponent = () => {
 *   const content = useIntlayer('my-dictionary-key');
 *
 *   return <div>{content.myField.value}</div>;
 * };
 * ```
 */
export const useIntlayer = <T extends DictionaryKeys, L extends LocalesValues>(
  key: T,
  locale?: L
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);

  return useMemo(() => {
    const localeTarget = locale ?? currentLocale;

    // @ts-ignore Type instantiation is excessively deep and possibly infinite
    return getIntlayer<T, L>(key, localeTarget as L) as DeepTransformContent<
      DictionaryRegistryContent<T>
    >;
  }, [key, currentLocale, locale]);
};
