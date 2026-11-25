import type {
  Dictionary,
  DictionarySelector,
  ProviderVariantBase,
} from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { resolveInterpreterLocale } from '../interpreter/resolveInterpreterLocale';
import {
  findPlainDynamicLoader,
  type PlainDynamicLoaderMap,
} from './plainDynamicLoader';
import { getPreloadedDictionary } from './preloadedDynamicLoader';
import {
  getDictionarySelectorCacheKey,
  parseDictionarySelector,
  resolveDictionaryArgument,
} from './qualifiedDictionary';
import {
  type CollectedChunk,
  type CollectedChunks,
  collectQualifiedChunks,
  isQualifiedDynamicLoaderMap,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  type QualifiedDynamicLoaderMap,
  readMetadataIndex,
} from './qualifiedDynamicLoader';

/**
 * Default export of a generated dynamic entry point: a plain `locale → loader`
 * map, or a qualified one (collections / variants).
 */
export type DynamicLoaderMap<T extends Dictionary = Dictionary> =
  | PlainDynamicLoaderMap<T>
  | QualifiedDynamicLoaderMap;

/** The effective locale and selector of a dictionary read. */
export type DictionaryRead = {
  locale: LocalesValues;
  selector?: DictionarySelector;
};

/**
 * Turns a loaded chunk into content — a binding's `getDictionary`, so its
 * plugins apply. Receives the bare locale, or `{ locale, metadataOnly }`.
 */
export type DynamicChunkTransform<Content> = (
  dictionary: Dictionary,
  argument: LocalesValues | DictionarySelector
) => Content;

/** Result of a dynamic read: an entry, a collection, or a missed coordinate. */
export type DynamicContent<Content> = Content | Content[] | null;

/** Everything a dynamic read needs, besides how chunks are loaded. */
export type DynamicReadParams<Content> = DictionaryRead & {
  loaderMap: DynamicLoaderMap;
  /** Dictionary key, namespacing the chunk cache keys. */
  key: string;
  transform: DynamicChunkTransform<Content>;
};

/**
 * Resolves the locale and selector of a dynamic dictionary read: the call-site
 * argument wins, then the provider context (locale and ambient variant), then
 * the interpreter locale. Every binding's dynamic hook goes through it, so
 * static and dynamic reads resolve identically.
 *
 * Subscription-based bindings call it again on each locale change with the new
 * `contextLocale`, so a locale pinned at the call site stays pinned and an
 * unpinned one follows the switch.
 */
export const resolveDictionaryRead = (params: {
  localeOrSelector?: LocalesValues | DictionarySelector | null;
  contextLocale?: LocalesValues;
  contextVariant?: ProviderVariantBase;
  dictionaryKey: string;
}): DictionaryRead => {
  const localeOrSelector = params.localeOrSelector ?? undefined;

  // Inline flag check: with selectors disabled project-wide (build-time flag),
  // the argument can only be a locale and the bundler drops the selector code.
  const { locale, selector } =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? parseDictionarySelector<LocalesValues>(
          resolveDictionaryArgument({ ...params, localeOrSelector })
        )
      : {
          locale:
            (localeOrSelector as LocalesValues | undefined) ??
            params.contextLocale,
          selector: undefined,
        };

  return { locale: resolveInterpreterLocale(locale), selector };
};

/**
 * The argument a loaded chunk is transformed with: its locale, plus
 * `metadataOnly` when the read requests metadata. The other selector dimensions
 * were already applied by picking the chunk.
 *
 * @param locale - The read's locale; `undefined` lets the binding's
 *                 `useDictionary` follow its context locale.
 * @param selector - The read's selector, if any.
 */
export const getDynamicChunkArgument = <
  L extends LocalesValues | undefined = LocalesValues,
>(
  locale: L,
  selector: DictionarySelector | undefined
): L | DictionarySelector =>
  process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' && selector?.metadataOnly
    ? { locale: locale as DictionarySelector['locale'], metadataOnly: true }
    : locale;

/**
 * Collects the chunks a read targets. A plain map serves the locale through
 * the same fallback chain as static mode, from its preload when it holds one.
 */
