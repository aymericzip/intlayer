import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
} from '../../types/config';
import type { ViteEnvVar } from '../detectPlatform';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';

export const extractViteEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: (import.meta as unknown as ViteEnvVar).env.VITE_INTLAYER_LOCALES,
    defaultLocale: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_HEADER_NAME,
    cookieName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_COOKIE_NAME,
    prefixDefault: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_PREFIX_DEFAULT,
    basePath: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_BASE_PATH,
    serverSetCookie: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_FILE_EXTENSIONS,
    baseDir: (import.meta as unknown as ViteEnvVar).env.VITE_INTLAYER_BASE_DIR,
    contentDirName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_CONTENT_DIR_NAME,
    contentDir: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_CONTENT_DIR,
    excludedPath: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_EXCLUDED_PATH,
    resultDirName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_RESULT_DIR_NAME,
    moduleAugmentationDirName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_MODULE_AUGMENTATION_DIR_NAME,
    dictionariesDirName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_DICTIONARIES_DIR_NAME,
    typeDirName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_TYPE_DIR_NAME,
    mainDirName: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_MAIN_DIR_NAME,
    resultDir: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_RESULT_DIR,
    moduleAugmentationDir: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_DICTIONARIES_DIR,
    typesDir: (import.meta as unknown as ViteEnvVar).env.VITE_INTLAYER_TYPE_DIR,
    mainDir: (import.meta as unknown as ViteEnvVar).env.VITE_INTLAYER_MAIN_DIR,
    watchedFilesPattern: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath: (import.meta as unknown as ViteEnvVar).env
      .VITE_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
  };

  return {
    internationalization: internationalization,
    middleware,
    content,
  };
};
