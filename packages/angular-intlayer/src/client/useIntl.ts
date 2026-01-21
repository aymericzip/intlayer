import { computed, inject } from '@angular/core';
import { bindIntl } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { IntlayerProvider } from './installIntlayer';

/**
 * Angular composable that provides a locale-bound `Intl` object.
 *
 * It acts exactly like the native `Intl` object, but acts as a proxy to:
 * 1. Inject the current locale automatically if none is provided.
 * 2. Use the performance-optimized `CachedIntl` under the hood.
 *
 * @example
 * ```typescript
 * import { Component, computed } from '@angular/core';
 * import { useIntl } from 'angular-intlayer';
 *
 * @Component({ ... })
 * export class MyComponent {
 *   intl = useIntl();
 *   formattedPrice = computed(() =>
 *     new this.intl().NumberFormat({
 *       style: 'currency',
 *       currency: 'USD'
 *     }).format(123.45)
 *   );
 * }
 * ```
 */
export const useIntl = (locale?: LocalesValues) => {
  const intlayer = inject(IntlayerProvider);

  return computed(() => {
    const currentLocale = locale ?? intlayer.locale();

    return bindIntl(currentLocale);
  });
};
