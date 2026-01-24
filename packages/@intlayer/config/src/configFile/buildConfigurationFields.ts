import { statSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import type {
  AiConfig,
  BuildConfig,
  CompilerConfig,
  ContentConfig,
  CustomIntlayerConfig,
  DictionaryConfig,
  EditorConfig,
  InternationalizationConfig,
  IntlayerConfig,
  LogConfig,
  LogFunctions,
  RoutingConfig,
  SystemConfig,
} from '@intlayer/types';
import packageJson from '@intlayer/types/package.json' with { type: 'json' };
import {
  BUILD_MODE,
  CACHE,
  OUTPUT_FORMAT,
  TRAVERSE_PATTERN,
} from '../defaultValues/build';
import {
  COMPILER_ENABLED,
  COMPILER_EXCLUDE_PATTERN,
  COMPILER_OUTPUT_DIR,
  COMPILER_TRANSFORM_PATTERN,
} from '../defaultValues/compiler';
import {
  CODE_DIR,
  CONTENT_DIR,
  EXCLUDED_PATHS,
  FILE_EXTENSIONS,
  WATCH,
} from '../defaultValues/content';
import {
  CONTENT_AUTO_TRANSFORMATION,
  FILL,
  IMPORT_MODE,
  LOCATION,
} from '../defaultValues/dictionary';
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
import { BASE_PATH, ROUTING_MODE, STORAGE } from '../defaultValues/routing';
import {
  CACHE_DIR,
  CONFIG_DIR,
  DICTIONARIES_DIR,
  DYNAMIC_DICTIONARIES_DIR,
  FETCH_DICTIONARIES_DIR,
  MAIN_DIR,
  MODULE_AUGMENTATION_DIR,
  REMOTE_DICTIONARIES_DIR,
  TYPES_DIR,
  UNMERGED_DICTIONARIES_DIR,
} from '../defaultValues/system';
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
   * If true, the locale storage will consider all default values. (cookie and header)
   *
   * Default: ['cookie', 'header']
   *
   */
  storage: customConfiguration?.storage ?? STORAGE,

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
   * Custom URL rewriting rules that override the default routing mode for specific paths.
   * Allows you to define locale-specific paths that differ from the standard routing behavior.
   * Supports dynamic route parameters using `[param]` syntax.
   *
   * Default: undefined
   *
   * Example:
   * ```typescript
   * rewrite: {
   *   "/about": {
   *     en: "/about",
   *     fr: "/a-propos",
   *   },
   *   "/product/[slug]": {
   *     en: "/product/[slug]",
   *     fr: "/produit/[slug]",
   *   },
   * }
   * ```
   *
   * Note:
   * - The rewrite rules take precedence over the default `mode` behavior.
   * - If a path matches a rewrite rule, the localized path from the rewrite configuration will be used.
   * - Dynamic route parameters are supported using bracket notation (e.g., `[slug]`, `[id]`).
   * - Works with both Next.js and Vite applications.
   */
  rewrite: customConfiguration?.rewrite,
});

const buildContentFields = (
  customConfiguration?: Partial<ContentConfig>,
  baseDir?: string,
  logFunctions?: LogFunctions
): ContentConfig => {
  const fileExtensions = customConfiguration?.fileExtensions ?? FILE_EXTENSIONS;
  const projectBaseDir =
    customConfiguration?.baseDir ?? baseDir ?? process.cwd();

  const optionalJoinBaseDir = (pathInput: string) => {
    let absolutePath: string;

    try {
      // Try resolving as a Node module first (e.g. '@intlayer/design-system')
      // Passing { paths: [...] } ensures we look starting from your project baseDir
      absolutePath = require.resolve(pathInput, {
        paths: [projectBaseDir],
      });
    } catch {
      // If resolution fails (it's not a module or it's a relative path like './src'),
      // fall back to standard path joining.
      absolutePath = isAbsolute(pathInput)
        ? pathInput
        : join(projectBaseDir, pathInput);
    }

    try {
      // Smart Detection: File vs Directory
      const stats = statSync(absolutePath);

      // If it resolved to a file (like package.json "main" or index.js),
      // we want the FOLDER containing that file.
      if (stats.isFile()) {
        return dirname(absolutePath);
      }
    } catch {
      // Safety Fallback:
      // If statSync fails but it looks like a file (has an extension), strip it.
      if (/\.[a-z0-9]+$/i.test(absolutePath)) {
        return dirname(absolutePath);
      }
    }

    // Return the calculated path (usually a directory)
    return absolutePath;
  };

  const contentDir = (customConfiguration?.contentDir ?? CONTENT_DIR).map(
    optionalJoinBaseDir
  );

  const codeDirInput = customConfiguration?.codeDir;

  const codeDir = (codeDirInput ?? CODE_DIR).map(optionalJoinBaseDir);

  return {
    fileExtensions,
    baseDir: projectBaseDir,
    contentDir,
    codeDir,
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,
    watch: customConfiguration?.watch ?? WATCH,
    formatCommand: customConfiguration?.formatCommand,
    watchedFilesPattern: fileExtensions.map((ext) => `/**/*${ext}`),
    watchedFilesPatternWithPath: fileExtensions.flatMap((ext) =>
      contentDir.map((dir) => `${normalizePath(dir)}/**/*${ext}`)
    ),
  };
};