const collectDynamicChunks = (
  loaderMap: DynamicLoaderMap,
  key: string,
  locale: LocalesValues,
  selector: DictionarySelector | undefined
): CollectedChunks => {
  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    isQualifiedDynamicLoaderMap(loaderMap)
  ) {
    return collectQualifiedChunks(loaderMap, key, locale, selector);
  }

  const resolvedLoader = findPlainDynamicLoader(
    loaderMap as PlainDynamicLoaderMap,
    locale
  );

  if (!resolvedLoader) return { itemAxisOpen: false, missed: true, chunks: [] };

  return {
    itemAxisOpen: false,
    missed: false,
    chunks: [
      {
        cacheKey: `${key}.${resolvedLoader.locale}`,
        loader: resolvedLoader.loader,
        preloaded: getPreloadedDictionary(loaderMap, resolvedLoader.locale),
      },
    ],
  };
};

/** Turns the loaded chunks of a read into its content. */
const readLoadedChunks = <Content>(
  params: DynamicReadParams<Content>,
  collected: CollectedChunks,
  dictionaries: Dictionary[]
): DynamicContent<Content> => {
  const { loaderMap, locale, selector, transform } = params;

  // The index holds plain records, returned as declared (never interpreted)
  if (
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
    collected.readsMetadataIndex
  ) {
    return readMetadataIndex(
      dictionaries[0],
      (loaderMap as QualifiedDynamicLoaderMap)[QUALIFIER_DYNAMIC_TYPES_KEY],
      selector
    ) as Content[];
  }

  const argument = getDynamicChunkArgument(locale, selector);
  const read = (dictionary: Dictionary) => transform(dictionary, argument);

  if (collected.itemAxisOpen) return dictionaries.map(read);

  const [dictionary] = dictionaries;

  return dictionary ? read(dictionary) : null;
};

/** Content of a read whose coordinate is absent: no item, or no entry. */
const getMissedContent = <Content>(
  collected: CollectedChunks
): DynamicContent<Content> => (collected.itemAxisOpen ? [] : null);

/**
 * Lists the chunks a read targets without loading them — lets a binding warm
 * its chunk cache ahead of render.
 *
 * @returns The targeted chunks, empty when a required coordinate is absent.
 */
export const getDynamicChunks = (
  loaderMap: DynamicLoaderMap,
  key: string,
  locale: LocalesValues,
  selector: DictionarySelector | undefined
): CollectedChunk[] => {
  const { missed, chunks } = collectDynamicChunks(
    loaderMap,
    key,
    locale,
    selector
  );

  return missed ? [] : chunks;
};

/**
 * Loads the raw chunk a plain loader map serves for a locale — same fallback
 * chain and preload as every other dynamic read — for the `useDictionaryAsync`
 * bindings, which interpret it with their own `useDictionary`.
 *
 * @returns The chunk, or `undefined` when the map holds none for the locale
 *          nor for any of its fallbacks.
 */
export const loadDynamicDictionary = async <T extends Dictionary>(
  loaderMap: PlainDynamicLoaderMap<T>,
  locale: LocalesValues
): Promise<T | undefined> => {
  const [chunk] = getDynamicChunks(loaderMap, '', locale, undefined);

  if (!chunk) return undefined;

  return (chunk.preloaded ?? (await chunk.loader())) as T;
};

/**
 * Resolves a dynamic read synchronously, loading only the chunk(s) it targets
 * through `loadChunk` — a suspender cache that throws while a chunk is pending.
 *
 * Every pending loader is started before the first chunk is read, so sibling
 * chunks load in parallel rather than waterfalling. Preloaded chunks are read
 * directly, never through `loadChunk`, which would suspend for one microtask.
 *
 * @param params.loadChunk - Reads a started chunk, suspending until it resolves.
 */
export const resolveDynamicContent = <Content>(
  params: DynamicReadParams<Content> & {
    loadChunk: (cacheKey: string, promise: Promise<Dictionary>) => Dictionary;
  }
): DynamicContent<Content> => {
  const { loaderMap, key, locale, selector, loadChunk } = params;

  const collected = collectDynamicChunks(loaderMap, key, locale, selector);

  if (collected.missed) return getMissedContent<Content>(collected);

  const startedChunks = collected.chunks.map((chunk) => ({
    chunk,
    promise: chunk.preloaded ? undefined : chunk.loader(),
  }));

  const dictionaries = startedChunks.map(
    ({ chunk, promise }) =>
      chunk.preloaded ?? loadChunk(chunk.cacheKey, promise!)
  );

  return readLoadedChunks(params, collected, dictionaries);
};

