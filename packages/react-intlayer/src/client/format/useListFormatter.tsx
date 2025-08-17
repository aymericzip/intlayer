'use client';

import { type LocalesValues, Locales } from '@intlayer/config/client';
import { CachedIntl } from '@intlayer/core/intl';
import { type ReactElement, type ReactNode } from 'react';

type Primitive = string | number;
type FormattableListValue = Primitive | ReactElement;

interface UseListFormatterOptions {
  /** The locale to use for formatting (defaults to `Locales.ENGLISH`) */
  locale?: LocalesValues;
  /** The output style: `long`, `short`, or `narrow` */
  style?: Intl.ListFormatStyle;
  /** The conjunction type: `conjunction`, `disjunction`, or `unit` */
  type?: Intl.ListFormatType;
}

const defaultValues: Required<UseListFormatterOptions> = {
  locale: Locales.ENGLISH,
  style: 'long',
  type: 'conjunction',
};

/**
 * React hook that provides a list formatter utility for internationalized list formatting.
 *
 * Uses `Intl.ListFormat` internally and supports both primitive values
 * and React elements in the list. When React elements are passed,
 * the formatter ensures they are correctly preserved in the output.
 *
 * @example
 * ```tsx
 * const { format } = useListFormatter({ locale: 'en', style: 'short' });
 *
 * // Simple usage
 * format(['Apples', 'Oranges', 'Bananas']);
 * // → "Apples, Oranges, & Bananas"
 *
 * // With React elements
 * format(['Apples', <strong key="o">Oranges</strong>, 'Bananas']);
 * // → ["Apples, ", <strong>Oranges</strong>, ", and Bananas"]
 * ```
 *
 * @param options - Formatting options including locale, style, and type.
 * @returns An object containing the `format` function.
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
