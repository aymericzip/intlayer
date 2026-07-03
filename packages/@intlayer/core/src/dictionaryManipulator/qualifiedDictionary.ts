import type {
  Dictionary,
  DictionaryQualifierType,
  DictionarySelector,
  DictionaryVariantValue,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Canonical order of qualifier dimensions. A key that declares both dimensions
 * always nests them in this order, with `item` innermost so it can act as the
 * collection (array) axis.
 */
export const QUALIFIER_ORDER = [
  'variant',
  'item',
] as const satisfies readonly DictionaryQualifierType[];

/**
 * Separator joining per-dimension ids into a composite entry id. Also used as
 * the chunk path separator in dynamic mode.
 */
export const COMPOSITE_ID_SEPARATOR = '/';

/**
 * Characters kept verbatim in an encoded qualifier segment. Everything else is
 * percent-encoded so a segment can never contain the composite-id separator
 * (`/`), path-hostile characters (`\` `:` `*` `?` `"` `<` `>` `|`, control
 * chars), or characters that would break the generated loader modules (`'`).
 */
const SEGMENT_UNSAFE_CHARS = /[^A-Za-z0-9._&=-]/g;

/**
 * Stricter set for the components of an object variant: also encodes `&` and
 * `=` so the `field=value&field=value` serialization stays unambiguous.
 */
const COMPONENT_UNSAFE_CHARS = /[^A-Za-z0-9._-]/g;

/** Percent-encodes one UTF-16 code unit as a fixed-width `%XXXX` run. */
const percentEncodeChar = (char: string): string =>
  `%${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`;

const encodeSegmentText = (raw: string, unsafeChars: RegExp): string => {
  // Bare '%' cannot be produced by encoding (every encoded run is %XXXX),
  // so it is a safe stand-in for the empty string.
  if (raw === '') return '%';

  const encoded = raw.replace(unsafeChars, percentEncodeChar);

  // '.' and '..' are path navigation on every filesystem — encode the dots.
  if (encoded === '.' || encoded === '..') {
    return encoded.replace(/\./g, '%002E');
  }

  return encoded;
};

/**
 * Canonical serialization of a single variant value into its identity string —
 * the variant segment of a composite id, the chunk directory name in dynamic
 * mode, and the runtime matching key.
 *
 * - `undefined` → `'default'` (the implicit fallback variant)
 * - a string → the string itself (a named variant)
 * - an object → its sorted `key=value` pairs joined by `&`
 *   (e.g. `{ userId: '123', id: 'abc' }` → `'id=abc&userId=123'`)
 *
 * Characters that are unsafe in file paths or generated code are
 * percent-encoded (fixed-width `%XXXX` runs, injective). Common names —
 * letters, digits, `-` `_` `.` — are left untouched. Both the declaration and
 * the selector go through this function, so encoding never affects matching.
 *
 * Two variants resolve to the same entry iff their serializations are equal, so
 * an object variant in a selector must equal the one declared on the dictionary.
 */
export const serializeVariant = (
  variant: DictionaryVariantValue | undefined
): string => {
  if (variant === undefined) return 'default';
  if (typeof variant === 'string') {
    return encodeSegmentText(variant, SEGMENT_UNSAFE_CHARS);
  }

  return Object.keys(variant)
    .sort()
    .map(
      (field) =>
        `${encodeSegmentText(field, COMPONENT_UNSAFE_CHARS)}=${encodeSegmentText(String(variant[field]), COMPONENT_UNSAFE_CHARS)}`
    )
    .join('&');
};

/**
 * Normalizes the `variant` field of a dictionary into the list of variant ids
 * the declaration registers under. A single value yields one id; an **array**
 * fans out into one id per element (duplicates collapsed). Returns `undefined`
 * when the dictionary does not declare the variant dimension (no `variant`
 * field, or an empty array).
 */
export const getVariantIds = (
  variant: Dictionary['variant']
): string[] | undefined => {
  if (variant === undefined) return undefined;

  const values = Array.isArray(variant) ? variant : [variant];
  if (values.length === 0) return undefined;

  return [...new Set(values.map(serializeVariant))];
};

/**
 * Returns the qualifier dimensions declared on a dictionary, in canonical
 * order (`variant → item`). Empty when the dictionary is unqualified
 * (plain dictionary or shared base content of a qualified group).
 */
export const getDictionaryQualifierTypes = (
  dictionary: Dictionary
): DictionaryQualifierType[] => {
  const declaredQualifiers: DictionaryQualifierType[] = [];

  if (getVariantIds(dictionary.variant) !== undefined) {
    declaredQualifiers.push('variant');
  }
  if (typeof dictionary.item === 'number') declaredQualifiers.push('item');

  return declaredQualifiers;
};

/**
 * Returns the qualifier identifiers of a dictionary for the given qualifier
 * dimension — the candidate segments of the composite entry ids.
 *
 * - 'variant' → the serialized variant id(s); an array variant yields one id
 *   per element (declaration-side fan-out)
 * - 'item' → the item index as a single-element list
 */
export const getDictionaryQualifierIds = (
  dictionary: Dictionary,
  qualifierType: DictionaryQualifierType
): string[] | undefined => {
  if (qualifierType === 'variant') {
    return getVariantIds(dictionary.variant);
  }
  return dictionary.item === undefined ? undefined : [String(dictionary.item)];
};

/**
 * Builds every composite entry id of a dictionary — the cartesian product of
 * its per-dimension id lists, joined in canonical order. A dictionary with a
 * plain (non-array) variant yields exactly one id; an array variant fans out
 * into one id per element. `undefined` when a dimension of the set is missing.
 */
export const getDictionaryCompositeIds = (
  dictionary: Dictionary,
  qualifierTypes: DictionaryQualifierType[]
): string[] | undefined => {
  let compositeIds: string[] = [''];

  for (const qualifierType of qualifierTypes) {
    const ids = getDictionaryQualifierIds(dictionary, qualifierType);
    if (ids === undefined) return undefined;

    compositeIds = compositeIds.flatMap((prefix) =>
      ids.map((id) =>
        prefix === '' ? id : `${prefix}${COMPOSITE_ID_SEPARATOR}${id}`
      )
    );
  }

  return compositeIds;
};

/**
 * Tests whether a composite entry id matches a selector across every declared
 * dimension. Segments are compared in their encoded form (both the stored id
 * and the selector go through {@link serializeVariant}). The `item` dimension
 * matches any value when the selector does not provide one (open collection
 * axis).
 */
const compositeIdMatchesSelector = (
  compositeId: string,
  qualifierTypes: DictionaryQualifierType[],
  selector: DictionarySelector | undefined
): boolean => {
  const segments = compositeId.split(COMPOSITE_ID_SEPARATOR);

  return qualifierTypes.every((qualifierType, index) => {
    if (qualifierType === 'variant') {
      return segments[index] === serializeVariant(selector?.variant);
    }

    // qualifierType === 'item'
    return (
      selector?.item === undefined || segments[index] === String(selector.item)
    );
  });
};

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
 * qualifier coordinates decoded from that id (`variant`, `item`).
 *
 * This keeps the resolver's transform code unchanged: it still sees a
 * `{ key, content, variant?, item? }` shape, even though the stored format no
 * longer duplicates those fields per entry. The `variant` coordinate stays in
 * its serialized (encoded) form, e.g. `'id=abc&userId=123'` — matching happens
 * on the composite id segments, never on this reconstructed field.
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

  return entry;
};

