import type { Locales } from '@intlayer/config';
import { type DictionaryKeys, useIntlayerBase } from '../useIntlayerBase';
import { LocaleServerContext } from './LocaleServerContextProvider';
import { getServerContext } from './serverContext';

export const useIntlayer = <T extends DictionaryKeys>(id: T) => {
  const locale = getServerContext<Locales>(LocaleServerContext);

  return useIntlayerBase(id, locale);
};
