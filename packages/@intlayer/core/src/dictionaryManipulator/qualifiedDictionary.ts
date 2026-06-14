import type {
  Dictionary,
  DictionaryQualifierType,
  DictionarySelector,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Selector keys that are reserved for dictionary resolution and therefore
 * excluded from meta field matching.
 */
const RESERVED_SELECTOR_KEYS = ['locale', 'item', 'variant'] as const;

/**
 * Canonical order of qualifier dimensions. A key that declares several
 * dimensions always nests them in this order, with `item` innermost so it can
 * act as the collection (array) axis.
 */
export const QUALIFIER_ORDER = [
  'variant',
  'meta',
  'item',
] as const satisfies readonly DictionaryQualifierType[];

/**
 * Separator joining per-dimension ids into a composite entry id. Also used as
 * the chunk path separator in dynamic mode.
 */
export const COMPOSITE_ID_SEPARATOR = '/';

/**
 * Returns the qualifier dimensions declared on a dictionary, in canonical
 * order (`variant → meta → item`). Empty when the dictionary is unqualified
 * (plain dictionary or shared base content of a qualified group).
 */
export const getDictionaryQualifierTypes = (
  dictionary: Dictionary
): DictionaryQualifierType[] => {
  const declaredQualifiers: DictionaryQualifierType[] = [];

  if (typeof dictionary.variant === 'string')
    declaredQualifiers.push('variant');
  if (dictionary.meta !== undefined) declaredQualifiers.push('meta');
  if (typeof dictionary.item === 'number') declaredQualifiers.push('item');

  return declaredQualifiers;
};

/**
 * Returns the qualifier identifier of a dictionary for the given qualifier
 * dimension — one segment of the composite entry id.
 *
 * - 'variant' → the variant name
 * - 'meta' → the `meta.id` discriminator
 * - 'item' → the item index as string
 */
export const getDictionaryQualifierId = (
  dictionary: Dictionary,
  qualifierType: DictionaryQualifierType
): string | undefined => {
  if (qualifierType === 'variant') return dictionary.variant;
  if (qualifierType === 'meta') {
    const metaId = dictionary.meta?.id;
    return metaId === undefined ? undefined : String(metaId);
  }
  return dictionary.item === undefined ? undefined : String(dictionary.item);
};

/**
 * Returns the per-dimension id segments of a dictionary for the given ordered
 * dimension set, or `undefined` when the dictionary does not declare every
 * dimension of the set.
 */
export const getDictionaryQualifierSegments = (
  dictionary: Dictionary,
  qualifierTypes: DictionaryQualifierType[]
): string[] | undefined => {
  const segments: string[] = [];

  for (const qualifierType of qualifierTypes) {
    const id = getDictionaryQualifierId(dictionary, qualifierType);
    if (id === undefined) return undefined;
    segments.push(id);
  }

  return segments;
};

/**
 * Builds the composite entry id of a dictionary — its per-dimension id segments
 * joined in canonical order. `undefined` when a dimension is missing.
 */
export const getDictionaryCompositeId = (
  dictionary: Dictionary,
  qualifierTypes: DictionaryQualifierType[]
): string | undefined =>
  getDictionaryQualifierSegments(dictionary, qualifierTypes)?.join(
    COMPOSITE_ID_SEPARATOR
  );

/**
 * Checks that every declared meta field is provided and equal in the selector.
 * Reserved keys (`locale`, `item`, `variant`) are skipped; `meta.id` is part of
 * the equality check.
 */
const metaFieldsMatch = (
  meta: Dictionary['meta'] | undefined,
  selector: DictionarySelector | undefined
): boolean => {
  if (!meta) return false;

  return Object.entries(meta).every(([metaField, declaredValue]) => {
    if ((RESERVED_SELECTOR_KEYS as readonly string[]).includes(metaField)) {
      return true;
    }

    const providedValue = selector?.[metaField];

    return (
      providedValue !== undefined &&
      String(providedValue) === String(declaredValue)
    );
  });
};

/**
 * Tests whether a group entry matches a selector across every declared
 * dimension. The `item` dimension matches any value when the selector does not
 * provide one (open collection axis).
 */
const entryMatchesSelector = (
  entry: Dictionary,
  qualifierTypes: DictionaryQualifierType[],
  selector: DictionarySelector | undefined
): boolean =>
  qualifierTypes.every((qualifierType) => {
    if (qualifierType === 'variant') {
      return entry.variant === (selector?.variant ?? 'default');
    }

    if (qualifierType === 'item') {
      return (
        selector?.item === undefined ||
        String(entry.item) === String(selector.item)
      );
    }

    // qualifierType === 'meta'
    return metaFieldsMatch(entry.meta, selector);
  });

/**
 * Type guard discriminating a `QualifiedDictionaryGroup` (merge output of a
 * qualified key) from a plain `Dictionary`. Both carry a `content` field; only
 * the group declares `qualifierTypes`, which is therefore the discriminator.
 */
export const isQualifiedDictionaryGroup = (
  value: unknown
): value is QualifiedDictionaryGroup =>
  typeof value === 'object' &&
  value !== null &&
  'qualifierTypes' in value &&
  Array.isArray((value as { qualifierTypes: unknown }).qualifierTypes) &&
  'content' in value;

/**
 * Reconstructs a resolvable {@link Dictionary} from a single entry of a
 * qualified group: the content node stored under its composite id, plus the
 * qualifier coordinates decoded from that id (`variant`, `item`) and the
 * preserved `meta` object for the meta dimension.
 *
 * This keeps the resolver's matching/transform code unchanged: it still sees a
 * `{ key, content, variant?, item?, meta? }` shape, even though the stored
 * format no longer duplicates those fields per entry.
 */
export const reconstructQualifiedEntry = (
  group: QualifiedDictionaryGroup,
  compositeId: string
): Dictionary => {
  const segments = compositeId.split(COMPOSITE_ID_SEPARATOR);

  const entry = {
    key: group.key,
    content: group.content[compositeId],
  } as Dictionary;

  group.qualifierTypes.forEach((qualifierType, index) => {
    if (qualifierType === 'variant') {
      entry.variant = segments[index];
    } else if (qualifierType === 'item') {
      entry.item = Number(segments[index]);
    }
  });

  if (group.qualifierTypes.includes('meta')) {
    const metaIndex = group.qualifierTypes.indexOf('meta');
    entry.meta = group.meta?.[compositeId] ?? { id: segments[metaIndex] };
  }

  return entry;
};

/**
 * Resolves a dictionary (or qualified dictionary group) against a selector,
 * across every declared dimension.
 *
 * - Plain dictionary → returned as-is (selector ignored)
 * - `item` declared but not selected → every matching entry ordered by index
 * - `item` selected → the matching entry or null
 * - `variant` defaults to the `default` entry when not selected
 * - `meta` requires `{ id }` and every declared meta field to match
 *
 * Dimensions compose: e.g. a variant × item key with `{ variant: 'promo' }`
 * returns every promo item as an array; adding `{ item: 2 }` narrows to one.
 */
export const resolveQualifiedDictionary = (
  dictionaryOrGroup: Dictionary | QualifiedDictionaryGroup,
  selector?: DictionarySelector
): Dictionary | Dictionary[] | null => {
  if (!isQualifiedDictionaryGroup(dictionaryOrGroup)) {
    return dictionaryOrGroup;
  }

  const { qualifierTypes, content } = dictionaryOrGroup;

  // The meta dimension cannot resolve without an id discriminator.
  if (qualifierTypes.includes('meta') && selector?.id === undefined) {
    return null;
  }

  const itemAxisOpen =
    qualifierTypes.includes('item') && selector?.item === undefined;

  const matchedEntries = Object.keys(content)
    .map((compositeId) =>
      reconstructQualifiedEntry(dictionaryOrGroup, compositeId)
    )
    .filter((entry) => entryMatchesSelector(entry, qualifierTypes, selector));

  if (itemAxisOpen) {
    return matchedEntries.sort(
      (left, right) => (left.item ?? 0) - (right.item ?? 0)
    );
  }

  return matchedEntries[0] ?? null;
};

/**
 * Splits the second argument of `getIntlayer` / `getDictionary` into the
 * effective locale and the selector object (if any).
 */
export const parseDictionarySelector = <L extends LocalesValues>(
  localeOrSelector?: L | DictionarySelector
): { locale?: L; selector?: DictionarySelector } => {
  if (typeof localeOrSelector === 'object' && localeOrSelector !== null) {
    return {
      locale: localeOrSelector.locale as L | undefined,
      selector: localeOrSelector,
    };
  }

  return { locale: localeOrSelector };
};

/**
 * Builds a stable string identity of a selector (excluding `locale`), suitable
 * for cache keys and memoization dependencies.
 */
export const getDictionarySelectorCacheKey = (
  selector?: DictionarySelector
): string => {
  if (!selector) return '';

  return Object.keys(selector)
    .filter((selectorKey) => selectorKey !== 'locale')
    .sort()
    .map((selectorKey) => `${selectorKey}:${String(selector[selectorKey])}`)
    .join('|');
};

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
 * variants / meta records, possibly combined) from a plain dynamic loader map.
 */
