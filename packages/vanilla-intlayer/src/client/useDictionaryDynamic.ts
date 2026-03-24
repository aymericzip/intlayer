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

const loadDictionary = async <T extends Dictionary>(
  cacheKey: string,
  loader: (() => Promise<T>) | undefined
): Promise<T | undefined> => {
  if (!loader) return undefined;
  if (cache.has(cacheKey)) return cache.get(cacheKey) as T;

  const dictionary = await loader();

  cache.set(cacheKey, dictionary);

  return dictionary;
};

/** Shared recursive proxy — safe placeholder for any nested property access while loading. */
const recursiveProxy: any = new Proxy(() => {}, {
  get: (_target, prop) => {
    if (prop === Symbol.toPrimitive) return () => undefined;
    if (prop === 'toString') return () => '';
    if (prop === 'then') return undefined;
    return recursiveProxy;
  },
  apply: () => recursiveProxy,
});

/**
 * Dynamically load and transform a locale-keyed dictionary, subscribing to
 * locale changes — mirroring the API of `useDictionary` but for async bundles.
 *
 * Used by the babel/SWC optimization plugin when `importMode = 'dynamic'`.
 * Each locale has its own lazy loader so only the current locale's bundle is
 * fetched. Results are cached — subsequent switches to the same locale are
 * instant.
 *
 * While loading, property accesses on the returned object return safe
 * empty-string placeholders. Once loaded, content becomes available via
 * `.onChange()`.
 *
 * @param dictionaryPromise - Locale-keyed map of `() => Promise<Dictionary>` loaders.
 * @param key               - The dictionary key (used for cache namespacing).
 * @param locale            - Optional locale override.
 * @returns Content proxy with an `.onChange()` method.
 *
 * @example
 * ```ts
 * import { installIntlayer, useDictionaryDynamic } from 'vanilla-intlayer';
 *
 * installIntlayer();
 *
 * const content = useDictionaryDynamic(
 *   {
 *     en: () => import('./en.content'),
 *     fr: () => import('./fr.content'),
 *   },
 *   'homepage'
 * ).onChange((c) => {
 *   document.querySelector('h1')!.textContent = String(c.title);
 * });
 * ```
 */
export const useDictionaryDynamic = <
  T extends Dictionary,
  K extends DictionaryKeys,
  L extends LocalesValues = LocalesValues,
>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  key: K,
  locale?: L
): WithOnChange<DeepTransformContent<T['content'], L>> => {
  const client = getIntlayerClient();
  const callbacks = new Set<
    (content: DeepTransformContent<T['content'], L>) => void
  >();

  const getActiveLocale = (): L =>
    (locale ??
      client.locale ??
      configuration.internationalization.defaultLocale) as L;

  const loadForLocale = (currentLocale: L): void => {
    const cacheKey = `${String(key)}.${currentLocale}`;
    const loader = (dictionaryPromise as Record<string, () => Promise<T>>)[
      currentLocale
    ];

    loadDictionary<T>(cacheKey, loader).then((dictionary) => {
      if (!dictionary || callbacks.size === 0) return;

      const content = getDictionary(
        dictionary,
        currentLocale
      ) as DeepTransformContent<T['content'], L>;

      callbacks.forEach((callback) => {
        callback(content);
      });
    });
  };

  // Kick off the initial load
  loadForLocale(getActiveLocale());

  // Subscribe to locale changes
  client.subscribe((newLocale) => {
    loadForLocale((locale ?? newLocale) as L);
  });

  // Per-call proxy: behaves like content, but delegates `.onChange()` to our
  // callback set and returns `recursiveProxy` for everything else while loading.
  let onChangeFn: (
    cb: (content: DeepTransformContent<T['content'], L>) => void
  ) => WithOnChange<DeepTransformContent<T['content'], L>>;

  const proxy = new Proxy({} as any, {
    get(_target, prop) {
      if (prop === 'onChange') return onChangeFn;
      if (prop === Symbol.toPrimitive) return () => undefined;
      if (prop === 'toString') return () => '';
      if (prop === 'then') return undefined;
      return recursiveProxy;
    },
  }) as WithOnChange<DeepTransformContent<T['content'], L>>;

  onChangeFn = (callback) => {
    callbacks.add(callback);

    // Re-trigger synchronously if the current locale is already cached
    const currentLocale = getActiveLocale();
    const cacheKey = `${String(key)}.${currentLocale}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      callback(
        getDictionary(cached as T, currentLocale) as DeepTransformContent<
          T['content'],
          L
        >
      );
    }
    return proxy;
  };

  return proxy;
};
