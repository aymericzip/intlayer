'use client';

import { date } from '@intlayer/core';
import { useContext } from 'preact/hooks';
import { IntlayerClientContext } from '../IntlayerProvider';

/**
 * React client hook that provides a localized date/time formatter
 * bound to the current application locale.
 *
 * @returns {(date: Date | string | number, options?: DateProps) => string}
 * A function to format dates or timestamps into localized date/time strings.
 *
 * @example
 * ```tsx
 * const formatDate = useDate();
 *
 * formatDate(new Date("2025-01-01"));
 * // "Jan 1, 2025"
 *
 * formatDate("2025-01-01T15:30:00Z", {
 *   dateStyle: "full",
 *   timeStyle: "short",
 * });
 * // "Wednesday, January 1, 2025 at 3:30 PM"
 *
 * formatDate(1735689600000, { locale: "fr-FR", dateStyle: "long" });
 * // "1 janvier 2025"
 * ```
 *
 * @see createDate
 */
export const useDate = () => {
  const { locale } = useContext(IntlayerClientContext);

  return (...args: Parameters<typeof date>) =>
    date(args[0], {
      ...args[1],
      locale: args[1]?.locale ?? locale,
    });
};
