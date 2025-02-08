import type { Dictionary as DictionaryCore } from '@intlayer/core';

type Dictionary<T = undefined> = DictionaryCore<T, true>;
/**
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<T = undefined> = Dictionary<T>;

export type { Dictionary, DeclarationContent };

export {
  Locales,
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
  t,
  nest,
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
