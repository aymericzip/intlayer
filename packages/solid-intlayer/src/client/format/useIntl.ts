import { bindIntl } from '@intlayer/core/formatters';
import type { LocalesValues } from '@intlayer/types';
import { createMemo, useContext } from 'solid-js';
import { IntlayerClientContext } from '../IntlayerProvider';

/**
 * Solid client hook that provides a locale-bound `Intl` object.
 *
 * It acts exactly like the native `Intl` object, but acts as a proxy to:
 * 1. Inject the current locale automatically if none is provided.
 * 2. Use the performance-optimized `CachedIntl` under the hood.
 *
 * @example
 * ```tsx
 * const intl = useIntl(); // uses context locale
 *
 * // Standard API, but no need to pass locale as the first argument
 * const formatted = new intl().NumberFormat({
 *   style: 'currency',
 *   currency: 'USD'
 * }).format(123.45);
 * ```
 */
export const useIntl = (locale?: LocalesValues) => {
  const context = useContext(IntlayerClientContext);

  return createMemo(() => {
    const currentLocale = locale ?? context.locale();
    return bindIntl(currentLocale);
  });
};
