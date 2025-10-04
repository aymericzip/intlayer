import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { Intl as CachedIntl } from '../utils/intl';

/**
 * Formats an array of values into a localized list string using the Intl API.
 *
 * @example
 * list(['apple', 'banana', 'orange']);
 * // "apple, banana, and orange"
 *
 * @example
 * list(['red', 'green', 'blue'], { locale: Locales.FRENCH, type: 'disjunction' });
 * // "rouge, vert ou bleu"
 *
 * @example
 * list([1, 2, 3], { type: 'unit' });
 * // "1, 2, 3"
 */
export const list = (
  values: (string | number)[],
  options?: Intl.ListFormatOptions & { locale?: LocalesValues }
): string =>
  new CachedIntl.ListFormat(
    options?.locale ?? configuration.internationalization.defaultLocale,
    {
      type: options?.type ?? 'conjunction',
      style: options?.style ?? 'long',
      ...options,
    }
  ).format(values.map(String));
