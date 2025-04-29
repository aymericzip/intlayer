import type { LocalesValues } from '@intlayer/config/client';
import { type DictionaryKeys } from '@intlayer/core';
import { getIntlayer } from '../getIntlayer';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, function that picks one dictionary by its key and returns the content
 *
 * If the locale is not provided, it will use the locale from the server context
 *
 * @example
 * // Server-side component or middleware
 * const dictionary = useIntlayer('homepage');
 *
 * // Access translated strings
 * const title = dictionary.title;
 */
export const useIntlayer = <T extends DictionaryKeys, K extends LocalesValues>(
  key: T,
  locale?: K
) => {
  const localeTarget =
    locale ?? getServerContext<LocalesValues>(IntlayerServerContext);

  return getIntlayer(key, localeTarget);
};
