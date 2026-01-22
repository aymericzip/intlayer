'use client';

import { getTranslation } from '@intlayer/core';
import type { LocalesValues, StrictModeLocaleMap } from '@intlayer/types';
import { useContext } from 'react';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Client-side translation function that returns the translation of the provided multilang content.
 *
 * If the locale is not provided, it will use the locale from the client context.
 *
 * @param multilangContent - An object mapping locales to their respective content.
 * @param locale - Optional locale to override the current context locale.
 * @returns The translation for the specified locale.
 *
 * @example
 * ```tsx
 * import { t } from 'react-intlayer';
 *
 * const MyComponent = () => {
 *   const greeting = t({
 *     en: 'Hello',
 *     fr: 'Bonjour',
 *     es: 'Hola',
 *   });
 *
 *   return <h1>{greeting}</h1>;
 * };
 * ```
 */
export const t = <Content = string>(
  multilangContent: StrictModeLocaleMap<Content>,
  locale?: LocalesValues
) => {
  const { locale: currentLocale } = useContext(IntlayerClientContext);
  const localeTarget = locale ?? currentLocale;

  return getTranslation<Content>(multilangContent, localeTarget);
};
