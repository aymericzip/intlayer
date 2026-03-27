import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getCachedIntl } from '../utils/intl';

/** Locally defined subset of Intl.ListFormatOptions so consumers don't need ES2021.Intl in their lib. */
type ListFormatOptions = {
  localeMatcher?: 'lookup' | 'best fit';
  type?: 'conjunction' | 'disjunction' | 'unit';
  style?: 'long' | 'short' | 'narrow';
};

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
  options?: ListFormatOptions & { locale?: LocalesValues }
): string =>
  getCachedIntl(
    Intl.ListFormat as any,
    options?.locale ?? configuration?.internationalization?.defaultLocale,
    {
      type: options?.type ?? 'conjunction',
      style: options?.style ?? 'long',
      ...options,
    }
  ).format(values.map(String));
