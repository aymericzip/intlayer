import type { Dictionary } from './dictionary';
import type { Locale } from './locales';
import type { Plugin } from './plugin';

export type StrictMode = 'strict' | 'inclusive' | 'loose';

/**
 * Configuration for internationalization settings
 */
export type InternationalizationConfig = {
  /**
   * Locales available in the application
   *
   * Default: [Locales.ENGLISH]
   *
   * You can define a list of available locales to support in the application.
   */
  locales: Locale[];

  /**
   * Locales required by TypeScript to ensure strong implementations of internationalized content using typescript.
   *
   * Default: []
   *
   * If empty, all locales are required in `strict` mode.
   *
   * Ensure required locales are also defined in the `locales` field.
   */
  requiredLocales: Locale[];

  /**
   * Ensure strong implementations of internationalized content using typescript.
   * - If set to "strict", the translation `t` function will require each declared locales to be defined. If one locale is missing, or if a locale is not declared in your config, it will throw an error.
   * - If set to "inclusive", the translation `t` function will require each declared locales to be defined. If one locale is missing, it will throw a warning. But will accept if a locale is not declared in your config, but exist.
   * - If set to "loose", the translation `t` function will accept any existing locale.
   *
   * Default: "inclusive"
   */
  strictMode: StrictMode;

  /**
   * Default locale of the application for fallback
   *
   * Default: Locales.ENGLISH
   *
   * Used to specify a fallback locale in case no other locale is set.
   */
  defaultLocale: Locale;
};

export type CookiesAttributes = {
  /**
   * Type of the storage
   *
   * The type of the storage. It can be 'cookie'.
   */
  type: 'cookie';
  /**
   * Cookie name to store the locale information
   *
   * Default: 'INTLAYER_LOCALE'
   *
   * The cookie key where the locale information is stored.
   */
  name?: string;
  /**
   * Cookie domain to store the locale information
   *
   * Default: undefined
   *
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string;
  /**
   * Cookie path to store the locale information
   *
   * Default: undefined
   *
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string;
  /**
   * Cookie secure to store the locale information
   *
   * Default: undefined
   *
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean;
  /**
   * Cookie httpOnly to store the locale information
   *
   * Default: undefined
   *
   * The cookie httpOnly where the locale information is stored.
   */
  httpOnly?: boolean;
  /**
   * Cookie sameSite to store the locale information
   *
   * Default: undefined
   *
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'lax' | 'none';

  /**
   * Cookie expires to store the locale information
   *
   * Default: undefined
   *
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: Date | number | undefined;
};

export type StorageAttributes = {
  /**
   * Storage type where the locale is stored
   *
   * Determines whether the locale is persisted in `localStorage` (across sessions)
   * or `sessionStorage` (cleared when the browser session ends) or `header` (from the request header).
   */
  type: 'localStorage' | 'sessionStorage' | 'header';

  /**
   * Storage key to store the locale information
   *
   * Default: 'INTLAYER_LOCALE'
   *
   * The key name used in the client storage to save the locale.
   */
  name?: string;
};

/**
 * Configuration for routing behaviors
 */
export type RoutingConfig = {
  /**
   * URL routing mode for locale handling
   *
   * Controls how locales are represented in application URLs:
   * - 'prefix-no-default': Prefix all locales except the default locale
   * - 'prefix-all': Prefix all locales including the default locale
   * - 'no-prefix': No locale prefixing in URLs
   * - 'search-params': Use search parameters for locale handling
   *
   * Examples with defaultLocale = 'en':
   * - 'prefix-no-default': /dashboard (en) or /fr/dashboard (fr)
   * - 'prefix-all': /en/dashboard (en) or /fr/dashboard (fr)
   * - 'no-prefix': /dashboard (locale handled via other means)
   * - 'search-params': /dashboard?locale=fr
   *
   * Note: This setting do not impact the cookie, or locale storage management.
   *
   * Default: 'prefix-no-default'
   */
  mode: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';

  /**
   * Configuration for storing the locale in the client (localStorage or sessionStorage)
   *
   * If false, the locale will not be stored by the middleware.
   * If true, the locale storage will consider all default values.
   *
   * Default: ['cookie', 'header]
   *
   * Note: Check out GDPR compliance for cookies. See https://gdpr.eu/cookies/
   * Note: useLocale hook includes a prop to disable the cookie storage.
   * Note: Even if storage is disabled, the middleware will still detect the locale from the request header (1- check for `x-intlayer-locale`, 2- fallback to the `accept-language`).
   *
   * Recommendation:
   * - Config both localStorage and cookies for the storage of the locale if you want to support GDPR compliance.
   * - Disable the cookie storage by default on the useLocale hook by waiting for the user to consent to the cookie storage.
   */
  storage:
    | false
    | 'cookie'
    | 'localStorage'
    | 'sessionStorage'
    | 'header'
    | CookiesAttributes
    | StorageAttributes
    | (
        | 'cookie'
        | 'localStorage'
        | 'sessionStorage'
        | 'header'
        | CookiesAttributes
        | StorageAttributes
      )[];

  /**
   * Base path for application URLs
   *
   * Default: ''
   *
   * Defines the base path where the application is accessible from.
   */
  basePath: string;
};

