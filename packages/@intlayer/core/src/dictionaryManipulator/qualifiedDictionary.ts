import type {
  Dictionary,
  DictionaryQualifierType,
  DictionarySelector,
  DictionaryVariantChain,
  DictionaryVariantValue,
  ProviderVariant,
  ProviderVariantMap,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Separator joining per-dimension ids into a composite entry id. Also used as
 * the chunk path separator in dynamic mode.
 */
export const COMPOSITE_ID_SEPARATOR = '/';

/**
 * Identity of the implicit fallback variant. A selector that pins no variant
 * resolves to it, and a variant that declares no entry of its own falls back to
 * it — so a key only has to ship the entries that actually differ.
 */
export const DEFAULT_VARIANT_ID = 'default';

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
  if (variant === undefined) return DEFAULT_VARIANT_ID;
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
 * Serializes the variant coordinate of a selector into the ordered list of
 * candidate ids to try, so a single value and a preference chain share one code
 * path downstream.
 *
 * - `undefined` → `['default']`
 * - a single value → its one serialization
 * - a chain → one serialization per entry, order preserved
 *
 * An empty chain is treated as "no variant pinned" (`['default']`) rather than
 * as an unsatisfiable request.
 */
export const serializeVariantChain = (
  variant: DictionaryVariantChain | undefined
): string[] => {
  if (!Array.isArray(variant)) {
    return [serializeVariant(variant as DictionaryVariantValue | undefined)];
  }

  if (variant.length === 0) return [DEFAULT_VARIANT_ID];

  return variant.map(serializeVariant);
};

/**
 * Resolves the variant id a selector actually targets among the ids a key
 * declares — the sparse-override fallback.
 *
 * Candidates are tried in order and the first one the key declares wins.
 * Otherwise the key falls back to its `default` entry, so a variant only has to
 * be declared where its wording differs. When the key declares no `default`
 * either, the first candidate is returned unchanged and the caller resolves to
 * `null` / `[]`.
 *
 * @param requestedVariantIds - The serialized ids the selector asks for, in
 *                              preference order (a single value is a 1-element
 *                              list).
 * @param isVariantIdDeclared - Whether the key declares an entry for an id.
 */
export const resolveEffectiveVariantId = (
  requestedVariantIds: string[],
  isVariantIdDeclared: (variantId: string) => boolean
): string => {
  for (const requestedVariantId of requestedVariantIds) {
    if (isVariantIdDeclared(requestedVariantId)) return requestedVariantId;
  }

  return isVariantIdDeclared(DEFAULT_VARIANT_ID)
    ? DEFAULT_VARIANT_ID
    : (requestedVariantIds[0] ?? DEFAULT_VARIANT_ID);
};

/**
 * Tests whether a composite entry id matches a selector across every declared
 * dimension. Segments are compared in their encoded form (both the stored id
 * and the selector go through {@link serializeVariant}). The `item` dimension
 * matches any value when the selector does not provide one (open collection
 * axis); the `variant` dimension is compared against the already-resolved
 * effective id, so the fallback is applied consistently across dimensions.
 */
const compositeIdMatchesSelector = (
  compositeId: string,
  qualifierTypes: DictionaryQualifierType[],
  selector: DictionarySelector | undefined,
  effectiveVariantId: string
): boolean => {
  const segments = compositeId.split(COMPOSITE_ID_SEPARATOR);

  return qualifierTypes.every((qualifierType, index) => {
    if (qualifierType === 'variant') {
      return segments[index] === effectiveVariantId;
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
 * - `variant` defaults to the `default` entry when not selected, and falls back
 *   to it when the selected variant declares no entry of its own; an object
 *   variant resolves only when the selector provides an equal object (or, again,
 *   through the `default` fallback)
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

  const compositeIds = Object.keys(content);
  const variantIndex = qualifierTypes.indexOf('variant');

  const effectiveVariantId =
    variantIndex === -1
      ? DEFAULT_VARIANT_ID
      : resolveEffectiveVariantId(
          serializeVariantChain(selector?.variant),
          (variantId) =>
            compositeIds.some(
              (compositeId) =>
                compositeId.split(COMPOSITE_ID_SEPARATOR)[variantIndex] ===
                variantId
            )
        );

  const matchedEntries = compositeIds
    .filter((compositeId) =>
      compositeIdMatchesSelector(
        compositeId,
        qualifierTypes,
        selector,
        effectiveVariantId
      )
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
 * Resolves the variant a provider pins for one dictionary key.
 *
 * A string or a chain applies to every key as-is. A plain object is the per-key
 * map: the entry for `dictionaryKey` wins, falling back to the reserved
 * `default` entry, and `undefined` when neither is present (the key then
 * resolves to its own `default` variant, i.e. the behaviour without a provider
 * variant at all).
 *
 * A plain object is **always** the map here — never a structured variant value,
 * which is why a structured variant has to be nested (`{ default: { id } }`).
 *
 * @param providerVariant - The `variant` prop of the surrounding provider.
 * @param dictionaryKey - The key being read.
 */
export const resolveProviderVariant = (
  providerVariant: ProviderVariant | undefined,
  dictionaryKey: string
): DictionaryVariantChain | undefined => {
  if (providerVariant === undefined) return undefined;

  if (typeof providerVariant === 'string' || Array.isArray(providerVariant)) {
    return providerVariant as DictionaryVariantChain;
  }

  const variantMap = providerVariant as ProviderVariantMap;

  return variantMap[dictionaryKey] ?? variantMap[DEFAULT_VARIANT_ID];
};

/**
 * Builds the effective second argument of a dictionary read by layering the
 * provider defaults under the call-site one — the single place the `locale` and
 * `variant` context defaults are applied, shared by every framework binding.
 *
 * Precedence, per dimension independently:
 * - a call-site selector always wins; `{ variant: 'x' }` **replaces** the
 *   provider chain rather than extending it
 * - otherwise the provider value applies
 *
 * Returns a bare locale (not a selector object) whenever no variant is in play,
 * so the existing fast path — and the cache keys built from it — are unchanged
 * for projects that never use variants.
 */
export const resolveDictionaryArgument = (params: {
  localeOrSelector?: LocalesValues | DictionarySelector;
  contextLocale?: LocalesValues;
  contextVariant?: ProviderVariant;
  dictionaryKey: string;
}): LocalesValues | DictionarySelector | undefined => {
  const { localeOrSelector, contextLocale, contextVariant, dictionaryKey } =
    params;

  const callSelector =
    typeof localeOrSelector === 'object' && localeOrSelector !== null
      ? localeOrSelector
      : undefined;

  const callLocale = callSelector
    ? callSelector.locale
    : (localeOrSelector as LocalesValues | undefined);

  // The context locale is typed as widely as the runtime allows, while a
  // selector narrows `locale` to the declared ones — the value is the same.
  const locale = (callLocale ?? contextLocale) as DictionarySelector['locale'];

  // A call-site variant is authoritative; the provider only fills the gap.
  const variant =
    callSelector?.variant ??
    resolveProviderVariant(contextVariant, dictionaryKey);

  if (variant === undefined) {
    // Nothing to add: keep the argument in its original shape so the identity
    // built from it stays byte-identical to the pre-variant behaviour.
    return callSelector
      ? { ...callSelector, locale }
      : (locale as LocalesValues | undefined);
  }

  return { ...callSelector, locale, variant };
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
          ? serializeVariantChain(
              value as DictionaryVariantChain | undefined
            ).join(',')
          : String(value);
      return `${selectorKey}:${serialized}`;
    })
    .join('|');
};
