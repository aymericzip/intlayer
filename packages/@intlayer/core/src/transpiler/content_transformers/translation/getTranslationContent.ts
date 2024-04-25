import { type Locales, getConfiguration } from '@intlayer/config/client';
import type { CustomizableLanguageContent } from './types';

const defaultLocale = getConfiguration().internationalization.defaultLocale;

type GetTranslationContent = <Content = string>(
  languageContent: CustomizableLanguageContent<Content>,
  locale: Locales
) => Content;

/**
 *
 * Allow to pick a content based on a locale.
 * If not locale found, it will return the content related to the default locale.
 *
 * Usage:
 *
 * ```ts
 * const content = getTranslationContent({
 *  en: 'Hello',
 *  fr: 'Bonjour',
 * }, 'fr');
 * // 'Bonjour'
 * ```
 *
 * Using TypeScript:
 * - this function will require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
export const getTranslationContent: GetTranslationContent = <Content = string>(
  languageContent: CustomizableLanguageContent<Content>,
  locale: Locales
) => languageContent[locale ?? defaultLocale] ?? languageContent[defaultLocale];
