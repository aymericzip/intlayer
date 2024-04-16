import { intlayerIntlConfiguration } from '@intlayer/config/client';
import { type LanguageContent, getTranslation } from '@intlayer/core';
import { LocaleServerContext } from './LocaleServerContextProvider';
import { getServerContext } from './serverContext';

export const getLocaleTranslation = <Content>(
  languageContent: LanguageContent<Content>
) => {
  const locale = getServerContext(LocaleServerContext);
  const content = getTranslation<Content>(
    languageContent,
    locale ?? intlayerIntlConfiguration.defaultLocale
  );

  return {
    locale,
    content,
  };
};
