import { statSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import type {
  AiConfig,
  BuildConfig,
  CompilerConfig,
  ContentConfig,
  CustomIntlayerConfig,
  DictionaryConfig,
  IntlayerConfig,
  LogFunctions,
  SystemConfig,
} from '@intlayer/types/config';
import {
  BUILD_MODE,
  CACHE,
  OUTPUT_FORMAT,
  TRAVERSE_PATTERN,
  TYPE_CHECKING,
} from '../defaultValues/build';
import {
  COMPILER_DICTIONARY_KEY_PREFIX,
  COMPILER_ENABLED,
  COMPILER_NO_METADATA,
  COMPILER_SAVE_COMPONENTS,
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
  CACHE_DIR,
  CONFIG_DIR,
  DICTIONARIES_DIR,
  DYNAMIC_DICTIONARIES_DIR,
  FETCH_DICTIONARIES_DIR,
  MAIN_DIR,
  MODULE_AUGMENTATION_DIR,
  REMOTE_DICTIONARIES_DIR,
  TEMP_DIR,
  TYPES_DIR,
  UNMERGED_DICTIONARIES_DIR,
} from '../defaultValues/system';
import { getProjectRequire } from '../utils';
import {
  buildBrowserConfiguration,
  buildEditorFields,
  buildInternationalizationFields,
  buildLogFields,
} from './buildBrowserConfiguration';
import { intlayerConfigSchema } from './configurationSchema';

export {
  type BrowserIntlayerConfig,
  buildBrowserConfiguration,
  buildEditorFields,
  buildInternationalizationFields,
  buildLogFields,
  buildRoutingFields,
  extractBrowserConfiguration,
} from './buildBrowserConfiguration';

let storedConfiguration: IntlayerConfig;

// ---------------------------------------------------------------------------
// Server-only field builders (Node.js — not browser-safe)
// ---------------------------------------------------------------------------

/**
 * Build the `system` section of the Intlayer configuration.
 *
 * Resolves all directory paths (dictionaries, types, cache, …) relative to
 * the project base directory, using Node.js `require.resolve` where available
 * and falling back to `path.join` otherwise.
 *
 * @param baseDir - Project root directory. Defaults to `process.cwd()`.
 * @param customConfiguration - Partial user-supplied system config.
 * @returns A fully-resolved {@link SystemConfig}.
 */
const buildSystemFields = (
  baseDir?: string,
  customConfiguration?: Partial<SystemConfig>
): SystemConfig => {
  const projectBaseDir = baseDir ?? process.cwd();

  const optionalJoinBaseDir = (pathInput: string) => {
    let absolutePath: string;

    try {
      const requireFunction = getProjectRequire(projectBaseDir);
      absolutePath = requireFunction.resolve(pathInput, {
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
    baseDir: projectBaseDir,
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
    tempDir: optionalJoinBaseDir(customConfiguration?.tempDir ?? TEMP_DIR),
  };
};

/**
 * Build the `content` section of the Intlayer configuration.
 *
 * Resolves content and code directories relative to the project base using
 * `require.resolve`, falling back to `path.join`.
 *
 * @param systemConfig - Already-built system configuration (provides `baseDir`).
 * @param customConfiguration - Partial user-supplied content config.
 * @returns A fully-resolved {@link ContentConfig}.
 */
const buildContentFields = (
  systemConfig: SystemConfig,
  customConfiguration?: Partial<ContentConfig>
): ContentConfig => {
  const fileExtensions = customConfiguration?.fileExtensions ?? FILE_EXTENSIONS;

  const optionalJoinBaseDir = (pathInput: string) => {
    let absolutePath: string;

    try {
      const requireFunction = getProjectRequire(systemConfig.baseDir);
      absolutePath = requireFunction.resolve(pathInput, {
        paths: [systemConfig.baseDir],
      });
    } catch {
      try {
        absolutePath = require.resolve(pathInput, {
          paths: [systemConfig.baseDir],
        });
      } catch {
        absolutePath = isAbsolute(pathInput)
          ? pathInput
          : join(systemConfig.baseDir, pathInput);
      }
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

  const contentDir = (customConfiguration?.contentDir ?? CONTENT_DIR).map(
    optionalJoinBaseDir
  );
  const codeDir = (customConfiguration?.codeDir ?? CODE_DIR).map(
    optionalJoinBaseDir
  );

  return {
    fileExtensions,
    contentDir,
    codeDir,
    excludedPath: customConfiguration?.excludedPath ?? EXCLUDED_PATHS,
    watch: customConfiguration?.watch ?? WATCH,
    formatCommand: customConfiguration?.formatCommand,
  };
};

/**
 * Build the `ai` section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied AI config.
 * @returns A fully-defaulted {@link AiConfig}.
 */
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

  /**
   * Data serialization
   *
   * Options:
   * - "json": The industry standard. Highly reliable and structured, but consumes more tokens.
   * - "toon": An optimized format designed to reduce token consumption (cost-effective). However, it may slightly increase the risk of output inconsistency compared to standard JSON
   *
   * Default: `"json"`
   */
  dataSerialization: customConfiguration?.dataSerialization,
});

/**
 * Build the `build` section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied build config.
 * @returns A fully-defaulted {@link BuildConfig}.
 */
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
  importMode: customConfiguration?.importMode,

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

  /**
   * Indicates if the build should check TypeScript types
   *
   * Default: `false`
   *
   * If true, the build will check TypeScript types and log errors.
   * Note: This can slow down the build.
   */
  checkTypes: customConfiguration?.checkTypes ?? TYPE_CHECKING,
});

/**
 * Build the `compiler` section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied compiler config.
 * @returns A fully-defaulted {@link CompilerConfig}.
 */
const buildCompilerFields = (
  customConfiguration?: Partial<CompilerConfig>
): CompilerConfig => ({
  /**
   * Indicates if the compiler should be enabled
   */
  enabled: customConfiguration?.enabled ?? COMPILER_ENABLED,

  /**
   * Prefix for the extracted dictionary keys
   */
  dictionaryKeyPrefix:
    customConfiguration?.dictionaryKeyPrefix ?? COMPILER_DICTIONARY_KEY_PREFIX,

  /**
   * Pattern to traverse the code to optimize.
   *
   * @deprecated use `build.traversePattern` instead
   */
  transformPattern: customConfiguration?.transformPattern,

  /**
   * Pattern to exclude from the optimization.
   *
   * @deprecated use `build.traversePattern` instead
   */
  excludePattern: customConfiguration?.excludePattern,

  /**
   * Defines the output files path. Replaces `outputDir`.
   *
   * - `./` paths are resolved relative to the component directory.
   * - `/` paths are resolved relative to the project root (`baseDir`).
   *
   * - Including the `{{locale}}` variable in the path will trigger the generation of separate dictionaries per locale.
   *
   * @example:
   * ```ts
   * {
   *   // Create Multilingual .content.ts files close to the component
   *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
   *
   *   // output: './{{fileName}}{{extension}}', // Equivalent using template string
   * }
   * ```
   *
   * ```ts
   * {
   *   // Create centralize per-locale JSON at the root of the project
   *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
   *
   *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalent using template string
   * }
   * ```
   *
   * ```ts
   * {
   *   // Create per-locale JSON files with locale-specific output paths
   *   output: {
   *     en: ({ fileName, locale }) => `${fileName}.${locale}.content.json`,
   *     fr: '{{fileName}}.{{locale}}.content.json',
   *     es: false, // skip this locale
   *   },
   * }
   * ```
   *
   * Variable list:
   *   - `fileName`: The name of the file.
   *   - `key`: The key of the content.
   *   - `locale`: The locale of the content.
   *   - `extension`: The extension of the file.
   *   - `componentFileName`: The name of the component file.
   *   - `componentExtension`: The extension of the component file.
   *   - `format`: The format of the dictionary.
   *   - `componentFormat`: The format of the component dictionary.
   *   - `componentDirPath`: The directory path of the component.
   */
  output: customConfiguration?.output,

  /**
   * Indicates if the metadata should be saved in the file.
   *
   * If true, the compiler will not save the metadata of the dictionaries.
   *
   * If `true`:
   *
   * ```json
   * {
   *   "key": "value"
   * }
   * ```
   *
   * If `false`:
   *
   * ```json
   * {
   *   "key": "value",
   *   "content": {
   *      "key": "value"
   *   }
   * }
   * ```
   *
   * Default: `false`
   *
   * Note: Useful if used with loadJSON plugin
   */
  noMetadata: customConfiguration?.noMetadata ?? COMPILER_NO_METADATA,

  /**
   * Indicates if the components should be saved after being transformed.
   */
  saveComponents:
    customConfiguration?.saveComponents ?? COMPILER_SAVE_COMPONENTS,
});

/**
 * Build the `dictionary` section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied dictionary config.
 * @returns A fully-defaulted {@link DictionaryConfig}.
 */
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
     * Default: `true`
     *
     * - If `true`, will consider the `compiler.output` field.
     * - If `false`, will skip the fill process.
     *
     * - `./` paths are resolved relative to the component directory.
     * - `/` paths are resolved relative to the project root (`baseDir`).
     *
     * - If includes `{{locale}}` variable in the path, will trigger the generation of separate dictionaries per locale.
     *
     * Example:
     * ```ts
     * {
     *   // Create Multilingual .content.ts files close to the component
     *   fill: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // fill: './{{fileName}}{{extension}}', // Equivalent using template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Create centralize per-locale JSON at the root of the project
     *   fill: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // fill: '/locales/{{locale}}/{{key}}.content.json', // Equivalent using template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Create custom output based on the locale
     *   fill: {
     *     en: ({ key }) => `/locales/en/${key}.content.json`,
     *     fr: '/locales/fr/{{key}}.content.json',
     *     es: false,
     *     de: true,
     *   },
     * }
     * ```
     *
     *
     * Variable list:
     *   - `fileName`: The name of the file.
     *   - `key`: The key of the content.
     *   - `locale`: The locale of the content.
     *   - `extension`: The extension of the file.
     *   - `componentFileName`: The name of the component file.
     *   - `componentExtension`: The extension of the component file.
     *   - `format`: The format of the dictionary.
     *   - `componentFormat`: The format of the component dictionary.
     *   - `componentDirPath`: The directory path of the component.
     */
    fill: customConfiguration?.fill ?? FILL,

    /**
     * Indicates if the content of the dictionary should be automatically transformed.
     *
     * Default: `false`
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
     * Default: `"local"`
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
     * Default: `"static"`
     */
    importMode: customConfiguration?.importMode ?? IMPORT_MODE,
  };
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Build the complete Intlayer configuration by merging user-supplied values
 * with defaults.
 *
 * Internally this function:
 * 1. Calls {@link buildBrowserConfiguration} to produce the browser-safe
 *    subset (internationalization, routing, editor public fields, log, metadata).
 * 2. Extends the result with full server-side fields:
 *    - `internationalization` — adds `requiredLocales` and `strictMode`.
 *    - `editor` — adds `clientId` and `clientSecret`.
 *    - `log` — adds custom log functions.
 *    - `system`, `content`, `ai`, `build`, `compiler`, `dictionary`.
 *
 * @param customConfiguration - Optional user-supplied configuration object.
 * @param baseDir - Project root directory. Defaults to `process.cwd()`.
 * @param logFunctions - Optional custom logging functions.
 * @returns A fully-built {@link IntlayerConfig}.
 */
export const buildConfigurationFields = (
  customConfiguration?: CustomIntlayerConfig,
  baseDir?: string,
  logFunctions?: LogFunctions
): IntlayerConfig => {
  if (customConfiguration) {
    const result = intlayerConfigSchema.safeParse(customConfiguration);
    if (!result.success) {
      const logError = logFunctions?.error ?? console.error;
      for (const issue of result.error.issues) {
        logError(`${issue.path.join('.')}: ${issue.message}`);
      }
    }
  }

  // build browser-safe config (shared defaults, no Node.js deps)
  const browserConfig = buildBrowserConfiguration(customConfiguration);

  // extend shared fields with server-only additions
  const internationalizationConfig = buildInternationalizationFields(
    customConfiguration?.internationalization
  );

  const editorConfig = buildEditorFields(customConfiguration?.editor);

  const logConfig = buildLogFields(customConfiguration?.log, logFunctions);

  // build server-only fields
  const systemConfig = buildSystemFields(baseDir, customConfiguration?.system);

  const contentConfig = buildContentFields(
    systemConfig,
    customConfiguration?.content
  );

  storedConfiguration = {
    // Shared browser fields
    routing: browserConfig.routing,
    metadata: browserConfig.metadata,
    // Full (extended) shared fields
    internationalization: internationalizationConfig,
    editor: editorConfig,
    log: logConfig,
    // Server-only fields
    system: systemConfig,
    content: contentConfig,
    ai: buildAiFields(customConfiguration?.ai),
    build: buildBuildFields(customConfiguration?.build),
    compiler: buildCompilerFields(customConfiguration?.compiler),
    dictionary: buildDictionaryFields(customConfiguration?.dictionary),
    plugins: customConfiguration?.plugins,
    schemas: customConfiguration?.schemas,
  } as IntlayerConfig;

  return storedConfiguration;
};
