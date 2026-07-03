'use client';

import { navigatePath } from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useMemo } from 'react';
import { useDictionary as useDictionaryBase, useLocale } from 'react-intlayer';
import { createIntlObject } from './createIntlObject';
import type { DictionaryIntlShape } from './dictionaryIntlShape';

/**
 * Builds the id lookup of a dictionary-bound intl object.
 *
 * react-intl ids encode the dictionary key as their first dot-segment
 * (`'home.title'` → dictionary `home`, field `title`). When the content is
 * supplied directly, the leading `<dictionaryKey>.` is stripped so both the
 * absolute (`'home.title'`) and relative (`'title'`) forms resolve.
 */
export const createDictionaryLookup =
  (dictionaryKey: string, content: unknown) =>
  (id: string): unknown => {
    const relativePath = id.startsWith(`${dictionaryKey}.`)
      ? id.slice(dictionaryKey.length + 1)
      : id === dictionaryKey
        ? ''
        : id;
    return navigatePath(content, relativePath);
  };

/**
 * Dictionary-accepting variant of `useIntl`.
 *
 * Returns an `IntlShape` whose `formatMessage` resolves ids inside the
 * supplied dictionary instead of the runtime registry, enabling tree-shaking
 * of unused locale content. All `Intl`-backed formatters (`formatNumber`,
 * `formatDate`, …) behave exactly like `useIntl()`.
 *
 * @example
 * import _abc from '.intlayer/dictionaries/home.json' with { type: 'json' };
 * const intl = useDictionary(_abc);
 * intl.formatMessage({ id: 'home.title' }); // or { id: 'title' } — both typed
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T
): DictionaryIntlShape<T['key'] & DictionaryKeys> => {
  const content = useDictionaryBase(dictionary);
  const { locale } = useLocale();

  return useMemo(
    () =>
      createIntlObject(
        locale as LocalesValues,
        createDictionaryLookup(dictionary.key, content)
      ) as DictionaryIntlShape<T['key'] & DictionaryKeys>,
    [locale, dictionary.key, content]
  );
};
