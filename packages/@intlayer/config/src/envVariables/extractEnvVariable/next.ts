import { IntlayerConfigEnvVariable, ReplaceValue } from './types';
import {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
} from '../../types/config';

export const extractNextEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.NEXT_PUBLIC_INTLAYER_LOCALES,
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
    typeDirName: process.env.NEXT_PUBLIC_INTLAYER_TYPE_DIR_NAME,
    mainDirName: process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR_NAME,
    resultDir: process.env.NEXT_PUBLIC_INTLAYER_RESULT_DIR,
    moduleAugmentationDir:
      process.env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR,
    dictionariesDir: process.env.NEXT_PUBLIC_INTLAYER_DICTIONARIES_DIR,
    typesDir: process.env.NEXT_PUBLIC_INTLAYER_TYPE_DIR,
    mainDir: process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR,
    watchedFilesPattern: process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.NEXT_PUBLIC_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
  };

  return {
    internationalization,
    middleware,
    content,
  };
};
