import type {
  Dictionary,
  DictionaryQualifierType,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import {
  COMPOSITE_ID_SEPARATOR,
  resolveEffectiveVariantId,
  serializeVariantChain,
} from './qualifiedDictionary';

/**
 * Marker property carrying the ordered qualifier dimensions on a dynamic loader
 * map. Its presence distinguishes a qualified group loader map (a nested tree
 * of chunks) from a plain dynamic loader map (one chunk per `locale`). Prefixed
 * and unlikely to collide with a real locale code.
 */
export const QUALIFIER_DYNAMIC_TYPES_KEY = '__intlayerQualifierTypes';

/**
 * A lazily-imported per-locale dictionary chunk loader.
 */
export type DynamicDictionaryLoader = () => Promise<Dictionary>;

/**
 * Nested tree of chunk loaders: one nesting level per declared dimension (in
 * canonical order), leaves are loaders.
 */
export type QualifiedDynamicLoaderTree = {
  [segment: string]: QualifiedDynamicLoaderTree | DynamicDictionaryLoader;
};

/**
 * Default export shape of a generated dynamic entry point for a qualified key.
 * One nesting level per dimension under each locale, plus the dimension marker.
 *
 * ```ts
 * {
 *   __intlayerQualifierTypes: ['variant', 'item'],
 *   en: { promo: { '1': () => import('./json/x/promo/1/en.json'), … }, … },
 *   fr: { … },
 * }
 * ```
 */
export type QualifiedDynamicLoaderMap = {
  [QUALIFIER_DYNAMIC_TYPES_KEY]: DictionaryQualifierType[];
  [locale: string]: QualifiedDynamicLoaderTree | DictionaryQualifierType[];
};

/**
 * Type guard discriminating a qualified dynamic loader map (collections /
 * variants, possibly combined) from a plain dynamic loader map.
 */
export const isQualifiedDynamicLoaderMap = (
  value: unknown
): value is QualifiedDynamicLoaderMap =>
  typeof value === 'object' &&
  value !== null &&
  QUALIFIER_DYNAMIC_TYPES_KEY in value;

/** One targeted chunk: its stable cache key and lazy loader. */
type CollectedChunk = {
  cacheKey: string;
  loader: DynamicDictionaryLoader;
};

type CollectedChunks = {
  /** True when the `item` axis is open (collection result → array). */
  itemAxisOpen: boolean;
  /** True when a required coordinate is absent (result → [] or null). */
  missed: boolean;
  /** The chunks the selector targets (in collection order for the item axis). */
  chunks: CollectedChunk[];
};

/**
 * Walks the loader tree following the selector and collects the chunk loaders
 * it targets — shared by the sync ({@link resolveQualifiedDynamicContent}) and
 * async ({@link resolveQualifiedDynamicContentAsync}) resolvers.
 */
const collectQualifiedChunks = (
  loaderMap: QualifiedDynamicLoaderMap,
  key: string,
  locale: string,
  selector: DictionarySelector | undefined
): CollectedChunks => {
  const qualifierTypes = loaderMap[QUALIFIER_DYNAMIC_TYPES_KEY];
  const localeTree = loaderMap[locale] as
    | QualifiedDynamicLoaderTree
    | undefined;

  const itemAxisOpen =
    qualifierTypes.includes('item') && selector?.item === undefined;

  if (!localeTree) return { itemAxisOpen, missed: true, chunks: [] };

  const chunks: CollectedChunk[] = [];

  const walk = (
    node: QualifiedDynamicLoaderTree | DynamicDictionaryLoader,
    dimensions: DictionaryQualifierType[],
    segments: string[]
  ): boolean => {
    if (dimensions.length === 0) {
      chunks.push({
        cacheKey: `${key}.${locale}.${segments.join(COMPOSITE_ID_SEPARATOR)}`,
        loader: node as DynamicDictionaryLoader,
      });
      return true;
    }

    const [dimension, ...rest] = dimensions;
    const tree = node as QualifiedDynamicLoaderTree;

    if (dimension === 'item' && selector?.item === undefined) {
      // Open collection axis: fan out into every sibling chunk, ordered.
      for (const segment of Object.keys(tree).sort(
        (left, right) => Number(left) - Number(right)
      )) {
        walk(tree[segment]!, rest, [...segments, segment]);
      }
      return true;
    }

    // A variant with no chunk of its own falls back to the `default` chunk, so
    // only the entries that actually differ need to be emitted.
    const segment =
      dimension === 'variant'
        ? resolveEffectiveVariantId(
            serializeVariantChain(selector?.variant),
            (variantId) => tree[variantId] !== undefined
          )
        : String(selector?.item);

    const child = tree[segment];
    if (!child) return false;

    return walk(child, rest, [...segments, segment]);
  };

  const found = walk(localeTree, qualifierTypes, []);

  return { itemAxisOpen, missed: !found, chunks };
};

/**
 * Resolves the content of a qualified dynamic loader map against a selector,
 * loading only the chunk(s) the selector actually targets.
 *
 * Walks the nested loader tree one dimension at a time (canonical order
 * `variant → item`): `variant` descends by the serialized id, falling back to
 * `default` when the selected variant has no chunk of its own, and `item`
 * either narrows to the selected index or — when no item is given — expands
 * into every sibling chunk (the collection axis). Semantics mirror
 * `resolveQualifiedDictionary` so dynamic and static modes behave alike.
 *
 * The Suspense mechanism is injected through `loadChunk` so the same logic
 * serves both the client (suspender cache) and the server (`react.use`). Every
 * targeted loader is started before the first chunk is read, so sibling chunks
 * load in parallel rather than waterfalling.
 *
 * @param loaderMap - The qualified dynamic loader map (entry point default export).
 * @param key - The dictionary key (used to build stable chunk cache keys).
 * @param locale - The resolved locale to load chunks for.
 * @param selector - The selector splitting the qualifier dimensions.
 * @param loadChunk - Reads a started chunk promise, suspending until it resolves.
 * @param transform - Turns a resolved chunk dictionary into final content.
 */
export const resolveQualifiedDynamicContent = <Content>(params: {
  loaderMap: QualifiedDynamicLoaderMap;
  key: string;
  locale: string;
  selector: DictionarySelector | undefined;
  loadChunk: (cacheKey: string, promise: Promise<Dictionary>) => Dictionary;
  transform: (dictionary: Dictionary) => Content;
}): Content | Content[] | null => {
  const { loaderMap, key, locale, selector, loadChunk, transform } = params;

  const { itemAxisOpen, missed, chunks } = collectQualifiedChunks(
    loaderMap,
    key,
    locale,
    selector
  );

  if (missed) return itemAxisOpen ? [] : null;

  // Start every loader before reading, so siblings load in parallel.
  const dictionaries = chunks.map(({ cacheKey, loader }) =>
    loadChunk(cacheKey, loader())
  );

  if (itemAxisOpen) return dictionaries.map(transform);

  const [dictionary] = dictionaries;
  return dictionary ? transform(dictionary) : null;
};

/**
 * Async counterpart of {@link resolveQualifiedDynamicContent} for frameworks
 * that load dictionaries with `await` instead of Suspense (Vue, Svelte, Lit,
 * vanilla). Awaits every targeted chunk in parallel, then resolves identically.
 *
 * @param loaderMap - The qualified dynamic loader map.
 * @param key - The dictionary key (used to build stable chunk cache keys).
 * @param locale - The resolved locale to load chunks for.
 * @param selector - The selector splitting the qualifier dimensions.
 * @param transform - Turns a resolved chunk dictionary into final content.
 */
export const resolveQualifiedDynamicContentAsync = async <Content>(params: {
  loaderMap: QualifiedDynamicLoaderMap;
  key: string;
  locale: string;
  selector: DictionarySelector | undefined;
  transform: (dictionary: Dictionary) => Content;
}): Promise<Content | Content[] | null> => {
  const { loaderMap, key, locale, selector, transform } = params;

  const { itemAxisOpen, missed, chunks } = collectQualifiedChunks(
    loaderMap,
    key,
    locale,
    selector
  );

  if (missed) return itemAxisOpen ? [] : null;

  const dictionaries = await Promise.all(chunks.map(({ loader }) => loader()));

  if (itemAxisOpen) return dictionaries.map(transform);

  const [dictionary] = dictionaries;
  return dictionary ? transform(dictionary) : null;
};
