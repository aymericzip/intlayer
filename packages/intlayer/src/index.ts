/** biome-ignore-all lint/suspicious/noEmptyInterface: Intlayer module augmentation registries */

import type { CustomIntlayerConfig as IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary as DictionaryCore } from '@intlayer/types/dictionary';
import type { SchemaKeys } from '@intlayer/types/module_augmentation';

/**
 * The dictionary type used to define the structure of a dictionary.
 * It is used to provide type safety and autocompletion when defining a dictionary.
 *
 * @example
 * ```ts
 * import { Dictionary } from 'intlayer';
 *
 * const dictionary: Dictionary = { ... };
 * ```
 */
type Dictionary<
  T = undefined,
  SchemaKey extends SchemaKeys | undefined = undefined,
> = DictionaryCore<T, SchemaKey, true>;

/**
 * The content of a dictionary.
 *
 * @deprecated Use `Dictionary<T>` instead.
 */
type DeclarationContent<
  T = undefined,
  SchemaKey extends SchemaKeys | undefined = undefined,
> = Dictionary<T, SchemaKey>;

export { ALL_LOCALES, type Locale } from '@intlayer/types/allLocales';
export type { ContentNode } from '@intlayer/types/dictionary';
export type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';

import * as Locales from '@intlayer/types/locales';

export type { DeclarationContent, Dictionary, IntlayerConfig };

import { default as configuration } from '@intlayer/config/built';

/**
 * Returns the configuration of Intlayer.
 */
const getConfiguration = () => configuration;

/**
 * The locales defined in the configuration.
 */
const locales = configuration.internationalization.locales;

/**
 * The required locales defined in the configuration.
 */
const requiredLocales = configuration.internationalization.requiredLocales;

/**
 * The default locale defined in the configuration.
 */
const defaultLocale = configuration.internationalization.defaultLocale;

export { file } from '@intlayer/core/file'; // Include specific export for browser because of node js function that can't be used in browser
export {
  compact,
  currency,
  date,
  Intl,
  number,
  percentage,
  relativeTime,
  units,
} from '@intlayer/core/formatters';
export {
  getDictionary,
  getEnumeration,
  /**
   * @deprecated Use `getEnumeration` instead.
   */
  getEnumeration as getEnumerationContent,
  getIntlayer,
  getNesting,
  getTranslation,
  /**
   * @deprecated Use `getTranslation` instead.
   */
  getTranslation as getTranslationContent,
} from '@intlayer/core/interpreter';
export type {
  GenerateSitemapOptions,
  SitemapUrlEntry,
} from '@intlayer/core/localization';
export {
  generateSitemap,
  generateSitemapUrl,
  getBrowserLocale,
  getCanonicalPath,
  getHTMLTextDir,
  getLocale,
  getLocaleFromPath,
  getLocaleLang,
  getLocaleName,
  getLocalizedPath,
  getLocalizedUrl,
  getMultilingualUrls,
  getPathWithoutLocale,
  getPrefix,
  getRewriteRules,
  localeDetector,
  localeFlatMap,
  localeMap,
  localeRecord,
  localeResolver,
  validatePrefix,
} from '@intlayer/core/localization';
export { getMarkdownMetadata } from '@intlayer/core/markdown';
export {
  cond,
  enu,
  gender,
  html,
  insert,
  md,
  nest,
  t,
} from '@intlayer/core/transpiler';
export {
  getCookie,
  /**
   * @deprecated Use `getLocaleFromStorageClient` or `getLocaleFromStorageServer` instead.
   */
  getLocaleFromStorage,
  getLocaleFromStorageClient,
  getLocaleFromStorageServer,
  LocaleStorageClient,
  LocaleStorageServer,
  /**
   * @deprecated Use `setLocaleInStorageClient` or `setLocaleInStorageServer` instead.
   */
  setLocaleInStorage,
  setLocaleInStorageClient,
  setLocaleInStorageServer,
} from '@intlayer/core/utils';
// Reexport here for CJS compatibility
// Fix ReferenceError: Cannot access 'xxx' before initialization
export {
  defaultLocale,
  getConfiguration,
  Locales,
  locales,
  requiredLocales,
  configuration,
};

// --- Registries to be augmented by the generator ---
export interface __DictionaryRegistry {} // id -> interfaceof ictionary
export interface __DeclaredLocalesRegistry {} // 'fr': 1, 'en': 1, ...
export interface __RequiredLocalesRegistry {} // 'en': 1, ...
export interface __SchemaRegistry {} // id -> interface of schema
export interface __StrictModeRegistry {} // one of: { strict: true } | { inclusive: true } | { loose: true }
export interface __EditorRegistry {} // one of: { enabled: true } | { enabled: false }
