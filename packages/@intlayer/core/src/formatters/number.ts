import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { Intl as CachedIntl } from '../utils/intl';

/**
 * Formats a numeric value using locale-aware formatting.
 *
 * @example
 * number({ value: 123456.789 }); // "123,456.789"
 * number({ value: "1000000", locale: Locales.FRENCH }); // "1 000 000"
 */
export const number = (
  value: string | number,
  options?: Intl.NumberFormatOptions & { locale?: LocalesValues }
): string =>
  new CachedIntl.NumberFormat(
    options?.locale ?? configuration.internationalization.defaultLocale,
    options
  ).format(Number(value));
