import { type LocalesValues, Locales } from '@intlayer/config/client';
import { CachedIntl } from '@intlayer/core/intl';
import { type ReactElement, type ReactNode } from 'react';

type Primitive = string | number;
type FormattableListValue = Primitive | ReactElement;

interface UseListFormatterOptions {
  /** The locale to use for formatting. Defaults to `Locales.ENGLISH`. */
  locale?: LocalesValues;
  /** The style of the list: `long`, `short`, or `narrow`. Defaults to `long`. */
  style?: Intl.ListFormatStyle;
  /** The type of list: `conjunction`, `disjunction`, or `unit`. Defaults to `conjunction`. */
  type?: Intl.ListFormatType;
}

const defaultValues: Required<UseListFormatterOptions> = {
  locale: Locales.ENGLISH,
  style: 'long',
  type: 'conjunction',
};

/**
 * Server-side React hook to create a list formatter with a given locale.
 *
 * Returns a `format` function that can handle both primitive values and React elements,
 * preserving React elements when generating the formatted output.
 *
 * @param {UseListFormatterOptions} [options] - Optional configuration for locale, style, and type.
 *
 * @returns {{ format: <T extends FormattableListValue>(items: T[]) => ReactNode }}
 * An object containing a `format` function to convert an array of items
 * into a localized, human-readable list.
 *
 * @example
 * ```ts
 * const { format } = useListFormatter({ locale: 'fr', style: 'short' });
 *
 * format(['Pommes', 'Oranges', 'Bananes']);
 * // → "Pommes, Oranges et Bananes"
 *
 * // With React elements
 * format(['Pommes', <strong key="o">Oranges</strong>, 'Bananes']);
 * // → ["Pommes, ", <strong>Oranges</strong>, " et Bananes"]
 * ```
 */
export const useListFormatter = (options?: UseListFormatterOptions) => {
  const { locale, style, type } = { ...defaultValues, ...options };
  const formatter = CachedIntl.listFormat(locale, { style, type });

  const format = <T extends FormattableListValue>(items: T[]): ReactNode => {
    const serialized: string[] = [];
    const richMap = new Map<string, T>();

    items.forEach((item, index) => {
      if (typeof item === 'string' || typeof item === 'number') {
        serialized.push(String(item));
      } else {
        const key = `@__${index}`;
        serialized.push(key);
        richMap.set(key, item);
      }
    });

    const parts = formatter.formatToParts(serialized);
    const result = parts.map((part) => {
      if (part.type === 'literal') return part.value;
      return richMap.get(part.value) ?? part.value;
    });

    return richMap.size > 0 ? result : result.join('');
  };

  return { format };
};
