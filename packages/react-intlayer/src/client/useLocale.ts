import { useContext } from 'react';
import { LocaleContext } from './LocaleClientContextProvider';

export const useLocale = () => {
  const { locale } = useContext(LocaleContext);

  return { locale };
};
