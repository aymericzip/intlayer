'use client';

import { getDictionarySelectorCacheKey } from '@intlayer/core/dictionaryManipulator';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useContext, useMemo } from 'react';
import { getIntlayer } from '../getIntlayer';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Client-side hook that picks one dictionary by its key and returns its content.
 *
 * The second argument is either a locale or a selector object:
 * - `{ item: 2 }` — collection item (omit `item` to get every item as array)
 * - `{ variant: 'black-friday' }` — named variant (omit for the `default` one)
 * - `{ id: 'prod_abc', ...metaFields }` — meta record
 * - `locale` composes with any selector and overrides the context locale
 *
 * @param key - The unique key of the dictionary to retrieve.
 * @param localeOrSelector - Optional locale or selector.
 * @returns The dictionary content for the resolved entry and locale.
 *
 * @example
 * ```tsx
 * import { useIntlayer } from 'react-intlayer';
 *
 * const MyComponent = () => {
 *   const content = useIntlayer('my-dictionary-key');
 *   const faq2 = useIntlayer('faq', { item: 2 });
 *
 *   return <div>{content.myField.value}</div>;
 * };
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};

  const isSelector =
    process.env['INTLAYER_DICTIONARY_SELECTOR'] !== 'false' &&
    typeof localeOrSelector === 'object' &&
    localeOrSelector !== null;

  // Stable identity of the second argument for memoization
  const localeOrSelectorIdentity = isSelector
    ? `${localeOrSelector.locale ?? ''}|${getDictionarySelectorCacheKey(localeOrSelector)}`
    : localeOrSelector;

  return useMemo(() => {
    if (isSelector) {
      return getIntlayer(key, {
        ...localeOrSelector,
        locale: localeOrSelector.locale ?? currentLocale,
      } as A);
    }

    const localeTarget = (localeOrSelector ?? currentLocale) as A;

    return getIntlayer<T, A>(key, localeTarget);
  }, [key, currentLocale, localeOrSelectorIdentity]);
};
