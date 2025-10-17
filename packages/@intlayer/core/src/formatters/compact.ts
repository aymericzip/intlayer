import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { Intl as CachedIntl } from '../utils/intl';

/**
 * Formats a numeric value using compact notation (e.g., 1K, 1M, 1B)
 * based on locale and formatting options.
 *
 * @example
 * compact({ value: 1200 }); // "1.2K"
 *
 * @example
 * compact({ value: "1000000", locale: Locales.FRENCH, compactDisplay: "long" });
 * // "1 million"
 */
export const compact = (
  value: string | number,
  options?: Intl.NumberFormatOptions & { locale?: LocalesValues }
): string =>
  new CachedIntl.NumberFormat(
    options?.locale ?? configuration.internationalization.defaultLocale,
    {
      ...options,
      notation: 'compact',
    }
  ).format(Number(value));
