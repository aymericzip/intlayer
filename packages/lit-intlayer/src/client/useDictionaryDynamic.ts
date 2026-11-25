import {
  createDynamicContentStore,
  type DynamicLoaderMap,
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
import { createContentProxy, type IntlayerLitProxy } from './IntlayerBinding';

/** Content cache shared by every dynamic read of the page. */
const dynamicContentStore = createDynamicContentStore<unknown>(
  (dictionary, argument) => getDictionary(dictionary, argument)
);

/**
 * Returns the translated content for a lazily-loaded dictionary, wrapped in an
 * {@link IntlayerLitProxy} so the caller can register a Lit `ReactiveController`
 * that keeps the element in sync with both the async bundle load and locale
 * changes.
 *
 * This is the babel-optimized counterpart of `useIntlayer` when
 * `importMode = 'dynamic'` — it accepts the locale-keyed loader map injected
 * by the build plugin, matching the same signature as `react-intlayer` and
 * other framework adapters.
 *
 * While loading, property accesses return the shared loading placeholder,
 * which renders `''`. Chain `.observe(this)` so Lit triggers `requestUpdate()`
 * once the bundle is ready and on every subsequent locale change.
 *
 * The `intlayerLitPlugin` Vite plugin automatically appends
 * `.observe(this)` at build / serve time, so manual chaining is usually
 * unnecessary.
 *
 * @param dictionaryPromise - Locale-keyed loader map, or a qualified loader map.
 * @param key               - The dictionary key (used for cache namespacing).
 * @param localeOrSelector  - Optional locale or selector.
 * @returns An {@link IntlayerLitProxy} proxy with an `.observe()` method.
 *
 * @example
 * ```ts
 * // Typically injected by the babel/SWC optimization plugin:
 * import _hash_dyn from '.intlayer/dynamic_dictionaries/app.mjs';
 * private content = useDictionaryDynamic(_hash_dyn, 'app').observe(this);
 * ```
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = DeclaredLocales,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
): IntlayerLitProxy<DeepTransformContent<T['content']>> => {
  const readContent = dynamicContentStore.createReader(
    dictionaryPromise as DynamicLoaderMap,
    String(key)
  );

  return createContentProxy(({ contextLocale, contextVariant }, onLoad) =>
    readContent({ localeOrSelector, contextLocale, contextVariant }, onLoad)
  );
};
