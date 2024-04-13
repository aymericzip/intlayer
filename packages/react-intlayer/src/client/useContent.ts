import type { LanguageContent } from '@intlayer/core';
import { useLocale } from './useLocale';
import { useTraduction } from './useTraduction';

export const useContent = <Content>(
  languageContent: LanguageContent<Content>
) => {
  const { locale } = useLocale();

  const content = useTraduction(languageContent);

  return {
    locale,
    content,
    t: useTraduction,
  };
};
