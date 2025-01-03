import { logger } from '../../logger';
import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
  EditorConfig,
  LogConfig,
} from '../../types/config';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';
import { extractEmptyEnvVariable } from './undefined_platform';

export const extractViteEnvVariable = (): IntlayerConfigEnvVariable => {
  if (!import.meta.env) {
    logger('Vite env variables cannot be loaded on a commonjs environment.', {
      level: 'error',
    });
    return extractEmptyEnvVariable();
  }

  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: import.meta.env.VITE_INTLAYER_LOCALES,
    strictMode: import.meta.env.VITE_INTLAYER_STRICT_MODE,
    defaultLocale: import.meta.env.VITE_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: import.meta.env.VITE_INTLAYER_HEADER_NAME,
    cookieName: import.meta.env.VITE_INTLAYER_COOKIE_NAME,
    prefixDefault: import.meta.env.VITE_INTLAYER_PREFIX_DEFAULT,
    basePath: import.meta.env.VITE_INTLAYER_BASE_PATH,
    serverSetCookie: import.meta.env.VITE_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: import.meta.env.VITE_INTLAYER_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: import.meta.env.VITE_INTLAYER_FILE_EXTENSIONS,
    baseDir: import.meta.env.VITE_INTLAYER_BASE_DIR,
    contentDirName: import.meta.env.VITE_INTLAYER_CONTENT_DIR_NAME,
    contentDir: import.meta.env.VITE_INTLAYER_CONTENT_DIR,
    excludedPath: import.meta.env.VITE_INTLAYER_EXCLUDED_PATH,
    resultDirName: import.meta.env.VITE_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName: import.meta.env
      .VITE_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: import.meta.env.VITE_INTLAYER_DICTIONARIES_DIR_NAME,
    i18nextResourcesDirName: import.meta.env
      .VITE_INTLAYER_I18N_RESOURCES_DIR_NAME,
    reactIntlMessagesDirName: import.meta.env
      .VITE_INTLAYER_REACT_INTL_MESSAGES_DIR_NAME,
    typeDirName: import.meta.env.VITE_INTLAYER_TYPE_DIR_NAME,
    mainDirName: import.meta.env.VITE_INTLAYER_MAIN_DIR_NAME,
    resultDir: import.meta.env.VITE_INTLAYER_RESULT_DIR,
    moduleAugmentationDir: import.meta.env
      .VITE_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: import.meta.env.VITE_INTLAYER_DICTIONARIES_DIR,
    i18nextResourcesDir: import.meta.env.VITE_INTLAYER_I18N_DICTIONARIES_DIR,
    reactIntlMessagesDir: import.meta.env
      .VITE_INTLAYER_REACT_INTL_DICTIONARIES_DIR,
    typesDir: import.meta.env.VITE_INTLAYER_TYPE_DIR,
    mainDir: import.meta.env.VITE_INTLAYER_MAIN_DIR,
    watchedFilesPattern: import.meta.env.VITE_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath: import.meta.env
      .VITE_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath: import.meta.env
      .VITE_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: import.meta.env.VITE_INTLAYER_DICTIONARY_OUTPUT,
    watch: import.meta.env.VITE_INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    backendURL: import.meta.env.VITE_INTLAYER_BACKEND_URL,
    enabled: import.meta.env.VITE_INTLAYER_ENABLED,
    clientId: import.meta.env.VITE_INTLAYER_CLIENT_ID,
    clientSecret: import.meta.env.VITE_INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy: import.meta.env
      .VITE_INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
  };

  const log: ReplaceValue<LogConfig> = {
    mode: import.meta.env.VITE_INTLAYER_LOG_MODE,
    prefix: import.meta.env.VITE_INTLAYER_LOG_PREFIX,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
    log,
  };
};
