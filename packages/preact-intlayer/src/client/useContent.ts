import type { StrictModeLocaleMap } from '@intlayer/types';
import { useLocaleBase } from './useLocaleBase';
import { useTranslation } from './useTraduction';

/**
 * On the client side, hook to get the translation content based on the locale
 */
export const useContent = <Content>(
  languageContent: StrictModeLocaleMap<Content>
) => {
  const { locale } = useLocaleBase();

  const content = useTranslation(languageContent);

  return {
    locale,
    content,
    t: useTranslation,
  };
};
