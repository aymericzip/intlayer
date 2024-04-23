import type {
  ContentConfig,
  InternationalizationConfig,
  IntlayerConfig,
  MiddlewareConfig,
  ServerSetCookieRule,
} from '../types/config';
import type { Locales } from '../types/locales';
import { extractEnvVariable } from './extractEnvVariable';
import { getEnvValue } from './utils';

const env = extractEnvVariable();

export const intlayerIntlConfiguration: InternationalizationConfig = {
  locales: getEnvValue<Locales>(
    env.intlayerIntlConfiguration.locales,
    'array'
  )!,
  defaultLocale: getEnvValue<Locales>(
    env.intlayerIntlConfiguration.defaultLocale,
    'string'
  )!,
};

export const intlayerMiddlewareConfiguration: MiddlewareConfig = {
  headerName: getEnvValue(
    env.intlayerMiddlewareConfiguration.headerName,
    'string'
  )!,
  cookieName: getEnvValue(
    env.intlayerMiddlewareConfiguration.cookieName,
    'string'
  )!,
  prefixDefault: getEnvValue(
    env.intlayerMiddlewareConfiguration.prefixDefault,
    'boolean'
  )!,
  basePath: getEnvValue(
    env.intlayerMiddlewareConfiguration.basePath,
    'string'
  )!,
  serverSetCookie: getEnvValue<ServerSetCookieRule>(
    env.intlayerMiddlewareConfiguration.serverSetCookie,
    'string'
  )!,
  noPrefix: getEnvValue(
    env.intlayerMiddlewareConfiguration.noPrefix,
    'boolean'
  )!,
};

export const intlayerContentConfiguration: ContentConfig = {
  fileExtensions: getEnvValue<string>(
    env.intlayerContentConfiguration.fileExtensions,
    'array'
  )!,
  baseDir: getEnvValue(env.intlayerContentConfiguration.baseDir, 'string')!,
  contentDirName: getEnvValue(
    env.intlayerContentConfiguration.contentDirName,
    'string'
  )!,
  contentDir: getEnvValue(
    env.intlayerContentConfiguration.contentDir,
    'string'
  )!,
  excludedPath: getEnvValue<string>(
    env.intlayerContentConfiguration.excludedPath,
    'array'
  )!,
  resultDirName: getEnvValue(
    env.intlayerContentConfiguration.resultDirName,
    'string'
  )!,
  resultDir: getEnvValue(env.intlayerContentConfiguration.resultDir, 'string')!,
  moduleAugmentationDirName: getEnvValue(
    env.intlayerContentConfiguration.moduleAugmentationDirName,
    'string'
  )!,
  moduleAugmentationDir: getEnvValue(
    env.intlayerContentConfiguration.moduleAugmentationDir,
    'string'
  )!,
  dictionariesDirName: getEnvValue(
    env.intlayerContentConfiguration.dictionariesDirName,
    'string'
  )!,
  dictionariesDir: getEnvValue(
    env.intlayerContentConfiguration.dictionariesDir,
    'string'
  )!,
  typeDirName: getEnvValue(
    env.intlayerContentConfiguration.typeDirName,
    'string'
  )!,
  typesDir: getEnvValue(env.intlayerContentConfiguration.typesDir, 'string')!,
  mainDirName: getEnvValue(
    env.intlayerContentConfiguration.mainDirName,
    'string'
  )!,
  mainDir: getEnvValue(env.intlayerContentConfiguration.mainDir, 'string')!,
  watchedFilesPattern: getEnvValue<string>(
    env.intlayerContentConfiguration.watchedFilesPattern,
    'array'
  )!,
  watchedFilesPatternWithPath: getEnvValue<string>(
    env.intlayerContentConfiguration.watchedFilesPatternWithPath,
    'array'
  )!,
  outputFilesPatternWithPath: getEnvValue(
    env.intlayerContentConfiguration.outputFilesPatternWithPath,
    'string'
  )!,
};

export const intlayerConfiguration: IntlayerConfig = {
  internationalization: intlayerIntlConfiguration,
  middleware: intlayerMiddlewareConfiguration,
  content: intlayerContentConfiguration,
};

/**
 * Get all configuration values using environment variables
 * Can be used in the client side as the server side
 * To use it, be sure to have the environment variables set
 */
export const getConfiguration = (): IntlayerConfig => intlayerConfiguration;
