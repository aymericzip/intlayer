import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { CustomizableLanguageContent } from './types';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

type GetTranslationContent = <Content = string>(
  languageContent: CustomizableLanguageContent<Content>,
  locale: Locales
) => Content;

export const getTranslationContent: GetTranslationContent = <Content = string>(
  languageContent: CustomizableLanguageContent<Content>,
  locale: Locales
) => languageContent[locale ?? defaultLocale] ?? languageContent[defaultLocale];
