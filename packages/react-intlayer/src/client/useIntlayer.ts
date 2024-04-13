import { useContext } from 'react';
import { type DictionaryKeys, useIntlayerBase } from '../useIntlayerBase';
import { LocaleContext } from './LocaleClientContextProvider';

export const useIntlayer = <T extends DictionaryKeys>(id: T) => {
  const { locale } = useContext(LocaleContext);

  return useIntlayerBase(id, locale);
};
