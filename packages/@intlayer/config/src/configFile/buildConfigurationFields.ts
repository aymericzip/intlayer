import { join } from 'node:path';
import type {
  AiConfig,
  BaseContentConfig,
  BaseDerivedConfig,
  BuildConfig,
  ContentConfig,
  CustomIntlayerConfig,
  DictionaryConfig,
  EditorConfig,
  InternationalizationConfig,
  IntlayerConfig,
  LogConfig,
  LogFunctions,
  PatternsContentConfig,
  RoutingConfig,
} from '@intlayer/types';
import {
  CACHE,
  IMPORT_MODE,
  OPTIMIZE,
  OUTPUT_FORMAT,
  TRAVERSE_PATTERN,
} from '../defaultValues/build';
import {
  CACHE_DIR,
  CONFIG_DIR,
  CONTENT_DIR,
  DICTIONARIES_DIR,
  DYNAMIC_DICTIONARIES_DIR,
  EXCLUDED_PATHS,
  FETCH_DICTIONARIES_DIR,
  FILE_EXTENSIONS,
  MAIN_DIR,
  MODULE_AUGMENTATION_DIR,
  REMOTE_DICTIONARIES_DIR,
  TYPES_DIR,
  UNMERGED_DICTIONARIES_DIR,
  WATCH,
} from '../defaultValues/content';
import { FILL } from '../defaultValues/dictionary';
import {
  APPLICATION_URL,
  BACKEND_URL,
  CMS_URL,
  DICTIONARY_PRIORITY_STRATEGY,
  EDITOR_URL,
  IS_ENABLED,
  LIVE_SYNC,
  LIVE_SYNC_PORT,
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
  DETECT_LOCALE_ON_PREFETCH_NO_PREFIX,
  HEADER_NAME,
  ROUTING_MODE,
  STORAGE,
} from '../defaultValues/routing';
import { ESMxCJSRequire } from '../utils/ESMxCJSHelpers';
import { normalizePath } from '../utils/normalizePath';

let storedConfiguration: IntlayerConfig;

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
  requiredLocales:
    customConfiguration?.requiredLocales ??
    customConfiguration?.locales ??
    REQUIRED_LOCALES,

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

