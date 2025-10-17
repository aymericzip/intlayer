import type { Dictionary as DictionaryCore } from '@intlayer/types';

type Dictionary<T = undefined> = DictionaryCore<T, true>;
/**
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<T = undefined> = Dictionary<T>;

export {
  type ContentNode,
  type IntlayerConfig,
  type LanguageContent,
  Locales,
  type LocalesValues,
} from '@intlayer/types';
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
export { configuration, getConfiguration };

export {
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
