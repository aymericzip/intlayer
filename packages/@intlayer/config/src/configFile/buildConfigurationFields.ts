import { join } from 'path';
import { DEFAULT_LOCALE, LOCALES } from '../defaultValues/internationalization';
import {
  BASE_PATH,
  COOKIE_NAME,
  HEADER_NAME,
  NO_PREFIX,
  PREFIX_DEFAULT,
  SERVER_SET_COOKIE,
} from '../defaultValues/middleware';
import {
  CONTENT_DIR_NAME,
  DICTIONARIES_DIR_NAME,
  FILE_EXTENSIONS,
  RESULT_DIR_NAME,
  EXCLUDED_PATHS,
  TYPES_DIR_NAME,
  MAIN_DIR_NAME,
  MODULE_AUGMENTATION_DIR_NAME,
} from '../defaultValues/server';
import type {
  BaseDerivedConfig,
  ContentConfig,
  CustomIntlayerConfig,
  PatternsContentConfig,
  InternationalizationConfig,
  IntlayerConfig,
  MiddlewareConfig,
  BaseContentConfig,
  ResultDirDerivedConfig,
} from '../types/config';
import type { GetConfigurationOptions } from './getConfiguration';

let storedConfiguration: IntlayerConfig;

// @TODO - Add possibility of directories configurations to be arrays to allow multiple packages management

const buildInternationalizationFields = (
  customConfiguration?: Partial<InternationalizationConfig>
): InternationalizationConfig => ({
  /**
   * Locales available in the application
   *
   * Default: ['en']
   */
  locales: customConfiguration?.locales ?? LOCALES,

  /**
   * Default locale of the application for fallback
   *
   * Default: 'en'
   */
  defaultLocale: customConfiguration?.defaultLocale ?? DEFAULT_LOCALE,
});

const buildMiddlewareFields = (
  customConfiguration?: Partial<MiddlewareConfig>
): MiddlewareConfig => ({
  /**
   * Header name to get the locale
   *
   * Default: 'x-intlayer-locale'
   */
  headerName: customConfiguration?.headerName ?? HEADER_NAME,

  /**
   * Cookie name to get the locale
   *
   * Default: 'intlayer-locale'
   */
  cookieName: customConfiguration?.cookieName ?? COOKIE_NAME,

  /**
   * Prefix the default locale in the URL
   *
   * Default: true
   */
  prefixDefault: customConfiguration?.prefixDefault ?? PREFIX_DEFAULT,

  /**
   * Base path of the application URL
   *
   * Default: ''
   *
   * Example:
   * - If the application is hosted at https://example.com/my-app
   * - The base path is '/my-app'
   * - The URL will be https://example.com/my-app/en
   * - If the base path is not set, the URL will be https://example.com/en
   */
  basePath: customConfiguration?.basePath ?? BASE_PATH,

  /**
   * Rule to set the cookie on the server
   * - 'always': Set the cookie on every request
   * - 'never': Never set the cookie
   */
  serverSetCookie: customConfiguration?.serverSetCookie ?? SERVER_SET_COOKIE,

  /**
   * No prefix in the URL
   * - true: No prefix in the URL
   * - false: Prefix in the URL
   *
   * Example:
   * - If the application is hosted at https://example.com/my-app
   * - The base path is '/my-app'
   * - The URL will be https://example.com/my-app/en
   * - If the base path is not set, the URL will be https://example.com/en
   * - If no prefix is set, the URL will be https://example.com/en
   * - If the no prefix is set to true, the URL will be https://example.com
   *
   * Default: false
   */
  noPrefix: customConfiguration?.noPrefix ?? NO_PREFIX,
});

