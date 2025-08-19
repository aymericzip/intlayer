import { relativeTime } from '@intlayer/core';
import { computed, inject } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Vue composable that provides a relative time formatter
 * bound to the current application locale.
 *
 * @example
 * ```vue
 * const formatRelativeTime = useRelativeTime();
 *
 * const now = new Date();
 * const in3Days = new Date(now.getTime() + 3 * 864e5);
 * formatRelativeTime(now, in3Days, { unit: "day" }); // "in 3 days"
 *
 * const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
 * formatRelativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
 * ```
 */
export const useRelativeTime = () => {
  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL)!;

  return computed(() => {
    const locale = intlayer.locale.value;

    return (...args: Parameters<typeof relativeTime>) =>
      relativeTime(args[0], args[1], {
        ...args[2],
        locale: args[2]?.locale ?? locale,
      });
  }).value;
};
