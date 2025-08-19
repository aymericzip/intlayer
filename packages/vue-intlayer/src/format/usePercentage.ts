import { percentage } from '@intlayer/core';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a percentage formatter
 * bound to the current application locale.
 *
 * @example
 * ```vue
 * const formatPercentage = usePercentage();
 *
 * formatPercentage(0.25); // "25%"
 * formatPercentage(25); // "25%"
 * formatPercentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
 * ```
 */
export const usePercentage = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof percentage>) =>
      percentage(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      });
  }).value;
};
