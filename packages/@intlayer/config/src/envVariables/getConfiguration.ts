import type { Locales } from '../defaultValues/locales';
import type {
  ContentConfig,
  InternationalizationConfig,
  IntlayerConfig,
  MiddlewareConfig,
  ServerSetCookieRule,
} from '../types';
import { getEnvValue } from './utils';

export const intlayerIntlConfiguration: InternationalizationConfig = {
  locales: getEnvValue<Locales>(
    process.env.NEXT_PUBLIC_INTLAYER_LOCALES,
    'array'
  )!,
  defaultLocale: getEnvValue<Locales>(
    process.env.NEXT_PUBLIC_INTLAYER_DEFAULT_LOCALE,
    'string'
  )!,
};

export const intlayerMiddlewareConfiguration: MiddlewareConfig = {
  headerName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_HEADER_NAME,
    'string'
  )!,
  cookieName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_COOKIE_NAME,
    'string'
  )!,
  prefixDefault: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_PREFIX_DEFAULT,
    'boolean'
  )!,
  basePath: getEnvValue(process.env.NEXT_PUBLIC_INTLAYER_BASE_PATH, 'string')!,
  serverSetCookie: getEnvValue<ServerSetCookieRule>(
    process.env.NEXT_PUBLIC_INTLAYER_SERVER_SET_COOKIE,
    'string'
  )!,
  noPrefix: getEnvValue(process.env.NEXT_PUBLIC_INTLAYER_NO_PREFIX, 'boolean')!,
};

export const intlayerContentConfiguration: ContentConfig = {
  fileExtensions: getEnvValue<string>(
    process.env.NEXT_PUBLIC_INTLAYER_FILE_EXTENSIONS,
    'array'
  )!,
  baseDir: getEnvValue('NEXT_PUBLIC_INTLAYER_BASE_DIR', 'string')!,
  contentDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_CONTENT_DIR_NAME,
    'string'
  )!,
  contentDir: getEnvValue('NEXT_PUBLIC_INTLAYER_CONTENT_DIR', 'string')!,
  excludedPath: getEnvValue<string>(
    process.env.NEXT_PUBLIC_INTLAYER_EXCLUDED_PATH,
    'array'
  )!,
  resultDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_RESULT_DIR_NAME,
    'string'
  )!,
  resultDir: getEnvValue('NEXT_PUBLIC_INTLAYER_RESULT_DIR', 'string')!,
  moduleAugmentationDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    'string'
  )!,
  moduleAugmentationDir: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR,
    'string'
  )!,
  bundleDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_BUNDLE_DIR_NAME,
    'string'
  )!,
  bundleDir: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_BUNDLE_DIR,
    'string'
  )!,
  bundleFileExtension: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_BUNDLE_FILE_EXTENSION,
    'string'
  )!,
  dictionariesDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR_NAME,
    'string'
  )!,
  dictionariesDir: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR,
    'string'
  )!,
  typeDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_TYPES_DIR_NAME,
    'string'
  )!,
  typesDir: getEnvValue(process.env.NEXT_PUBLIC_INTLAYER_TYPES_DIR, 'string')!,
  mainDirName: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR_NAME,
    'string'
  )!,
  mainDir: getEnvValue(process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR, 'string')!,
  watchedFilesPattern: getEnvValue<string>(
    process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN,
    'array'
  )!,
  watchedFilesPatternWithPath: getEnvValue<string>(
    process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    'array'
  )!,
  outputFilesPatternWithPath: getEnvValue(
    process.env.NEXT_PUBLIC_INTLAYER_OUTPUT_FILES_PATTERN,
    'string'
  )!,
};

export const intlayerConfiguration: IntlayerConfig = {
  internationalization: intlayerIntlConfiguration,
  middleware: intlayerMiddlewareConfiguration,
  content: intlayerContentConfiguration,
};

export const getConfiguration = (): IntlayerConfig => intlayerConfiguration;
