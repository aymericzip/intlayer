import { number } from '@intlayer/core';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a localized number formatter.
 *
 * Uses the current locale from the IntlayerProvider and returns
 * a function that can be used to format numbers consistently
 * according to the user's locale.
 *
 * @example
 * ```vue
 * const formatNumber = useNumber();
 *
 * formatNumber(12345);
 * // e.g. "12,345" (en-US)
 * // e.g. "12 345" (fr-FR)
 *
 * formatNumber(0.75, { style: "percent" });
 * // e.g. "75%"
 * ```
 */
export const useNumber = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof number>) =>
      number(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      });
  });
};
