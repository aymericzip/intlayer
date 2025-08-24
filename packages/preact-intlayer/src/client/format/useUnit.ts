'use client';

import { units } from '@intlayer/core';
import { useCallback, useContext } from 'preact/hooks';
import { IntlayerClientContext } from '../IntlayerProvider';

/**
 * React hook that provides a unit formatting function
 * based on the current locale from {@link useLocaleBase}.
 *
 * This hook wraps {@link createUnit} to return a formatter
 * that can convert values into human-readable localized units
 * (e.g., "10 km", "5 lbs").
 *
 * @example
 * ```tsx
 * const formatUnit = useUnit();
 * const distance = formatUnit(10, { unit: "kilometer" });
 * // "10 km" (depending on locale)
 * ```
 *
 * @returns {Function} A unit formatting function that accepts a value and optional formatting options.
 */
export const useUnit = () => {
  const { locale } = useContext(IntlayerClientContext);

  return useCallback(
    (...args: Parameters<typeof units>) =>
      units(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? locale,
      }),
    [locale]
  );
};
