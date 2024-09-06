import type { Locales } from './locales';

export type StrictMode = 'strict' | 'required_only' | 'loose';

/**
 * Configuration for internationalization settings
 */
export type InternationalizationConfig = {
  /**
   * Locales available in the application
   *
   * Default: [Locales.ENGLISH]
   *
   * You can define a list of available locales to support in the application.
   */
  locales: Locales[];

  /**
   * Ensure strong implementations of internationalized content using typescript.
   * - If set to "strict", the translation `t` function will require each declared locales to be defined. If one locale is missing, or if a locale is not declared in your config, it will throw an error.
   * - If set to "required_only", the translation `t` function will require each declared locales to be defined. If one locale is missing, it will throw a warning. But will accept if a locale is not declared in your config, but exist.
   * - If set to "loose", the translation `t` function will accept any existing locale.
   *
   * Default: "required_only"
   */
  strictMode: StrictMode;
  /**
   * Default locale of the application for fallback
   *
   * Default: Locales.ENGLISH
   *
   * Used to specify a fallback locale in case no other locale is set.
   */
  defaultLocale: Locales;
};

export type ServerSetCookieRule = 'always' | 'never';

/**
 * Configuration for middleware behaviors
 */
export type MiddlewareConfig = {
  /**
   * Header name to get the locale from the request
   *
   * Default: 'x-intlayer-locale'
   *
   * The HTTP header key used to determine the current locale.
   */
  headerName: string;

  /**
   * Cookie name to store the locale information
   *
   * Default: 'NEXT_LOCALE'
   *
   * The cookie key where the locale information is stored.
   */
  cookieName: string;

  /**
   * Whether to prefix the default locale in the URL
   *
   * Default: false
   *
   * When set to true, the default locale is prefixed in the URL for localization purposes.
   */
  prefixDefault: boolean;

  /**
   * Base path for application URLs
   *
   * Default: ''
   *
   * Defines the base path where the application is accessible from.
   */
  basePath: string;

  /**
   * Strategy for setting the locale cookie on the server
   *
   * Default: 'always'
   *
   * This setting controls when the server sets the locale cookie. It can either set the cookie on every request or never set it.
   */
  serverSetCookie: ServerSetCookieRule;

  /**
   * Indicates if no prefix should be used in the URL for locale
   *
   * Default: false
   *
   * If true, no locale-based prefix is used in the URL.
   */
  noPrefix: boolean;
};

/**
 * Configuration for intlayer editor
 */
export type EditorConfig = {
  /**
   * URL of the backend
   *
   * Default: 'https://back.intlayer.org'
   *
   * The URL of the backend server.
   */
  backendURL: string;

  /**
   * Indicates if the editor is active
   *
   * Default: true;
   *
   * If true, the editor is active and can be accessed.
   * If false, the editor is inactive and cannot be accessed.
   *
   * Usage:
   * ```js
   * {
   *  // Other configurations
   *  editor: {
   *   enabled: process.env.NODE_ENV === 'development',
   *  }
   * };
   * ```
   *
   */
  enabled: boolean;
};

/**
 * Custom configuration that can be provided to override default settings
 */
export type CustomIntlayerConfig = {
  /**
   * Custom internationalization configuration
   */
  internationalization?: Partial<InternationalizationConfig>;

  /**
   * Custom middleware configuration
   */
  middleware?: Partial<MiddlewareConfig>;

  /**
   * Custom content configuration
   */
  content?: Partial<ContentConfig>;

  /**
   * Custom editor configuration
   */
  editor?: Partial<EditorConfig>;
};

/**
 * Combined configuration for internationalization, middleware, and content
 */
export type IntlayerConfig = {
  /**
   * Internationalization configuration
   */
  internationalization: InternationalizationConfig;

  /**
   * Middleware configuration
   */
  middleware: MiddlewareConfig;

  /**
   * Content configuration
   */
  content: ContentConfig;

  /**
   * Intlayer editor configuration
   */
  editor: EditorConfig;
};

/**
 * Base configuration for content handling
 */
