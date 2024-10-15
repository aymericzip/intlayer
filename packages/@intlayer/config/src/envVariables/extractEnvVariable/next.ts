import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
  EditorConfig,
} from '../../types/config';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';

export const extractNextEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.NEXT_PUBLIC_INTLAYER_LOCALES,
    strictMode: process.env.NEXT_PUBLIC_INTLAYER_STRICT_MODE,
    defaultLocale: process.env.NEXT_PUBLIC_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: process.env.NEXT_PUBLIC_INTLAYER_HEADER_NAME,
    cookieName: process.env.NEXT_PUBLIC_INTLAYER_COOKIE_NAME,
    prefixDefault: process.env.NEXT_PUBLIC_INTLAYER_PREFIX_DEFAULT,
    basePath: process.env.NEXT_PUBLIC_INTLAYER_BASE_PATH,
    serverSetCookie: process.env.NEXT_PUBLIC_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: process.env.NEXT_PUBLIC_INTLAYER_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: process.env.NEXT_PUBLIC_INTLAYER_FILE_EXTENSIONS,
    baseDir: process.env.NEXT_PUBLIC_INTLAYER_BASE_DIR,
    contentDirName: process.env.NEXT_PUBLIC_INTLAYER_CONTENT_DIR_NAME,
    contentDir: process.env.NEXT_PUBLIC_INTLAYER_CONTENT_DIR,
    excludedPath: process.env.NEXT_PUBLIC_INTLAYER_EXCLUDED_PATH,
    resultDirName: process.env.NEXT_PUBLIC_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName:
      process.env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: process.env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR_NAME,
    i18nDictionariesDir: process.env.NEXT_PUBLIC_INTLAYER_I18N_DICTIONARIES_DIR,
    typeDirName: process.env.NEXT_PUBLIC_INTLAYER_TYPE_DIR_NAME,
    mainDirName: process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR_NAME,
    resultDir: process.env.NEXT_PUBLIC_INTLAYER_RESULT_DIR,
    moduleAugmentationDir:
      process.env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: process.env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR,
    i18nDictionariesDirName:
      process.env.NEXT_PUBLIC_INTLAYER_I18N_DICTIONARIES_DIR_NAME,
    typesDir: process.env.NEXT_PUBLIC_INTLAYER_TYPE_DIR,
    mainDir: process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR,
    watchedFilesPattern: process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.NEXT_PUBLIC_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: process.env.NEXT_PUBLIC_INTLAYER_DICTIONARY_OUTPUT,
  };

  const editor: ReplaceValue<EditorConfig> = {
    backendURL: process.env.NEXT_PUBLIC_INTLAYER_BACKEND_URL,
    enabled: process.env.NEXT_PUBLIC_INTLAYER_ENABLED,
    clientId: process.env.NEXT_PUBLIC_INTLAYER_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_INTLAYER_CLIENT_SECRET,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
  };
};
