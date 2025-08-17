'use client';

import { createList } from '../createList';
import { useLocaleBase } from './useLocaleBase';

/**
 * React client hook that provides a localized list formatter
 * bound to the current application locale.
 *
 * @returns {<T extends string | number | Record<string, unknown>>(items: T[], options?: ListProps<T>) => string}
 * A function that formats an array of items into a localized list string.
 *
 * @example
 * ```tsx
 * const formatList = useList();
 *
 * formatList(["Apples", "Bananas", "Cherries"]);
 * // "Apples, Bananas, and Cherries"
 *
 * formatList(["Apples", "Bananas", "Cherries"], { type: "disjunction" });
 * // "Apples, Bananas, or Cherries"
 *
 * formatList(["Apples", "Bananas", "Cherries"], { locale: "fr-FR" });
 * // "Pommes, Bananes et Cerises"
 * ```
 *
 * @see createList
 */
export const useList = () => {
  const { locale } = useLocaleBase();

  return createList(locale);
};
