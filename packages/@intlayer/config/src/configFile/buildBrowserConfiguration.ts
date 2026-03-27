import type {
  CustomIntlayerConfig,
  CustomRoutingConfig,
  EditorConfig,
  InternationalizationConfig,
  IntlayerConfig,
  LogConfig,
  LogFunctions,
  RoutingConfig,
} from '@intlayer/types/config';
import packageJson from '@intlayer/types/package.json' with { type: 'json' };
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
import { getStorageAttributes } from '../utils/getStorageAttributes';

// ---------------------------------------------------------------------------
// Type
// ---------------------------------------------------------------------------

/**
 * Browser-safe subset of {@link IntlayerConfig}.
 *
 * Excludes server-only fields (`system`, `content`, `build`, `compiler`,
 * `dictionary`, `ai`) and sensitive editor credentials (`clientId`,
 * `clientSecret`) that must never be shipped to the browser.
 */
export type BrowserIntlayerConfig = {
  internationalization: Pick<
    InternationalizationConfig,
    'locales' | 'defaultLocale'
  >;
  routing: RoutingConfig;
  editor: Omit<EditorConfig, 'clientId' | 'clientSecret'>;
  log: Pick<LogConfig, 'mode' | 'prefix'>;
  metadata: IntlayerConfig['metadata'];
};

declare global {
  interface Window {
    /** Browser-safe Intlayer configuration injected by a build plugin or `installIntlayer`. */
    INTLAYER_CONFIG?: BrowserIntlayerConfig;
  }
}

// ---------------------------------------------------------------------------
// Shared field builders (browser-safe — no Node.js APIs)
//
// These functions are re-used by both `buildBrowserConfiguration` (browser)
// and `buildConfigurationFields` (server) to avoid duplication.
// ---------------------------------------------------------------------------

/**
 * Build the internationalization section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied internationalization config.
 * @returns A fully-defaulted {@link InternationalizationConfig}.
 */
