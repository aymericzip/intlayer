'use client';

import { list } from '@intlayer/core';
import { useCallback, useContext } from 'react';
import { IntlayerClientContext } from '../IntlayerProvider';

/**
 * React client hook that provides a list formatter
 * bound to the current application locale.
 *
 * @returns {(values: (string | number)[], options?: ListProps) => string}
 * A function to format arrays into localized list strings.
 *
 * @example
 * ```tsx
 * const formatList = useList();
 *
 * formatList(['apple', 'banana', 'orange']);
 * // "apple, banana, and orange"
 *
 * formatList(['red', 'green', 'blue'], { type: 'disjunction' });
 * // "red, green, or blue"
 *
 * formatList([1, 2, 3], { type: 'unit', locale: 'de-DE' });
 * // "1, 2 und 3"
 * ```
 */
export const useList = () => {
  const { locale } = useContext(IntlayerClientContext);

  return useCallback(
    (...args: Parameters<typeof list>) =>
      list(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      }),
    [locale]
  );
};
