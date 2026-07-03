import { log } from '@intlayer/config/built';
import { colorizeKey, getAppLogger } from '@intlayer/config/logger';
import type {
  Dictionary,
  DictionaryQualifierType,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { mergeDictionaries } from './mergeDictionaries';
import {
  getDictionaryCompositeIds,
  getDictionaryQualifierTypes,
  QUALIFIER_ORDER,
} from './qualifiedDictionary';

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
 *   Unqualified siblings act as shared base content merged into every entry.
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

  // `content` maps each composite id to its resolved content node directly; the
  // qualifier coordinates live in the key, not in a per-entry wrapper. For an
  // object variant the variant segment is the canonical serialization of the
  // object, so it fully identifies the entry — no side-map is needed.
  const content: Record<string, unknown> = {};

  let importMode: Dictionary['importMode'];

  for (const [compositeId, qualifiedDictionaries] of entriesDictionaries) {
    // Unqualified siblings act as shared base content: appended last so the
    // qualified entries take precedence (mergeDictionaries prefers first).
    const mergedEntry = mergeDictionaries([
      ...qualifiedDictionaries,
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