/**
 * Resolves a dictionary (or qualified dictionary group) against a selector,
 * across every declared dimension.
 *
 * - Plain dictionary → returned as-is (selector ignored)
 * - `item` declared but not selected → every matching entry ordered by index
 * - `item` selected → the matching entry or null
 * - `variant` defaults to the `default` entry when not selected; an object
 *   variant resolves only when the selector provides an equal object
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

  const itemAxisOpen =
    qualifierTypes.includes('item') && selector?.item === undefined;

  const matchedEntries = Object.keys(content)
    .filter((compositeId) =>
      compositeIdMatchesSelector(compositeId, qualifierTypes, selector)
    )
    .map((compositeId) =>
      reconstructQualifiedEntry(dictionaryOrGroup, compositeId)
    );

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
    .map((selectorKey) => {
      const value = selector[selectorKey as keyof DictionarySelector];
      const serialized =
        selectorKey === 'variant'
          ? serializeVariant(value as Parameters<typeof serializeVariant>[0])
          : String(value);
      return `${selectorKey}:${serialized}`;
    })
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
 * variants, possibly combined) from a plain dynamic loader map.
 */
export const isQualifiedDynamicLoaderMap = (
  value: unknown
): value is QualifiedDynamicLoaderMap =>
  typeof value === 'object' &&
  value !== null &&
  QUALIFIER_DYNAMIC_TYPES_KEY in value;

/**
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

    const segment =
      dimension === 'variant'
        ? serializeVariant(selector?.variant)
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
 * `variant → item`): `variant` defaults to `default` (or descends by the
 * serialized object identity), and `item` either narrows to the selected index
 * or — when no item is given — expands into every sibling chunk (the collection
 * axis). Semantics mirror {@link resolveQualifiedDictionary} so dynamic and
 * static modes behave alike.
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
