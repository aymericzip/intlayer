import type {
  Dictionary,
  DictionaryQualifierType,
} from '@intlayer/types/dictionary';
import {
  COMPOSITE_ID_SEPARATOR,
  serializeVariant,
} from './qualifiedDictionary';

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
