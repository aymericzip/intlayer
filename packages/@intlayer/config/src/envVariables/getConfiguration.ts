import type {
  AiConfig,
  BuildConfig,
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
    contentDir: getEnvValue<string>(env.content.contentDir, 'array')!,
    excludedPath: getEnvValue<string>(env.content.excludedPath, 'array')!,
    dictionariesDir: getEnvValue(env.content.dictionariesDir, 'string')!,
    moduleAugmentationDir: getEnvValue(
      env.content.moduleAugmentationDir,
      'string'
    )!,
    dictionaryOutput: getEnvValue<DictionaryOutput>(
      env.content.dictionaryOutput,
      'array'
    )!,
    unmergedDictionariesDir: getEnvValue(
      env.content.unmergedDictionariesDir,
      'string'
    )!,
    dynamicDictionariesDir: getEnvValue(
      env.content.dynamicDictionariesDir,
      'string'
    )!,
    i18nextResourcesDir: getEnvValue(
      env.content.i18nextResourcesDir,
      'string'
    )!,
    reactIntlMessagesDir: getEnvValue(
      env.content.reactIntlMessagesDir,
      'string'
    )!,
    typesDir: getEnvValue(env.content.typesDir, 'string')!,
    mainDir: getEnvValue(env.content.mainDir, 'string')!,
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
  };

  const logConfiguration: LogConfig = {
    mode: getEnvValue(env.log.mode, 'string')!,
    prefix: getEnvValue(env.log.prefix, 'string')!,
  };

  const aiConfiguration: AiConfig = {
    provider: getEnvValue(env.ai?.provider, 'string')!,
    model: getEnvValue(env.ai?.model, 'string')!,
    temperature: getEnvValue(env.ai?.temperature, 'number')!,
    apiKey: getEnvValue(env.ai?.apiKey, 'string')!,
  };

  const buildConfiguration: BuildConfig = {
    optimize: getEnvValue(env.build.optimize, 'boolean')!,
    importMode: getEnvValue(env.build.importMode, 'string')!,
    traversePattern: getEnvValue<string>(env.build.traversePattern, 'array')!,
  };

  const intlayerConfiguration: IntlayerConfig = {
    internationalization: intlayerIntlConfiguration,
    middleware: intlayerMiddlewareConfiguration,
    content: intlayerContentConfiguration,
    editor: intlayerEditorConfiguration,
    log: logConfiguration,
    ai: aiConfiguration,
    build: buildConfiguration,
  };

  return intlayerConfiguration;
};