/**
 * Resolves a dynamic read, awaiting only the chunk(s) it targets.
 */
export const resolveDynamicContentAsync = async <Content>(
  params: DynamicReadParams<Content>
): Promise<DynamicContent<Content>> => {
  const { loaderMap, key, locale, selector } = params;

  const collected = collectDynamicChunks(loaderMap, key, locale, selector);

  if (collected.missed) return getMissedContent<Content>(collected);

  const dictionaries = await Promise.all(
    collected.chunks.map((chunk) => chunk.preloaded ?? chunk.loader())
  );

  return readLoadedChunks(params, collected, dictionaries);
};

/** A dynamic read handed to a {@link DynamicContentStore}. */
export type DynamicStoreRead = DictionaryRead & {
  loaderMap: DynamicLoaderMap;
  key: string;
};

/** Settled content of a read; wrapped, since `null` is a valid content. */
export type SettledDynamicContent<Content> = {
  content: DynamicContent<Content>;
};

/** What a {@link DynamicReader} resolves a read from, besides the map. */
export type DynamicReadContext = {
  localeOrSelector?: LocalesValues | DictionarySelector | null;
  contextLocale?: LocalesValues;
  contextVariant?: ProviderVariantBase;
};

/**
 * Reads one dictionary across context changes: returns the content when it is
 * available synchronously, else loads it and calls `onLoad` (or `onError`) —
 * unless a newer read of the same reader superseded it meanwhile. Without
 * `onError`, a failed load surfaces as an unhandled rejection.
 */
export type DynamicReader<Content> = (
  context: DynamicReadContext,
  onLoad: (content: DynamicContent<Content>) => void,
  onError?: (error: unknown) => void
) => SettledDynamicContent<Content> | undefined;

/**
 * Content cache of the bindings that re-render on a notification instead of
 * suspending (vanilla, Lit, Svelte, Vue, Angular).
 */
export type DynamicContentStore<Content> = {
  /**
   * The content of a read when it is available without loading — loaded
   * before, or preloaded by the entry point — else `undefined`.
   */
  peek: (read: DynamicStoreRead) => SettledDynamicContent<Content> | undefined;
  /** Loads the content of a read, sharing one load between concurrent reads. */
  load: (read: DynamicStoreRead) => Promise<DynamicContent<Content>>;
  /** Creates the reader of one hook call (see {@link DynamicReader}). */
  createReader: (
    loaderMap: DynamicLoaderMap,
    dictionaryKey: string
  ) => DynamicReader<Content>;
};

type DynamicStoreEntry<Content> = {
  promise: Promise<DynamicContent<Content>>;
  settled?: SettledDynamicContent<Content>;
};

/**
 * Creates the content cache of a binding. Entries are kept per loader map, so
 * a hot-reloaded entry point (a new map object) never serves stale content.
 *
 * @param transform - The binding's `getDictionary`, applied to every chunk.
 */
export const createDynamicContentStore = <Content>(
  transform: DynamicChunkTransform<Content>
): DynamicContentStore<Content> => {
  const entriesByLoaderMap = new WeakMap<
    object,
    Map<string, DynamicStoreEntry<Content>>
  >();

  const getReadId = ({ locale, selector }: DynamicStoreRead): string =>
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? `${locale}|${getDictionarySelectorCacheKey(selector)}`
      : locale;

  const peek = (
    read: DynamicStoreRead
  ): SettledDynamicContent<Content> | undefined => {
    const settled = entriesByLoaderMap
      .get(read.loaderMap)
      ?.get(getReadId(read))?.settled;

    if (settled) return settled;

    const collected = collectDynamicChunks(
      read.loaderMap,
      read.key,
      read.locale,
      read.selector
    );

    if (collected.missed) {
      return { content: getMissedContent<Content>(collected) };
    }

    if (!collected.chunks.every((chunk) => chunk.preloaded)) return undefined;

    return {
      content: readLoadedChunks(
        { ...read, transform },
        collected,
        collected.chunks.map((chunk) => chunk.preloaded!)
      ),
    };
  };

  const load = (read: DynamicStoreRead): Promise<DynamicContent<Content>> => {
    const entries =
      entriesByLoaderMap.get(read.loaderMap) ??
      new Map<string, DynamicStoreEntry<Content>>();

    entriesByLoaderMap.set(read.loaderMap, entries);

    const readId = getReadId(read);
    const existingEntry = entries.get(readId);

    if (existingEntry) return existingEntry.promise;

    const entry: DynamicStoreEntry<Content> = {
      promise: resolveDynamicContentAsync({ ...read, transform }),
    };

    entries.set(readId, entry);

    // Registered before any caller's continuation, so `peek` hits once a
    // caller awaiting `load` resumes. A failed load is dropped to be retried.
    entry.promise.then(
      (content) => {
        entry.settled = { content };
      },
      () => entries.delete(readId)
    );

    return entry.promise;
  };

  const createReader = (
    loaderMap: DynamicLoaderMap,
    dictionaryKey: string
  ): DynamicReader<Content> => {
    let latestRead: DynamicStoreRead | undefined;

    return (context, onLoad, onError) => {
      const read: DynamicStoreRead = {
        loaderMap,
        key: dictionaryKey,
        ...resolveDictionaryRead({ ...context, dictionaryKey }),
      };
      latestRead = read;

      const settled = peek(read);

      if (settled) return settled;

      load(read).then(
        (content) => {
          if (latestRead === read) onLoad(content);
        },
        (error: unknown) => {
          if (latestRead !== read) return;
          if (!onError) throw error;

          onError(error);
        }
      );

      return undefined;
    };
  };

  return { peek, load, createReader };
};

