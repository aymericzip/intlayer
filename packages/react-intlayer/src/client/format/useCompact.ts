'use client';

import { compact } from '@intlayer/core';
import { useCallback, useContext } from 'react';
import { IntlayerClientContext } from '../IntlayerProvider';

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
  const { locale } = useContext(IntlayerClientContext);

  return useCallback(
    (...args: Parameters<typeof compact>) =>
      compact(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      }),
    [locale]
  );
};
