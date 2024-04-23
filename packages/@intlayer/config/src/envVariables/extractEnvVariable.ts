import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
} from '../types/config';
import { type ViteEnvVar, getPlatform } from './detectPlatform';

// Utility type that replaces all values of a given type with another type
type ReplaceValue<T> = {
  [K in keyof T]: string | undefined;
};

const extractNextEnvVariable = () => {
  if (typeof process === 'undefined') {
    return extractEmptyEnvVariable();
  }

  const env = process.env;

  const intlayerIntlConfiguration: ReplaceValue<InternationalizationConfig> = {
    locales: env.NEXT_PUBLIC_INTLAYER_LOCALES,
    defaultLocale: env.NEXT_PUBLIC_INTLAYER_DEFAULT_LOCALE,
  };

  const intlayerMiddlewareConfiguration: ReplaceValue<MiddlewareConfig> = {
    headerName: env.NEXT_PUBLIC_INTLAYER_HEADER_NAME,
    cookieName: env.NEXT_PUBLIC_INTLAYER_COOKIE_NAME,
    prefixDefault: env.NEXT_PUBLIC_INTLAYER_PREFIX_DEFAULT,
    basePath: env.NEXT_PUBLIC_INTLAYER_BASE_PATH,
    serverSetCookie: env.NEXT_PUBLIC_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: env.NEXT_PUBLIC_INTLAYER_NO_PREFIX,
  };

  const intlayerContentConfiguration: ReplaceValue<ContentConfig> = {
    fileExtensions: env.NEXT_PUBLIC_INTLAYER_FILE_EXTENSIONS,
    baseDir: env.NEXT_PUBLIC_INTLAYER_BASE_DIR,
    contentDirName: env.NEXT_PUBLIC_INTLAYER_CONTENT_DIR_NAME,
    contentDir: env.NEXT_PUBLIC_INTLAYER_CONTENT_DIR,
    excludedPath: env.NEXT_PUBLIC_INTLAYER_EXCLUDED_PATH,
    resultDirName: env.NEXT_PUBLIC_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName:
      env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR_NAME,
    typeDirName: env.NEXT_PUBLIC_INTLAYER_TYPE_DIR_NAME,
    mainDirName: env.NEXT_PUBLIC_INTLAYER_MAIN_DIR_NAME,
    resultDir: env.NEXT_PUBLIC_INTLAYER_RESULT_DIR,
    moduleAugmentationDir: env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR,
    typesDir: env.NEXT_PUBLIC_INTLAYER_TYPE_DIR,
    mainDir: env.NEXT_PUBLIC_INTLAYER_MAIN_DIR,
    watchedFilesPattern: env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      env.NEXT_PUBLIC_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
  };

  return {
    intlayerIntlConfiguration,
    intlayerMiddlewareConfiguration,
    intlayerContentConfiguration,
  };
};

const extractReactAppEnvVariable = () => {
  if (typeof process === 'undefined') {
    return extractEmptyEnvVariable();
  }

  const env = process.env;

  const intlayerIntlConfiguration: ReplaceValue<InternationalizationConfig> = {
    locales: env.REACT_APP_INTLAYER_LOCALES,
    defaultLocale: env.REACT_APP_INTLAYER_DEFAULT_LOCALE,
  };

  const intlayerMiddlewareConfiguration: ReplaceValue<MiddlewareConfig> = {
    headerName: env.REACT_APP_INTLAYER_HEADER_NAME,
    cookieName: env.REACT_APP_INTLAYER_COOKIE_NAME,
    prefixDefault: env.REACT_APP_INTLAYER_PREFIX_DEFAULT,
    basePath: env.REACT_APP_INTLAYER_BASE_PATH,
    serverSetCookie: env.REACT_APP_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: env.REACT_APP_INTLAYER_NO_PREFIX,
  };

  const intlayerContentConfiguration: ReplaceValue<ContentConfig> = {
    fileExtensions: env.REACT_APP_INTLAYER_FILE_EXTENSIONS,
    baseDir: env.REACT_APP_INTLAYER_BASE_DIR,
    contentDirName: env.REACT_APP_INTLAYER_CONTENT_DIR_NAME,
    contentDir: env.REACT_APP_INTLAYER_CONTENT_DIR,
    excludedPath: env.REACT_APP_INTLAYER_EXCLUDED_PATH,
    resultDirName: env.REACT_APP_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName:
      env.REACT_APP_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: env.REACT_APP_INTLAYER_DICTIONARIES_DIR_NAME,
    typeDirName: env.REACT_APP_INTLAYER_TYPE_DIR_NAME,
    mainDirName: env.REACT_APP_INTLAYER_MAIN_DIR_NAME,
    resultDir: env.REACT_APP_INTLAYER_RESULT_DIR,
    moduleAugmentationDir: env.REACT_APP_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: env.REACT_APP_INTLAYER_DICTIONARIES_DIR,
    typesDir: env.REACT_APP_INTLAYER_TYPE_DIR,
    mainDir: env.REACT_APP_INTLAYER_MAIN_DIR,
    watchedFilesPattern: env.REACT_APP_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      env.REACT_APP_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      env.REACT_APP_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
  };

  return {
    intlayerIntlConfiguration,
    intlayerMiddlewareConfiguration,
    intlayerContentConfiguration,
  };
};

