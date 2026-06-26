import {
  isQualifiedDynamicLoaderMap,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDynamicContentAsync,
} from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { derived, type Readable } from 'svelte/store';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

// Proxy that returns itself for any property access to handle nested paths during loading
const recursiveProxy: any = new Proxy(() => {}, {
  get: (_target, prop) => {
    if (prop === Symbol.toPrimitive) {
      return () => undefined;
    }
    if (prop === 'toString') {
      return () => '';
    }
    if (prop === 'then') {
      return undefined;
    }
    return recursiveProxy;
  },
  apply: () => recursiveProxy,
});

const loadingProxy = (): any =>
  new Proxy(
    { isLoading: true, error: null },
    {
      get: (_target, prop) => {
        if (prop === 'isLoading') return true;
        if (prop === 'error') return null;
        // For any other property, return the recursive proxy
        // to allow nested access without errors
        return recursiveProxy;
      },
    }
  );

/** Merges the resolved content with the loading/error state. */
const withState = (value: unknown): any => {
  if (Array.isArray(value)) {
    return Object.assign(value.slice(), { isLoading: false, error: null });
  }
  if (value && typeof value === 'object') {
    return { ...value, isLoading: false, error: null };
  }
  return { isLoading: false, error: null };
};

/**
 * Svelte hook for dynamic dictionary loading.
 *
 * For a qualified loader map (collection / variant, possibly
 * combined), only the chunk(s) the selector targets are loaded. For a plain
 * loader map, the locale chunk is loaded.
 *
 * @param dictionaryPromise - Locale-keyed loader map, or a qualified loader map.
 * @param key - The dictionary key (used for cache namespacing).
 * @param localeOrSelector - Optional fixed locale or selector.
 * @returns Readable store with the loaded dictionary content.
 */
export function useDictionaryDynamic<
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = LocalesValues,
>(
  dictionaryPromise:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
): Readable<
  DeepTransformContent<T['content']> & {
    isLoading: boolean;
    error: Error | null;
  }
> {
  const context = getIntlayerContext();

  const isSelector =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    typeof localeOrSelector === 'object' &&
    localeOrSelector !== null;
  const selector = isSelector
    ? (localeOrSelector as DictionarySelector)
    : undefined;
  const explicitLocale = isSelector
    ? (localeOrSelector as DictionarySelector).locale
    : (localeOrSelector as LocalesValues | undefined);

  const localeStore = derived(
    intlayerStore,
    ($store) => explicitLocale ?? context?.locale ?? $store.locale
  );

  return derived(
    localeStore,
    ($locale, set) => {
      // Set loading state immediately with proxy
      set(loadingProxy());

      let isCancelled = false;

      const load = async () => {
        try {
          let resolved: unknown;

          if (
            process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
            isQualifiedDynamicLoaderMap(dictionaryPromise)
          ) {
            resolved = await resolveQualifiedDynamicContentAsync({
              loaderMap: dictionaryPromise,
              key: String(key),
              locale: $locale,
              selector,
              transform: (dictionary) => getDictionary(dictionary, $locale),
            });
          } else {
            const loader = (
              dictionaryPromise as Record<string, () => Promise<T>>
            )[$locale];

            if (!loader) return;

            const dict = await loader();
            resolved = getDictionary(dict, $locale);
          }

          if (isCancelled) return;

          set(withState(resolved));
        } catch (error) {
          if (isCancelled) return;
          console.error(error);
          set({
            isLoading: false,
            error: error as Error,
          } as any);
        }
      };

      load();

      return () => {
        isCancelled = true;
      };
    },
    // Initial value
    loadingProxy()
  );
}
