import type { CustomIntlayerConfig as IntlayerConfig } from '@intlayer/config/client';
import type { Dictionary as DictionaryCore } from '@intlayer/core';

type Dictionary<T = undefined> = DictionaryCore<T, true>;
/**
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<T = undefined> = Dictionary<T>;

export { Locales, type LocalesValues } from '@intlayer/config/client';
export type { DeclarationContent, Dictionary };

/**
 * Rexport using named import because πof Tsup bug in CJS
 */
import configuration from '@intlayer/config/built';

/**
 * @deprecated Use `import { configuration } from 'intlayer'` instead.
 */
const getConfiguration = () => configuration;

// Reexport here for CJS compatibility
// Fix ReferenceError: Cannot access 'xxx' before initialization
export { configuration, getConfiguration, type IntlayerConfig };

export {
  type ContentNode,
  compact,
  cond,
  currency,
  date,
  enu,
  gender,
  getDictionary,
  getEnumeration,
  /**
   * @deprecated Use `getEnumeration` instead.
   */
  getEnumeration as getEnumerationContent,
  getHTMLTextDir,
  getIntlayer,
  getIntlayerAsync,
  getLocaleFromPath,
  getLocaleLang,
  getLocaleName,
  getLocalizedUrl,
  getMarkdownMetadata,
  getMultilingualUrls,
  getNesting,
  getPathWithoutLocale,
  getTranslation,
  /**
   * @deprecated Use `getTranslation` instead.
   */
  getTranslation as getTranslationContent,
  Intl,
  insert,
  type LanguageContent,
  localeFlatMap,
  localeList,
  localeMap,
  localeRecord,
  md,
  nest,
  number,
  percentage,
  relativeTime,
  t,
  units,
} from '@intlayer/core';
export { file } from '@intlayer/core/file'; // Include specific export for browser because of node js function that can't be used in browser
