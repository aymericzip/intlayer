import {
  createDynamicContentStore,
  type DynamicLoaderMap,
  loadingContentPlaceholder,
  type QualifiedDynamicLoaderMap,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';
import { attachOnChange, type WithOnChange } from './useDictionary';

/** Content cache shared by every dynamic read of the page. */
const dynamicContentStore = createDynamicContentStore<unknown>(
  (dictionary, argument) => getDictionary(dictionary, argument)
);

/**
 * Dynamically load and transform a dictionary (plain or qualified).
 *
 * The locale, selector, chunk selection and transform are resolved by the
 * shared dynamic content store, so only the chunk(s) the read targets are
 * loaded. The first call returns a placeholder and starts
 * a background load; the client then notifies subscribers so the render runs
 * again with real content.
 *
 * @param dictionaryLoaders - Locale-keyed loader map, or a qualified loader map.
 * @param key               - Dictionary key (used for cache namespacing).
 * @param localeOrSelector  - Optional locale or selector.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = DeclaredLocales,
>(
  dictionaryLoaders:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
): WithOnChange<DeepTransformContent<T['content']>> => {
  const client = getIntlayerClient();
  const readContent = dynamicContentStore.createReader(
    dictionaryLoaders as DynamicLoaderMap,
    String(key)
  );

  // Resolved per locale, so a locale pinned at the call site stays pinned
  // while an unpinned one follows `setLocale`.
  const getContext = (contextLocale: LocalesValues) => ({
    localeOrSelector,
    contextLocale,
    contextVariant: client.variant,
  });

  const settled = readContent(getContext(client.locale), () => client.notify());

  if (!settled) return loadingContentPlaceholder;

  return attachOnChange(settled.content, (locale, callback) => {
    const nextSettled = readContent(getContext(locale), callback);

    if (nextSettled) callback(nextSettled.content);
  }) as WithOnChange<DeepTransformContent<T['content']>>;
};
