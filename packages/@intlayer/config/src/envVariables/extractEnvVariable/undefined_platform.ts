import type {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
  EditorConfig,
} from '../../types/config';
import type { ReplaceValue, IntlayerConfigEnvVariable } from './types';

export const extractEmptyEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: undefined,
    strictMode: undefined,
    defaultLocale: undefined,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: undefined,
    cookieName: undefined,
    prefixDefault: undefined,
    basePath: undefined,
    serverSetCookie: undefined,
    noPrefix: undefined,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: undefined,
    baseDir: undefined,
    contentDirName: undefined,
    contentDir: undefined,
    excludedPath: undefined,
    resultDirName: undefined,
    moduleAugmentationDirName: undefined,
    dictionariesDirName: undefined,
    i18nDictionariesDirName: undefined,
    typeDirName: undefined,
    mainDirName: undefined,
    resultDir: undefined,
    moduleAugmentationDir: undefined,
    dictionariesDir: undefined,
    i18nDictionariesDir: undefined,
    typesDir: undefined,
    mainDir: undefined,
    watchedFilesPattern: undefined,
    watchedFilesPatternWithPath: undefined,
    outputFilesPatternWithPath: undefined,
    dictionaryOutput: undefined,
  };

  const editor: ReplaceValue<EditorConfig> = {
    port: undefined,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
  };
};
