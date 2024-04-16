import {
  type Locales,
  intlayerIntlConfiguration,
} from '@intlayer/config/client';
import type { LanguageContent } from './translations';

const defaultLocale = intlayerIntlConfiguration.defaultLocale;

export const getTranslation = <Content>(
  languageContent: LanguageContent<Content>,
  locale: Locales
) => languageContent[locale ?? defaultLocale] ?? languageContent[defaultLocale];
