import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';

type DictionaryOrGroup = Dictionary | QualifiedDictionaryGroup;

/**
 * Detects whether any built dictionary declares qualifier dimensions
 * (collections or variants).
 *
 * The merge step emits a {@link QualifiedDictionaryGroup} — carrying a
 * non-empty `qualifierTypes` array — for every key whose declarations use a
 * selector. When no group is present, the selector-object resolution path in
 * `getIntlayer` / `useIntlayer` is dead code, and bundlers can eliminate it via
 * the `INTLAYER_DICTIONARY_SELECTOR` env var.
 *
 * @example
 * getHasDictionarySelector(getDictionaries(config));
 * // true  → at least one collection / variant / meta dictionary
 * // false → only plain dictionaries (selector logic can be stripped)
 */
export const getHasDictionarySelector = (
  dictionaries: Record<string, DictionaryOrGroup> | DictionaryOrGroup[]
): boolean => {
  const dictionariesArray = Array.isArray(dictionaries)
    ? dictionaries
    : Object.values(dictionaries);

  return dictionariesArray.some((dictionary) => {
    const { qualifierTypes } = dictionary as QualifiedDictionaryGroup;

    return Array.isArray(qualifierTypes) && qualifierTypes.length > 0;
  });
};
