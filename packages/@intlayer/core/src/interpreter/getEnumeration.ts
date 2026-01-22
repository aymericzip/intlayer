import type { EnterFormat, EnumerationContentState } from '../transpiler';

/**
 * Find the matching condition for a quantity.
 *
 * Usage:
 *
 * ```ts
 * const key = findMatchingCondition({
 *  '<=-2.3': 'You have less than -2.3',
 *  '<1': 'You have less than one',
 *  '2': 'You have two',
 *  '>=3': 'You have three or more',
 * }, 2);
 * // '2'
 * ```
 *
 * The order of the keys will define the priority of the content.
 *
 * ```ts
 * const key = findMatchingCondition({
 *  '<4': 'You have less than four',
 *  '2': 'You have two',
 * }, 2);
 * // '<4'
 * ```
 *
 * If no keys match, the default key is '1'.
 */
export const findMatchingCondition = <Content>(
  enumerationContent: EnumerationContentState<Content>,
  quantity: number
): EnterFormat | undefined => {
  const numericKeys = Object.keys(enumerationContent);

  for (const key of numericKeys) {
    const isEqual =
      (!key.startsWith('>') &&
        !key.startsWith('<') &&
        !key.startsWith('=') &&
        parseFloat(key) === quantity) ||
      (key.startsWith('=') && parseFloat(key.slice(1)) === quantity);
    const isSuperior =
      key.startsWith('>') && quantity > parseFloat(key.slice(1));
    const isSuperiorOrEqual =
      key.startsWith('>=') && quantity >= parseFloat(key.slice(2));
    const isInferior =
      key.startsWith('<') && quantity < parseFloat(key.slice(1));
    const isInferiorOrEqual =
      key.startsWith('<=') && quantity <= parseFloat(key.slice(2));

    if (
      isEqual ||
      isSuperior ||
      isSuperiorOrEqual ||
      isInferior ||
      isInferiorOrEqual
    ) {
      return key as EnterFormat;
    }
  }
};

/**
 * Picks content from an enumeration map based on a provided quantity.
 *
 * Supported keys in the enumeration map:
 * - Specific numbers: '0', '1', '2'
 * - Comparison operators: '<5', '>=10', '<=2'
 * - Fallback: 'fallback'
 *
 * The first matching key in the object's iteration order will be selected.
 *
 * @param enumerationContent - A map of conditions/quantities to content.
 * @param quantity - The number to match against the conditions.
 * @returns The matching content.
 *
 * @example
 * ```ts
 * const content = getEnumeration({
 *   '0': 'No items',
 *   '1': 'One item',
 *   '>1': 'Many items',
 * }, 5);
 * // 'Many items'
 * ```
 */
export const getEnumeration = <Content>(
  enumerationContent: EnumerationContentState<Content>,
  quantity: number
): Content => {
  const key =
    findMatchingCondition<Content>(enumerationContent, quantity) ?? 'fallback';

  // Default or error handling if no keys match
  return enumerationContent[key] as Content;
};
