import type { LocalesValues } from '@intlayer/config/client';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
import { type DictionaryKeys } from '@intlayer/core';
import { getIntlayer } from '../getIntlayer';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer = <T extends DictionaryKeys, K extends LocalesValues>(
  key: T,
  locale?: K
) => {
  const localeTarget =
    locale ?? getServerContext<LocalesValues>(IntlayerServerContext);

  return getIntlayer(key, localeTarget);
};
