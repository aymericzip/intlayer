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
import { derived, type Readable } from 'svelte/store';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/** Content cache shared by every dynamic read of the page. */
const dynamicContentStore = createDynamicContentStore<unknown>(
  (dictionary, argument) => getDictionary(dictionary, argument)
);

const loadingProxy = (): any =>
  new Proxy(
    { isLoading: true, error: null },
    {
      get: (_target, prop) => {
        if (prop === 'isLoading') return true;
        if (prop === 'error') return null;
        // Any other access is safe while loading and renders ''
        return loadingContentPlaceholder;
      },
    }
  );

/** Merges the resolved content with the loading/error state. */
const withState = (value: unknown, isLoading = false): any => {
  if (Array.isArray(value)) {
    return Object.assign(value.slice(), { isLoading, error: null });
  }
  if (value && typeof value === 'object') {
    return { ...value, isLoading, error: null };
  }
  return { isLoading, error: null };
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
  const A extends LocalesValues | DictionarySelectorForKey<K> = DeclaredLocales,
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
  const readContent = dynamicContentStore.createReader(
    dictionaryPromise as DynamicLoaderMap,
    String(key)
  );

  const contextLocaleStore = derived(
    intlayerStore,
    ($store) => context?.locale ?? $store.locale
  );

  let resolvedContent: unknown;

  return derived(
    contextLocaleStore,
    ($contextLocale, set) => {
      const publish = (content: unknown) => {
        resolvedContent = content;
        set(withState(content));
      };

      // Resolved per locale, so a locale pinned at the call site stays pinned
      // while an unpinned one follows the store.
      const settled = readContent(
        {
          localeOrSelector,
          contextLocale: $contextLocale,
          contextVariant: context?.variant,
        },
        publish,
        (error) => {
          console.error(error);
          set({ isLoading: false, error: error as Error } as any);
        }
      );

      if (settled) {
        publish(settled.content);
        return;
      }

      // Keeps the previous locale's content on screen while the next loads
      set(
        resolvedContent === undefined
          ? loadingProxy()
          : withState(resolvedContent, true)
      );
    },
    loadingProxy()
  );
}