const buildContentFields = (
  customConfiguration?: Partial<ContentConfig>
): ContentConfig => {
  const notDerivedContentConfig: BaseContentConfig = {
    /**
     * File extensions of content to look for to build the dictionaries
     *
     * - Default: ['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']
     *
     * - Example: ['.data.ts', '.data.js', '.data.json']
     *
     * Note:
     * - Can exclude unused file extensions to improve performance
     * - Avoid using common file extensions like '.ts', '.js', '.json' to avoid conflicts
     */
    fileExtensions: customConfiguration?.fileExtensions ?? FILE_EXTENSIONS,

    /**
     * Absolute path of the directory of the project
     * - Default: process.cwd()
     * - Example: '/path/to/project'
     *
     * Will be used to resolve all intlayer directories
     *
     * Note:
     * - The base directory should be the root of the project
     * - Can be changed to a custom directory to externalize either the content used in the project, or the intlayer application from the project
     */
    baseDir: customConfiguration?.baseDir ?? process.cwd(),

    /**
     * Directory name where the content is stored
     *
     * Default: 'src'
     *
     * Example:
     *  - 'data' -> '/path/to/project/data'
     *  - 'content' -> '/path/to/project/content'
     *  - 'locales' -> '/path/to/project/locales'
     *
     * Note: If this directory is not at the base directory level, update the contentDir field instead
     */
    contentDirName: customConfiguration?.contentDirName ?? CONTENT_DIR_NAME,

    /**
     * Directory name where the result will be stored
     *
     * Default: '.intlayer'
     *
     * Example:
     *  - '.next'
     *  - 'outputOFIntlayer'
     *
     * Note: If this directory is not at the base directory level, update the resultDir field instead
     */
    resultDirName: customConfiguration?.resultDirName ?? RESULT_DIR_NAME,

    /**
     *
     * Directory name where the module augmentation will be stored
     *
     * Module augmentation allow better IDE suggestions and type checking
     *
     * Default: 'types'
     *
     * Example: 'intlayer-types'
     *
     * Note:
     * - If this path changed, be sure to include it from the tsconfig.json file
     * - If this directory is not at the base directory level, update the moduleAugmentationDir field instead
     */
    moduleAugmentationDirName:
      customConfiguration?.moduleAugmentationDirName ??
      MODULE_AUGMENTATION_DIR_NAME,
    // @TODO: Make Module Augmentation optional by adding a flag in the configuration

    /**
     * Related to the intlayer result directory
     *
     * Directory name where the dictionaries will be stored
     *
     * Default: 'dictionary'
     *
     * Example: 'translations'
     *
     * Note:
     * - If this directory is not at the result directory level, update the dictionariesDir field instead
     *
     */
    dictionariesDirName:
      customConfiguration?.dictionariesDirName ?? DICTIONARIES_DIR_NAME,

    /**
     *  Related to the intlayer result directory
     *
     * Directory name where the dictionaries types will be stored
     *
     * Default: 'types'
     *
     * Example: 'intlayer-types'
     *
     * Note:
     * - If this directory is not at the result directory level, update the typesDir field instead
     *
     */
    typeDirName: customConfiguration?.typeDirName ?? TYPES_DIR_NAME,

    /**
     * Related to the intlayer result directory
     *
     * Directory name where the main files will be stored
     *
     * Default: 'main'
     *
     * Example: 'intlayer-main'
     *
     * Note:
     * - If this directory is not at the result directory level, update the mainDir field instead
     */
    mainDirName: customConfiguration?.mainDirName ?? MAIN_DIR_NAME,

    /**
     * Should exclude some directories from the content search
     *
     * Default: ['node_modules']
     *
     * Not used yet
     * @TODO Implement the exclusion or remove it
     */
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,
  };

  const baseDirDerivedConfiguration: BaseDerivedConfig = {
    /**
     * Directory where the content is stored
     *
     * Relative to the base directory of the project
     *
     * Default: {{baseDir}} / {{contentDirName}}
     *
     * Example: '/path/to/project/src'
     *
     * Note:
     * - Can be changed to a custom directory to externalize the content used in the project
     * - If the content is not at the base directory level, update the contentDirName field instead
     */
    contentDir: join(
      notDerivedContentConfig.baseDir,
      notDerivedContentConfig.contentDirName
    ),

    /**
     * Directory where the result will be stored
     *
     * Relative to the base directory of the project
     *
     * Default: {{baseDir}} / {{resultDirName}}
     *
     * Example: '/path/to/project/.intlayer'
     *
     * Note:
     * - Can be changed to a custom directory to externalize the intlayer application from the project
     * - If the result is not at the base directory level, update the resultDirName field instead
     */
    resultDir: join(
      notDerivedContentConfig.baseDir,
      notDerivedContentConfig.resultDirName
    ),

    /**
     * Directory where the module augmentation will be stored
     *
     * Module augmentation allow better IDE suggestions and type checking
     *
     * Relative to the base directory of the project
     *
     * Default: {{baseDir}} / {{moduleAugmentationDirName}}
     *
     * Example: '/path/to/project/types'
     *
     * Note:
     * - If this path changed, be sure to include it from the tsconfig.json file
     * - If the module augmentation is not at the base directory level, update the moduleAugmentationDirName field instead
     *
     */
    moduleAugmentationDir: join(
      notDerivedContentConfig.baseDir,
      notDerivedContentConfig.moduleAugmentationDirName
    ),
  };

  const resultDirDerivedConfiguration: ResultDirDerivedConfig = {
    /**
     * Directory where the dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{dictionariesDirName}}
     *
     * Example: '/path/to/project/.intlayer/dictionary'
     *
     * Note:
     * - If the types are not at the result directory level, update the dictionariesDirName field instead
     * - The dictionaries are stored in JSON format
     * - The dictionaries are used to translate the content
     * - The dictionaries are built from the content files
     */
    dictionariesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.dictionariesDirName
    ),

    /**
     * Directory where the dictionaries types will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{typeDirName}}
     *
     * Example: '/path/to/project/.intlayer/types'
     *
     * Note:
     * - If the types are not at the result directory level, update the typesDirName field instead
     */
    typesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.typeDirName
    ),

    /**
     * Directory where the main files will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{mainDirName}}
     *
     * Example: '/path/to/project/.intlayer/main'
     *
     * Note:
     *
     * - If the main files are not at the result directory level, update the mainDirName field instead
     */
    mainDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.mainDirName
    ),
  };

  const patternsConfiguration: PatternsContentConfig = {
    /**
     * Pattern of files to watch
     *
     * Default: ['/**\/*.content.ts', '/**\/*.content.js', '/**\/*.content.json', '/**\/*.content.cjs', '/**\/*.content.mjs', '/**\/*.content.tsx', '/**\/*.content.jsx']
     */
    watchedFilesPattern: notDerivedContentConfig.fileExtensions.map(
      (ext) => `/**/*${ext}`
    ),

    /**
     * Pattern of files to watch including the relative path
     *
     * Default: ['{{contentDir}}/**\/*.content.ts', '{{contentDir}}/**\/*.content.js', '{{contentDir}}/**\/*.content.json', '{{contentDir}}/**\/*.content.cjs', '{{contentDir}}/**\/*.content.mjs', '{{contentDir}}/**\/*.content.tsx', '{{contentDir}}/**\/*.content.jsx']
     */
    watchedFilesPatternWithPath: notDerivedContentConfig.fileExtensions.map(
      (ext) => `${baseDirDerivedConfiguration.contentDir}/**/*${ext}`
    ),

    /**
     * Pattern of dictionary to interpret
     *
     * Default: '{{dictionariesDir}}/**\/*.json'
     */
    outputFilesPatternWithPath: `${resultDirDerivedConfiguration.dictionariesDir}/**/*.json`,
  };

  return {
    ...notDerivedContentConfig,
    ...baseDirDerivedConfiguration,
    ...resultDirDerivedConfiguration,
    ...patternsConfiguration,
  };
};

/**
 * Build the configuration fields by merging the default values with the custom configuration
 */
export const buildConfigurationFields = (
  options: GetConfigurationOptions,
  customConfiguration?: CustomIntlayerConfig
): IntlayerConfig => {
  const internationalizationConfig = buildInternationalizationFields(
    customConfiguration?.internationalization
  );

  const middlewareConfig = buildMiddlewareFields(
    customConfiguration?.middleware
  );

  const contentConfig = buildContentFields(customConfiguration?.content);

  storedConfiguration = {
    internationalization: internationalizationConfig,
    middleware: middlewareConfig,
    content: contentConfig,
  };

  return storedConfiguration;
};
