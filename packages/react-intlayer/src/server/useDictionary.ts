import type { Locales } from '@intlayer/config/client';
import type { DeclarationContent } from '@intlayer/core';
import { getDictionary, type UseDictionary } from '../getDictionary';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that transform a dictionary and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useDictionary: UseDictionary = <T extends DeclarationContent>(
  dictionary: T,
  locale?: Locales,
  isRenderEditor = false
) => {
  const localeTarget =
    locale ?? getServerContext<Locales>(IntlayerServerContext);

  return getDictionary(dictionary, localeTarget, isRenderEditor);
};
