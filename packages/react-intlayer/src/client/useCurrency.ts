'use client';

import { createCurrency } from '../createCurrency';
import { useLocaleBase } from './useLocaleBase';

/**
 * React client hook that provides a currency formatter
 * bound to the current application locale.
 *
 * @returns {(value: string | number, options?: CurrencyProps) => string}
 * A function to format numbers into localized currency strings.
 *
 * @example
 * ```tsx
 * const formatCurrency = useCurrency();
 *
 * formatCurrency(1500, { currency: "USD" });
 * // "$1,500.00"
 *
 * formatCurrency(1500, { currency: "EUR", locale: "de-DE" });
 * // "1.500,00 €"
 *
 * formatCurrency(9876543.21, {
 *   currency: "JPY",
 *   fractionDigits: 0,
 * });
 * // "¥9,876,543"
 * ```
 */
export const useCurrency = () => {
  const { locale } = useLocaleBase();

  return createCurrency(locale);
};
