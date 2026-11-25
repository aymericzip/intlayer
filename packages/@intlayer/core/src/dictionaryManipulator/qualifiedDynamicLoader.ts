import {
  QUALIFIER_DYNAMIC_METADATA_KEY,
  QUALIFIER_DYNAMIC_TYPES_KEY,
} from '@intlayer/config/defaultValues';
import type {
  Dictionary,
  DictionaryMetadata,
  DictionaryQualifierType,
  DictionarySelector,
} from '@intlayer/types/dictionary';
import {
  COMPOSITE_ID_SEPARATOR,
  compareItemSegments,
  matchQualifiedEntryIds,
  resolveEffectiveVariantId,
  serializeItem,
  serializeVariantChain,
} from './qualifiedDictionary';

/**
 * Marker properties of a qualified dynamic loader map: the ordered qualifier
 * dimensions, and the per-locale metadata index loaders. Defined in
 * `@intlayer/config` so the code generator and the build plugins can read them
 * without pulling the runtime in, and re-exported here where their consumers
 * live.
 */
export { QUALIFIER_DYNAMIC_METADATA_KEY, QUALIFIER_DYNAMIC_TYPES_KEY };

/** Cache-key suffix of a metadata index chunk (never a valid composite id). */
const METADATA_INDEX_CACHE_SEGMENT = '#metadata';

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
  /** Per-locale loaders of the metadata index (absent in older builds). */
  [QUALIFIER_DYNAMIC_METADATA_KEY]?: Record<string, DynamicDictionaryLoader>;
  [locale: string]:
    | QualifiedDynamicLoaderTree
    | DictionaryQualifierType[]
    | Record<string, DynamicDictionaryLoader>
    | undefined;
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
export type CollectedChunk = {
  cacheKey: string;
  loader: DynamicDictionaryLoader;
  /** The chunk, already loaded by the entry point's preload. */
  preloaded?: Dictionary;
};

/** The chunks a dynamic read targets. */
export type CollectedChunks = {
  /** True when the `item` axis is open (collection result → array). */
  itemAxisOpen: boolean;
  /** True when a required coordinate is absent (result → [] or null). */
  missed: boolean;
  /** The chunks the selector targets (in collection order for the item axis). */
  chunks: CollectedChunk[];
  /** True when the single chunk is the metadata index, not entry chunks. */
  readsMetadataIndex?: boolean;
};

/**
 * Walks the loader tree following the selector and collects the chunk loaders
 * it targets.
 *
 * Walks one dimension at a time (canonical order `variant → item`): `variant`
 * descends by the serialized id, falling back to `default` when the selected
 * variant has no chunk of its own, and `item` either narrows to the selected
 * index or — when no item is given — expands into every sibling chunk (the
 * collection axis). Semantics mirror `resolveQualifiedDictionary` so dynamic
 * and static modes behave alike.
 */
export const collectQualifiedChunks = (
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

  // Listing a collection's metadata reads the per-locale index instead of
  // every entry chunk. A pinned entry keeps loading its own chunk, which
  // carries its metadata and is usually loaded for its content anyway.
  const metadataIndexLoader =
    selector?.metadataOnly && itemAxisOpen
      ? loaderMap[QUALIFIER_DYNAMIC_METADATA_KEY]?.[locale]
      : undefined;

  if (metadataIndexLoader) {
    return {
      itemAxisOpen,
      missed: false,
      readsMetadataIndex: true,
      chunks: [
        {
          cacheKey: `${key}.${locale}.${METADATA_INDEX_CACHE_SEGMENT}`,
          loader: metadataIndexLoader,
        },
      ],
    };
  }

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
      for (const segment of Object.keys(tree).sort(compareItemSegments)) {
        walk(tree[segment]!, rest, [...segments, segment]);
      }
      return true;
    }

    // A pinned item descends by its serialized id. A variant with no chunk of
    // its own falls back to the `default` chunk, so only the entries that
    // actually differ need to be emitted.
    const segment =
      dimension === 'item' && selector?.item !== undefined
        ? serializeItem(selector.item)
        : resolveEffectiveVariantId(
            serializeVariantChain(selector?.variant),
            (variantId) => tree[variantId] !== undefined
          );

    const child = tree[segment];
    if (!child) return false;

    return walk(child, rest, [...segments, segment]);
  };

  const found = walk(localeTree, qualifierTypes, []);

  return { itemAxisOpen, missed: !found, chunks };
};

/**
 * Reads the metadata a selector targets out of a loaded metadata index, with
 * the same entry matching as static mode.
 *
 * @param metadataIndex - The loaded index chunk (`metadata` maps composite ids).
 * @param qualifierTypes - The key's dimensions, in canonical order.
 * @param selector - The selector splitting the dimensions.
 */
export const readMetadataIndex = (
  metadataIndex: Dictionary | undefined,
  qualifierTypes: DictionaryQualifierType[],
  selector: DictionarySelector | undefined
): DictionaryMetadata[] => {
  const indexMetadata = (metadataIndex?.metadata ?? {}) as Record<
    string,
    DictionaryMetadata
  >;

  return matchQualifiedEntryIds(
    Object.keys(indexMetadata),
    qualifierTypes,
    selector
  ).matchedIds.map((compositeId) => indexMetadata[compositeId]!);
};
