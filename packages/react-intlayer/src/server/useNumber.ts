import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createNumber } from '../createNumber';
import { useLocale } from './useLocale';

const getCachedNumber = cache((locale: LocalesValues) => createNumber(locale));

/**
 * React server hook that provides a memoized, locale-aware number formatter.
 *
 * The hook retrieves the current locale via {@link useLocale} and
 * returns a cached number formatting function created by
 * {@link createNumber}. The result is stable for the given locale.
 *
 * @example
 * ```tsx
 * const formatNumber = useNumber();
 *
 * formatNumber(1000);
 * // → "1,000" (en-US)
 * // → "1 000" (fr-FR)
 *
 * formatNumber(0.25, { style: "percent" });
 * // → "25%"
 * ```
 *
 * @returns {(value: string | number, options?: import("../createNumber").NumberProps) => string}
 * Locale-aware number formatter function.
 */
export const useNumber = () => {
  const { locale } = useLocale();

  return getCachedNumber(locale);
};
