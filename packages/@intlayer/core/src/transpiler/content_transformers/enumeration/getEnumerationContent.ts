import type { QuantityContent } from './enumeration';

type Key = keyof QuantityContent<string>;

/**
 * Allow to pick a content based on a quantity.
 *
 * Usage:
 *
 * const content = getEnumerationContent({
 *  '<=-2.3': 'You have less than -2.3',
 *  '<1': 'You have less than one',
 *  '2': 'You have two',
 *  '>=3': 'You have three or more',
 * },
 * 2);
 * // 'You have two'
 *
 * The order of the keys will define the priority of the content.
 *
 * const content = getEnumerationContent({
 * '<4': 'You have less than four',
 * '2': 'You have two',
 * });
 * // 'You have less than four'
 *
 */
export const getEnumerationContent = <Content>(
  enumerationContent: QuantityContent<Content>,
  quantity: number
): Content => {
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
      return enumerationContent[key as Key];
    }
  }

  // Default or error handling if no keys match
  return enumerationContent['1'];
};
