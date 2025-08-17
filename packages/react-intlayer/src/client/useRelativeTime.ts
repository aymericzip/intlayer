'use client';

import { createRelativeTime } from '../createRelativeTime';
import { useLocaleBase } from './useLocaleBase';

/**
 * Client-side React hook for accessing a localized relative time formatter.
 *
 * This hook:
 * - Reads the current locale from {@link useLocaleBase}.
 * - Creates a new relative time formatter with {@link createRelativeTime}.
 * - Returns a function that can format time differences into localized strings.
 *
 * Example:
 * ```tsx
 * const relativeTime = useRelativeTime();
 * const formatted = relativeTime(new Date("2024-08-01"), new Date());
 * // e.g., "2 weeks ago"
 * ```
 *
 * @returns {ReturnType<typeof createRelativeTime>} A relative time formatting function
 *          bound to the current client locale.
 */
export const useRelativeTime = () => {
  const { locale } = useLocaleBase();

  return createRelativeTime(locale);
};
