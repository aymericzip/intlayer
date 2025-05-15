import { join } from 'path';
import {
  CONFIG_DIR_NAME,
  CONTENT_DIR_NAME,
  DICTIONARIES_DIR_NAME,
  DICTIONARY_OUTPUT,
  EXCLUDED_PATHS,
  FILE_EXTENSIONS,
  I18NEXT_DICTIONARIES_DIR_NAME,
  MAIN_DIR_NAME,
  MODULE_AUGMENTATION_DIR_NAME,
  REACT_INTL_MESSAGES_DIR_NAME,
  RESULT_DIR_NAME,
  TYPES_DIR_NAME,
  UNMERGED_DICTIONARIES_DIR_NAME,
  WATCH,
} from '../defaultValues/content';
import {
  APPLICATION_URL,
  BACKEND_URL,
  CMS_URL,
  DICTIONARY_PRIORITY_STRATEGY,
  EDITOR_URL,
  HOT_RELOAD,
  IS_ENABLED,
  PORT,
} from '../defaultValues/editor';
import {
  DEFAULT_LOCALE,
  LOCALES,
  REQUIRED_LOCALES,
  STRICT_MODE,
} from '../defaultValues/internationalization';
import { MODE, PREFIX } from '../defaultValues/log';
import {
  BASE_PATH,
  COOKIE_NAME,
  HEADER_NAME,
  NO_PREFIX,
  PREFIX_DEFAULT,
  SERVER_SET_COOKIE,
} from '../defaultValues/middleware';
import type {
  AiConfig,
  BaseContentConfig,
  BaseDerivedConfig,
  ContentConfig,
  CustomIntlayerConfig,
  EditorConfig,
  InternationalizationConfig,
  IntlayerConfig,
  LogConfig,
  MiddlewareConfig,
  PatternsContentConfig,
  ResultDirDerivedConfig,
} from '../types/config';

let storedConfiguration: IntlayerConfig;

// @TODO - Add possibility of directories configurations to be arrays to allow multiple packages management

