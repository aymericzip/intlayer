import { log } from '@intlayer/config/built';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import type {
  Dictionary,
  DictionaryQualifierType,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { mergeDictionaries } from './mergeDictionaries';
import {
  COMPOSITE_ID_SEPARATOR,
  DEFAULT_VARIANT_ID,
} from './qualifiedDictionary';
import {
  getDictionaryCompositeIds,
  getDictionaryQualifierTypes,
  QUALIFIER_ORDER,
} from './qualifiedDictionaryDeclaration';

/**
 * Merges sibling dictionaries sharing the same key, honouring qualifiers.
 *
 * - No dictionary declares a qualifier → behaves exactly like
 *   `mergeDictionaries` (single merged dictionary).
 * - At least one dictionary declares a qualifier → the group's dimension set is
 *   the union of every declared dimension (in canonical order
 *   `variant → item`). Dictionaries are grouped by their composite id
 *   (one segment per dimension), merged within each group (locale completion /
 *   priority overrides preserved), and a `QualifiedDictionaryGroup` is returned.
 *   Unqualified siblings act as shared base content merged into every entry —
 *   and, on a variant-only key, also materialize the `default` entry when no
 *   declaration claims it. Every other variant entry then inherits from that
 *   `default` entry, so a variant only declares the fields it overrides.
 *
 * Every qualified entry must declare ALL dimensions of the group; an entry that
 * declares only a subset is ambiguous and is rejected with an error log.
 */
export const mergeQualifiedDictionaries = (
  dictionaries: Dictionary[]
): Dictionary | QualifiedDictionaryGroup => {
  const perDictionaryTypes = dictionaries.map(getDictionaryQualifierTypes);

  const declaredDimensions = new Set<DictionaryQualifierType>();
  for (const types of perDictionaryTypes) {
    for (const type of types) declaredDimensions.add(type);
  }

  // Canonical order, restricted to the dimensions actually declared.
  const groupQualifierTypes = QUALIFIER_ORDER.filter((qualifierType) =>
    declaredDimensions.has(qualifierType)
  );

  if (groupQualifierTypes.length === 0) {
    return mergeDictionaries(dictionaries);
  }

  const appLogger = getAppLogger({ log });

  const baseDictionaries: Dictionary[] = [];
  const entriesDictionaries = new Map<string, Dictionary[]>();

  dictionaries.forEach((dictionary, index) => {
    if (perDictionaryTypes[index]?.length === 0) {
      baseDictionaries.push(dictionary);
      return;
    }

    // A dictionary may map to several composite ids (array variant fan-out):
    // its content is registered under every id it lists.
    const compositeIds = getDictionaryCompositeIds(
      dictionary,
      groupQualifierTypes
    );

    if (compositeIds === undefined) {
      appLogger(
        `Dictionary ${colorizeKey(dictionary.key)} declares (${perDictionaryTypes[index].join(', ')}) but the key's dimensions are (${groupQualifierTypes.join(', ')}); every entry must declare all of them. Entry ignored${dictionary.filePath ? ` - ${dictionary.filePath}` : ''}.`,
        { level: 'error' }
      );
      return;
    }

    for (const compositeId of compositeIds) {
      const existingEntries = entriesDictionaries.get(compositeId) ?? [];
      existingEntries.push(dictionary);
      entriesDictionaries.set(compositeId, existingEntries);
    }
  });

  // Unqualified siblings are the key's base content. On a variant key they also
  // materialize the `default` entry when no declaration claims it, so the key
  // still resolves when no variant is selected — and so variants that declare
  // no entry of their own can fall back to it. Registering an empty entry list
  // is enough: the merge loop below appends the base dictionaries to it.
  //
  // Composite (variant × item) keys are excluded: base content carries no item
  // index, so it cannot be placed on the collection axis.
  const isVariantOnlyGroup =
    groupQualifierTypes.length === 1 && groupQualifierTypes[0] === 'variant';

  if (
    isVariantOnlyGroup &&
    baseDictionaries.length > 0 &&
    !entriesDictionaries.has(DEFAULT_VARIANT_ID)
  ) {
    entriesDictionaries.set(DEFAULT_VARIANT_ID, []);
  }

  // `content` maps each composite id to its resolved content node directly; the
  // qualifier coordinates live in the key, not in a per-entry wrapper. For an
  // object variant the variant segment is the canonical serialization of the
  // object, so it fully identifies the entry — no side-map is needed.
  const content: Record<string, unknown> = {};

  let importMode: Dictionary['importMode'];

  const variantIndex = groupQualifierTypes.indexOf('variant');

  /**
   * The id of the entry a composite id inherits from — itself with its variant
   * segment swapped for `default` (`'promo/2'` → `'default/2'`). `undefined`
   * for the default entries themselves and for keys with no variant dimension.
   */
  const getInheritedEntryId = (compositeId: string): string | undefined => {
    if (variantIndex === -1) return undefined;

    const segments = compositeId.split(COMPOSITE_ID_SEPARATOR);
    if (segments[variantIndex] === DEFAULT_VARIANT_ID) return undefined;

    segments[variantIndex] = DEFAULT_VARIANT_ID;
    return segments.join(COMPOSITE_ID_SEPARATOR);
  };

  for (const [compositeId, qualifiedDictionaries] of entriesDictionaries) {
    // Precedence, highest first: the entry's own declarations, then the
    // `default` variant it inherits from, then the unqualified siblings shared
    // by the whole key (mergeDictionaries prefers the first occurrence).
    //
    // Inheriting from `default` is what makes a variant declaration partial: it
    // only has to declare the fields whose wording actually differs, and every
    // other field is completed from the default entry.
    const inheritedEntryId = getInheritedEntryId(compositeId);
    const inheritedDictionaries = inheritedEntryId
      ? (entriesDictionaries.get(inheritedEntryId) ?? [])
      : [];

    const mergedEntry = mergeDictionaries([
      ...qualifiedDictionaries,
      ...inheritedDictionaries,
      ...baseDictionaries,
    ]);

    content[compositeId] = mergedEntry.content;

    const [firstQualified] = qualifiedDictionaries;

    importMode ??= firstQualified?.importMode;
  }

  const localIds = Array.from(
    new Set(
      dictionaries
        .filter((dictionary) => dictionary.localId)
        .map((dictionary) => dictionary.localId!)
    )
  );

  return {
    key: dictionaries[0]!.key,
    qualifierTypes: groupQualifierTypes,
    content,
    ...(importMode !== undefined && { importMode }),
    localIds,
  };
};
