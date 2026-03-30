import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getCachedIntl } from '../utils/intl';

/**
 * Formats a numeric value using locale-aware formatting.
 *
 * @example
 * number(123456.789); // "123,456.789"
 *
 * @example
 * number("1000000", { locale: Locales.FRENCH }); // "1 000 000"
 */
export const number = (
  value: string | number,
  {
    locale,
    ...options
  }: Intl.NumberFormatOptions & { locale?: LocalesValues } = {}
): string =>
  getCachedIntl(
    Intl.NumberFormat,
    locale ?? internationalization?.defaultLocale,

    options
  ).format(Number(value));
