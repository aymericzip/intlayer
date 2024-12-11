import type { Locales } from '@intlayer/config/client';
import {
  type DictionaryKeys,
  getIntlayer,
  type UseIntlayerEditable,
} from '../getIntlayer';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that picking one dictionary by its key and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer: UseIntlayerEditable = <T extends DictionaryKeys>(
  key: T,
  locale?: Locales,
  isRenderEditor = true
) => {
  const localeTarget =
    locale ?? getServerContext<Locales>(IntlayerServerContext);

  return getIntlayer(key, localeTarget, isRenderEditor);
};
