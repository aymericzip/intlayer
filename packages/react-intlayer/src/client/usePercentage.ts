'use client';

import { createPercentage } from '../createPercentage';
import { useLocaleBase } from './useLocaleBase';

/**
 * React hook to provide a percentage formatter function
 * based on the current application locale.
 *
 * This hook retrieves the active locale using {@link useLocaleBase}
 * and memoizes a `createPercentage` instance for that locale.
 *
 * @example
 * ```tsx
 * const formatPercentage = usePercentage();
 *
 * const result = formatPercentage(0.875, { maximumFractionDigits: 1 });
 * // "87.5%" (depending on locale)
 * ```
 *
 * @returns {(value: string | number, options?: Omit<PercentageOptions, "value">) => string}
 * A function that formats numbers or numeric strings into localized percentages.
 */
export const usePercentage = () => {
  const { locale } = useLocaleBase();

  return createPercentage(locale);
};