export type BaseContentConfig = {
  /**
   * File extensions of content to look for
   *
   * Default: ['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']
   *
   * List of file extensions to scan for content.
   */
  fileExtensions: string[];

  /**
   * Absolute path of the project's base directory
   *
   * Default: process.cwd()
   *
   * The root directory of the project, typically used for resolving other paths.
   */
  baseDir: string;

  /**
   * Name of the directory where the content is stored
   *
   * Default: 'src'
   *
   * Specifies the directory where the primary content is stored.
   */
  contentDirName: string;

  /**
   * Directories to be excluded from content processing
   *
   * Default: ['node_modules']
   *
   * A list of directories to exclude from content processing.
   */
  excludedPath: string[];

  /**
   * Name of the directory where results are stored
   *
   * Default: '.intlayer'
   *
   * The directory for storing intermediate or output results.
   */
  resultDirName: string;

  /**
   * Name of the directory for module augmentation
   *
   * Default: 'types'
   *
   * Defines the directory for additional module types.
   */
  moduleAugmentationDirName: string;

  /**
   * Name of the directory where dictionaries are stored
   *
   * Default: 'dictionary'
   *
   * The directory for storing localization dictionaries.
   *
   * Note:
   * - Ensure the dictionaries output includes intlayer to build the dictionaries for intlayer
   */
  dictionariesDirName: string;

  /**
   * Name of the directory where dictionaries are stored
   *
   * Default: 'i18n_dictionary'
   *
   * The directory for storing localization dictionaries.
   *
   * Note:
   * - Ensure the dictionaries output includes 'i18next' to build the dictionaries for i18next
   */
  i18nDictionariesDirName: string;

  /**
   * Name of the directory where dictionary types are stored
   *
   * Default: 'types'
   *
   * The directory for storing dictionary type definitions.
   */
  typeDirName: string;

  /**
   * Name of the directory where the main files are stored
   *
   * Default: 'main'
   *
   * Specifies the directory for storing main application files.
   */
  mainDirName: string;
};

export type DictionaryOutput = 'intlayer' | 'i18next';

/**
 * Configuration derived based on the base content configuration
 */
export type BaseDerivedConfig = {
  /**
   * Directory where the content is stored, relative to the base directory
   *
   * Default: {{baseDir}} / {{contentDirName}}
   *
   * Derived content directory based on the base configuration.
   */
  contentDir: string;

  /**
   * Directory where the results are stored, relative to the base directory
   *
   * Default: {{baseDir}} / {{resultDirName}}
   *
   * Derived results directory based on the base configuration.
   */
  resultDir: string;

  /**
   * Directory for module augmentation, relative to the base directory
   *
   * Default: {{baseDir}} / {{moduleAugmentationDirName}}
   *
   * Defines the derived path for module augmentation.
   */
  moduleAugmentationDir: string;

  /**
   * Type of dictionary to use as an output
   *
   * Default: ['intlayer']
   *
   * The type of dictionary to use as an output. It can be either 'intlayer' or 'i18next'.
   *
   * Note:
   * - 'i18next' is not yet ensure a 1:1 mapping with the i18next library.
   * - Removing 'intlayer' will break the compatibility with react-intlayer or next-intlayer
   *
   */
  dictionaryOutput: DictionaryOutput[];
};

/**
 * Configuration derived based on the result directory
 */
export type ResultDirDerivedConfig = {
  /**
   * Directory where dictionaries are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{dictionariesDirName}}
   *
   * Specifies the derived path for dictionaries relative to the result directory.
   */
  dictionariesDir: string;

  /**
   *
   * Directory where dictionaries are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{i18nDictionariesDirName}}
   *
   * Specifies the derived path for dictionaries relative to the result directory.
   *
   * Note:
   * - Ensure the i18n dictionaries output includes i18next to build the dictionaries for i18next
   */
  i18nDictionariesDir: string;

  /**
   * Directory where dictionary types are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{typeDirName}}
   *
   * Specifies the derived path for dictionary types relative to the result directory.
   */
  typesDir: string;

  /**
   * Directory where the main files are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{mainDirName}}
   *
   * Specifies the derived path for the main files relative to the result directory.
   */
  mainDir: string;
};

/**
 * Configuration for content patterns
 */
export type PatternsContentConfig = {
  /**
   * Patterns of files to watch for changes
   *
   * Default: ['/**\/*.content.ts', '/**\/*.content.js', '/**\/*.content.json', '/**\/*.content.cjs', '/**\/*.content.mjs', '/**\/*.content.tsx', '/**\/*.content.jsx']
   *
   * Defines file patterns for content to watch for changes.
   */
  watchedFilesPattern: string[];

  /**
   * Patterns of files to watch for changes including the relative path
   *
   * Default: ['{{contentDir}}/**\/*.content.ts', '{{contentDir}}/**\/*.content.js', '{{contentDir}}/**\/*.content.json', '{{contentDir}}/**\/*.content.cjs', '{{contentDir}}/**\/*.content.mjs', '{{contentDir}}/**\/*.content.tsx', '{{contentDir}}/**\/*.content.jsx']
   *
   * Specifies the file patterns for content to watch, including relative paths.
   */
  watchedFilesPatternWithPath: string[];

  /**
   * Pattern for output files including the relative path
   *
   * Default: '{{dictionariesDir}}/**\/*.json'
   *
   * Defines the pattern for output files, including the relative path.
   */
  outputFilesPatternWithPath: string;
};

// @TODO: Implement exclusion of non configurable fields, to not allow them to be set in the config
/**
 * General configuration derived from the config file
 */
export type ContentConfig = BaseContentConfig &
  BaseDerivedConfig &
  ResultDirDerivedConfig &
  PatternsContentConfig;
