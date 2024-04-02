import { resolve } from 'path';
import { DEFAULT_LOCALE, LOCALES } from './defaultValues/internationalization';
import {
  BUNDLE_DIR_NAME,
  CONTENT_DIR_NAME,
  DICTIONARIES_DIR_NAME,
  FILE_EXTENSIONS,
  RESULT_DIR_NAME,
  EXCLUDED_PATHS,
  BASE_DIR_PATH,
  BUNDLE_FILE_EXTENSION,
} from './defaultValues/server';
import type {
  BaseDirDerivedConfiguration,
  CustomIntlayerConfig,
  FixedIntlayerConfig,
  IntlayerConfig,
  NotDerivedConfiguration,
  ResultDirDerivedConfiguration,
} from './types';

let storedConfiguration: IntlayerConfig;

export const buildConfigurationFields = (
  customConfiguration?: CustomIntlayerConfig
): IntlayerConfig => {
  const configuration: NotDerivedConfiguration = {
    /**
     * Internationalization configuration
     */

    // Locales available in the application
    locales: customConfiguration?.locales ?? LOCALES,

    // Default locale of the application for fallback
    defaultLocale: customConfiguration?.defaultLocale ?? DEFAULT_LOCALE,

    /**
     * Content configurations
     */
    // File extensions of content to look for
    fileExtensions: customConfiguration?.fileExtensions ?? FILE_EXTENSIONS,
    // Directory name of the project
    baseDirPath: customConfiguration?.baseDirPath ?? BASE_DIR_PATH,
    // Directory name where the content is stored
    contentDirName: customConfiguration?.contentDir ?? CONTENT_DIR_NAME,
    // Result directory name
    resultDirName: customConfiguration?.resultDirName ?? RESULT_DIR_NAME,
    // Bundle directory name
    bundleDirName: customConfiguration?.bundleDirName ?? BUNDLE_DIR_NAME,
    // Bundle file extension
    bundleFileExtension:
      customConfiguration?.bundleFileExtension ?? BUNDLE_FILE_EXTENSION,
    // Dictionary directory name
    dictionariesDirName:
      customConfiguration?.dictionariesDirName ?? DICTIONARIES_DIR_NAME,
    // Directories to exclude
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,
  };

  const baseDirDerivedConfiguration: BaseDirDerivedConfiguration = {
    // Directory where the content is stored
    contentDir: resolve(
      configuration.baseDirPath,
      configuration.contentDirName
    ),
    // Directory where the result will be stored
    resultDir: resolve(configuration.baseDirPath, configuration.resultDirName),
  };

  const resultDirDerivedConfiguration: ResultDirDerivedConfiguration = {
    // Directory where the bundle will be stored
    bundleDir: resolve(
      baseDirDerivedConfiguration.resultDir,
      configuration.bundleDirName
    ),
    // Directory where the dictionaries will be stored
    dictionariesDir: resolve(
      baseDirDerivedConfiguration.resultDir,
      configuration.dictionariesDirName
    ),
  };

  const fixedConfiguration: FixedIntlayerConfig = {
    // Pattern of files to watch
    watchedFilesPattern: configuration.fileExtensions.map(
      (ext) => `/**/*${ext}`
    ),

    // Pattern of files to watch including the relative path
    watchedFilesPatternWithPath: configuration.fileExtensions.map(
      (ext) => `${baseDirDerivedConfiguration.contentDir}/**/*${ext}`
    ),

    // Pattern of files to output
    outputFilesPatternWithPath: `${resultDirDerivedConfiguration.dictionariesDir}/**/*.json`,
  };

  storedConfiguration = {
    ...configuration,
    ...baseDirDerivedConfiguration,
    ...resultDirDerivedConfiguration,
    ...fixedConfiguration,
  };

  return storedConfiguration;
};
