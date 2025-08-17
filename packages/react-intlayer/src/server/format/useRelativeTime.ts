import { type LocalesValues } from '@intlayer/config/client';
import { cache } from 'react';
import { createRelativeTime } from '../../createRelativeTime';
import { useLocale } from '../useLocale';

const getCachedRelativeTime = cache((locale: LocalesValues) =>
  createRelativeTime(locale)
);

/**
 * React server hook that returns a memoized relative time formatter function for the current locale.
 *
 * This server-side hook leverages React's {@link cache} to avoid repeatedly
 * creating the relative time formatter for the same locale.
 *
 * @function useRelativeTime
 * @returns {(from: Date | number | string, to?: Date | number | string, options?: Omit<RelativeTimeOptions, 'from' | 'to'>) => string}
 * A function that formats a relative time string given two time values and optional options.
 *
 * @example
 * ```ts
 * const relativeTime = useRelativeTime();
 *
 * relativeTime(new Date(Date.now() - 60000));
 * // → "1 minute ago"
 *
 * relativeTime(new Date(), new Date(Date.now() + 3600000), { numeric: "auto" });
 * // → "in 1 hour"
 * ```
 */
export const useRelativeTime = () => {
  const { locale } = useLocale();

  return getCachedRelativeTime(locale);
};