/**
 * Configuration for intlayer editor
 */
export type EditorConfig = {
  /**
   * URL of the application. Used to restrict the origin of the editor for security reasons.
   *
   * > '*' means that the editor is accessible from any origin
   *
   * Default: '*'
   */
  applicationURL: string;

  /**
   * URL of the editor server. Used to restrict the origin of the editor for security reasons.
   *
   * > '*' means that the editor is accessible from any origin
   *
   * Default: 'http://localhost:8000'
   */
  editorURL: string;

  /**
   * URL of the CMS server. Used to restrict the origin of the editor for security reasons.
   *
   * Default: 'https://intlayer.org'
   */
  cmsURL: string;

  /**
   * URL of the backend
   *
   * Default: 'https://back.intlayer.org'
   *
   * The URL of the backend server.
   */
  backendURL: string;

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
   *
   */
  enabled: boolean;

  /** Port of the editor server
   *
   * Default: 8000
   */
  port: number;

  /**
   * clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication.
   * An access token is use to authenticate the user related to the project.
   * To get an access token, go to https://intlayer.org/dashboard/project and create an account.
   *
   * Default: undefined
   *
   * > Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.
   */
  clientId?: string;

  /**
   * clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication.
   * An access token is use to authenticate the user related to the project.
   * To get an access token, go to https://intlayer.org/dashboard/project and create an account.
   *
   * Default: undefined
   *
   * > Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.
   */
  clientSecret?: string;

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
  dictionaryPriorityStrategy: 'local_first' | 'distant_first';

  /**
   * Indicates if the application should hot reload the locale configurations when a change is detected.
   * For example, when a new dictionary is added or updated, the application will update the content tu display in the page.
   *
   * Default: true
   */
  liveSync: boolean;

  /**
   * Port of the live sync server
   *
   * Default: 4000
   */
  liveSyncPort: number;

  /**
   * URL of the live sync server in case of remote live sync server
   *
   * Default: `http://localhost:${liveSyncPort}`
   */
  liveSyncURL: string;
};

export type AiConfig = {
  /**
   * Provider
   *
   * The provider to use for the AI features of Intlayer.
   *
   * Available providers:
   * - 'openai'
   * - 'anthropic'
   * - 'mistral'
   * - 'deepseek'
   * - 'gemini'
   *
   * Default: 'openai'
   */
  provider?: string;

  /**
   * API model
   *
   * The model to use for the AI features of Intlayer.
   *
   * Example: 'gpt-4o-2024-11-20'
   *
   */
  model?: string;

  /**
   *  temperature
   *
   * The temperature to use for the AI features of Intlayer.
   * The temperature controls the randomness of the AI's responses.
   * A higher temperature will make the AI more creative and less predictable.
   *
   * Example: 0.1
   */
  temperature?: number;

  /**
   * API key
   *
   * Use your own OpenAI API key to use the AI features of Intlayer.
   * If you don't have an OpenAI API key, you can get one for free at https://openai.com/api/.
   *
   */
  apiKey?: string;

  /**
   * Application context
   *
   * The context of the application to use for the AI features of Intlayer.
   *
   * Example: 'This is a website for a company that sells products online.'
   */
  applicationContext?: string;
};

