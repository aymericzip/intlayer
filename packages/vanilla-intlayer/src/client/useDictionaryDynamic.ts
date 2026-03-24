import configuration from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';
import type { WithOnChange } from './useDictionary';

/** Simple in-memory cache shared across all calls in the same page. */
const cache = new Map<string, Dictionary>();

/** Tracks in-flight loads to avoid duplicate fetches. */
const inflight = new Map<string, Promise<void>>();

const loadDictionary = <T extends Dictionary>(
  cacheKey: string,
  loader: () => Promise<T>
): Promise<void> => {
  if (cache.has(cacheKey)) return Promise.resolve();
  if (inflight.has(cacheKey)) return inflight.get(cacheKey)!;

  const promise = loader().then((dictionary) => {
    cache.set(cacheKey, dictionary);
    inflight.delete(cacheKey);
  });

  inflight.set(cacheKey, promise);
  return promise;
};

/**
 * Dynamically load and transform a locale-keyed dictionary.
 *
 * Works like `useIntlayer` / `useDictionary` but accepts a locale-keyed map
 * of lazy loaders instead of a pre-imported dictionary. Call it inside your
 * render function — the first call triggers a background fetch and returns
 * placeholder values; when the load completes the client notifies all
 * subscribers (including your render loop) so the render runs again with real
 * content. Subsequent calls for the same locale return immediately from cache.
 *
 * Locale switches follow the same two-phase pattern: placeholder on first
 * render, real content after the locale bundle loads.
 *
 * @param dictionaryLoaders - Locale-keyed map of `() => Promise<Dictionary>`.
 * @param key               - Dictionary key (used for cache namespacing).
 * @param locale            - Optional locale override.
 *
 * @example
 * ```ts
 * import dynDic from '../.intlayer/dynamic_dictionary/app.mjs';
 *
 * const render = () => {
 *   const content = useDictionaryDynamic(dynDic, 'app');
 *   document.querySelector('h1')!.textContent = String(content.title);
 * };
 *
 * render();
 * getIntlayerClient().subscribe(() => render());
 * ```
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  K extends DictionaryKeys,
  L extends LocalesValues = LocalesValues,
>(
  dictionaryLoaders: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  locale?: L
): WithOnChange<DeepTransformContent<T['content'], L>> => {
  const client = getIntlayerClient();
  const currentLocale = (locale ??
    client.locale ??
    configuration.internationalization.defaultLocale) as L;

  const cacheKey = `${String(key)}.${currentLocale}`;
  const loader = (dictionaryLoaders as Record<string, () => Promise<T>>)[
    currentLocale
  ];

  // --- Cache hit: return real content synchronously ---
  const cached = cache.get(cacheKey);
  if (cached) {
    const content = getDictionary(cached as T, currentLocale) as WithOnChange<
      DeepTransformContent<T['content'], L>
    >;

    content.onChange = (callback) => {
      // Re-fire whenever content reloads (locale change → new cache entry).
      client.subscribe((newLocale) => {
        const newKey = `${String(key)}.${newLocale}`;
        const newLoader = (
          dictionaryLoaders as Record<string, () => Promise<T>>
        )[newLocale];

        if (!newLoader) return;

        loadDictionary(newKey, newLoader).then(() => {
          const dict = cache.get(newKey);
          if (dict) {
            callback(
              getDictionary(dict as T, newLocale as L) as DeepTransformContent<
                T['content'],
                L
              >
            );
          }
        });
      });

      return content;
    };

    return content;
  }

  // --- Cache miss: kick off background load, then notify to re-render ---
  if (loader) {
    loadDictionary(cacheKey, loader).then(() => {
      client.notify();
    });
  }

  // Placeholder proxy — safe for any property access while loading.
  const recursiveProxy: any = new Proxy(() => {}, {
    get: (_t, prop) => {
      if (prop === Symbol.toPrimitive) return () => '';
      if (prop === 'toString') return () => '';
      if (prop === 'valueOf') return () => '';
      if (prop === 'then') return undefined; // not a Promise
      if (prop === 'onChange') return (_cb: any) => recursiveProxy;
      return recursiveProxy;
    },
    apply: () => recursiveProxy,
  });

  return recursiveProxy as WithOnChange<DeepTransformContent<T['content'], L>>;
};
