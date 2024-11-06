import type { Locales } from '@intlayer/config/client';
import type { DeclarationContent } from '@intlayer/core';
import { useDictionaryBase, type UseDictionary } from '../useDictionaryBase';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionary: UseDictionary = <T extends DeclarationContent>(
  dictionary: T,
  locale?: Locales
) => {
  const localeTarget =
    locale ?? getServerContext<Locales>(IntlayerServerContext);

  return useDictionaryBase(dictionary, localeTarget);
};
