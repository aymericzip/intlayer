import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { Plugins } from './getContent';

/**
 * Stable identity per plugin array, so a cache key can tell two custom plugin
 * sets apart.
 *
 * A boolean `custom / default` discriminator is not enough: two callers passing
 * *different* plugin arrays for the same dictionary and locale would collide,
 * and the second one would be served the first one's transformed content.
 *
 * Every framework package memoizes `getPlugins(locale)` per locale, so the same
 * locale always hands over the same array reference and reuses its identity —
 * an array built fresh on every call only ever costs a cache miss, never a
 * wrong hit.
 */
const pluginsIdentities = new WeakMap<Plugins[], string>();

let nextPluginsIdentity = 0;

/**
 * Returns the cache-key fragment identifying a plugin array.
 *
 * @param plugins - The plugin array a transform runs with, or `undefined` when
 *                  the interpreter's base plugins are used.
 */
export const getPluginsCacheKey = (plugins?: Plugins[]): string => {
  if (!plugins) return 'base';

  const existingIdentity = pluginsIdentities.get(plugins);
  if (existingIdentity) return existingIdentity;

  nextPluginsIdentity += 1;
  const identity = `p${nextPluginsIdentity}`;
  pluginsIdentities.set(plugins, identity);

  return identity;
};

/**
 * Upper bound of transformed entries kept per dictionary. A dictionary is
 * transformed once per `locale × selector × plugin set`, so the realistic count
 * stays in the tens; the cap only guards pathological selector fan-out (a
 * collection read by hundreds of item ids). Reaching it drops the dictionary's
 * entries rather than evicting one by one — the next reads simply re-transform.
 */
const MAX_ENTRIES_PER_DICTIONARY = 256;

/**
 * Transformed content, keyed first by the dictionary object it came from, then
 * by `locale × selector × plugin set`.
 *
 * Keying on the object rather than on the dictionary key is what makes this
 * safe for the paths the build optimization produces: `useDictionary` and
 * `useDictionaryDynamic` receive the dictionary itself, never its key, and a
 * dictionary replaced at runtime — a hot reload, a freshly loaded locale chunk
 * — is a new object, so it can never be served stale content. Being weak also
 * means a dictionary that goes out of scope takes its entries with it.
 */
const transformCache = new WeakMap<object, Map<string, unknown>>();

/**
 * Whether a value is a settled dictionary worth memoizing.
 *
 * Two kinds of argument are deliberately excluded, and both are callable:
 * - a callable stand-in proxy — `solid-intlayer`'s `useLoadDynamic` hands
 *   `getDictionary` a placeholder that reads a Solid resource on every property
 *   access, so its content changes the moment the chunk lands. Memoizing it
 *   would freeze the pending, empty state for the rest of the session.
 * - anything a non-typed caller passes that a `WeakMap` cannot hold as a key,
 *   which would otherwise throw instead of simply running uncached.
 */
const isMemoizableDictionary = (value: unknown): value is object =>
  value !== null && typeof value === 'object';

/**
 * Builds the cache key for one transformed entry.
 *
 * @param locale - The resolved locale, already defaulted by the caller.
 * @param selectorCacheKey - Serialized selector, empty for a plain dictionary.
 * @param plugins - The plugin array the transform runs with.
 */
export const getDictionaryTransformCacheKey = (
  locale: LocalesValues,
  selectorCacheKey: string,
  plugins?: Plugins[]
): string => `${locale}_${selectorCacheKey}_${getPluginsCacheKey(plugins)}`;

/**
 * Looks up the transformed content cached for `dictionary` under `cacheKey`.
 *
 * The hit is reported through a discriminated result rather than through the
 * value: `null` is a legitimate cached content — an unresolvable qualified
 * coordinate — so a miss can never be inferred from the value alone.
 */
export const readTransformCache = <Content>(
  dictionary: Dictionary | object,
  cacheKey: string
): { hit: true; content: Content } | { hit: false } => {
  if (!isMemoizableDictionary(dictionary)) return { hit: false };

  const entries = transformCache.get(dictionary);

  if (!entries?.has(cacheKey)) return { hit: false };

  return { hit: true, content: entries.get(cacheKey) as Content };
};

/**
 * Stores transformed content for `dictionary` under `cacheKey`.
 *
 * @returns The stored content, so callers can `return writeTransformCache(...)`.
 */
export const writeTransformCache = <Content>(
  dictionary: Dictionary | object,
  cacheKey: string,
  content: Content
): Content => {
  if (!isMemoizableDictionary(dictionary)) return content;

  let entries = transformCache.get(dictionary);

  if (!entries) {
    entries = new Map<string, unknown>();
    transformCache.set(dictionary, entries);
  }

  if (entries.size >= MAX_ENTRIES_PER_DICTIONARY) entries.clear();

  entries.set(cacheKey, content);

  return content;
};