/**
 * Inert stand-in for content still loading: any property access, call or
 * construction returns it again, and string coercion yields `''`. It never
 * passes for a thenable, an iterable, a DOM node or a Lit template part, so
 * renderers print nothing instead of crashing.
 */
export const loadingContentPlaceholder: any = /* @__PURE__ */ new Proxy(
  function loadingContent() {},
  {
    get: (_target, property) => {
      if (
        property === Symbol.toPrimitive ||
        property === 'toString' ||
        property === 'valueOf'
      ) {
        return () => '';
      }

      if (
        property === 'then' ||
        property === 'nodeType' ||
        property === Symbol.iterator ||
        (typeof property === 'string' && property.startsWith('_$'))
      ) {
        return undefined;
      }

      return loadingContentPlaceholder;
    },
    apply: () => loadingContentPlaceholder,
    construct: () => ({}),
  }
);

type SuspenseEntry = {
  /** Settles — never rejects — once the entry has left `pending`. */
  settled: Promise<void>;
  read: () => unknown;
};

const createSuspenseEntry = (promise: Promise<unknown>): SuspenseEntry => {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: unknown;

  const settled = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (error: unknown) => {
      status = 'error';
      result = error;
    }
  );

  return {
    settled,
    read: () => {
      if (status === 'pending') throw settled;
      if (status === 'error') throw result;

      return result;
    },
  };
};

/** Chunk cache read the Suspense way (see {@link createChunkSuspenseCache}). */
export type ChunkSuspenseCache = {
  /** Whether `cacheKey` holds an entry, pending or settled. */
  has: (cacheKey: string) => boolean;
  /**
   * Reads `cacheKey`, started from `promise` on the first read: throws the
   * pending promise (Suspense) or the rejection until it resolves.
   */
  read: <T>(cacheKey: string, promise: Promise<T>) => T;
  /**
   * Starts `cacheKey` ahead of render. The returned promise settles — never
   * rejects — once a `read` no longer suspends.
   */
  preload: (cacheKey: string, loader: () => Promise<unknown>) => Promise<void>;
};

/**
 * Creates the chunk cache of a Suspense binding (React, Preact): the
 * `loadChunk` of {@link resolveDynamicContent}.
 */
export const createChunkSuspenseCache = (): ChunkSuspenseCache => {
  const entries = new Map<string, SuspenseEntry>();

  const getEntry = (
    cacheKey: string,
    start: () => Promise<unknown>
  ): SuspenseEntry => {
    const existingEntry = entries.get(cacheKey);

    if (existingEntry) return existingEntry;

    const entry = createSuspenseEntry(start());
    entries.set(cacheKey, entry);

    return entry;
  };

  return {
    has: (cacheKey) => entries.has(cacheKey),
    read: <T>(cacheKey: string, promise: Promise<T>) =>
      getEntry(cacheKey, () => promise).read() as T,
    preload: (cacheKey, loader) => getEntry(cacheKey, loader).settled,
  };
};