const buildSystemFields = (
  customConfiguration?: Partial<SystemConfig>,
  contentConfig?: ContentConfig
): SystemConfig => {
  const projectBaseDir = contentConfig?.baseDir ?? process.cwd();

  const optionalJoinBaseDir = (pathInput: string) => {
    let absolutePath: string;

    try {
      absolutePath = require.resolve(pathInput, {
        paths: [projectBaseDir],
      });
    } catch {
      absolutePath = isAbsolute(pathInput)
        ? pathInput
        : join(projectBaseDir, pathInput);
    }

    try {
      const stats = statSync(absolutePath);
      if (stats.isFile()) {
        return dirname(absolutePath);
      }
    } catch {
      if (/\.[a-z0-9]+$/i.test(absolutePath)) {
        return dirname(absolutePath);
      }
    }

    return absolutePath;
  };

  const dictionariesDir = optionalJoinBaseDir(
    customConfiguration?.dictionariesDir ?? DICTIONARIES_DIR
  );

  return {
    moduleAugmentationDir: optionalJoinBaseDir(
      customConfiguration?.moduleAugmentationDir ?? MODULE_AUGMENTATION_DIR
    ),
    unmergedDictionariesDir: optionalJoinBaseDir(
      customConfiguration?.unmergedDictionariesDir ?? UNMERGED_DICTIONARIES_DIR
    ),
    remoteDictionariesDir: optionalJoinBaseDir(
      customConfiguration?.remoteDictionariesDir ?? REMOTE_DICTIONARIES_DIR
    ),
    dictionariesDir,
    dynamicDictionariesDir: optionalJoinBaseDir(
      customConfiguration?.dynamicDictionariesDir ?? DYNAMIC_DICTIONARIES_DIR
    ),
    fetchDictionariesDir: optionalJoinBaseDir(
      customConfiguration?.fetchDictionariesDir ?? FETCH_DICTIONARIES_DIR
    ),
    typesDir: optionalJoinBaseDir(customConfiguration?.typesDir ?? TYPES_DIR),
    mainDir: optionalJoinBaseDir(customConfiguration?.mainDir ?? MAIN_DIR),
    configDir: optionalJoinBaseDir(
      customConfiguration?.configDir ?? CONFIG_DIR
    ),
    cacheDir: optionalJoinBaseDir(customConfiguration?.cacheDir ?? CACHE_DIR),
    outputFilesPatternWithPath: `${normalizePath(dictionariesDir)}/**/*.json`,
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
   * To get an access token, go to https://app.intlayer.org/project and create an account.
   *
   * Default: undefined
   *
   * > Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.
   */
  clientId: customConfiguration?.clientId ?? undefined,

  /**
   * clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication.
   * An access token is use to authenticate the user related to the project.
   * To get an access token, go to https://app.intlayer.org/project and create an account.
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
   *
   * Default: undefined
   *
   * The application context.
   *
   * Example: `'My application context'`
   *
   * Note: Can be used to provide additional context about the application to the AI model. You can add more rules (e.g. "You should not transform urls").
   */
  applicationContext: customConfiguration?.applicationContext,

  /**
   * Base URL for the AI API
   *
   * Default: undefined
   *
   * The base URL for the AI API.
   *
   * Example: `'http://localhost:5000'`
   *
   * Note: Can be used to point to a local, or custom AI API endpoint.
   */
  baseURL: customConfiguration?.baseURL,
});

