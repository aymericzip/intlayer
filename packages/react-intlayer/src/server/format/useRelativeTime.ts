import { relativeTime } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { IntlayerServerContext } from '../IntlayerServerProvider';
import { getServerContext } from '../serverContext';

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
  const locale = getServerContext<LocalesValues>(IntlayerServerContext);

  return (...args: Parameters<typeof relativeTime>) =>
    relativeTime(args[0], args[1] ?? new Date(), {
      ...args[2],
      locale: args[2]?.locale ?? locale,
    });
};
