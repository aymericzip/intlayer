'use client';

import { bindIntl } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { useContext, useMemo } from 'react';
import { IntlayerClientContext } from '../IntlayerProvider';

/**
 * React client hook that provides a locale-bound `Intl` object.
 *
 * It acts exactly like the native `Intl` object, but acts as a proxy to:
 * 1. Inject the current locale automatically if none is provided.
 * 2. Use the performance-optimized `CachedIntl` under the hood.
 *
 * @example
 * ```tsx
 * const intl = useIntl(); // uses context locale
 *
 * // Standard API, but no need to pass 'en-US' as the first argument
 * const formatted = new intl.NumberFormat({
 * style: 'currency',
 * currency: 'USD'
 * }).format(123.45);
 * ```
 *
 * @example
 * ```tsx
 * const intl = useIntl();
 *
 * // You can still override the locale if needed
 * const date = new intl.DateTimeFormat({ locale: 'fr-FR' }).format(new Date());
 * // or
 * const date2 = new intl.DateTimeFormat('fr-FR').format(new Date());
 * ```
 */
export const useIntl = (locale?: LocalesValues) => {
  const { locale: contextLocale } = useContext(IntlayerClientContext);
  const currentLocale = locale ?? contextLocale;

  return useMemo(() => bindIntl(currentLocale), [currentLocale]);
};