const extractViteEnvVariable = () => {
  const env = (import.meta as unknown as ViteEnvVar).env;

  if (typeof env === 'undefined') {
    return extractEmptyEnvVariable();
  }

  const intlayerIntlConfiguration: ReplaceValue<InternationalizationConfig> = {
    locales: env.VITE_INTLAYER_LOCALES,
    defaultLocale: env.VITE_INTLAYER_DEFAULT_LOCALE,
  };

  const intlayerMiddlewareConfiguration: ReplaceValue<MiddlewareConfig> = {
    headerName: env.VITE_INTLAYER_HEADER_NAME,
    cookieName: env.VITE_INTLAYER_COOKIE_NAME,
    prefixDefault: env.VITE_INTLAYER_PREFIX_DEFAULT,
    basePath: env.VITE_INTLAYER_BASE_PATH,
    serverSetCookie: env.VITE_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: env.VITE_INTLAYER_NO_PREFIX,
  };

  const intlayerContentConfiguration: ReplaceValue<ContentConfig> = {
    fileExtensions: env.VITE_INTLAYER_FILE_EXTENSIONS,
    baseDir: env.VITE_INTLAYER_BASE_DIR,
    contentDirName: env.VITE_INTLAYER_CONTENT_DIR_NAME,
    contentDir: env.VITE_INTLAYER_CONTENT_DIR,
    excludedPath: env.VITE_INTLAYER_EXCLUDED_PATH,
    resultDirName: env.VITE_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName: env.VITE_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: env.VITE_INTLAYER_DICTIONARIES_DIR_NAME,
    typeDirName: env.VITE_INTLAYER_TYPE_DIR_NAME,
    mainDirName: env.VITE_INTLAYER_MAIN_DIR_NAME,
    resultDir: env.VITE_INTLAYER_RESULT_DIR,
    moduleAugmentationDir: env.VITE_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: env.VITE_INTLAYER_DICTIONARIES_DIR,
    typesDir: env.VITE_INTLAYER_TYPE_DIR,
    mainDir: env.VITE_INTLAYER_MAIN_DIR,
    watchedFilesPattern: env.VITE_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      env.VITE_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      env.VITE_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
  };

  return {
    intlayerIntlConfiguration,
    intlayerMiddlewareConfiguration,
    intlayerContentConfiguration,
  };
};

const extractEmptyEnvVariable = () => {
  const intlayerIntlConfiguration: ReplaceValue<InternationalizationConfig> = {
    locales: undefined,
    defaultLocale: undefined,
  };

  const intlayerMiddlewareConfiguration: ReplaceValue<MiddlewareConfig> = {
    headerName: undefined,
    cookieName: undefined,
    prefixDefault: undefined,
    basePath: undefined,
    serverSetCookie: undefined,
    noPrefix: undefined,
  };

  const intlayerContentConfiguration: ReplaceValue<ContentConfig> = {
    fileExtensions: undefined,
    baseDir: undefined,
    contentDirName: undefined,
    contentDir: undefined,
    excludedPath: undefined,
    resultDirName: undefined,
    moduleAugmentationDirName: undefined,
    dictionariesDirName: undefined,
    typeDirName: undefined,
    mainDirName: undefined,
    resultDir: undefined,
    moduleAugmentationDir: undefined,
    dictionariesDir: undefined,
    typesDir: undefined,
    mainDir: undefined,
    watchedFilesPattern: undefined,
    watchedFilesPatternWithPath: undefined,
    outputFilesPatternWithPath: undefined,
  };

  return {
    intlayerIntlConfiguration,
    intlayerMiddlewareConfiguration,
    intlayerContentConfiguration,
  };
};

export const extractEnvVariable = () => {
  const platform = getPlatform();

  switch (platform) {
    case 'next':
      return extractNextEnvVariable();
    case 'vite':
      return extractViteEnvVariable();
    case 'react_app':
      return extractReactAppEnvVariable();
    default:
      return extractEmptyEnvVariable();
  }
};
