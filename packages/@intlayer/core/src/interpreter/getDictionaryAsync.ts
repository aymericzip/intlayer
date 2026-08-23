import { internationalization } from '@intlayer/config/built';
import type {
  Dictionary,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  findPlainDynamicLoader,
  type PlainDynamicLoaderMap,
} from '../dictionaryManipulator/plainDynamicLoader';
import {
  getDictionarySelectorCacheKey,
  parseDictionarySelector,
} from '../dictionaryManipulator/qualifiedDictionary';
import {
  isQualifiedDynamicLoaderMap,
  type QualifiedDynamicLoaderMap,
  resolveQualifiedDynamicContentAsync,
} from '../dictionaryManipulator/qualifiedDynamicLoader';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  Plugins,
} from './getContent';
import { getDictionary } from './getDictionary';

/**
 * Content already resolved for a `key + locale + selector` triple, or the
 * in-flight promise resolving it. Storing the promise itself makes the cache
 * double as an in-flight deduplication table: concurrent calls for the same
 * chunk await one single load.
 */
const contentPromiseCache = new Map<string, Promise<unknown>>();

/**
 * Awaits the chunk a plain loader map holds for `locale` — walking the same
 * fallback chain as static mode — and transforms it.
 *
 * Returns `null` when the map emitted no chunk for the locale nor for any of
 * its fallbacks, mirroring how a missing qualified coordinate resolves.
 */
const loadPlainChunk = async <T extends Dictionary, Content>(
  dictionaryLoaders: PlainDynamicLoaderMap<T>,
  locale: LocalesValues,
  transform: (dictionary: Dictionary) => Content
): Promise<Content | null> => {
  const resolved = findPlainDynamicLoader<T>(dictionaryLoaders, locale);

  if (!resolved) return null;

  return transform(await resolved.loader());
};

/**
 * Loads a single locale chunk of a dictionary and returns its transformed
 * content.
 *
 * Counterpart of {@link getDictionary} for the per-locale loader maps emitted
 * in `.intlayer/dynamic_dictionaries/`: instead of receiving a dictionary
 * holding every locale, it receives the loader map and awaits only the chunk
 * the requested locale needs.
 *
 * The loader map is either plain (`locale → loader`) or qualified
 * (`locale → qualifierId → loader`, for collections and variants). For a
 * qualified map, only the chunk(s) the selector targets are loaded.
 *
 * Build plugins rewrite every `getIntlayerAsync('key', locale)` call into a
 * `getDictionaryAsync(loaderMap, 'key', locale)` one, so applications call
 * {@link getIntlayerAsync} and never this function directly.
 *
 * @param dictionaryLoaders - Plain or qualified per-locale loader map.
 * @param key - Dictionary key, used to namespace the chunk cache.
 * @param localeOrSelector - The locale, or a selector object (`{ item }`,
 *                           `{ variant }`, optionally with `locale`).
 * @param plugins - Node transformers. Defaults to the base interpreter set.
 */
export const getDictionaryAsync = async <
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T['content'],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
> => {
  let locale: LocalesValues | undefined;
  let selector: DictionarySelector | undefined;

  if (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false') {
    const parsed = parseDictionarySelector<LocalesValues>(localeOrSelector);
    locale = parsed.locale;
    selector = parsed.selector;
  } else {
    // Selectors are unused in this project (build-time flag): the argument can
    // only be a locale, so the selector parsing is dead code.
    locale = localeOrSelector as LocalesValues | undefined;
  }

  const localeTarget = locale ?? internationalization.defaultLocale;

  const cacheKey = `${key}_${localeTarget}_${getDictionarySelectorCacheKey(
    selector
  )}_${plugins ? 'custom_plugins' : 'default_plugins'}`;

  const cachedContent = contentPromiseCache.get(cacheKey);
  if (cachedContent) return cachedContent as Promise<any>;

  const transform = (dictionary: Dictionary) =>
    getDictionary(dictionary, localeTarget, plugins);

  const contentPromise =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(dictionaryLoaders)
      ? resolveQualifiedDynamicContentAsync({
          loaderMap: dictionaryLoaders,
          key,
          locale: localeTarget,
          selector,
          transform,
        })
      : loadPlainChunk(
          dictionaryLoaders as PlainDynamicLoaderMap<T>,
          localeTarget,
          transform
        );

  contentPromiseCache.set(cacheKey, contentPromise);

  // A rejected load must not stay cached, or every later call replays the
  // same failure without ever retrying the chunk.
  contentPromise.catch(() => contentPromiseCache.delete(cacheKey));

  return contentPromise as Promise<any>;
};
