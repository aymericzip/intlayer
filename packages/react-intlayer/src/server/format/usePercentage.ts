import { type LocalesValues } from '@intlayer/config/client';
import { percentage } from '@intlayer/core';
import { IntlayerServerContext } from '../IntlayerServerProvider';
import { getServerContext } from '../serverContext';

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
  const locale = getServerContext<LocalesValues>(IntlayerServerContext);

  return (...args: Parameters<typeof percentage>) =>
    percentage(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