export const isQualifiedDynamicLoaderMap = (
  value: unknown
): value is QualifiedDynamicLoaderMap =>
  typeof value === 'object' &&
  value !== null &&
  QUALIFIER_DYNAMIC_TYPES_KEY in value;

/**
 * Resolves the content of a qualified dynamic loader map against a selector,
 * loading only the chunk(s) the selector actually targets.
 *
 * Walks the nested loader tree one dimension at a time (canonical order
 * `variant → meta → item`): `variant` defaults to `default`, `meta` descends by
 * `id`, and `item` either narrows to the selected index or — when no item is
 * given — expands into every sibling chunk (the collection axis). Meta-equality
 * is verified on the loaded chunk. Semantics mirror
 * {@link resolveQualifiedDictionary} so dynamic and static modes behave alike.
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

  // The meta dimension cannot resolve without an id discriminator.
  if (qualifierTypes.includes('meta') && selector?.id === undefined) {
    return { itemAxisOpen, missed: true, chunks: [] };
  }

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

    const segment =
      dimension === 'variant'
        ? (selector?.variant ?? 'default')
        : dimension === 'meta'
          ? String(selector?.id)
          : String(selector?.item);

    const child = tree[segment];
    if (!child) return false;

    return walk(child, rest, [...segments, segment]);
  };

  const found = walk(localeTree, qualifierTypes, []);

  return { itemAxisOpen, missed: !found, chunks };
};

/**
 * Whether a loaded chunk satisfies the selector's meta fields (no-op unless the
 * key declares a `meta` dimension).
 */
