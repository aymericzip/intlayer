import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import { type LanguageContent, getTranslationContent } from '@intlayer/core';
import { contentRender } from './ContentEditor/contentRender';

export const getTranslation = <Content>(
  languageContent: LanguageContent<Content>,
  locale?: Locales
): Content => {
  const { defaultLocale } = intlayerIntlConfiguration;

  const result: Content = getTranslationContent<Content>(
    languageContent,
    locale ?? defaultLocale
  );

  if (typeof result === 'string') {
    return contentRender(result) as Content;
  }

  return result;
};
