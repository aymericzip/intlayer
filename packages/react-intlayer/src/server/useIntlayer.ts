import type { Locales } from '@intlayer/config/client';
import {
  type DictionaryKeys,
  useIntlayerBase,
  type UseIntlayer,
} from '../useIntlayerBase';
import { LocaleServerContext } from './LocaleServerContextProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, Hook that picking one dictionary by its id and return the content
 *
 * If the locale is not provided, it will use the locale from the server context
 */
export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const localeTarget = locale ?? getServerContext<Locales>(LocaleServerContext);

  return useIntlayerBase(id, localeTarget);
};
