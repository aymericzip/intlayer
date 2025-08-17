import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createList } from '../createList';
import { useLocale } from './useLocale';

const getCachedList = cache((locale: LocalesValues) => createList(locale));

/**
 * React server hook that returns a memoized `createList` instance
 * for the current locale.
 *
 * This hook leverages React's {@link cache} to avoid recreating
 * the list formatter across server renders when the locale is the same.
 * It internally uses {@link useLocale} to determine the active locale.
 *
 * @function useList
 * @returns {(items: T[], options?: ListOptions<T>) => string}
 * A function that formats lists of values (numbers, strings, or records)
 * according to the current locale.
 *
 * @example
 * ```tsx
 * const list = useList();
 * const formatted = list(["Apples", "Bananas", "Cherries"]);
 * // "Apples, Bananas, and Cherries" (depending on locale)
 * ```
 */
export const useList = () => {
  const { locale } = useLocale();

  return getCachedList(locale);
};
