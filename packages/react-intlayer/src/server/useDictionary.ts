import type { Locales } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';
import { getDictionary } from '../getDictionary';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionary = <T extends Dictionary>(
  dictionary: T,
  locale?: Locales | `${Locales}`,
  isRenderEditor = false
) => {
  const localeTarget =
    locale ?? getServerContext<Locales | `${Locales}`>(IntlayerServerContext);

  return getDictionary(dictionary, localeTarget);
};
