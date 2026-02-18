import { bindIntl } from '@intlayer/core/formatters';
import type { LocalesValues } from '@intlayer/types';
import { derived } from 'svelte/store';
import { useLocale } from './useLocale';

/**
 * Svelte hook that provides a locale-bound `Intl` object.
 *
 * It acts exactly like the native `Intl` object, but acts as a proxy to:
 * 1. Inject the current locale automatically if none is provided.
 * 2. Use the performance-optimized `CachedIntl` under the hood.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useIntl } from "svelte-intlayer";
 *
 *   const intl = useIntl();
 *
 *   // Standard API, but no need to pass locale as the first argument
 *   $: formatted = new $intl.NumberFormat({
 *     style: 'currency',
 *     currency: 'USD'
 *   }).format(123.45);
 * </script>
 * ```
 */
export const useIntl = (locale?: LocalesValues) => {
  const { locale: contextLocale } = useLocale();

  return derived(contextLocale, ($locale) => {
    const currentLocale = locale ?? $locale;

    return bindIntl(currentLocale);
  });
};
