import type { EnterFormat, QuantityContent } from './enumeration';

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
  enumerationContent: QuantityContent<Content>,
  quantity: number
): EnterFormat => {
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

  return '1';
};
