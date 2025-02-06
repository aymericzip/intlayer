import type { Locales } from '@intlayer/config/client';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
import { type DictionaryKeys } from '@intlayer/core';
import { getIntlayer } from '../getIntlayer';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer = <
  T extends DictionaryKeys,
  K extends Locales | `${Locales}`,
>(
  key: T,
  locale?: K,
  isRenderEditor = true
) => {
  const localeTarget =
    locale ?? getServerContext<Locales | `${Locales}`>(IntlayerServerContext);

  return getIntlayer(key, localeTarget);
};
