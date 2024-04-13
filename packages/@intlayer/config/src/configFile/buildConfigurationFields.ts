import { join } from 'path';
import { DEFAULT_LOCALE, LOCALES } from '../defaultValues/internationalization';
import {
  BASE_PATH,
  COOKIE_NAME,
  HEADER_NAME,
  NO_PREFIX,
  PREFIX_DEFAULT,
  SERVER_SET_COOKIE,
} from '../defaultValues/middleware';
import {
  BUNDLE_DIR_NAME,
  CONTENT_DIR_NAME,
  DICTIONARIES_DIR_NAME,
  FILE_EXTENSIONS,
  RESULT_DIR_NAME,
  EXCLUDED_PATHS,
  BUNDLE_FILE_EXTENSION,
  TYPES_DIR_NAME,
  MAIN_DIR_NAME,
  MODULE_AUGMENTATION_DIR_NAME,
} from '../defaultValues/server';
import type {
  BaseDerivedConfig,
  ContentConfig,
  CustomIntlayerConfig,
  PatternsContentConfig,
  InternationalizationConfig,
  IntlayerConfig,
  MiddlewareConfig,
  BaseContentConfig,
  ResultDirDerivedConfig,
} from '../types';
import type { GetConfigurationOptions } from './getConfiguration';

let storedConfiguration: IntlayerConfig;

const buildInternationalizationFields = (
  customConfiguration?: Partial<InternationalizationConfig>
): InternationalizationConfig => ({
  /**
   * Internationalization configuration
   */

  // Locales available in the application
  locales: customConfiguration?.locales ?? LOCALES,

  // Default locale of the application for fallback
  defaultLocale: customConfiguration?.defaultLocale ?? DEFAULT_LOCALE,
});

const buildMiddlewareFields = (
  customConfiguration?: Partial<MiddlewareConfig>
): MiddlewareConfig => ({
  /**
   * Middleware configuration
   */

  // Header name to get the locale
  headerName: customConfiguration?.headerName ?? HEADER_NAME,

  // Cookie name to get the locale
  cookieName: customConfiguration?.cookieName ?? COOKIE_NAME,

  // Prefix the default locale in the URL
  prefixDefault: customConfiguration?.prefixDefault ?? PREFIX_DEFAULT,

  // Base path
  basePath: customConfiguration?.basePath ?? BASE_PATH,

  // Set cookie on server
  serverSetCookie: customConfiguration?.serverSetCookie ?? SERVER_SET_COOKIE,

  // No prefix
  noPrefix: customConfiguration?.noPrefix ?? NO_PREFIX,
});

const buildContentFields = (
  customConfiguration?: Partial<ContentConfig>
): ContentConfig => {
  const notDerivedContentConfig: BaseContentConfig = {
    /**
     * Content configurations
     */

    // File extensions of content to look for
    fileExtensions: customConfiguration?.fileExtensions ?? FILE_EXTENSIONS,

    // Directory name of the project
    baseDir: customConfiguration?.baseDir ?? process.cwd(),

    // Directory name where the content is stored
    contentDirName: customConfiguration?.contentDirName ?? CONTENT_DIR_NAME,

    // Result directory name
    resultDirName: customConfiguration?.resultDirName ?? RESULT_DIR_NAME,

    // Module augmentation directory name
    moduleAugmentationDirName:
      customConfiguration?.moduleAugmentationDirName ??
      MODULE_AUGMENTATION_DIR_NAME,

    // Bundle directory name
    bundleDirName: customConfiguration?.bundleDirName ?? BUNDLE_DIR_NAME,

    // Bundle file extension
    bundleFileExtension:
      customConfiguration?.bundleFileExtension ?? BUNDLE_FILE_EXTENSION,

    // Dictionary directory name
    dictionariesDirName:
      customConfiguration?.dictionariesDirName ?? DICTIONARIES_DIR_NAME,

    // Types directory name
    typeDirName: customConfiguration?.typeDirName ?? TYPES_DIR_NAME,

    // Main directory name
    mainDirName: customConfiguration?.mainDirName ?? MAIN_DIR_NAME,

    // Directories to exclude
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,
  };

  const baseDirDerivedConfiguration: BaseDerivedConfig = {
    // Directory where the content is stored
    contentDir: join(
      notDerivedContentConfig.baseDir,
      notDerivedContentConfig.contentDirName
    ),

    // Directory where the result will be stored
    resultDir: join(
      notDerivedContentConfig.baseDir,
      notDerivedContentConfig.resultDirName
    ),

    // Directory where the module augmentation will be stored
    moduleAugmentationDir: join(
      notDerivedContentConfig.baseDir,
      notDerivedContentConfig.moduleAugmentationDirName
    ),
  };

  const resultDirDerivedConfiguration: ResultDirDerivedConfig = {
    // Directory where the bundle will be stored
    bundleDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.bundleDirName
    ),

    // Directory where the dictionaries will be stored
    dictionariesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.dictionariesDirName
    ),

    // Directory where the types will be stored
    typesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.typeDirName
    ),

    // Directory where the main files will be stored
    mainDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.mainDirName
    ),
  };

  const patternsConfiguration: PatternsContentConfig = {
    // Pattern of files to watch
    watchedFilesPattern: notDerivedContentConfig.fileExtensions.map(
      (ext) => `/**/*${ext}`
    ),

    // Pattern of files to watch including the relative path
    watchedFilesPatternWithPath: notDerivedContentConfig.fileExtensions.map(
      (ext) => `${baseDirDerivedConfiguration.contentDir}/**/*${ext}`
    ),

    // Pattern of files to output
    outputFilesPatternWithPath: `${resultDirDerivedConfiguration.dictionariesDir}/**/*.json`,
  };

  return {
    ...notDerivedContentConfig,
    ...baseDirDerivedConfiguration,
    ...resultDirDerivedConfiguration,
    ...patternsConfiguration,
  };
};

export const buildConfigurationFields = (
  options: GetConfigurationOptions,
  customConfiguration?: CustomIntlayerConfig
): IntlayerConfig => {
  const internationalizationConfig = buildInternationalizationFields(
    customConfiguration?.internationalization
  );

  const middlewareConfig = buildMiddlewareFields(
    customConfiguration?.middleware
  );

  const contentConfig = buildContentFields(customConfiguration?.content);

  storedConfiguration = {
    internationalization: internationalizationConfig,
    middleware: middlewareConfig,
    content: contentConfig,
  };

  return storedConfiguration;
};
