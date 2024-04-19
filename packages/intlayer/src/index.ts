import type { Locales } from '@intlayer/config/client';
import {
  type TranslationContent,
  t as tCore,
  getTranslationContent as getTranslationContentCore,
  type LanguageContent,
} from '@intlayer/core';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IConfigLocales<Content> {
  // This interface should be augmented in the consuming app
}

type ConfigLocales = keyof IConfigLocales<unknown>;

type ConfigLanguageContent<Content> = Record<ConfigLocales, Content>;

export type CustomizableLanguageContent<Content = string> =
  ConfigLocales extends never
    ? LanguageContent<Content>
    : ConfigLanguageContent<Content>;

// Re-exporting the following functions from the core package: to use module augmentation
export const t: <Content = string>(
  content?: CustomizableLanguageContent<Content>
) => TranslationContent<Content> = tCore;
export const getTranslationContent: <Content = string>(
  languageContent: CustomizableLanguageContent<Content>,
  locale: Locales
) => Content = getTranslationContentCore;

export type {
  LanguageContent,
  QuantityContent,
  ContentValue,
  ContentModule,
} from '@intlayer/core';
export { getLocaleName, enu, getEnumerationContent } from '@intlayer/core';
export {
  type CustomIntlayerConfig as IntlayerConfig,
  Locales,
} from '@intlayer/config/client';
