import { ReplaceValue, IntlayerConfigEnvVariable } from './types';
import {
  InternationalizationConfig,
  MiddlewareConfig,
  ContentConfig,
} from '../../types/config';

export const extractEmptyEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: undefined,
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
    typeDirName: undefined,
    mainDirName: undefined,
    resultDir: undefined,
    moduleAugmentationDir: undefined,
    dictionariesDir: undefined,
    typesDir: undefined,
    mainDir: undefined,
    watchedFilesPattern: undefined,
    watchedFilesPatternWithPath: undefined,
    outputFilesPatternWithPath: undefined,
  };

  return {
    internationalization,
    middleware,
    content,
  };
};
