import { compact } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { IntlayerServerContext } from '../IntlayerServerProvider';
import { getServerContext } from '../serverContext';

/**
 * React client hook that provides a compact number formatter
 * bound to the current application locale.
 *
 * @example
 * ```tsx
 * const formatCompact = useCompact();
 * formatCompact(1500); // "1.5K"
 * ```
 */
export const useCompact = () => {
  const locale = getServerContext<LocalesValues>(IntlayerServerContext);

  return (...args: Parameters<typeof compact>) =>
    compact(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
