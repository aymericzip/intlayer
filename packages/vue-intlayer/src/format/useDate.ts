import { date, presets } from '@intlayer/core/formatters';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a date/time formatter
 * bound to the current application locale.
 *
 * @example
 * ```vue
 * const formatDate = useDate();
 *
 * formatDate(new Date(), "short");
 * // e.g., "08/02/25, 14:30"
 *
 * formatDate("2025-08-02T14:30:00Z", {
 *   locale: "fr",
 *   month: "long",
 *   day: "numeric"
 * });
 * // "2 août"
 * ```
 */
export const useDate = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof date>) => {
      const options =
        typeof args[1] === 'string'
          ? { ...presets[args[1]], locale }
          : { ...args[1], locale: args[1]?.locale ?? locale };

      return date(args[0], options as Parameters<typeof date>[1]);
    };
  });
};
