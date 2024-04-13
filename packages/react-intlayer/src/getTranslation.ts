import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { LanguageContent } from '@intlayer/core';
import { contentRender } from './ContentEditor/contentRender';

export const getTranslation = <Content>(
  languageContent: LanguageContent<Content>,
  locale?: Locales
): Content => {
  const { defaultLocale } = intlayerIntlConfiguration;

  const result: Content =
    languageContent[locale ?? defaultLocale] ?? languageContent[defaultLocale];

  if (typeof result === 'string') {
    return contentRender(result) as Content;
  }

  return result;
};
