import { intlayerIntlConfiguration } from '@intlayer/config/client';
import { type LanguageContent, getTranslationContent } from '@intlayer/core';
import { IntlayerServerContext } from './IntlayerServerProvider';
import { getServerContext } from './serverContext';

/**
 * On the server side, get the translation content based on the locale
 */
export const getLocaleTranslation = <Content>(
  languageContent: LanguageContent<Content>
) => {
  const locale = getServerContext(IntlayerServerContext);
  const content = getTranslationContent<Content>(
    languageContent,
    locale ?? intlayerIntlConfiguration.defaultLocale
  );

  return {
    locale,
    content,
  };
};