const buildInternationalizationFields = (
  customConfiguration?: Partial<InternationalizationConfig>
): InternationalizationConfig => ({
  /**
   * Locales available in the application
   *
   * Default: ['en']
   *
   */
  locales: customConfiguration?.locales ?? LOCALES,

  /**
   * Locales required by TypeScript to ensure strong implementations of internationalized content using typescript.
   *
   * Default: []
   *
   * If empty, all locales are required in `strict` mode.
   *
   * Ensure required locales are also defined in the `locales` field.
   */
  requiredLocales: customConfiguration?.requiredLocales ?? REQUIRED_LOCALES,

  /**
   * Ensure strong implementations of internationalized content using typescript.
   * - If set to "strict", the translation `t` function will require each declared locales to be defined. If one locale is missing, or if a locale is not declared in your config, it will throw an error.
   * - If set to "inclusive", the translation `t` function will require each declared locales to be defined. If one locale is missing, it will throw a warning. But will accept if a locale is not declared in your config, but exist.
   * - If set to "loose", the translation `t` function will accept any existing locale.
   *
   * Default: "inclusive"
   */
  strictMode: customConfiguration?.strictMode ?? STRICT_MODE,

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
   * Prefix default prefix the default locale to the path as other locales.
   *
   * Example with prefixDefault = true and defaultLocale = 'en':
   * path = /en/dashboard or /fr/dashboard
   *
   * Example with prefixDefault = false and defaultLocale = 'en':
   * path = /dashboard or /fr/dashboard
   *
   *
   * Default: false
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
  customConfiguration?: Partial<ContentConfig>,
  baseDir?: string
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
    baseDir: customConfiguration?.baseDir ?? baseDir ?? process.cwd(),

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
     * Directory name where the unmerged dictionaries will be stored
     *
     * Default: 'unmerged_dictionary'
     *
     * Example: 'unmerged_translations'
     *
     */
    unmergedDictionariesDirName:
      customConfiguration?.unmergedDictionariesDirName ??
      UNMERGED_DICTIONARIES_DIR_NAME,

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
    i18nextResourcesDirName:
      customConfiguration?.i18nextResourcesDirName ??
      I18NEXT_DICTIONARIES_DIR_NAME,

    /**
     *  Related to the intlayer result directory
     *
     * Directory name where the dictionaries will be stored
     *
     * Default: 'react-intl_dictionary'
     *
     * Example: 'translations'
     *
     * Note:
     * - If this directory is not at the result directory level, update the dictionariesDir field instead
     *
     */
    reactIntlMessagesDirName:
      customConfiguration?.reactIntlMessagesDirName ??
      REACT_INTL_MESSAGES_DIR_NAME,

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
     * Name of the directory where the configuration files are stored
     *
     * Default: 'config'
     *
     * Example: 'intlayer-config'
     *
     */
    configDirName: customConfiguration?.configDirName ?? CONFIG_DIR_NAME,

    /**
     * Should exclude some directories from the content search
     *
     * Default: ['node_modules']
     *
     * Not used yet
     * @TODO Implement the exclusion or remove it
     */
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,

    /**
     * Indicates if Intlayer should watch for changes in the content declaration files in the app to rebuild the related dictionaries.
     *
     * Default: process.env.NODE_ENV === 'development'
     */
    watch: customConfiguration?.watch ?? WATCH,
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

    /**
     * Output format of the dictionary
     *
     * Default: ['intlayer']
     *
     * Note:
     * - 'i18next' is not yet ensure a 1:1 mapping with the i18next library.
     * - Removing 'intlayer' will break the compatibility with react-intlayer or next-intlayer
     */
    dictionaryOutput:
      customConfiguration?.dictionaryOutput ?? DICTIONARY_OUTPUT,
  };

  const resultDirDerivedConfiguration: ResultDirDerivedConfig = {
    /**
     * Directory where the unmerged dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{unmergedDictionariesDirName}}
     *
     */
    unmergedDictionariesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.unmergedDictionariesDirName
    ),

    /**
     * Directory where the final dictionaries will be stored
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
     * Directory where the 18n dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{i18nextResourcesDirName}}
     *
     * Example: '/path/to/project/.intlayer/dictionary/i18n'
     *
     * Note:
     * - If the types are not at the result directory level, update the i18nextResourcesDirName field instead
     */
    i18nextResourcesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.i18nextResourcesDirName
    ),

    /**
     * Directory where the dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{reactIntlMessagesDirName}}
     *
     * Example: '/path/to/project/.intlayer/react-intl_dictionary'
     *
     * Note:
     * - If the types are not at the result directory level, update the dictionariesDirName field instead
     */
    reactIntlMessagesDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.reactIntlMessagesDirName
    ),

    /**
     * Directory where the dictionaries types will be stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{typeDirName}}
     *
     * Example: '/path/to/project/types'
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

    /**
     * Directory where the configuration files are stored
     *
     * Relative to the result directory
     *
     * Default: {{resultDir}} / {{configDirName}}
     *
     * Example: '/path/to/project/.intlayer/config'
     *
     * Note:
     *
     * - If the configuration files are not at the result directory level, update the configDirName field instead
     */
    configDir: join(
      baseDirDerivedConfiguration.resultDir,
      notDerivedContentConfig.configDirName
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

const buildEditorFields = (
  customConfiguration?: Partial<EditorConfig>
): EditorConfig => ({
  /**
   * URL of the application. Used to restrict the origin of the editor for security reasons.
   *
   * > '*' means that the editor is accessible from any origin
   *
   * Default: '*'
   */
  applicationURL: customConfiguration?.applicationURL ?? APPLICATION_URL,

  /**
   * URL of the editor server. Used to restrict the origin of the editor for security reasons.
   *
   * > '*' means that the editor is accessible from any origin
   *
   * Default: '*'
   */
  editorURL: customConfiguration?.editorURL ?? EDITOR_URL,

  /**
   * URL of the CMS server. Used to restrict the origin of the editor for security reasons.
   */
  cmsURL: customConfiguration?.cmsURL ?? CMS_URL,

  /**
   * URL of the editor server
   *
   * Default: 'https://back.intlayer.org'
   */
  backendURL: customConfiguration?.backendURL ?? BACKEND_URL,

  /** Port of the editor server
   *
   * Default: 8000
   */
  port: customConfiguration?.port ?? PORT,

  /**
   * Indicates if the application interact with the visual editor
   *
   * Default: true;
   *
   * If true, the editor will be able to interact with the application.
   * If false, the editor will not be able to interact with the application.
   * In any case, the editor can only be enabled by the visual editor.
   * Disabling the editor for specific environments is a way to enforce the security.
   *
   * Usage:
   * ```js
   * {
   *  // Other configurations
   *  editor: {
   *   enabled: process.env.NODE_ENV !== 'production',
   *  }
   * };
   * ```
   */
  enabled: customConfiguration?.enabled ?? IS_ENABLED,

  /**
   * clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication.
   * An access token is use to authenticate the user related to the project.
   * To get an access token, go to https://intlayer.org/dashboard/project and create an account.
   *
   * Default: undefined
   *
   * > Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.
   */
  clientId: customConfiguration?.clientId ?? undefined,

  /**
   * clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication.
   * An access token is use to authenticate the user related to the project.
   * To get an access token, go to https://intlayer.org/dashboard/project and create an account.
   *
   * Default: undefined
   *
   * > Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.
   */
  clientSecret: customConfiguration?.clientSecret ?? undefined,

  /**
   * Strategy for prioritizing dictionaries. If a dictionary is both present online and locally, the content will be merge.
   * However, is a field is defined in both dictionary, this setting determines which fields takes the priority over the other.
   *
   * Default: 'local_first'
   *
   * The strategy for prioritizing dictionaries. It can be either 'local_first' or 'distant_first'.
   * - 'local_first': The first dictionary found in the locale is used.
   * - 'distant_first': The first dictionary found in the distant locales is used.
   */
  dictionaryPriorityStrategy:
    customConfiguration?.dictionaryPriorityStrategy ??
    DICTIONARY_PRIORITY_STRATEGY,

  /**
   * Indicates if the application should hot reload the locale configurations when a change is detected.
   * For example, when a new dictionary is added or updated, the application will update the content tu display in the page.
   *
   * The hot reload is only available for clients of the `enterprise` plan.
   *
   * Default: false
   */
  hotReload: customConfiguration?.hotReload ?? HOT_RELOAD,
});

const buildLogFields = (
  customConfiguration?: Partial<LogConfig>
): LogConfig => ({
  /**
   * Indicates if the logger is enabled
   *
   * Default: 'default'
   *
   * If 'default', the logger is enabled and can be used.
   * If 'verbose', the logger will be enabled and can be used, but will log more information.
   * If 'disabled', the logger is disabled and cannot be used.
   */
  mode: customConfiguration?.mode ?? MODE,

  /**
   * Prefix of the logger
   *
   * Default: '[intlayer]'
   *
   * The prefix of the logger.
   */
  prefix: customConfiguration?.prefix ?? PREFIX,
});

const buildAiFields = (customConfiguration?: Partial<AiConfig>): AiConfig => ({
  /**
   * AI configuration
   */
  provider: customConfiguration?.provider,

  /**
   * API key
   */
  apiKey: customConfiguration?.apiKey,

  /**
   * API model
   */
  model: customConfiguration?.model,

  /**
   * Temperature
   */
  temperature: customConfiguration?.temperature,
});

/**
 * Build the configuration fields by merging the default values with the custom configuration
 */
export const buildConfigurationFields = (
  customConfiguration?: CustomIntlayerConfig,
  baseDir?: string
): IntlayerConfig => {
  const internationalizationConfig = buildInternationalizationFields(
    customConfiguration?.internationalization
  );

  const middlewareConfig = buildMiddlewareFields(
    customConfiguration?.middleware
  );

  const contentConfig = buildContentFields(
    customConfiguration?.content,
    baseDir
  );

  const editorConfig = buildEditorFields(customConfiguration?.editor);

  const logConfig = buildLogFields(customConfiguration?.log);

  const aiConfig = buildAiFields(customConfiguration?.ai);

  storedConfiguration = {
    internationalization: internationalizationConfig,
    middleware: middlewareConfig,
    content: contentConfig,
    editor: editorConfig,
    log: logConfig,
    ai: aiConfig,
  };

  return storedConfiguration;
};
