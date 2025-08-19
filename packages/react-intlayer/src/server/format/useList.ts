import { type LocalesValues } from '@intlayer/config/client';
import { list } from '@intlayer/core';
import { IntlayerServerContext } from '../IntlayerServerProvider';
import { getServerContext } from '../serverContext';

/**
 * React server hook that provides a list formatter
 * bound to the current application locale.
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
  const locale = getServerContext<LocalesValues>(IntlayerServerContext);

  return (...args: Parameters<typeof list>) =>
    list(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
