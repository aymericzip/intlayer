import { getDictionary } from '@intlayer/core/interpreter';
import { navigatePath } from '@intlayer/core/messageFormat';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { derived, type Readable } from 'svelte/store';
import { configDefaultLocale } from './configuration';
import { createMessageFormatter } from './createMessageFormatter';
import { locale } from './locale';
import type { JSONGetter, MessageFormatter } from './types';

/** Message stores bound to one dictionary. */
export type DictionaryMessageStores = {
  _: Readable<MessageFormatter>;
  t: Readable<MessageFormatter>;
  format: Readable<MessageFormatter>;
  json: Readable<JSONGetter>;
};

/** Joins an optional key prefix and a relative id. */
export const toPrefixedId = (id: string, keyPrefix?: string): string =>
  keyPrefix ? `${keyPrefix}.${id}` : id;

/**
 * Builds the `_` / `t` / `format` / `json` stores over content resolved per
 * locale. Shared by {@link useDictionary} and `useDictionaryDynamic`.
 */
export const createDictionaryStores = (
  contentStore: Readable<{
    locale: string | null | undefined;
    readContent: (targetLocale: string) => unknown;
  }>,
  keyPrefix?: string
): DictionaryMessageStores => {
  const format: Readable<MessageFormatter> = derived(
    contentStore,
    ({ locale: activeLocale, readContent }) =>
      createMessageFormatter(activeLocale, (id, targetLocale) =>
        navigatePath(readContent(targetLocale), toPrefixedId(id, keyPrefix))
      )
  );

  const json: Readable<JSONGetter> = derived(
    contentStore,
    ({ locale: activeLocale, readContent }) =>
      <T = unknown>(id: string, targetLocale?: string): T | undefined =>
        navigatePath(
          readContent(targetLocale ?? activeLocale ?? configDefaultLocale),
          toPrefixedId(id, keyPrefix)
        ) as T | undefined
  );

  return { _: format, t: format, format, json };
};

/**
 * svelte-i18n stores bound to one imported dictionary.
 *
 * Ids are relative to the dictionary (`$t('title')`), optionally under a key
 * prefix. Unlike the global `$_`, only this dictionary reaches the bundle.
 *
 * @example
 * ```svelte
 * <script>
 *   import home from '../.intlayer/dictionary/home.json';
 *   const { t } = useDictionary(home);
 * </script>
 * <h1>{$t('title')}</h1>
 * ```
 */
export const useDictionary = <const T extends Dictionary>(
  dictionary: T,
  keyPrefix?: string
): DictionaryMessageStores =>
  createDictionaryStores(
    derived(locale, ($locale) => ({
      locale: $locale,
      readContent: (targetLocale: string) =>
        getDictionary(dictionary, targetLocale as LocalesValues),
    })),
    keyPrefix
  );
