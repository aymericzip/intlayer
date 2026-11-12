import { getDictionaryQualifierTypes } from '@intlayer/core/dictionaryManipulator';
import type { Dictionary } from '@intlayer/types/dictionary';

/** Dictionary kinds offered by the "Type" filter of the dictionary list. */
export const DICTIONARY_FILTER_TYPES = [
  'standard',
  'collection',
  'variant',
  'meta',
] as const;

export type DictionaryFilterType = (typeof DICTIONARY_FILTER_TYPES)[number];

/**
 * Kinds a dictionary belongs to: `collection` (item), `variant` (named
 * variant), `meta` (structured, dynamic variant) or `standard` (none).
 */
export const getDictionaryFilterTypes = (
  dictionary: Pick<Dictionary, 'item' | 'variant'>
): DictionaryFilterType[] => {
  const qualifierTypes = getDictionaryQualifierTypes(dictionary as Dictionary);
  const variantValues =
    dictionary.variant === undefined
      ? []
      : Array.isArray(dictionary.variant)
        ? dictionary.variant
        : [dictionary.variant];

  const filterTypes: DictionaryFilterType[] = [];

  if (qualifierTypes.includes('item')) filterTypes.push('collection');
  if (variantValues.some((value) => typeof value === 'string')) {
    filterTypes.push('variant');
  }
  if (variantValues.some((value) => typeof value === 'object')) {
    filterTypes.push('meta');
  }

  return filterTypes.length > 0 ? filterTypes : ['standard'];
};

/** True when the dictionary matches one of the active filter types (or none is active). */
export const getMatchesFilterTypes = (
  dictionary: Pick<Dictionary, 'item' | 'variant'>,
  activeTypes: readonly string[]
): boolean =>
  activeTypes.length === 0 ||
  getDictionaryFilterTypes(dictionary).some((filterType) =>
    activeTypes.includes(filterType)
  );
