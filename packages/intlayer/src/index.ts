import { Locales } from '@intlayer/config/client';
import {
  getTranslation as getTranslationCore,
  nest as nestCore,
  t as tCore,
  type TranslationContent,
  type NestedContent,
  type DictionaryKeys,
  type TranslationContentState,
  type Dictionary as DictionaryCore,
  type ValidDotPathsFor,
} from '@intlayer/core';

interface IConfigLocales<Content> {
  // This interface should be augmented in the consuming app
}

type ConfigLocales = keyof IConfigLocales<unknown>;

type CustomizableLanguageContent<Content = string> = ConfigLocales extends never
  ? TranslationContentState<Content>
  : IConfigLocales<Content>;

// Re-exporting the following functions from the core package: to use module augmentation
const t: <Content = string>(
  content: CustomizableLanguageContent<Content>
) => TranslationContent<Content> = tCore;
const getTranslationContent: <Content = string>(
  languageContent: CustomizableLanguageContent<Content>,
  locale: Locales
) => Content = getTranslationCore;
const nest: <K extends DictionaryKeys>(
  dictionaryKey: K,
  path?: ValidDotPathsFor<K>
) => NestedContent<K> = nestCore;

type Dictionary<T = string> = DictionaryCore<T, true>;
/**
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<T = string> = Dictionary<T>;

export {
  Locales,
  type Dictionary,
  type DeclarationContent,
  type IConfigLocales,
  t,
  getTranslationContent,
  nest,
};

export {
  type CustomIntlayerConfig as IntlayerConfig,
  type LocalesValues,
  getConfiguration,
} from '@intlayer/config/client';
export {
  type LanguageContent,
  type ContentNode,
  getLocaleName,
  enu,
  cond,
  md,
  getEnumeration,
  getDictionary,
  getIntlayer,
  getIntlayerAsync,
  getTranslation,
  getNesting,
  getLocaleLang,
  getHTMLTextDir,
  getPathWithoutLocale,
  getMultilingualUrls,
  getLocalizedUrl,
  localeList,
} from '@intlayer/core';
