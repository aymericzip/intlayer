import { list } from '@intlayer/core';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a list formatter
 * bound to the current application locale.
 *
 * @example
 * ```vue
 * const formatList = useList();
 *
 * formatList(['apple', 'banana', 'orange']);
 * // "apple, banana, and orange"
 *
 * formatList(['red', 'green', 'blue'], { type: 'disjunction' });
 * // "red, green, or blue"
 *
 * formatList([1, 2, 3], { type: 'unit', locale: 'de-DE' });
 * // "1, 2 und 3"
 * ```
 */
export const useList = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof list>) =>
      list(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      });
  });
};
