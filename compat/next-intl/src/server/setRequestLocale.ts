import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { setRequestLocale as _setRequestLocale } from 'next-intl/server';

/**
 * Drop-in for next-intl's `setRequestLocale`.
 *
 * In next-intl this stores the locale in a request-scoped cache to opt into
 * static rendering. Intlayer resolves the active locale from the configured
 * `routing.storage` (cookie / header) or the localized route segment, so there
 * is nothing to set here — this is a no-op kept for API compatibility.
 *
 * @deprecated setRequestLocale has no use case with intlayer. The locale is
 * resolved automatically from routing / storage.
 *
 * @example
 * ```ts
 * setRequestLocale(locale); // safe to keep, but has no effect
 * ```
 */
export const setRequestLocale: typeof _setRequestLocale = (_locale): void => {
  if (process.env.NODE_ENV === 'development') {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('setRequestLocale', CYAN)} has no use case with intlayer. The locale is resolved automatically from routing and storage`
    );
  }
};
