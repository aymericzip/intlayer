import {
  type DictionaryRead,
  type DynamicChunkTransform,
  type DynamicLoaderMap,
  getDictionarySelectorCacheKey,
  getDynamicChunkArgument,
  getPreloadedDictionary,
  isQualifiedDynamicLoaderMap,
  parseDictionarySelector,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
  resolveDictionaryRead,
  resolveDynamicContentAsync,
} from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { createMemo, useContext } from 'solid-js';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { createAsyncValue, trackAsyncValue } from '../solidCompat';
import { createContentProxy } from './contentProxy';
import { IntlayerClientContext, type IntlayerValue } from './IntlayerProvider';
import { useDictionary } from './useDictionary';
import { seedDynamicValue, useLoadDynamic } from './useLoadDynamic';

type DynamicDictionarySource = DictionaryRead & {
  cacheKey: string;
};

/**
 * Loaded chunks stay raw (serializable for hydration) and are interpreted
 * inside the component owner. A collection's metadata is plain data, resolved
 * right away — its index holds no dictionary to interpret anyway.
 */
const keepRawChunk: DynamicChunkTransform<Dictionary> = (dictionary) =>
  dictionary;
const readChunkMetadata: DynamicChunkTransform<Dictionary> = (
  dictionary,
  argument
) => getDictionary(dictionary, argument) as Dictionary;

/**
 * On the client side, Hook that lazily loads a dictionary and returns its
 * reactive content.
 *
 * The locale, selector and chunk selection are resolved by the shared
 * `resolveDictionaryRead` / `resolveDynamicContentAsync`; this hook only adds
 * Solid's resources and owner-scoped interpretation.
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the locale from the client context.
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
) => {
  // Reads outside a provider fall back to an empty context.
  const context: Partial<IntlayerValue> =
    useContext(IntlayerClientContext) ?? {};
  const dictionaryKey = String(key);
  const loaderMap = dictionaryPromise as DynamicLoaderMap;

  const { locale: callLocale, selector: callSelector } =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? parseDictionarySelector<LocalesValues>(localeOrSelector)
      : {
          locale: localeOrSelector as LocalesValues | undefined,
          selector: undefined,
        };

  // Kept as an accessor — not resolved once — so a locale or variant change
  // re-runs the sources and resources below.
  const readAccessor = (): DictionaryRead =>
    resolveDictionaryRead({
      localeOrSelector,
      contextLocale: context.locale?.(),
      contextVariant: context.variant?.(),
      dictionaryKey,
    });

  // Identifies the raw chunk a single-entry read loads: `metadataOnly` only
  // changes how it is interpreted, so it is left out of the cache key.
  const sourceAccessor = (): DynamicDictionarySource => {
    const read = readAccessor();
    const chunkSelectorId =
      process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
        ? getDictionarySelectorCacheKey({
            ...read.selector,
            metadataOnly: undefined,
          })
        : '';

    return {
      ...read,
      cacheKey: chunkSelectorId
        ? `${dictionaryKey}.${read.locale}.${chunkSelectorId}`
        : `${dictionaryKey}.${read.locale}`,
    };
  };

  const loadContent = (
    read: DictionaryRead,
    transform: DynamicChunkTransform<Dictionary>
  ) =>
    resolveDynamicContentAsync<Dictionary>({
      loaderMap,
      key: dictionaryKey,
      ...read,
      transform,
    });

  // What `useDictionary` interprets a loaded chunk with: the call-site locale
  // (or `undefined` to follow the client context, like static dictionaries),
  // plus `metadataOnly`.
  const chunkArgument = getDynamicChunkArgument(callLocale, callSelector);

  // The `item` axis is the only one that can expand into several entries; when
  // it is declared but not selected, the result is a collection (array). Only
  // the call site can pin an item, so this stays a one-off check.
  const isCollection =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(loaderMap) &&
    loaderMap[QUALIFIER_DYNAMIC_TYPES_KEY].includes('item') &&
    callSelector?.item === undefined;

  if (isCollection) {
    // Collection: load only the targeted entries, then interpret each inside
    // the component owner scope so a real array is exposed (so `<For>` works)
    // and owner-scoped context (router, markdown, editor) stays available.
    // Tracks the variant as well as the locale, so an ambient variant change
    // reloads the targeted chunks.
    const resolvedEntries = createAsyncValue(readAccessor, (read) =>
      loadContent(
        read,
        callSelector?.metadataOnly ? readChunkMetadata : keepRawChunk
      )
    );

    const accessor = createMemo(() => {
      const resolved = resolvedEntries();

      if (!Array.isArray(resolved)) return [];

      // Already final: plain records, never interpreted
      if (callSelector?.metadataOnly) return resolved;

      const { locale } = readAccessor();

      return resolved.map((dictionary) => getDictionary(dictionary, locale));
    });

    // Read the async value in a render effect so the loading boundary holds
    // without aborting the component body before the proxy below is consumed.
    trackAsyncValue(resolvedEntries);

    return createContentProxy(accessor) as DeepTransformContent<T['content']>;
  }

  // A build-tool plugin may have started this locale's chunk while the entry
  // point evaluated, and it may already have landed. Seeding the cache with it
  // makes the async value below resolve synchronously, so the loading boundary
  // never sees a pending state.
  const initialSource = sourceAccessor();
  const preloadedDictionary = getPreloadedDictionary(
    loaderMap,
    initialSource.locale
  );

  if (preloadedDictionary) {
    seedDynamicValue(initialSource, preloadedDictionary);
  }

  // Single entry (plain dictionary, variant, selected item): load its chunk,
  // then interpret it like a static dictionary so pending-safety, owner-scoped
  // interpretation and every node type (markdown / html / nested) match.
  const dictionary = useLoadDynamic<Dictionary, DynamicDictionarySource>(
    sourceAccessor,
    (source) =>
      loadContent(source, keepRawChunk).then((resolved) => {
        if (resolved === null) {
          throw new Error(
            `No dynamic dictionary chunk found for key "${dictionaryKey}" and locale "${source.locale}".`
          );
        }

        return resolved as Dictionary;
      })
  );

  return useDictionary(
    dictionary,
    chunkArgument as LocalesValues
  ) as DeepTransformContent<T['content']>;
};
