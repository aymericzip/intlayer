import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createCurrency } from '../createCurrency';
import { useLocale } from './useLocale';

const getCachedCurrency = cache((locale: LocalesValues) =>
  createCurrency(locale)
);

/**
 * React server hook that returns a memoized currency formatter
 * bound to the current application locale. Uses {@link React.cache}
 * to avoid recreating formatters for the same locale.
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
 *
 * @see createCurrency
 */
export const useCurrency = () => {
  const { locale } = useLocale();

  return getCachedCurrency(locale);
};
