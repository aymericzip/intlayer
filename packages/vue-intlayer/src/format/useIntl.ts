import { bindIntl } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a locale-bound `Intl` object.
 *
 * It acts exactly like the native `Intl` object, but acts as a proxy to:
 * 1. Inject the current locale automatically if none is provided.
 * 2. Use the performance-optimized `CachedIntl` under the hood.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIntl } from 'vue-intlayer/format';
 *
 * const intl = useIntl();
 *
 * // Standard API, but no need to pass locale as the first argument
 * const formatted = new intl.value.NumberFormat({
 *   style: 'currency',
 *   currency: 'USD'
 * }).format(123.45);
 * </script>
 * ```
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIntl } from 'vue-intlayer/format';
 *
 * const intl = useIntl();
 *
 * // You can still override the locale if needed
 * const date = new intl.value.DateTimeFormat({ locale: 'fr-FR' }).format(new Date());
 * // or
 * const date2 = new intl.value.DateTimeFormat('fr-FR').format(new Date());
 * </script>
 * ```
 */
export const useIntl = (locale?: LocalesValues) => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const currentLocale = locale ?? intlayer.locale.value;

    return bindIntl(currentLocale);
  });
};
