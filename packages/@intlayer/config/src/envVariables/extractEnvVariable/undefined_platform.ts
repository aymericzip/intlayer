import process from 'process';
import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
  EditorConfig,
  LogConfig,
} from '../../types/config';
import type { ReplaceValue, IntlayerConfigEnvVariable } from './types';

export const extractEmptyEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.INTLAYER_LOCALES,
    strictMode: process.env.INTLAYER_STRICT_MODE,
    defaultLocale: process.env.INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: process.env.INTLAYER_HEADER_NAME,
    cookieName: process.env.INTLAYER_COOKIE_NAME,
    prefixDefault: process.env.INTLAYER_PREFIX_DEFAULT,
    basePath: process.env.INTLAYER_BASE_PATH,
    serverSetCookie: process.env.INTLAYER_SERVER_SET_COOKIE,
    noPrefix: process.env.INTLAYER_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: process.env.INTLAYER_FILE_EXTENSIONS,
    baseDir: process.env.INTLAYER_BASE_DIR,
    contentDirName: process.env.INTLAYER_CONTENT_DIR_NAME,
    contentDir: process.env.INTLAYER_CONTENT_DIR,
    excludedPath: process.env.INTLAYER_EXCLUDED_PATH,
    resultDirName: process.env.INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName:
      process.env.INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: process.env.INTLAYER_DICTIONARIES_DIR_NAME,
    i18nDictionariesDirName: process.env.INTLAYER_I18N_DICTIONARIES_DIR_NAME,
    typeDirName: process.env.INTLAYER_TYPE_DIR_NAME,
    mainDirName: process.env.INTLAYER_MAIN_DIR_NAME,
    resultDir: process.env.INTLAYER_RESULT_DIR,
    moduleAugmentationDir: process.env.INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: process.env.INTLAYER_DICTIONARIES_DIR,
    i18nDictionariesDir: process.env.INTLAYER_I18N_DICTIONARIES_DIR,
    typesDir: process.env.INTLAYER_TYPE_DIR,
    mainDir: process.env.INTLAYER_MAIN_DIR,
    watchedFilesPattern: process.env.INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: process.env.INTLAYER_DICTIONARY_OUTPUT,
    watch: process.env.INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    backendURL: process.env.INTLAYER_BACKEND_URL,
    enabled: process.env.INTLAYER_ENABLED,
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy:
      process.env.INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
  };

  const log: ReplaceValue<LogConfig> = {
    mode: process.env.INTLAYER_LOG_MODE,
    prefix: process.env.INTLAYER_LOG_PREFIX,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
    log,
  };
};
