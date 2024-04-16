import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { LanguageContent } from './translations';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

export const getTranslationContent = <Content>(
  languageContent: LanguageContent<Content>,
  locale: Locales
): Content =>
  languageContent[locale ?? defaultLocale] ?? languageContent[defaultLocale];