const buildRoutingFields = (
  customConfiguration?: Partial<RoutingConfig>
): RoutingConfig => ({
  /**
   * URL routing mode for locale handling
   *
   * Controls how locales are represented in application URLs:
   * - 'prefix-no-default': Prefix all locales except the default locale (default)
   *    - en → /dashboard
   *    - fr → /fr/dashboard
   *
   * - 'prefix-all': Prefix all locales including the default locale
   *    - en → /en/dashboard
   *    - fr → /fr/dashboard
   *
   * - 'search-params': Use search parameters for locale handling
   *    - en → /dashboard?locale=en
   *    - fr → /fr/dashboard?locale=fr
   *
   * - 'no-prefix': No locale prefixing in URLs
   *    - en → /dashboard
   *    - fr → /dashboard
   *
   * Default: 'prefix-no-default'
   */
  mode: customConfiguration?.mode ?? ROUTING_MODE,

  /**
   * Configuration for storing the locale in the client (localStorage or sessionStorage)
   *
   * If false, the locale will not be stored by the middleware.
   * If true, the locale storage will consider all default values.
   *
   * Default: 'cookie'
   */
  storage: customConfiguration?.storage ?? STORAGE,

  /**
   * Header name to get the locale
   *
   * Default: 'x-intlayer-locale'
   */
  headerName: customConfiguration?.headerName ?? HEADER_NAME,

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
   * Controls whether locale detection occurs during Next.js prefetch requests
   * - true: Detect and apply locale during prefetch
   * - false: Use default locale during prefetch (recommended)
   *
   * This setting affects how Next.js handles locale prefetching:
   *
   * Example scenario:
   * - User's browser language is 'fr'
   * - Current page is /fr/about
   * - Link prefetches /about
   *
   * With `detectLocaleOnPrefetchNoPrefix:true`
   * - Prefetch detects 'fr' locale from browser
   * - Redirects prefetch to /fr/about
   *
   * With `detectLocaleOnPrefetchNoPrefix:false` (default)
   * - Prefetch uses default locale
   * - Redirects prefetch to /en/about (assuming 'en' is default)
   *
   * When to use true:
   * - Your app uses non-localized internal links (e.g. <a href="/about">)
   * - You want consistent locale detection behavior between regular and prefetch requests
   *
   * When to use false (default):
   * - Your app uses locale-prefixed links (e.g. <a href="/fr/about">)
   * - You want to optimize prefetching performance
   * - You want to avoid potential redirect loops
   *
   * Default: false
   */
  detectLocaleOnPrefetchNoPrefix:
    customConfiguration?.detectLocaleOnPrefetchNoPrefix ??
    DETECT_LOCALE_ON_PREFETCH_NO_PREFIX,
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
     * - Example: '
     *
     * Will be used to resolve all intlayer directories
     *
     * Note:
     * - The base directory should be the root of the project
     * - Can be changed to a custom directory to externalize either the content used in the project, or the intlayer application from the project
     */
    baseDir: customConfiguration?.baseDir ?? baseDir ?? process.cwd(),

    /**
     * Should exclude some directories from the content search
     *
     * Default: ['**\/node_modules/**', '**\/dist/**', '**\/build/**', '**\/.intlayer/**', '**\/.next/**', '**\/.nuxt/**', '**\/.expo/**', '**\/.vercel/**', '**\/.turbo/**', '**\/.tanstack/**']
     */
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,

    /**
     * Indicates if Intlayer should watch for changes in the content declaration files in the app to rebuild the related dictionaries.
     *
     * Default: process.env.NODE_ENV === 'development'
     */
    watch: customConfiguration?.watch ?? WATCH,

    /**
     * Command to format the content. When intlayer write your .content files locally, this command will be used to format the content.
     * Intlayer will replace the {{file}} with the path of the file to format.
     *
     * If not set, Intlayer will try to detect the format command automatically. By trying to resolve the following commands: prettier, biome, eslint.
     *
     * Example:
     *
     * ```bash
     * npx prettier --write {{file}}
     * ```
     *
     * ```bash
     * bunx biome format {{file}}
     * ```
     *
     * ```bash
     * bun format {{file}}
     * ```
     *
     * ```bash
     * npx eslint --fix {{file}}
     * ```
     *
     * Default: undefined
     */
    formatCommand: customConfiguration?.formatCommand,
  };

  const baseDirDerivedConfiguration: BaseDerivedConfig = {
    /**
     * Directory where the content is stored
     *
     * Relative to the base directory of the project
     *
     * Default: ./src
     *
     * Example: 'src'
     *
     * Note:
     * - Can be changed to a custom directory to externalize the content used in the project
     * - If the content is not at the base directory level, update the contentDirName field instead
     */
    contentDir: (customConfiguration?.contentDir ?? CONTENT_DIR).map(
      (contentDir) => join(notDerivedContentConfig.baseDir, contentDir)
    ),

    /**
     * Directory where the module augmentation will be stored
     *
     * Module augmentation allow better IDE suggestions and type checking
     *
     * Relative to the base directory of the project
     *
     * Default: .intlayer/types
     *
     * Example: 'types'
     *
     * Note:
     * - If this path changed, be sure to include it from the tsconfig.json file
     * - If the module augmentation is not at the base directory level, update the moduleAugmentationDirName field instead
     *
     */
    moduleAugmentationDir: join(
      notDerivedContentConfig.baseDir,

      customConfiguration?.moduleAugmentationDir ?? MODULE_AUGMENTATION_DIR
    ),

    /**
     * Directory where the unmerged dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: '.intlayer/unmerged_dictionary'
     *
     */
    unmergedDictionariesDir: join(
      notDerivedContentConfig.baseDir,

      customConfiguration?.unmergedDictionariesDir ?? UNMERGED_DICTIONARIES_DIR
    ),

    /**
     * Directory where the remote dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: '.intlayer/remote_dictionary'
     */
    remoteDictionariesDir: join(
      notDerivedContentConfig.baseDir,
      customConfiguration?.remoteDictionariesDir ?? REMOTE_DICTIONARIES_DIR
    ),

    /**
     * Directory where the final dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: .intlayer/dictionary
     *
     * Example: '.intlayer/dictionary'
     *
     * Note:
     * - If the types are not at the result directory level, update the dictionariesDirName field instead
     * - The dictionaries are stored in JSON format
     * - The dictionaries are used to translate the content
     * - The dictionaries are built from the content files
     */
    dictionariesDir: join(
      notDerivedContentConfig.baseDir,

      customConfiguration?.dictionariesDir ?? DICTIONARIES_DIR
    ),

    /**
     * Directory where the dynamic dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: .intlayer/dynamic_dictionary
     */
    dynamicDictionariesDir: join(
      notDerivedContentConfig.baseDir,
      customConfiguration?.dynamicDictionariesDir ?? DYNAMIC_DICTIONARIES_DIR
    ),

    /**
     * Directory where the fetch dictionaries will be stored
     *
     * Relative to the result directory
     *
     * Default: .intlayer/fetch_dictionary
     */
    fetchDictionariesDir: join(
      notDerivedContentConfig.baseDir,
      customConfiguration?.fetchDictionariesDir ?? FETCH_DICTIONARIES_DIR
    ),

    /**
     * Directory where the dictionaries types will be stored
     *
     * Relative to the result directory
     *
     * Default: .intlayer/types
     *
     * Example: 'types'
     *
     * Note:
     * - If the types are not at the result directory level, update the typesDirName field instead
     */
    typesDir: join(
      notDerivedContentConfig.baseDir,

      customConfiguration?.typesDir ?? TYPES_DIR
    ),

    /**
     * Directory where the main files will be stored
     *
     * Relative to the result directory
     *
     * Default: .intlayer/main
     *
     * Example: '.intlayer/main'
     *
     * Note:
     *
     * - If the main files are not at the result directory level, update the mainDirName field instead
     */
    mainDir: join(
      notDerivedContentConfig.baseDir,

      customConfiguration?.mainDir ?? MAIN_DIR
    ),

    /**
     * Directory where the configuration files are stored
     *
     * Relative to the result directory
     *
     * Default: .intlayer/config
     *
     * Example: '.intlayer/config'
     *
     * Note:
     *
     * - If the configuration files are not at the result directory level, update the configDirName field instead
     */
    configDir: join(
      notDerivedContentConfig.baseDir,

      customConfiguration?.configDir ?? CONFIG_DIR
    ),

    /**
     * Directory where the cache files are stored, relative to the result directory
     *
     * Default: .intlayer/cache
     */
    cacheDir: join(
      notDerivedContentConfig.baseDir,
      customConfiguration?.cacheDir ?? CACHE_DIR
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
     * Default: ['src/**\/*.content.ts', 'src/**\/*.content.js', 'src/**\/*.content.json', 'src/**\/*.content.cjs', 'src/**\/*.content.mjs', 'src/**\/*.content.tsx', 'src/**\/*.content.jsx']
     */
    watchedFilesPatternWithPath: notDerivedContentConfig.fileExtensions.flatMap(
      (ext) =>
        baseDirDerivedConfiguration.contentDir.map(
          (contentDir) => `${normalizePath(contentDir)}/**/*${ext}`
        )
    ),

    /**
     * Pattern of dictionary to interpret
     *
     * Default: '.intlayer/dictionary/**\/*.json'
     */
    outputFilesPatternWithPath: `${normalizePath(
      baseDirDerivedConfiguration.dictionariesDir
    )}/**/*.json`,
  };

  return {
    ...notDerivedContentConfig,
    ...baseDirDerivedConfiguration,
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
  liveSync: customConfiguration?.liveSync ?? LIVE_SYNC,

  /**
   * Port of the live sync server
   *
   * Default: 4000
   */
  liveSyncPort: customConfiguration?.liveSyncPort ?? LIVE_SYNC_PORT,

  /**
   * URL of the live sync server in case of remote live sync server
   *
   * Default: `http://localhost:${LIVE_SYNC_PORT}`
   */
  liveSyncURL:
    customConfiguration?.liveSyncURL ??
    `http://localhost:${customConfiguration?.liveSyncPort ?? LIVE_SYNC_PORT}`,
});

const buildLogFields = (
  customConfiguration?: Partial<LogConfig>,
  logFunctions?: LogFunctions
): LogConfig => ({
  /**
   * Indicates if the logger is enabled
   *
   * Default: 'prefix-no-default'
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

  /**
   * Functions to log
   */
  error: logFunctions?.error,
  log: logFunctions?.log,
  info: logFunctions?.info,
  warn: logFunctions?.warn,
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

  /**
   * Application context
   */
  applicationContext: customConfiguration?.applicationContext,
});

const buildBuildFields = (
  customConfiguration?: Partial<BuildConfig>
): BuildConfig => ({
  /**
   * Indicates if the build should be optimized
   *
   * Default: process.env.NODE_ENV === 'production'
   *
   * If true, the build will be optimized.
   * If false, the build will not be optimized.
   *
   * Intlayer will replace all calls of dictionaries to optimize chunking. That way the final bundle will import only the dictionaries that are used.
   * All imports will stay as static import to avoid async processing when loading the dictionaries.
   *
   * Note:
   * - Intlayer will replace all call of `useIntlayer` with the defined mode by the `importMode` option.
   * - Intlayer will replace all call of `getIntlayer` with `getDictionary`.
   * - This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
   * - In most cases, "dynamic" will be used for React applications, "async" for Vue.js applications.
   * - Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
   */
  optimize: customConfiguration?.optimize ?? OPTIMIZE,

  /**
   * Indicates the mode of import to use for the dictionaries.
   *
   * Available modes:
   * - "static": The dictionaries are imported statically.
   *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionary`.
   * - "dynamic": The dictionaries are imported dynamically in a synchronous component using the suspense API.
   *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionaryDynamic`.
   * - "live": The dictionaries are imported dynamically using the live sync API.
   *   In that case, Intlayer will replace all calls to `useIntlayer` with `useDictionaryDynamic`.
   *   Live mode will use the live sync API to fetch the dictionaries. If the API call fails, the dictionaries will be imported dynamically as "dynamic" mode.
   *
   * Default: "static"
   *
   * By default, when a dictionary is loaded, it imports content for all locales as it's imported statically.
   *
   * Note:
   * - Dynamic imports rely on Suspense and may slightly impact rendering performance.
   * - If disabled all locales will be loaded at once, even if they are not used.
   * - This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
   * - Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
   * - This option will be ignored if `optimize` is disabled.
   * - This option will not impact the `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` and `useDictionaryDynamic` functions. You can still use them to refine you code on manual optimization.
   * - The "live" allows to sync the dictionaries to the live sync server.
   */
  importMode: customConfiguration?.importMode ?? IMPORT_MODE,

  /**
   * Pattern to traverse the code to optimize.
   *
   * Allows to avoid to traverse the code that is not relevant to the optimization.
   * Improve build performance.
   *
   * Default: ['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']
   *
   * Example: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}']`
   *
   * Note:
   * - This option will be ignored if `optimize` is disabled.
   * - Use glob pattern.
   */
  traversePattern: customConfiguration?.traversePattern ?? TRAVERSE_PATTERN,

  /**
   * Output format of the dictionaries
   *
   * Can be set on large projects to improve build performance.
   *
   * Default: ['cjs', 'esm']
   *
   * The output format of the dictionaries. It can be either 'cjs' or 'esm'.
   * - 'cjs': The dictionaries are outputted as CommonJS modules.
   * - 'esm': The dictionaries are outputted as ES modules.
   */
  outputFormat: customConfiguration?.outputFormat ?? OUTPUT_FORMAT,

  /**
   * Cache
   */
  cache: customConfiguration?.cache ?? CACHE,

  /**
   * Require function
   */
  require: customConfiguration?.require ?? ESMxCJSRequire,
});

const buildDictionaryFields = (
  customConfiguration?: Partial<DictionaryConfig>
): DictionaryConfig => ({
  /**
   * Indicate how the dictionary should be filled using AI.
   *
   * Default: true
   */
  fill: customConfiguration?.fill ?? FILL,
});

/**
 * Build the configuration fields by merging the default values with the custom configuration
 */
export const buildConfigurationFields = (
  customConfiguration?: CustomIntlayerConfig,
  baseDir?: string,
  logFunctions?: LogFunctions
): IntlayerConfig => {
  const internationalizationConfig = buildInternationalizationFields(
    customConfiguration?.internationalization
  );

  const routingConfig = buildRoutingFields(customConfiguration?.routing);

  const contentConfig = buildContentFields(
    customConfiguration?.content,
    baseDir
  );

  const editorConfig = buildEditorFields(customConfiguration?.editor);

  const logConfig = buildLogFields(customConfiguration?.log, logFunctions);

  const aiConfig = buildAiFields(customConfiguration?.ai);

  const buildConfig = buildBuildFields(customConfiguration?.build);

  const dictionaryConfig = buildDictionaryFields(
    customConfiguration?.dictionary
  );

  storedConfiguration = {
    internationalization: internationalizationConfig,
    routing: routingConfig,
    content: contentConfig,
    editor: editorConfig,
    log: logConfig,
    ai: aiConfig,
    build: buildConfig,
    dictionary: dictionaryConfig,
    plugins: customConfiguration?.plugins,
  };

  return storedConfiguration;
};