export type BuildConfig = {
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
   * - Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
   */
  optimize: boolean;

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
   * - If desabled all locales will be loaded at once, even if they are not used.
   * - This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
   * - Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
   * - This option will be ignored if `optimize` is disabled.
   * - This option will not impact the `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` and `useDictionaryDynamic` functions. You can still use them to refine you code on manual optimization.
   * - The "live" allows to sync the dictionaries to the live sync server.
   * - Require static key to work. Example of invalid code: `const navbarKey = "my-key"; useIntlayer(navbarKey)`.
   */
  importMode: 'static' | 'dynamic' | 'live';

  /**
   * Pattern to traverse the code to optimize.
   *
   * Allows to avoid to traverse the code that is not relevant to the optimization.
   * Improve build performance.
   *
   * Default: ['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']
   *
   * Example: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**\/node_modules/**']`
   *
   * Note:
   * - This option will be ignored if `optimize` is disabled.
   * - Use glob pattern.
   */
  traversePattern: string[];

  /**
   * Output format of the dictionaries
   *
   * Default: ['cjs', 'esm']
   *
   * The output format of the dictionaries. It can be either 'cjs' or 'esm'. Even if dictionaries are written in JSON, entry point to access the dictionaries are generated.
   * This function will use the output format defined using this option.
   * The default format is 'cjs' as it allows better interoperability with other libraries, scripts, and applications. But some build tools, such as Vite, require ES modules.
   */
  outputFormat: ('cjs' | 'esm')[];

  /**
   * Indicates if the cache should be enabled
   *
   * Default: true
   *
   * If true, the cache will be enabled.
   * If false, the cache will not be enabled.
   */
  cache: boolean;

  /**
   * Require function
   *
   * In some environments, as VSCode extension, the require function should be set relatively to the project root to work properly.
   *
   * Default: undefined
   *
   * If undefined, the require function will be set to the default require function.
   * If defined, the require function will be set to the defined require function.
   *
   * Example:
   * ```js
   * {
   *   require: require
   * }
   * ```
   */
  require?: NodeJS.Require;
};

/**
 * Custom configuration that can be provided to override default settings
 */
export type CustomIntlayerConfig = {
  /**
   * Custom internationalization configuration
   */
  internationalization?: Partial<InternationalizationConfig>;

  /**
   * Custom dictionary configuration
   */
  dictionary?: Partial<DictionaryConfig>;

  /**
   * Custom routing configuration
   */
  routing?: Partial<RoutingConfig>;

  /**
   * Custom content configuration
   */
  content?: Partial<ContentConfig>;

  /**
   * Custom editor configuration
   */
  editor?: Partial<EditorConfig>;

  /**
   * Custom log configuration
   */
  log?: Partial<LogConfig>;

  /**
   * Custom AI configuration
   */
  ai?: Partial<AiConfig>;

  /**
   * Custom build configuration
   */
  build?: Partial<BuildConfig>;

  /**
   * Custom plugins configuration
   */
  plugins?: Plugin[];
};

export type DictionaryConfig = Pick<
  Dictionary,
  | 'fill'
  | 'description'
  | 'locale'
  | 'priority'
  | 'live'
  | 'title'
  | 'tags'
  | 'version'
>;

/**
 * Combined configuration for internationalization, middleware, and content
 */
export type IntlayerConfig = {
  /**
   * Internationalization configuration
   */
  internationalization: InternationalizationConfig;

  /**
   * Default dictionary configuration
   */
  dictionary?: Partial<DictionaryConfig>;

  /**
   * Routing configuration
   */
  routing: RoutingConfig;

  /**
   * Content configuration
   */
  content: ContentConfig;

  /**
   * Intlayer editor configuration
   */
  editor: EditorConfig;

  /**
   * Logger configuration
   */
  log: LogConfig;

  /**
   * AI configuration
   */
  ai?: Partial<AiConfig>;

  /**
   * Build configuration
   */
  build: BuildConfig;

  /**
   * Plugins configuration
   */
  plugins?: Plugin[];
};

/**
 * Base configuration for content handling
 */
export type BaseContentConfig = {
  /**
   * File extensions of content to look for
   *
   * Default: ['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']
   *
   * List of file extensions to scan for content.
   */
  fileExtensions: string[];

  /**
   * Absolute path of the project's base directory
   *
   * Default: process.cwd()
   *
   * The root directory of the project, typically used for resolving other paths.
   */
  baseDir: string;

  /**
   * Directories to be excluded from content processing
   *
   * Default: ['node_modules', '.intlayer']
   *
   * A list of directories to exclude from content processing.
   */
  excludedPath: string[];

  /**
   * Indicates if Intlayer should watch for changes in the content declaration files in the app to rebuild the related dictionaries.
   *
   * Default: process.env.NODE_ENV === 'development'
   */
  watch: boolean;

  /**
   * Command to format the content. When intlayer write your .content files locally, this command will be used to format the content.
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
   * Intlayer will replace the {{file}} with the path of the file to format.
   *
   * Default: undefined
   */
  formatCommand: string | undefined;
};

/**
 * Configuration derived based on the base content configuration
 */
