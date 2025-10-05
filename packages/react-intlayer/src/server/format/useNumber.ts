import type { LocalesValues } from '@intlayer/config/client';
import { number } from '@intlayer/core';
import { IntlayerServerContext } from '../IntlayerServerProvider';
import { getServerContext } from '../serverContext';

/**
 * React client hook that provides a localized number formatter.
 *
 * Uses the current locale from {@link useLocaleBase} and returns
 * a function that can be used to format numbers consistently
 * according to the user's locale.
 *
 * @example
 * ```tsx
 * const formatNumber = useNumber();
 *
 * formatNumber(12345);
 * // e.g. "12,345" (en-US)
 * // e.g. "12 345" (fr-FR)
 *
 * formatNumber(0.75, { style: "percent" });
 * // e.g. "75%"
 * ```
 *
 * @returns {(value: string | number, options?: import("../createNumber").NumberProps) => string}
 * A number formatting function bound to the active locale.
 */
export const useNumber = () => {
  const locale = getServerContext<LocalesValues>(IntlayerServerContext);

  return (...args: Parameters<typeof number>) =>
    number(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
