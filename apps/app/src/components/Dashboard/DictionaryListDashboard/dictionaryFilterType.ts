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

/** Dictionary list scopes: the plain list, collections (`item`) and variants. */
export type DictionaryListKind = 'dictionary' | 'collection' | 'variant';

/**
 * True when the dictionary belongs in the given list. A dictionary that is
 * both a collection and a variant is listed in both, and hidden from the
 * plain dictionary list.
 */
export const getMatchesListKind = (
  dictionary: Pick<Dictionary, 'item' | 'variant'>,
  kind: DictionaryListKind
): boolean => {
  const filterTypes = getDictionaryFilterTypes(dictionary);

  switch (kind) {
    case 'collection':
      return filterTypes.includes('collection');
    case 'variant':
      return filterTypes.includes('variant') || filterTypes.includes('meta');
    default:
      return filterTypes.includes('standard');
  }
};

/** Detail route prefix opened from each list. */
export const DICTIONARY_KIND_DETAIL_PATH = {
  dictionary: '/dictionary',
  collection: '/collection',
  variant: '/variants',
} as const satisfies Record<DictionaryListKind, string>;
