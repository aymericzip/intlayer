/** biome-ignore-all lint/suspicious/noEmptyInterface: Intlayer module augmentation registries */
import {
  type Dictionary as DictionaryCore,
  type CustomIntlayerConfig as IntlayerConfig,
  Locales,
} from '@intlayer/types';

type Dictionary<T = undefined> = DictionaryCore<T, true>;
/**
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<T = undefined> = Dictionary<T>;

/**
 * @deprecated
 *
 * Use Locales.All_LOCALES instead
 */
const localeList = Locales.ALL_LOCALES;

export {
  type ContentNode,
  type Locale,
  Locales,
  type LocalesValues,
  type StrictModeLocaleMap,
} from '@intlayer/types';
export type { DeclarationContent, Dictionary, IntlayerConfig, localeList };

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

// --- Registries to be augmented by the generator ---
export interface __DictionaryRegistry {} // id -> interfaceof ictionary
export interface __DeclaredLocalesRegistry {} // 'fr': 1, 'en': 1, ...
export interface __RequiredLocalesRegistry {} // 'en': 1, ...
export interface __StrictModeRegistry {} // one of: { strict: true } | { inclusive: true } | { loose: true }
