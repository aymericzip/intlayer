import type {
  ContentConfig,
  DictionaryOutput,
  InternationalizationConfig,
  IntlayerConfig,
  LogConfig,
  MiddlewareConfig,
  ServerSetCookieRule,
  StrictMode,
} from '../types/config';
import type { Locales } from '../types/locales';
import {
  extractEnvVariable,
  type ExtractEnvVariableOptions,
} from './extractEnvVariable/index';
import { getEnvValue } from './utils';

/**
 * Get all configuration values using environment variables
 * Can be used in the client side as the server side
 * To use it, be sure to have the environment variables set
 */
export const getConfiguration = (
  options?: ExtractEnvVariableOptions
): IntlayerConfig => {
  const env = extractEnvVariable(options);

  const intlayerIntlConfiguration: InternationalizationConfig = {
    locales: getEnvValue<Locales>(env.internationalization.locales, 'array')!,
    requiredLocales: getEnvValue<Locales>(
      env.internationalization.requiredLocales,
      'array'
    )!,
    strictMode: getEnvValue<StrictMode>(
      env.internationalization.strictMode,
      'string'
    )!,
    defaultLocale: getEnvValue<Locales>(
      env?.internationalization.defaultLocale,
      'string'
    )!,
  };

  const intlayerMiddlewareConfiguration: MiddlewareConfig = {
    headerName: getEnvValue(env.middleware.headerName, 'string')!,
    cookieName: getEnvValue(env.middleware.cookieName, 'string')!,
    prefixDefault: getEnvValue(env.middleware.prefixDefault, 'boolean')!,
    basePath: getEnvValue(env.middleware.basePath, 'string')!,
    serverSetCookie: getEnvValue<ServerSetCookieRule>(
      env.middleware.serverSetCookie,
      'string'
    )!,
    noPrefix: getEnvValue(env.middleware.noPrefix, 'boolean')!,
  };

  const intlayerContentConfiguration: ContentConfig = {
    fileExtensions: getEnvValue<string>(env.content.fileExtensions, 'array')!,
    baseDir: getEnvValue(env.content.baseDir, 'string')!,
    contentDirName: getEnvValue(env.content.contentDirName, 'string')!,
    contentDir: getEnvValue(env.content.contentDir, 'string')!,
    excludedPath: getEnvValue<string>(env.content.excludedPath, 'array')!,
    resultDirName: getEnvValue(env.content.resultDirName, 'string')!,
    resultDir: getEnvValue(env.content.resultDir, 'string')!,
    moduleAugmentationDirName: getEnvValue(
      env.content.moduleAugmentationDirName,
      'string'
    )!,
    moduleAugmentationDir: getEnvValue(
      env.content.moduleAugmentationDir,
      'string'
    )!,
    dictionaryOutput: getEnvValue<DictionaryOutput>(
      env.content.dictionaryOutput,
      'array'
    )!,
    unmergedDictionariesDirName: getEnvValue(
      env.content.unmergedDictionariesDirName,
      'string'
    )!,
    unmergedDictionariesDir: getEnvValue(
      env.content.unmergedDictionariesDir,
      'string'
    )!,
    dictionariesDirName: getEnvValue(
      env.content.dictionariesDirName,
      'string'
    )!,
    dictionariesDir: getEnvValue(env.content.dictionariesDir, 'string')!,
    i18nextResourcesDirName: getEnvValue(
      env.content.i18nextResourcesDirName,
      'string'
    )!,
    i18nextResourcesDir: getEnvValue(
      env.content.i18nextResourcesDir,
      'string'
    )!,
    reactIntlMessagesDirName: getEnvValue(
      env.content.reactIntlMessagesDirName,
      'string'
    )!,
    reactIntlMessagesDir: getEnvValue(
      env.content.reactIntlMessagesDir,
      'string'
    )!,
    typeDirName: getEnvValue(env.content.typeDirName, 'string')!,
    typesDir: getEnvValue(env.content.typesDir, 'string')!,
    mainDirName: getEnvValue(env.content.mainDirName, 'string')!,
    mainDir: getEnvValue(env.content.mainDir, 'string')!,
    configDirName: getEnvValue(env.content.configDirName, 'string')!,
    configDir: getEnvValue(env.content.configDir, 'string')!,
    watchedFilesPattern: getEnvValue<string>(
      env.content.watchedFilesPattern,
      'array'
    )!,
    watchedFilesPatternWithPath: getEnvValue<string>(
      env.content.watchedFilesPatternWithPath,
      'array'
    )!,
    outputFilesPatternWithPath: getEnvValue(
      env.content.outputFilesPatternWithPath,
      'string'
    )!,
    watch: getEnvValue(env.content.watch, 'boolean')!,
  };

  const intlayerEditorConfiguration = {
    applicationURL: getEnvValue(env.editor.applicationURL, 'string')!,
    editorURL: getEnvValue(env.editor.editorURL, 'string')!,
    cmsURL: getEnvValue(env.editor.cmsURL, 'string')!,
    backendURL: getEnvValue(env.editor.backendURL, 'string')!,
    port: getEnvValue(env.editor.port, 'number')!,
    enabled: getEnvValue(env.editor.enabled, 'boolean')!,
    clientId: getEnvValue(env.editor.clientId, 'string')!,
    clientSecret: getEnvValue(env.editor.clientSecret, 'string')!,
    dictionaryPriorityStrategy: getEnvValue(
      env.editor.dictionaryPriorityStrategy,
      'string'
    )! as 'local_first' | 'distant_first',
    hotReload: getEnvValue(env.editor.hotReload, 'boolean')!,
    openAiApiKey: getEnvValue(env.editor.openAiApiKey, 'string')!,
    openAiApiModel: getEnvValue(env.editor.openAiApiModel, 'string')!,
    openAiApiTemperature: getEnvValue(
      env.editor.openAiApiTemperature,
      'number'
    )!,
  };

  const logConfiguration: LogConfig = {
    mode: getEnvValue(env.log.mode, 'string')!,
    prefix: getEnvValue(env.log.prefix, 'string')!,
  };

  const intlayerConfiguration: IntlayerConfig = {
    internationalization: intlayerIntlConfiguration,
    middleware: intlayerMiddlewareConfiguration,
    content: intlayerContentConfiguration,
    editor: intlayerEditorConfiguration,
    log: logConfiguration,
  };

  return intlayerConfiguration;
};
