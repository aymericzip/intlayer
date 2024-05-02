import { type QuantityContent, getEnumerationContent } from '@intlayer/core';

/**
 * Allow to pick a content based on a quantity.
 *
 * Return either the content editor, or the content itself depending on the configuration.
 *
 * Usage:
 *
 * ```ts
 * const content = getEnumeration({
 *  '<=-2.3': 'You have less than -2.3',
 *  '<1': 'You have less than one',
 *  '2': 'You have two',
 *  '>=3': 'You have three or more',
 * }, 2);
 * // 'You have two'
 * ```
 *
 * The order of the keys will define the priority of the content.
 *
 * ```ts
 * const content = getEnumeration({
 *  '<4': 'You have less than four',
 *  '2': 'You have two',
 * }, 2);
 * // 'You have less than four'
 * ```
 *
 */
export const getEnumeration = <Content>(
  enumerationContent: QuantityContent<Content>,
  quantity: number
): Content => {
  const result: Content = getEnumerationContent<Content>(
    enumerationContent,
    quantity
  );

  return result;
};
