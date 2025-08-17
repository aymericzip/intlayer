import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createCompact } from '../createCompact';
import { useLocale } from './useLocale';

const getCachedCompact = cache((locale: LocalesValues) =>
  createCompact(locale)
);

/**
 * React server hook that returns a memoized compact number formatter
 * bound to the current application locale. Uses {@link React.cache}
 * to avoid recreating formatters for the same locale.
 *
 * @returns {(value: string | number, options?: CompactProps) => string}
 * A function that formats numbers into compact notation.
 *
 * @example
 * ```tsx
 * const compact = useCompact();
 *
 * compact(1500);
 * // "1.5K"
 *
 * compact(2500000, { compactDisplay: "long" });
 * // "2.5 million"
 * ```
 */
export const useCompact = () => {
  const { locale } = useLocale();

  return getCachedCompact(locale);
};
