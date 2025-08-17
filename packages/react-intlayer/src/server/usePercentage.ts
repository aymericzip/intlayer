import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createPercentage } from '../createPercentage';
import { useLocale } from './useLocale';

const getCachedPercentage = cache((locale: LocalesValues) =>
  createPercentage(locale)
);

/**
 * React server hook that provides a memoized, percentage formatter
 * based on the current request's locale.
 *
 * This hook retrieves the locale via {@link useLocale} and
 * returns a memoized percentage formatter specific to that locale.
 *
 * @example
 * ```tsx
 * const formatPercentage = usePercentage();
 *
 * const result = formatPercentage(0.42);
 * // "42%" (depending on locale)
 * ```
 *
 * @returns {(value: string | number, options?: Omit<PercentageOptions, "value">) => string}
 * A function that formats values into localized percentages.
 */
export const usePercentage = () => {
  const { locale } = useLocale();

  return getCachedPercentage(locale);
};
