import type { LanguageContent } from '@intlayer/core';
import { useLocaleBase } from './useLocaleBase';
import { useTraduction } from './useTraduction';

/**
 * On the client side, hook to get the translation content based on the locale
 */
export const useContent = <Content>(
  languageContent: LanguageContent<Content>
) => {
  const { locale } = useLocaleBase();

  const content = useTraduction(languageContent);

  return {
    locale,
    content,
    t: useTraduction,
  };
};
