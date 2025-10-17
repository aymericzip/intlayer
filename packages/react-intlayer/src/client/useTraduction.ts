import { getTranslation } from '@intlayer/core';
import type { LanguageContent } from '@intlayer/types';
import { useContext, useMemo } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that picking one dictionary by its id and return the content.
 *
 * If not locale found, it will return the content related to the default locale.
 *
 * Return either the content editor, or the content itself depending on the configuration.
 *
 * Usage:
 *
 * ```tsx
 * const content = useTranslation<string>({
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
export const useTranslation = <Content = string>(
  languageContent: LanguageContent<Content>
): Content => {
  const { locale } = useContext(IntlayerClientContext);

  return useMemo(
    () => getTranslation(languageContent, locale),
    [languageContent, locale]
  );
};