export const buildInternationalizationFields = (
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

/**
 * Build the routing section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied routing config.
 * @returns A fully-defaulted {@link RoutingConfig}.
 */
export const buildRoutingFields = (
  customConfiguration?: Partial<CustomRoutingConfig>
): RoutingConfig => {
  const storage = customConfiguration?.storage ?? STORAGE;

  return {
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
    storage: getStorageAttributes(storage),

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
  };
};

/**
 * Build the editor section of the Intlayer configuration.
 *
 * Returns the **full** {@link EditorConfig} including sensitive fields
 * (`clientId`, `clientSecret`). The browser-safe {@link BrowserIntlayerConfig}
 * omits those fields when exposing config to the client.
 *
 * @param customConfiguration - Partial user-supplied editor config.
 * @returns A fully-defaulted {@link EditorConfig}.
 */
export const buildEditorFields = (
  customConfiguration?: Partial<EditorConfig>
): EditorConfig => {
  const liveSyncPort = customConfiguration?.liveSyncPort ?? LIVE_SYNC_PORT;
  return {
    /**
     * URL of the application. Used to restrict the origin of the editor for security reasons.
     *
     * > '*' means that the editor is accessible from any origin
     *
     * Default: '*'
     */
    applicationURL: customConfiguration?.applicationURL || APPLICATION_URL,

    /**
     * URL of the editor server. Used to restrict the origin of the editor for security reasons.
     *
     * > '*' means that the editor is accessible from any origin
     *
     * Default: '*'
     */
    editorURL: customConfiguration?.editorURL || EDITOR_URL,

    /**
     * URL of the CMS server. Used to restrict the origin of the editor for security reasons.
     */
    cmsURL: customConfiguration?.cmsURL || CMS_URL,

    /**
     * URL of the editor server
     *
     * Default: 'https://back.intlayer.org'
     */
    backendURL: customConfiguration?.backendURL || BACKEND_URL,

    /** Port of the editor server
     *
     * Default: 8000
     */
    port: customConfiguration?.port ?? PORT,

    /**
     * Indicates if the application interact with the visual editor
     *
     * Default: false;
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
    liveSyncPort,

    /**
     * URL of the live sync server in case of remote live sync server
     *
     * Default: `http://localhost:${LIVE_SYNC_PORT}`
     */
    liveSyncURL:
      customConfiguration?.liveSyncURL ?? `http://localhost:${liveSyncPort}`,
  };
};

/**
 * Build the log section of the Intlayer configuration.
 *
 * @param customConfiguration - Partial user-supplied log config.
 * @param logFunctions - Optional custom log function overrides (server-only).
 * @returns A fully-defaulted {@link LogConfig}.
 */
export const buildLogFields = (
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

// ---------------------------------------------------------------------------
// Browser configuration builders
// ---------------------------------------------------------------------------

/**
 * Build a browser-safe {@link BrowserIntlayerConfig} from a raw user config.
 *
 * Applies defaults for every field and strips all server-only or sensitive
 * information (`system`, `content`, `build`, `compiler`, `dictionary`, `ai`,
 * `editor.clientId`, `editor.clientSecret`).
 *
 * This is the browser counterpart of `buildConfigurationFields`. It is safe
 * to call in browser environments because it has no Node.js dependencies.
 *
 * @param customConfig - Optional partial user-supplied Intlayer config.
 * @returns A browser-safe configuration object ready for `window.INTLAYER_CONFIG`.
 *
 * @example
 * ```ts
 * import { buildBrowserConfiguration } from '@intlayer/config/client';
 *
 * window.INTLAYER_CONFIG = buildBrowserConfiguration({
 *   internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
 * });
 * ```
 */
export const buildBrowserConfiguration = (
  customConfig?: CustomIntlayerConfig
): BrowserIntlayerConfig => {
  const { locales, defaultLocale } = buildInternationalizationFields(
    customConfig?.internationalization
  );
  const routing = buildRoutingFields(customConfig?.routing);
  const {
    clientId: _clientId,
    clientSecret: _clientSecret,
    ...editorPublic
  } = buildEditorFields(customConfig?.editor);
  const { mode, prefix } = buildLogFields(customConfig?.log);

  return {
    internationalization: { locales, defaultLocale },
    routing,
    editor: editorPublic,
    log: { mode, prefix },
    metadata: {
      name: 'Intlayer',
      version: packageJson.version,
      doc: 'https://intlayer.org/docs',
    },
  };
};

/**
 * Extract a {@link BrowserIntlayerConfig} from an already-built full
 * {@link IntlayerConfig}.
 *
 * Used by build plugins (`vite-intlayer`, `withIntlayer`) which already hold
 * the full server-side config and need to inject the browser-safe subset at
 * compile time via a bundler `define`.
 *
 * @param config - A fully-built server-side Intlayer configuration.
 * @returns The browser-safe subset of that configuration.
 */
export const extractBrowserConfiguration = (
  config: IntlayerConfig
): BrowserIntlayerConfig => ({
  internationalization: {
    locales: config.internationalization.locales,
    defaultLocale: config.internationalization.defaultLocale,
  },
  routing: {
    mode: config.routing.mode,
    storage: config.routing.storage,
    basePath: config.routing.basePath,
    rewrite: config.routing.rewrite,
  },
  editor: {
    applicationURL: config.editor.applicationURL,
    editorURL: config.editor.editorURL,
    cmsURL: config.editor.cmsURL,
    backendURL: config.editor.backendURL,
    port: config.editor.port,
    enabled: config.editor.enabled,
    dictionaryPriorityStrategy: config.editor.dictionaryPriorityStrategy,
    liveSync: config.editor.liveSync,
    liveSyncPort: config.editor.liveSyncPort,
    liveSyncURL: config.editor.liveSyncURL,
  },
  log: {
    mode: config.log.mode,
    prefix: config.log.prefix,
  },
  metadata: config.metadata,
});
