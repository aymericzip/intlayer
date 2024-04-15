import type { Locales } from '@intlayer/config';
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

  console.log('useIntlayer', id, localeTarget);

  return useIntlayerBase(id, localeTarget);
};
