import { internationalization } from '@intlayer/config/built';
import {
  getDictionarySelectorCacheKey,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
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
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';
import type { WithOnChange } from './useDictionary';

/** Simple in-memory cache shared across all calls in the same page. */
const cache = new Map<string, Dictionary>();

/** Tracks in-flight loads to avoid duplicate fetches. */
const inflight = new Map<string, Promise<void>>();

/** Resolved-content cache for qualified (collection/variant/meta) keys. */
const qualifiedCache = new Map<string, unknown>();
const qualifiedInflight = new Map<string, Promise<void>>();

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

/** Placeholder proxy — safe for any property access while loading. */
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

/**
 * Dynamically load and transform a dictionary (plain or qualified).
 *
 * For a qualified loader map (collection / variant / meta record, possibly
 * combined), only the chunk(s) the selector targets are loaded. For a plain
 * loader map, the locale chunk is loaded. The first call returns a placeholder
 * and triggers a background load; the client then notifies subscribers so the
 * render runs again with real content.
 *
 * @param dictionaryLoaders - Locale-keyed loader map, or a qualified loader map.
 * @param key               - Dictionary key (used for cache namespacing).
 * @param localeOrSelector  - Optional locale or selector.
 */
export const useDictionaryDynamic = <
  const T extends Dictionary,
  const K extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<K> = LocalesValues,
>(
  dictionaryLoaders:
    | StrictModeLocaleMap<() => Promise<T>>
    | QualifiedDynamicLoaderMap,
  key: K,
  localeOrSelector?: A
): WithOnChange<DeepTransformContent<T['content']>> => {
  const client = getIntlayerClient();
  const defaultLocale = internationalization.defaultLocale;

  // --- Qualified loader map (collection / variant / meta record) ---
  if (
    process.env['INTLAYER_DICTIONARY_SELECTOR'] !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryLoaders)
  ) {
    const loaderMap = dictionaryLoaders;
    const { locale: selectorLocale, selector } =
      parseDictionarySelector<LocalesValues>(localeOrSelector);
    const selectorId = getDictionarySelectorCacheKey(selector);

    const buildKey = (locale: string) =>
      `${String(key)}.${locale}.${selectorId}`;
    const resolveContent = (locale: LocalesValues) =>
      resolveQualifiedDynamicContentAsync({
        loaderMap,
        key: String(key),
        locale,
        selector,
        transform: (dictionary) => getDictionary(dictionary, locale),
      });

    const currentLocale = (selectorLocale ??
      client.locale ??
      defaultLocale) as LocalesValues;
    const cacheKey = buildKey(currentLocale);

    const attachOnChange = (content: any) => {
      if (content != null && typeof content === 'object') {
        content.onChange = (callback: (c: any) => void) => {
          client.subscribe((newLocale) => {
            const locale = (selectorLocale ?? newLocale) as LocalesValues;
            const newKey = buildKey(locale);

            if (qualifiedCache.has(newKey)) {
              callback(qualifiedCache.get(newKey));
              return;
            }

            resolveContent(locale).then((resolved) => {
              qualifiedCache.set(newKey, resolved);
              callback(resolved);
            });
          });
          return content;
        };
      }
      return content;
    };

    if (qualifiedCache.has(cacheKey)) {
      return attachOnChange(qualifiedCache.get(cacheKey)) as any;
    }

    if (!qualifiedInflight.has(cacheKey)) {
      const promise = resolveContent(currentLocale).then((resolved) => {
        qualifiedCache.set(cacheKey, resolved);
        qualifiedInflight.delete(cacheKey);
        client.notify();
      });
      qualifiedInflight.set(cacheKey, promise);
    }

    return recursiveProxy;
  }

  // --- Plain locale-keyed loader map ---
  const locale =
    typeof localeOrSelector === 'string'
      ? (localeOrSelector as LocalesValues)
      : undefined;
  const currentLocale = (locale ?? client.locale ?? defaultLocale) as A;

  const cacheKey = `${String(key)}.${currentLocale}`;
  const loader = (dictionaryLoaders as Record<string, () => Promise<T>>)[
    currentLocale as string
  ];

  // --- Cache hit: return real content synchronously ---
  const cached = cache.get(cacheKey);
  if (cached) {
    const content = getDictionary(cached, currentLocale) as WithOnChange<
      DeepTransformContent<T['content']>
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
            callback(getDictionary(dict, newLocale as A) as any);
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

  return recursiveProxy;
};