const chunkMatchesMeta = (
  loaderMap: QualifiedDynamicLoaderMap,
  dictionary: Dictionary,
  selector: DictionarySelector | undefined
): boolean =>
  !loaderMap[QUALIFIER_DYNAMIC_TYPES_KEY].includes('meta') ||
  metaFieldsMatch(dictionary.meta, selector);

/**
 * Resolves the content of a qualified dynamic loader map against a selector,
 * loading only the chunk(s) the selector actually targets.
 *
 * Walks the nested loader tree one dimension at a time (canonical order
 * `variant → meta → item`): `variant` defaults to `default`, `meta` descends by
 * `id`, and `item` either narrows to the selected index or — when no item is
 * given — expands into every sibling chunk (the collection axis). Meta-equality
 * is verified on the loaded chunk. Semantics mirror
 * {@link resolveQualifiedDictionary} so dynamic and static modes behave alike.
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
  const dictionaries = chunks
    .map(({ cacheKey, loader }) => loadChunk(cacheKey, loader()))
    .filter((dictionary) => chunkMatchesMeta(loaderMap, dictionary, selector));

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

  const dictionaries = (
    await Promise.all(chunks.map(({ loader }) => loader()))
  ).filter((dictionary) => chunkMatchesMeta(loaderMap, dictionary, selector));

  if (itemAxisOpen) return dictionaries.map(transform);

  const [dictionary] = dictionaries;
  return dictionary ? transform(dictionary) : null;
};