const buildBuildFields = (
  customConfiguration?: Partial<BuildConfig>
): BuildConfig => ({
  /**
   * Indicates the mode of the build
   *
   * Default: 'auto'
   *
   * If 'auto', the build will be enabled automatically when the application is built.
   * If 'manual', the build will be set only when the build command is executed.
   *
   * Can be used to disable dictionaries build, for instance when execution on Node.js environment should be avoided.
   */
  mode: customConfiguration?.mode ?? BUILD_MODE,

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
  optimize: customConfiguration?.optimize,

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
   *
   * @deprecated Use `dictionary.importMode` instead.
   */
  importMode: customConfiguration?.importMode ?? IMPORT_MODE,

  /**
   * Pattern to traverse the code to optimize.
   *
   * Allows to avoid to traverse the code that is not relevant to the optimization.
   * Improve build performance.
   *
   * Default: ['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']
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
  require: customConfiguration?.require,
});

const buildCompilerFields = (
  customConfiguration?: Partial<CompilerConfig>
): CompilerConfig => ({
  /**
   * Indicates if the compiler should be enabled
   */
  enabled: customConfiguration?.enabled ?? COMPILER_ENABLED,

  /**
   * Pattern to traverse the code to optimize.
   */
  transformPattern:
    customConfiguration?.transformPattern ?? COMPILER_TRANSFORM_PATTERN,

  /**
   * Pattern to exclude from the optimization.
   */
  excludePattern:
    customConfiguration?.excludePattern ?? COMPILER_EXCLUDE_PATTERN,

  /**
   * Output directory for the optimized dictionaries.
   */
  outputDir: customConfiguration?.outputDir ?? COMPILER_OUTPUT_DIR,
});

const buildDictionaryFields = (
  customConfiguration?: Partial<DictionaryConfig>
): DictionaryConfig => {
  const contentAutoTransformation =
    customConfiguration?.contentAutoTransformation ??
    CONTENT_AUTO_TRANSFORMATION;

  return {
    /**
     * Indicate how the dictionary should be filled using AI.
     *
     * Default: true
     */
    fill: customConfiguration?.fill ?? FILL,

    /**
     * Indicates if the content of the dictionary should be automatically transformed.
     *
     * Default: false
     */
    contentAutoTransformation:
      typeof contentAutoTransformation === 'object'
        ? {
            markdown: contentAutoTransformation.markdown ?? false,
            html: contentAutoTransformation.html ?? false,
            insertion: contentAutoTransformation.insertion ?? false,
          }
        : contentAutoTransformation,

    /**
     * The location of the dictionary.
     *
     * Default: 'local'
     */
    location: customConfiguration?.location ?? LOCATION,

    /**
     * Transform the dictionary in a per-locale dictionary.
     * Each field declared in a per-locale dictionary will be transformed in a translation node.
     * If missing, the dictionary will be treated as a multilingual dictionary.
     */
    locale: customConfiguration?.locale,

    /**
     * The title of the dictionary.
     */
    title: customConfiguration?.title,

    /**
     * The description of the dictionary.
     */
    description: customConfiguration?.description,

    /**
     * Tags to categorize the dictionaries.
     */
    tags: customConfiguration?.tags,

    /**
     * The priority of the dictionary.
     */
    priority: customConfiguration?.priority,

    /**
     * Indicates the mode of import to use for the dictionary.
     *
     * Available modes:
     * - "static": The dictionaries are imported statically.
     * - "dynamic": The dictionaries are imported dynamically in a synchronous component using the suspense API.
     * - "live": The dictionaries are imported dynamically using the live sync API.
     *
     * Default: 'static'
     */
    importMode: customConfiguration?.importMode ?? IMPORT_MODE,

    /**
     * The version of the dictionary.
     */
    version: customConfiguration?.version,
  };
};

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
    baseDir,
    logFunctions
  );

  const systemConfig = buildSystemFields(
    customConfiguration?.system,
    contentConfig
  );

  const editorConfig = buildEditorFields(customConfiguration?.editor);

  const logConfig = buildLogFields(customConfiguration?.log, logFunctions);

  const aiConfig = buildAiFields(customConfiguration?.ai);

  const buildConfig = buildBuildFields(customConfiguration?.build);

  const compilerConfig = buildCompilerFields(customConfiguration?.compiler);

  const dictionaryConfig = buildDictionaryFields(
    customConfiguration?.dictionary
  );

  storedConfiguration = {
    internationalization: internationalizationConfig,
    routing: routingConfig,
    content: contentConfig,
    system: systemConfig,
    editor: editorConfig,
    log: logConfig,
    ai: aiConfig,
    build: buildConfig,
    compiler: compilerConfig,
    dictionary: dictionaryConfig,
    plugins: customConfiguration?.plugins,
    schemas: customConfiguration?.schemas,
    metadata: {
      name: 'Intlayer',
      version: packageJson.version,
      doc: `https://intlayer.org/docs`,
    },
  } as IntlayerConfig;

  return storedConfiguration;
};
