import type { Locales } from '../defaultValues/locales';

export type InternationalizationConfig = {
  // Available languages in the app
  locales: Locales[]; // default [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]

  // Default language
  defaultLocale: Locales; // default Locales.ENGLISH
};

export type ServerSetCookieRule = 'always' | 'never';
export type MiddlewareConfig = {
  // Header name to get the language
  headerName: string; // default 'x-intlayer-locale'

  // Cookie name to get the language
  cookieName: string; // default 'NEXT_LOCALE'

  // Prefix the default language in the URL
  prefixDefault: boolean; // default false

  // Base path
  basePath: string; // default ''

  // Set cookie on server
  serverSetCookie: ServerSetCookieRule; // default 'always'

  // No prefix
  noPrefix: boolean; // default false;
};

export type CustomIntlayerConfig = {
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

export type BaseContentConfig = {
  // File extensions of content to look for
  fileExtensions: string[]; // default ['.content.ts', '.content.js', '.content.json']

  // Directory of the project
  baseDir: string; // default process.cwd()

  // Directory name where the content is stored
  contentDirName: string; // default 'src'

  // Directories to exclude
  excludedPath: string[]; // default ['node_modules']

  // Result directory name
  resultDirName: string; // default '.intlayer'

  // Module augmentation directory name
  moduleAugmentationDirName: string; // default 'types'

  // Bundle directory name
  bundleDirName: string; // default 'bundle'

  // Bundle file extension
  bundleFileExtension: string; // default '.bundle.js'

  // Dictionary directory name
  dictionariesDirName: string; // default 'dictionary'

  // Types directory name
  typeDirName: string; // default 'types'

  // Main directory name
  mainDirName: string; // default 'main'
};

export type BaseDerivedConfig = {
  // Directory to watch - emplacement where the content is stored
  contentDir: string; // default {{baseDir}} / {{contentDirName}}

  // Result directory
  resultDir: string; // default {{baseDir}} / {{resultDirName}}

  // Result directory
  moduleAugmentationDir: string; // default {{baseDir}} / {{moduleAugmentationDirName}}
};

export type ResultDirDerivedConfig = {
  // Bundle directory
  bundleDir: string; // default {{resultDir}} / {{bundleDirName}}

  // Dictionary directory
  dictionariesDir: string; // default {{resultDir}} / {{dictionaryDirName}}

  // Types directory
  typesDir: string; // default {{resultDir}} / {{typeDirName}}

  // Main directory
  mainDir: string; // default {{resultDir}} / {{mainDirName}}
};

export type PatternsContentConfig = {
  // Pattern of files to watch
  watchedFilesPattern: string[];

  // Pattern of files to watch including the relative path
  watchedFilesPatternWithPath: string[];

  // Pattern of files to output
  outputFilesPatternWithPath: string;
};

export type ContentConfig = BaseContentConfig &
  BaseDerivedConfig &
  ResultDirDerivedConfig &
  PatternsContentConfig;

export type IntlayerConfig = Required<CustomIntlayerConfig>;
