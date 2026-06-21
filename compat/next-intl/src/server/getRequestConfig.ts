import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { getRequestConfig as _getRequestConfig } from 'next-intl/server';

/**
 * Drop-in for next-intl's `getRequestConfig`.
 *
 * In next-intl this registers the per-request config (locale + messages) read
 * by its own plugin. With intlayer the locale is resolved from routing /
 * storage and messages come from compiled dictionaries, so the returned config
 * is never consumed — this is an identity passthrough kept so existing
 * `i18n/request.ts` files keep resolving and type-checking.
 *
 * @deprecated getRequestConfig has no use case with intlayer. The locale and
 * messages are resolved automatically; the file can be removed.
 */
export const getRequestConfig: typeof _getRequestConfig = (
  createRequestConfig
) => {
  if (process.env.NODE_ENV === 'development') {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('getRequestConfig', CYAN)} has no use case with intlayer. The locale and messages are resolved automatically; the i18n/request.ts file can be removed`
    );
  }

  return createRequestConfig;
};

export default getRequestConfig;
