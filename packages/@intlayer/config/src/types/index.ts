import type { Locales } from '../defaultValues/locales';

export type CustomIntlayerConfig = Partial<{
  /**
   * Internationalization configuration
   */

  // Available languages in the app
  locales: Locales[]; // default [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]

  // Default language
  defaultLocale: Locales; // default Locales.ENGLISH

  /**
   * Content configuration
   */

  // File extensions of content to look for
  fileExtensions: string[]; // default ['.content.ts', '.content.js', '.content.json']

  // Directory of the project
  baseDirPath: string; // default process.cwd()

  // Directory name where the content is stored
  contentDirName: string; // default 'src'

  // Directory to watch - emplacement where the content is stored
  contentDir: string; // default {{baseDirPath}} / {{contentDirName}}

  // Directories to exclude
  excludedPath: string[]; // default ['node_modules']

  // Result directory name
  resultDirName: string; // default '.intlayer'

  // Result directory
  resultDir: string; // default {{baseDirPath}} / {{resultDirName}}

  // Module augmentation directory name
  moduleAugmentationDirName: string; // default 'types'

  // Result directory
  moduleAugmentationDir: string; // default {{baseDirPath}} / {{moduleAugmentationDirName}}

  // Bundle directory name
  bundleDirName: string; // default 'bundle'

  // Bundle directory
  bundleDir: string; // default {{resultDir}} / {{bundleDirName}}

  // Bundle file extension
  bundleFileExtension: string; // default '.bundle.js'

  // Dictionary directory name
  dictionariesDirName: string; // default 'dictionary'

  // Dictionary directory
  dictionariesDir: string; // default {{resultDir}} / {{dictionaryDirName}}

  // Types directory name
  typeDirName: string; // default 'types'

  // Types directory
  typesDir: string; // default {{resultDir}} / {{typeDirName}}

  // Main directory name
  mainDirName: string; // default 'main'

  // Main directory
  mainDir: string; // default {{resultDir}} / {{mainDirName}}

  /**
   * Server configuration
   */
}>;

export type FixedIntlayerConfig = {
  // Pattern of files to watch
  watchedFilesPattern: string[];

  // Pattern of files to watch including the relative path
  watchedFilesPatternWithPath: string[];

  // Pattern of files to output
  outputFilesPatternWithPath: string;
};

export type NotDerivedConfiguration = Omit<
  Required<CustomIntlayerConfig>,
  | 'contentDir'
  | 'resultDir'
  | 'bundleDir'
  | 'dictionariesDir'
  | 'typesDir'
  | 'mainDir'
  | 'moduleAugmentationDir'
>;

export type BaseDirDerivedConfiguration = Pick<
  Required<CustomIntlayerConfig>,
  'contentDir' | 'resultDir' | 'moduleAugmentationDir'
>;

export type ResultDirDerivedConfiguration = Pick<
  Required<CustomIntlayerConfig>,
  'bundleDir' | 'dictionariesDir' | 'typesDir' | 'mainDir'
>;

export type IntlayerConfig = Required<CustomIntlayerConfig> &
  FixedIntlayerConfig;
