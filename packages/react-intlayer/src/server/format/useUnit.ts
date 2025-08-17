import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createUnit } from '../../createUnit';
import { useLocale } from '../useLocale';

const getCachedUnit = cache((locale: LocalesValues) => createUnit(locale));

/**
 * React server hook that provides a locale-aware unit formatter.
 *
 * Reads the current locale via {@link useLocale} and returns
 * a cached instance of the unit formatter.
 *
 * @returns {Function} A function to format values into localized units.
 *
 * @example
 * ```tsx
 * const formatUnit = useUnit();
 * formatUnit(10, { unit: "kilometer" }); // "10 km"
 * ```
 */
export const useUnit = () => {
  const { locale } = useLocale();

  return getCachedUnit(locale);
};
