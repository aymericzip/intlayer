import { compact } from '@intlayer/core';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a compact number formatter
 * bound to the current application locale.
 *
 * @example
 * ```vue
 * const formatCompact = useCompact();
 * formatCompact(1500); // "1.5K"
 * ```
 */
export const useCompact = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof compact>) =>
      compact(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      });
  });
};
