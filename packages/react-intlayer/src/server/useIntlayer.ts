import type { Locales } from '@intlayer/config/client';
import {
  type DictionaryKeys,
  useIntlayerBase,
  type UseIntlayer,
} from '../useIntlayerBase';
import { LocaleServerContext } from './LocaleServerContextProvider';
import { getServerContext } from './serverContext';

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(
  id: T,
  locale?: Locales
) => {
  const localeTarget = locale ?? getServerContext<Locales>(LocaleServerContext);

  return useIntlayerBase(id, localeTarget);
};
