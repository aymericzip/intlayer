import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
} from '../../types/config';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';
import { extractEmptyEnvVariable } from './undefined_platform';

export const extractViteEnvVariable = (): IntlayerConfigEnvVariable => {
  if (!import.meta.env) {
    console.error(
      'Vite env variables cannot be loaded on a commonjs environment.'
    );
    return extractEmptyEnvVariable();
  }

  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: import.meta.env.VITE_INTLAYER_LOCALES,
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
    i18nDictionariesDirName: import.meta.env
      .VITE_INTLAYER_I18N_DICTIONARIES_DIR_NAME,
    typeDirName: import.meta.env.VITE_INTLAYER_TYPE_DIR_NAME,
    mainDirName: import.meta.env.VITE_INTLAYER_MAIN_DIR_NAME,
    resultDir: import.meta.env.VITE_INTLAYER_RESULT_DIR,
    moduleAugmentationDir: import.meta.env
      .VITE_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: import.meta.env.VITE_INTLAYER_DICTIONARIES_DIR,
    i18nDictionariesDir: import.meta.env.VITE_INTLAYER_I18N_DICTIONARIES_DIR,
    typesDir: import.meta.env.VITE_INTLAYER_TYPE_DIR,
    mainDir: import.meta.env.VITE_INTLAYER_MAIN_DIR,
    watchedFilesPattern: import.meta.env.VITE_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath: import.meta.env
      .VITE_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath: import.meta.env
      .VITE_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: import.meta.env.VITE_INTLAYER_DICTIONARY_OUTPUT,
  };

  return {
    internationalization,
    middleware,
    content,
  };
};
