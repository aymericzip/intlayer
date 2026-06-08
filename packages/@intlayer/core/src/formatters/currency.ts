import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getCachedIntl } from '../utils/intl';

/**
 * Formats a numeric or string value into a localized currency string using the Intl API.
 *
 * @example
 * currency(1234.5, { currency: 'EUR' });
 * // "€1,234.50"
 *
 * @example
 * currency("5000", { locale: Locales.FRENCH, currency: "CAD", currencyDisplay: "code" });
 * // "5 000,00 CAD"
 */
export const currency = (
  value: string | number,
  options?: Intl.NumberFormatOptions & { locale?: LocalesValues }
): string =>
  getCachedIntl(
    Intl.NumberFormat,
    options?.locale ?? internationalization?.defaultLocale,

    {
      style: 'currency',
      currency: options?.currency ?? 'USD',
      currencyDisplay: options?.currencyDisplay ?? 'symbol',
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
      ...options,
    }
  ).format(Number(value));
