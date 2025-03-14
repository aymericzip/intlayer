export * from '@intlayer/config/client';
import { type CustomIntlayerConfig as IntlayerConfig } from '@intlayer/config/client';
import type { Dictionary as DictionaryCore } from '@intlayer/core';

type Dictionary<T = undefined> = DictionaryCore<T, true>;
/**
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<T = undefined> = Dictionary<T>;

export type { Dictionary, DeclarationContent };

/**
 * Rexport using named import because πof Tsup bug in CJS
 */
import configuration from '@intlayer/config/built';
/**
 * @deprecated Use `import { configuration } from 'intlayer'` instead.
 */
const getConfiguration = () => configuration;
export { configuration, getConfiguration, IntlayerConfig };

export {
  type LanguageContent,
  type ContentNode,
  getLocaleName,
  enu,
  cond,
  md,
  t,
  nest,
  insert,
  file,
  getEnumeration,
  /**
   * @deprecated Use `getEnumeration` instead.
   */
  getEnumeration as getEnumerationContent,
  getDictionary,
  getIntlayer,
  getIntlayerAsync,
  getTranslation,
  /**
   * @deprecated Use `getTranslation` instead.
   */
  getTranslation as getTranslationContent,
  getNesting,
  getLocaleLang,
  getHTMLTextDir,
  getPathWithoutLocale,
  getMultilingualUrls,
  getLocalizedUrl,
  localeList,
} from '@intlayer/core';
