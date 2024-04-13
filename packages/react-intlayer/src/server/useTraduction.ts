import type { Locales } from '@intlayer/config';
import type { LanguageContent } from '@intlayer/core';
import { getTranslation } from '../getTranslation';
import { LocaleServerContext } from './LocaleServerContextProvider';
import { getServerContext } from './serverContext';

export const useTraduction = <Content>(
  languageContent: LanguageContent<Content>
) => {
  const locale = getServerContext<Locales>(LocaleServerContext);

  return getTranslation(languageContent, locale);
};
