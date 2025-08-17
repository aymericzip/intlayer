import { Locales, type LocalesValues } from '@intlayer/config/client';
import { CachedIntl } from '../utils/intl';

/** string or number primitive value */
type Primitive = string | number;

/**
 * Options for formatting a list of items using `Intl.ListFormat`.
 */
export type ListOptions<T = Primitive | Record<string, unknown>> = {
  /**
   * The array of items to be formatted into a localized list.
   */
  items: T[];
  // items: NonEmptyArray<T>;

  /**
   * If the list items are objects, specify the key to extract the string from.
   */
  //  key?: T extends string ? never : keyof T;
  key?: T extends Primitive ? never : keyof T;

  /**
   * The locale to use for formatting.
   *
   * @default Locales.ENGLISH
   */
  locale?: LocalesValues;

  /**
   * The formatting style to use: "long" (default), "short", or "narrow".
   *
   * @default "long"
   */
  style?: Intl.ListFormatStyle;

  /**
   * The conjunction type: "conjunction" (and), "disjunction" (or), or "unit".
   *
   * @default "conjunction"
   */
  type?: Intl.ListFormatType;
};

/**
 * Formats a list of items into a localized human-readable string.
 *
 * Supports either:
 * - An array of strings, or
 * - An array of objects + a `key` to extract a string value.
 *
 * @returns A localized list string.
 *
 * @example
 * list({ items: ["apples", "bananas", "cherries"] });
 * // "apples, bananas, and cherries"
 *
 * @example
 * list({
 *   items: [{ name: "Alice" }, { name: "Bob" }],
 *   key: "name"
 * });
 * // "Alice and Bob"
 */
export const list = <T extends Primitive | Record<string, unknown>>({
  items,
  key,
  locale = Locales.ENGLISH,
  style = 'long',
  type = 'conjunction',
}: ListOptions<T>): string => {
  const formatter = CachedIntl.listFormat(locale, { style, type });

  const values = items.map((item) =>
    typeof item === 'string' || typeof item === 'number'
      ? String(item)
      : key && item[key]
        ? String(item[key])
        : ''
  );

  return formatter.format(values);
};