export type BaseDerivedConfig = {
  /**
   * Directory where the content is stored, relative to the base directory
   *
   * Default: ['.']
   *
   * Derived content directory based on the base configuration.
   */
  contentDir: string[];

  /**
   * Directory for module augmentation, relative to the base directory
   *
   * Default: .intlayer/types
   *
   * Defines the derived path for module augmentation.
   */
  moduleAugmentationDir: string;

  /**
   * Directory where unmerged dictionaries are stored, relative to the result directory
   *
   * Default: .intlayer/unmerged_dictionary
   *
   * Specifies the derived path for unmerged dictionaries relative to the result directory.
   */
  unmergedDictionariesDir: string;

  /**
   * Directory where remote dictionaries are stored, relative to the result directory
   *
   * Default: .intlayer/remote_dictionary
   *
   * Specifies the derived path for remote dictionaries relative to the result directory.
   */
  remoteDictionariesDir: string;

  /**
   * Directory where final dictionaries are stored, relative to the result directory
   *
   * Default: .intlayer/dictionary
   *
   * Specifies the derived path for dictionaries relative to the result directory.
   */
  dictionariesDir: string;

  /**
   * Directory where dynamic dictionaries are stored, relative to the result directory
   *
   * Default: .intlayer/dynamic_dictionary
   *
   * Specifies the derived path for dynamic dictionaries relative to the result directory.
   */
  dynamicDictionariesDir: string;

  /**
   * Directory where fetch dictionaries are stored, relative to the result directory
   *
   * Default: .intlayer/fetch_dictionary
   *
   * Specifies the derived path for fetch dictionaries relative to the result directory.
   */
  fetchDictionariesDir: string;

  /**
   * Directory where dictionary types are stored, relative to the result directory
   *
   * Default: .intlayer/types
   *
   * Specifies the derived path for dictionary types relative to the result directory.
   */
  typesDir: string;

  /**
   * Directory where the main files are stored, relative to the result directory
   *
   * Default: .intlayer/main
   *
   * Specifies the derived path for the main files relative to the result directory.
   */
  mainDir: string;

  /**
   * Directory where the configuration files are stored, relative to the result directory
   *
   * Default: .intlayer/config
   *
   * Specifies the derived path for the configuration files relative to the result directory.
   */
  configDir: string;

  /**
   * Directory where the cache files are stored, relative to the result directory
   *
   * Default: .intlayer/cache
   *
   * Specifies the derived path for the cache files relative to the result directory.
   */
  cacheDir: string;
};

/**
 * Configuration for content patterns
 */
export type PatternsContentConfig = {
  /**
   * Patterns of files to watch for changes
   *
   * Default: ['/**\/*.content.ts', '/**\/*.content.js', '/**\/*.content.json', '/**\/*.content.cjs', '/**\/*.content.mjs', '/**\/*.content.tsx', '/**\/*.content.jsx']
   *
   * Defines file patterns for content to watch for changes.
   */
  watchedFilesPattern: string[];

  /**
   * Patterns of files to watch for changes including the relative path
   *
   * Default: ['src/**\/*.content.ts', 'src/**\/*.content.js', 'src/**\/*.content.json', 'src/**\/*.content.cjs', 'src/**\/*.content.mjs', 'src/**\/*.content.tsx', 'src/**\/*.content.jsx']
   *
   * Specifies the file patterns for content to watch, including relative paths.
   */
  watchedFilesPatternWithPath: string[];

  /**
   * Pattern for output files including the relative path
   *
   * Default: '{{dictionariesDir}}/**\/*.json'
   *
   * Defines the pattern for output files, including the relative path.
   */
  outputFilesPatternWithPath: string;
};

// @TODO: Implement exclusion of non configurable fields, to not allow them to be set in the config
/**
 * General configuration derived from the config file
 */
export type ContentConfig = BaseContentConfig &
  BaseDerivedConfig &
  PatternsContentConfig;

export type LogFunctions = {
  error?: typeof console.error;
  log?: typeof console.log;
  info?: typeof console.info;
  warn?: typeof console.warn;
};

export type LogConfig = {
  /**
   * Indicates if the logger is enabled
   *
   * Default: true
   *
   * If 'default', the logger is enabled and can be used.
   * If 'verbose', the logger will be enabled and can be used, but will log more information.
   * If 'disabled', the logger is disabled and cannot be used.
   */
  mode: 'default' | 'verbose' | 'disabled';

  /**
   * Prefix of the logger
   *
   * Default: '[intlayer]'
   *
   * The prefix of the logger.
   */
  prefix: string;

  /**
   * Functions to log
   */
  error?: typeof console.error;
  log?: typeof console.log;
  info?: typeof console.info;
  warn?: typeof console.warn;
  debug?: typeof console.debug;
};
