'use client';

import { createCompact } from '../createCompact';
import { useLocaleBase } from './useLocaleBase';

/**
 * React client hook that provides a compact number formatter
 * bound to the current application locale.
 *
 * @returns {(value: string | number, options?: CompactProps) => string}
 * A function to format numbers into compact notation.
 *
 * @example
 * ```tsx
 * const compact = useCompact();
 *
 * compact(1500); // "1.5K"
 * ```
 */
export const useCompact = () => {
  const { locale } = useLocaleBase();

  return createCompact(locale);
};
