import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { getMessages as _getMessages } from 'next-intl/server';

/**
 * Drop-in replacement for next-intl's `getMessages()` server function.
 *
 * Returns all compiled dictionary content for the current locale as a flat
 * record keyed by dictionary name. Useful when you need to pass messages
 * to a `NextIntlClientProvider`.
 *
 * @example
 * ```ts
 * const messages = await getMessages();
 * ```
 *
 * @deprecated getMessages has no use case with intlayer.
 * Messages are loaded automatically under the hood
 */
export const getMessages: typeof _getMessages = async () => {
  if (process.env.NODE_ENV === 'development') {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('getMessages', CYAN)} has no use case with intlayer. Messages are loaded automatically under the hood for bundle optimization reason`
    );
  }

  return {};
};
