import { intlayerIntlConfiguration } from '@intlayer/config/client';
import type { LanguageContent } from '@intlayer/core';
import { getContent } from '../getContent';
import { LocaleServerContext } from './LocaleServerContextProvider';
import { getServerContext } from './serverContext';

export const getLocaleContent = <Content>(
  languageContent: LanguageContent<Content>
) => {
  const locale = getServerContext(LocaleServerContext);
  const content = getContent(
    languageContent,
    locale ?? intlayerIntlConfiguration.defaultLocale
  );

  return {
    locale,
    content,
  };
};
