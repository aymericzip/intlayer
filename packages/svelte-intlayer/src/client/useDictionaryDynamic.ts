import type {
  Dictionary,
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types';
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

/**
 * Svelte hook for dynamic dictionary loading
 * Loads dictionary content asynchronously and returns a reactive store.
 *
 * @param dictionaryPromise - Object mapping locales to import functions (e.g. { en: () => import(...) })
 * @param locale - Optional fixed locale. If not provided, follows the global intlayerStore.
 * @returns Readable store with the loaded dictionary content
 */
export function useDictionaryDynamic<T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  _key: DictionaryKeys,
  locale?: LocalesValues
): Readable<
  DeepTransformContent<T['content']> & {
    isLoading: boolean;
    error: Error | null;
  }
> {
  const context = getIntlayerContext();

  const localeStore = derived(
    intlayerStore,
    ($store) => locale ?? context?.locale ?? $store.locale
  );

  return derived(
    localeStore,
    ($locale, set) => {
      // Set loading state immediately with proxy
      set(
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
        ) as any
      );

      let isCancelled = false;

      const load = async () => {
        try {
          // Access the loader for the current locale
          // dictionaryPromise is indexed by locale
          const loader =
            dictionaryPromise[$locale as keyof typeof dictionaryPromise];

          if (!loader) {
            return;
          }

          const dict = await loader();

          if (isCancelled) return;

          const content = getDictionary(dict, $locale);

          set({
            ...content,
            isLoading: false,
            error: null,
          } as any);
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
    new Proxy(
      { isLoading: true, error: null },
      {
        get: (_target, prop) => {
          if (prop === 'isLoading') return true;
          if (prop === 'error') return null;
          return recursiveProxy;
        },
      }
    ) as any
  );
}
