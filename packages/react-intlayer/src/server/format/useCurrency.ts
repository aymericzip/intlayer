import type { LocalesValues } from '@intlayer/config/client';
import { currency } from '@intlayer/core';
import { IntlayerServerContext } from '../IntlayerServerProvider';
import { getServerContext } from '../serverContext';

/**
 * React client hook that provides a currency formatter
 * bound to the current application locale.
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
  const locale = getServerContext<LocalesValues>(IntlayerServerContext);

  return (...args: Parameters<typeof currency>) =>
    currency(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
