import process from 'process';
import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
  EditorConfig,
} from '../../types/config';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';

export const extractReactAppEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.REACT_APP_INTLAYER_LOCALES,
    strictMode: process.env.REACT_APP_INTLAYER_STRICT_MODE,
    defaultLocale: process.env.REACT_APP_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: process.env.REACT_APP_INTLAYER_HEADER_NAME,
    cookieName: process.env.REACT_APP_INTLAYER_COOKIE_NAME,
    prefixDefault: process.env.REACT_APP_INTLAYER_PREFIX_DEFAULT,
    basePath: process.env.REACT_APP_INTLAYER_BASE_PATH,
    serverSetCookie: process.env.REACT_APP_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: process.env.REACT_APP_INTLAYER_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: process.env.REACT_APP_INTLAYER_FILE_EXTENSIONS,
    baseDir: process.env.REACT_APP_INTLAYER_BASE_DIR,
    contentDirName: process.env.REACT_APP_INTLAYER_CONTENT_DIR_NAME,
    contentDir: process.env.REACT_APP_INTLAYER_CONTENT_DIR,
    excludedPath: process.env.REACT_APP_INTLAYER_EXCLUDED_PATH,
    resultDirName: process.env.REACT_APP_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName:
      process.env.REACT_APP_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: process.env.REACT_APP_INTLAYER_DICTIONARIES_DIR_NAME,
    i18nDictionariesDirName:
      process.env.REACT_APP_INTLAYER_I18N_DICTIONARIES_DIR_NAME,
    typeDirName: process.env.REACT_APP_INTLAYER_TYPE_DIR_NAME,
    mainDirName: process.env.REACT_APP_INTLAYER_MAIN_DIR_NAME,
    resultDir: process.env.REACT_APP_INTLAYER_RESULT_DIR,
    moduleAugmentationDir:
      process.env.REACT_APP_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: process.env.REACT_APP_INTLAYER_DICTIONARIES_DIR,
    i18nDictionariesDir: process.env.REACT_APP_INTLAYER_I18N_DICTIONARIES_DIR,
    typesDir: process.env.REACT_APP_INTLAYER_TYPE_DIR,
    mainDir: process.env.REACT_APP_INTLAYER_MAIN_DIR,
    watchedFilesPattern: process.env.REACT_APP_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.REACT_APP_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.REACT_APP_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: process.env.REACT_APP_INTLAYER_DICTIONARY_OUTPUT,
    watch: process.env.REACT_APP_INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    backendURL: process.env.REACT_APP_INTLAYER_BACKEND_URL,
    enabled: process.env.REACT_APP_INTLAYER_ENABLED,
    clientId: process.env.REACT_APP_INTLAYER_CLIENT_ID,
    clientSecret: process.env.REACT_APP_INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy:
      process.env.REACT_APP_INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
  };
};
