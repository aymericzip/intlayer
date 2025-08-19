import { units } from '@intlayer/core';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a unit formatting function
 * based on the current locale from the IntlayerProvider.
 *
 * This composable wraps the core units function to return a formatter
 * that can convert values into human-readable localized units
 * (e.g., "10 km", "5 lbs").
 *
 * @example
 * ```vue
 * const formatUnit = useUnit();
 * const distance = formatUnit(10, { unit: "kilometer" });
 * // "10 km" (depending on locale)
 * ```
 */
export const useUnit = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof units>) =>
      units(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      });
  }).value;
};
