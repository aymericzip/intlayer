/** biome-ignore-all lint/suspicious/noEmptyInterface: Intlayer module augmentation registries */
import {
  type Dictionary as DictionaryCore,
  type CustomIntlayerConfig as IntlayerConfig,
  Locales,
  type SchemaKeys,
} from '@intlayer/types';

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

/**
 * A list of all supported locales.
 *
 * @deprecated Use `Locales.ALL_LOCALES` instead.
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
/**
 * The configuration of Intlayer.
 */
import configuration from '@intlayer/config/built';

/**
 * Returns the configuration of Intlayer.
 *
 * @deprecated Use `import { configuration } from 'intlayer'` instead.
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

// Reexport here for CJS compatibility
// Fix ReferenceError: Cannot access 'xxx' before initialization
export {
  configuration,
  getConfiguration,
  locales,
  requiredLocales,
  defaultLocale,
};

export {
  compact,
  cond,
  currency,
  date,
  enu,
  gender,
  getBrowserLocale,
  getCanonicalPath,
  getCookie,
  getDictionary,
  getEnumeration,
  /**
   * @deprecated Use `getEnumeration` instead.
   */
  getEnumeration as getEnumerationContent,
  getHTMLTextDir,
  getIntlayer,
  getLocale,
  getLocaleFromPath,
  getLocaleFromStorage,
  getLocaleLang,
  getLocaleName,
  getLocalizedPath,
  getLocalizedUrl,
  getMarkdownMetadata,
  getMultilingualUrls,
  getNesting,
  getPathWithoutLocale,
  getPrefix,
  getRewriteRules,
  getTranslation,
  /**
   * @deprecated Use `getTranslation` instead.
   */
  getTranslation as getTranslationContent,
  html,
  Intl,
  insert,
  localeDetector,
  localeFlatMap,
  localeMap,
  localeRecord,
  localeResolver,
  md,
  nest,
  number,
  percentage,
  relativeTime,
  setLocaleInStorage,
  t,
  units,
  validatePrefix,
} from '@intlayer/core';
export { file } from '@intlayer/core/file'; // Include specific export for browser because of node js function that can't be used in browser

// --- Registries to be augmented by the generator ---
export interface __DictionaryRegistry {} // id -> interfaceof ictionary
export interface __DeclaredLocalesRegistry {} // 'fr': 1, 'en': 1, ...
export interface __RequiredLocalesRegistry {} // 'en': 1, ...
export interface __SchemaRegistry {} // id -> interface of schema
export interface __StrictModeRegistry {} // one of: { strict: true } | { inclusive: true } | { loose: true }
