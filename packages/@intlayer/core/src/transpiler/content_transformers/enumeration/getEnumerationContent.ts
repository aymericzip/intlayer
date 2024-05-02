import { findMatchingCondition } from '../..';
import type { QuantityContent } from './enumeration';

/**
 * Allow to pick a content based on a quantity.
 *
 * Usage:
 *
 * ```ts
 * const content = getEnumerationContent({
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
 * const content = getEnumerationContent({
 *  '<4': 'You have less than four',
 *  '2': 'You have two',
 * }, 2);
 * // 'You have less than four'
 * ```
 *
 */
export const getEnumerationContent = <Content>(
  enumerationContent: QuantityContent<Content>,
  quantity: number
): Content => {
  const key = findMatchingCondition<Content>(enumerationContent, quantity);

  // Default or error handling if no keys match
  return enumerationContent[key];
};
