import type { Locales } from './locales';

/**
 * Configuration for internationalization settings
 */
export type InternationalizationConfig = {
  /**
   * Locales available in the application
   *
   * Default: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]
   */
  locales: Locales[];

  /**
   * Default locale of the application for fallback
   *
   * Default: Locales.ENGLISH
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
   */
  headerName: string;

  /**
   * Cookie name to store the locale information
   *
   * Default: 'NEXT_LOCALE'
   */
  cookieName: string;

  /**
   * Whether to prefix the default locale in the URL
   *
   * Default: false
   */
  prefixDefault: boolean;

  /**
   * Base path for application URLs
   *
   * Default: ''
   */
  basePath: string;

  /**
   * Strategy for setting the locale cookie on the server
   *
   * Default: 'always'
   */
  serverSetCookie: ServerSetCookieRule;

  /**
   * Indicates if no prefix should be used in the URL for locale
   *
   * Default: false
   */
  noPrefix: boolean;
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
};

/**
 * Base configuration for content handling
 */
export type BaseContentConfig = {
  /**
   * File extensions of content to look for
   *
   * Default: ['.content.ts', '.content.js', '.content.json']
   */
  fileExtensions: string[];

  /**
   * Absolute path of the project's base directory
   *
   * Default: process.cwd()
   */
  baseDir: string;

  /**
   * Name of the directory where the content is stored
   *
   * Default: 'src'
   */
  contentDirName: string;

  /**
   * Directories to be excluded from content processing
   *
   * Default: ['node_modules']
   */
  excludedPath: string[];

  /**
   * Name of the directory where results are stored
   *
   * Default: '.intlayer'
   */
  resultDirName: string;

  /**
   * Name of the directory for module augmentation
   *
   * Default: 'types'
   */
  moduleAugmentationDirName: string;

  /**
   * Name of the directory where bundles are stored
   *
   * Default: 'bundle'
   */
  bundleDirName: string;

  /**
   * File extension for bundle files
   *
   * Default: '.bundle.js'
   */
  bundleFileExtension: string;

  /**
   * Name of the directory where dictionaries are stored
   *
   * Default: 'dictionary'
   */
  dictionariesDirName: string;

  /**
   * Name of the directory where dictionary types are stored
   *
   * Default: 'types'
   */
  typeDirName: string;

  /**
   * Name of the directory where the main files are stored
   *
   * Default: 'main'
   */
  mainDirName: string;
};

/**
 * Configuration derived based on the base content configuration
 */
export type BaseDerivedConfig = {
  /**
   * Directory where the content is stored, relative to the base directory
   *
   * Default: {{baseDir}} / {{contentDirName}}
   */
  contentDir: string;

  /**
   * Directory where the results are stored, relative to the base directory
   *
   * Default: {{baseDir}} / {{resultDirName}}
   */
  resultDir: string;

  /**
   * Directory for module augmentation, relative to the base directory
   *
   * Default: {{baseDir}} / {{moduleAugmentationDirName}}
   */
  moduleAugmentationDir: string;
};

/**
 * Configuration derived based on the result directory
 */
export type ResultDirDerivedConfig = {
  /**
   * Directory where bundles are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{bundleDirName}}
   */
  bundleDir: string;

  /**
   * Directory where dictionaries are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{dictionariesDirName}}
   */
  dictionariesDir: string;

  /**
   * Directory where dictionary types are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{typeDirName}}
   */
  typesDir: string;

  /**
   * Directory where the main files are stored, relative to the result directory
   *
   * Default: {{resultDir}} / {{mainDirName}}
   */
  mainDir: string;
};

/**
 * Configuration for content patterns
 */
export type PatternsContentConfig = {
  /**
   * Patterns of files to watch for changes
   */
  watchedFilesPattern: string[];

  /**
   * Patterns of files to watch for changes including the relative path
   */
  watchedFilesPatternWithPath: string[];

  /**
   * Pattern for output files including the relative path
   */
  outputFilesPatternWithPath: string;
};

// @TODO: Implement exclusion of non configurable fields, to not allow them to be set in the config
/**
 * General configuration derived the config file
 */
export type ContentConfig = BaseContentConfig &
  BaseDerivedConfig &
  ResultDirDerivedConfig &
  PatternsContentConfig;
