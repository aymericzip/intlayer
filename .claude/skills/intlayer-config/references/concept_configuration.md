---
createdAt: 2024-08-13
updatedAt: 2026-08-29
title: Configuration
description: Learn how to configure Intlayer for your application. Understand the various settings and options available to customize Intlayer to your needs.
keywords:
  - Configuration
  - Settings
  - Customization
  - Intlayer
  - Options
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Enable analytics by default — active as soon as `@intlayer/analytics` is installed"
  - version: 9.1.3
    date: 2026-08-06
    changes: "Make `routing.enableProxy` tri-state: unset (auto), `true`, `false`"
  - version: 9.0.0
    date: 2026-07-11
    changes: "Add `analytics` configuration"
  - version: 9.0.0
    date: 2026-06-24
    changes: "Add `enableProxy` option to the routing configuration"
  - version: 8.10.0
    date: 2026-06-17
    changes: "Add `format` option to the dictionary configuration"
  - version: 8.9.4
    date: 2026-05-12
    changes: "Add support for LM Studio provider"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Add `prune` and `minify` options to the build configuration"
  - version: 8.7.0
    date: 2026-04-03
    changes: "Add `currentDomain` option"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Add object per-locale notation for 'compiler.output' and 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Move 'baseDir' from 'content' to 'system' config"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add 'output' and 'noMetadata' support"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Update compiler options"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Add compiler option 'build-only', and dictionary prefix"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Add support for Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, and Together.ai providers"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Add `dataSerialization` to the AI configuration"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Rename `live` import mode to `fetch` to better describe the underlying mechanism."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Move `importMode` build configuration to `dictionary` configuration."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Add `rewrite` option to the routing configuration"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Separate system configuration from content configuration. Move internal paths to `system` property. Add `codeDir` to separate content files from code transformation."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Add `location` and `schema` dictionary options"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Add support for JSON5 and JSONC file formats"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Add `buildMode` option"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Add `dictionary` configuration"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Replace `middleware` by `routing` configuration"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Add `formatCommand` option"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Update `excludedPath` option"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Add `outputFormat` option"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Remove `dictionaryOutput` field and `i18nextResourcesDir` field"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Add `live` import mode"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Replace `hotReload` field by `liveSync` and add `liveSyncPort` and `liveSyncURL` fields"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Replace `activateDynamicImport` with `importMode` option"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Change default contentDir from `['src']` to `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Add `docs` commands"
author: aymericzip
---

# Intlayer Configuration Documentation

## Overview

Intlayer configuration files allow customization of various aspects of the plugin, such as internationalization, middleware, and content handling. This document provides a detailed description of each property in the configuration.

## Table of Contents

<TOC/>

## Configuration File Support

Intlayer accepts JSON, JS, MJS, and TS configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

## Example config file

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { syncJSON } from "@intlayer/sync-json-plugin";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalization settings.
   */
  internationalization: {
    /**
     * List of supported locales in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of required locales that must be defined in every dictionary.
     * If empty, all locales are required in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strictness level for internationalized content.
     * - "strict": Errors if any declared locale is missing or undeclared.
     * - "inclusive": Warnings if a declared locale is missing.
     * - "loose": Accepts any existing locale.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Default locale used as a fallback if the requested locale is not found.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Settings that control dictionary operations and fallback behavior.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy for auto-filling missing translations using AI.
     * Can be a boolean or a path pattern to store filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of the dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or a custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether to automatically transform content (e.g., Markdown to HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing and middleware configuration.
   */
  routing: {
    /**
     * Locale routing strategy.
     * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in the URL.
     * - "search-params": Use ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Enables the Intlayer locale-routing proxy (middleware).
     * The build-tool integration (e.g. the `intlayer()` Vite plugin) wires the
     * locale detection / redirect / rewrite middleware in development, preview
     * and production SSR.
     * - unset (auto): the proxy runs, but development and preview servers keep
     *   locale routing URL-driven by ignoring the locale stored in cookies and
     *   headers. Locale prefixes still resolve, the locale is still persisted,
     *   and Accept-Language detection still applies. Production behaves like `true`.
     * - true: full behaviour in every environment, storage-driven redirects included.
     * - false: no locale routing. On Next.js, the `intlayerProxy` middleware
     *   becomes a pass-through.
     * Default: undefined (auto)
     */
    enableProxy: undefined,

    /**
     * Where to store the user's selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * Maps locales to domain hostnames for domain-based routing.
     * URLs for these locales will be absolute (e.g., https://intlayer.cn/).
     * The domain implies the locale, so no locale prefix is added to the path.
     * Default: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Settings for finding and processing content files.
   */
  content: {
    /**
     * File extensions to scan for dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Directories where source code is located.
     * Used for build optimization and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns to exclude from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to watch for changes and rebuild dictionaries in development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command to format newly created <br/> updated .content files.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor configuration.
   */
  editor: {
    /**
     * Whether the visual editor is enabled.
     * Default: false
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port for the local editor server.
     * Default: 8000
     */
    port: 8000,

    /**
     * Public URL for the editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Whether to enable real-time content synchronization.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * Analytics configuration.
   */
  analytics: {
    /**
     * Whether analytics collection is enabled (page views, content exposures, A/B events).
     * Requires `@intlayer/analytics` to be installed, and `editor.clientId` to be set for attribution.
     * Default: true
     */
    enabled: true,

    /**
     * Milliseconds between automatic batched flushes to the backend.
     * Default: 20000
     */
    flushInterval: 20000,

    /**
     * Fraction of sessions to record, from 0 (none) to 1 (all).
     * Default: 1
     */
    sampleRate: 1,
  },

  /**
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai', 'lmstudio', 'moonshotai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model to use from the selected provider.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide the AI in generating translations.
     */
    applicationContext: "This is a travel booking application.",

    /**
     * Base URL for the AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Data serialization
     *
     * Options:
     * - "json": Standard, reliable; uses more tokens.
     * - "toon": Fewer tokens, less consistent than JSON.
     *
     * Default: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build and optimization settings.
   */
  build: {
    /**
     * Preparation of .intlayer folder before building.
     * By default it try to prepare the intlayer content before the app build, but it can also be triggered manually by running the command `intlayer build`..
     * - "auto": Automatic build during app build.
     * - "manual": Requires explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimize the final bundle by pruning unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Minify the dictionaries to reduce the bundle size.
     * Default: false
     *
     * Note:
     * - This option will be ignored if `optimize` is disabled.
     * - This option will be ignored if `editor.enabled` is true.
     */
    minify: false,

    /**
     * Purge the unused keys in a dictionaries.
     * Default: false
     *
     * Note:
     * - This option will be ignored if `optimize` is disabled.
     */
    purge: false,

    /**
     * Group the per-locale dictionary chunks by the code-split boundary that uses
     * them, so a lazily loaded page fetches its content in one request.
     * Default: true
     *
     * Note:
     * - Only applies to dictionaries using `importMode: 'dynamic'`.
     */
    chunkGrouping: true,

    /**
     * Load a dictionary together with the chunk that uses it, instead of fetching
     * it once that chunk renders. Readers render synchronously instead of
     * suspending, so navigating no longer flashes a loading state.
     * Default: true
     *
     * Note:
     * - Only applies to dictionaries using `importMode: 'dynamic'`.
     * - Only the resolved locale is awaited, so a page still downloads only the
     *   language it renders.
     */
    dictionariesPreload: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indicates if the build should check TypeScript types.
     * Default: false
     */
    checkTypes: false,
  },

  /**
   * Logger configuration.
   */
  log: {
    /**
     * Logging level.
     * - "default": Standard logging.
     * - "verbose": Detailed debug logging.
     * - "disabled": No logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefix for all log messages.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * System configuration (Advanced use cases)
   */
  system: {
    /**
     * Directory for storing localization dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory for storing unmerged dictionaries.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory for storing dictionary types.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory where main application files are stored.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory where the configuration files are stored.
     */
    configDir: ".intlayer/config",

    /**
     * Directory where the cache files are stored.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler configuration (Advanced use cases)
   */
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     *
     * - false: Disable the compiler.
     * - true: Enable the compiler.
     * - "build-only": Skip the compiler during development and speed up start times.
     *
     * Default: false
     */
    enabled: true,

    /**
     * Defines the output files path. Replaces `outputDir`.
     *
     * - `./` paths are resolved relative to the component directory.
     * - `/` paths are resolved relative to the project root (`baseDir`).
     *
     * - Including the `{{locale}}` variable in the path will trigger the generation of separate dictionaries per locale.
     *
     * Example:
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
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indicates if the components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file in the disk. So the transformation will be permanent, and the compiler will skip the transformation for the next process. That way, the compiler can transform the app, and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. The transformation will be done only in memory.
     */
    saveComponents: false,

    /**
     * Inset only content into the generated file. Useful for per-locale i18next or ICU MessageFormat JSON outputs.
     */
    noMetadata: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "", // Add an optional prefix for the extracted dictionary keys
  },

  /**
   * Custom schemas to validate the dictionaries content.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Dictionary configuration.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     */
    importMode: "static",

    /**
     * The default message format for all dictionaries in the project.
     * - 'intlayer': Native intlayer format (default).
     * - 'icu': ICU message format (used by next-intl, react-intl, etc.).
     * - 'i18next': i18next interpolation format (used by i18next, react-i18next, next-i18next).
     * - 'vue-i18n': Vue I18n format (used by vue-i18n).
     * - 'po': GNU Gettext PO format.
     */
    format: "icu",
  },

  /**
   * Plugins configuration.
   */
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
    }),
  ],
};

export default config;
````

## Configuration Reference

The following sections describe the various configuration settings available for Intlayer.

### Internationalization Configuration

Defines settings related to internationalization, including available locales and the default locale for the application.

| Field             | Description                                                                  | Type       | Default             | Example              | Note                                                                                                                                                                                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | The list of supported locales in the application.                            | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                            |
| `requiredLocales` | The list of required locales in the application.                             | `string[]` | `[]`                | `[]`                 | • If empty, all locales are required in `strict` mode.<br/>• Ensure required locales are also defined in the `locales` field.                                                                                                                                              |
| `strictMode`      | Ensure strong implementations of internationalized content using TypeScript. | `string`   | `'inclusive'`       |                      | • If `"strict"`: the `t` function requires each declared locale to be defined - throws an error if one is missing or undeclared.<br/>• If `"inclusive"`: warns on missing locales but accepts undeclared ones that exist.<br/>• If `"loose"`: accepts any existing locale. |
| `defaultLocale`   | The default locale used as a fallback if the requested locale is not found.  | `string`   | `Locales.ENGLISH`   | `'en'`               | Used to determine the locale when none is specified in the URL, cookie, or header.                                                                                                                                                                                         |

### Editor Configuration

Defines settings related to the integrated editor, including server port and active status.

| Field                        | Description                                                                                                                                                     | Type                              | Default                             | Example                                                                                         | Note                                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | The URL of the application.                                                                                                                                     | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Used to restrict the origin of the editor for security reasons.<br/>• If set to `'*'`, the editor is accessible from any origin.                                                                                   |
| `port`                       | The port used by the visual editor server.                                                                                                                      | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                      |
| `editorURL`                  | The URL of the editor server.                                                                                                                                   | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Used to restrict the origins that can interact with the application.<br/>• If set to `'*'`, accessible from any origin.<br/>• Should be set if port is changed or editor is hosted on a different domain.          |
| `cmsURL`                     | The URL of the Intlayer CMS.                                                                                                                                    | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                      |
| `backendURL`                 | The URL of the backend server.                                                                                                                                  | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                      |
| `enabled`                    | Indicates if the application interacts with the visual editor.                                                                                                  | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • If `false`, the editor cannot interact with the application.<br/>• Disabling for specific environments enforces security.                                                                                          |
| `clientId`                   | Allows intlayer packages to authenticate with the backend using oAuth2. To get an access token, go to [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Keep secret; store in environment variables.                                                                                                                                                                         |
| `clientSecret`               | Allows intlayer packages to authenticate with the backend using oAuth2. To get an access token, go to [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Keep secret; store in environment variables.                                                                                                                                                                         |
| `dictionaryPriorityStrategy` | Strategy to prioritize dictionaries when both local and distant are present.                                                                                    | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: prioritizes distant over local.<br/>• `'local_first'`: prioritizes local over distant.                                                                                                          |
| `liveSync`                   | Indicates if the app server should hot reload content when a change is detected on the CMS <br/> Visual Editor <br/> Backend.                                   | `boolean`                         | `true`                              | `true`                                                                                          | • When a dictionary is added/updated, the app updates page content.<br/>• Live sync externalizes content to another server, which may slightly impact performance.<br/>• Recommend hosting both on the same machine. |
| `liveSyncPort`               | The port of the live sync server.                                                                                                                               | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                      |
| `liveSyncURL`                | The URL of the live sync server.                                                                                                                                | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Points to localhost by default; can be changed for a remote live sync server.                                                                                                                                        |

### Analytics Configuration

Defines settings related to Intlayer analytics: collecting which content is actually shown to users (page views, content exposures) and powering content A/B testing.

Analytics is opt-out: it is enabled by default, and starts collecting as soon as the [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/analytics.md) package is installed **and** a project key (`editor.clientId`) is configured for attribution. Set `analytics.enabled` to `false` — or leave the package uninstalled — and the whole analytics integration is dead-code-eliminated from your application bundle.

| Field           | Description                                                               | Type      | Default | Example | Note                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------- | --------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | Enables analytics collection (page views, content exposures, A/B events). | `boolean` | `true`  | `false` | Requires `@intlayer/analytics` to be installed and `editor.clientId` to be set for attribution; otherwise analytics stays disabled even if `enabled` is `true`. |
| `flushInterval` | Milliseconds between automatic batched flushes to the backend.            | `number`  | `20000` | `10000` |                                                                                                                                                                 |
| `sampleRate`    | Fraction of sessions to record, from `0` (none) to `1` (all).             | `number`  | `1`     | `0.5`   | Sampling is deterministic per session, so a recorded session reports all of its events (no partial funnels).                                                    |

### Routing Configuration

Settings that control routing behavior, including URL structure, locale storage, and middleware handling.

| Field         | Description                                                                                                                                                                  | Type                                                                                                                                                                                                         | Default                | Example                                                                                                                                                                                     | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`        | URL routing mode for locale handling.                                                                                                                                        | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) or `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale handled via other means. `'search-params'`: `/dashboard?locale=fr` | Does not impact cookie or locale storage management.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `enableProxy` | Enables the Intlayer locale-routing proxy (middleware).                                                                                                                      | `boolean` &#124; <br/> `undefined`                                                                                                                                                                           | `undefined` (auto)     | `true`                                                                                                                                                                                      | • Unset (auto): the proxy runs, but development and preview servers ignore the locale stored in cookies/headers as a redirect source. Locale prefixes still resolve (`/en` → `/`), the locale is still persisted, and `Accept-Language` detection still applies. Production behaves like `true`.<br/>• `true`: full behaviour in every environment, storage-driven redirects included.<br/>• `false`: no locale routing; handle it yourself. On Next.js, the `intlayerProxy` middleware becomes a pass-through. |
| `storage`     | Configuration for storing the locale in the client.                                                                                                                          | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                          | See Storage Options table below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `basePath`    | The base path for the application URLs.                                                                                                                                      | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                 | If app is at `https://example.com/my-app, basePath is `'/my-app'`and URLs become`https://example.com/my-app/en`.                                                                                                                                                                                                                                                                                                                                                                                                |
| `rewrite`     | Custom URL rewriting rules that override the default routing mode for specific paths. Supports `[param]` dynamic parameters.                                                 | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | See example below                                                                                                                                                                           | • Rewrite rules take precedence over `mode`.<br/>• Works with Next.js and Vite.<br/>• `getLocalizedUrl()` automatically applies matching rules.<br/>• See [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).                                                                                                                                                                                                                                          |
| `domains`     | Maps locales to domain hostnames for domain-based routing. When set, URLs for a locale use that domain as the base (absolute URL) and no locale prefix is added to the path. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                 | • Protocol defaults to `https://` when not included in the hostname.<br/>• The domain itself identifies the locale, so no `/zh/` prefix is added.<br/>• `getLocalizedUrl('/', 'zh')` returns `https://intlayer.zh/`.                                                                                                                                                                                                                                                                                            |

**`rewrite` example**:

```typescript
routing: {
  mode: "prefix-no-default", // Fallback strategy
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Storage Options

| Value              | Note                                                                                                                                                                              | Description                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `'cookie'`         | • For GDPR compliance, ensure proper user consent.<br/>• Customizable via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).       | Stores locale in cookies - accessible on both client and server side.  |
| `'localStorage'`   | • No expiration unless explicitly cleared.<br/>• Intlayer proxy cannot access it.<br/>• Customizable via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | Stores locale in the browser without expiration - client side only.    |
| `'sessionStorage'` | • Cleared when tab/window is closed.<br/>• Intlayer proxy cannot access it.<br/>• Customizable via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).     | Stores locale for the duration of the page session - client side only. |
| `'header'`         | • Useful for API calls.<br/>• Client side cannot access it.<br/>• Customizable via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                             | Stores or transmits locale via HTTP headers - server side only.        |

#### Cookie Attributes

When using cookie storage, you can configure additional cookie attributes:

| Field      | Description                                                                                                 | Type                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Cookie name. Default: `'INTLAYER_LOCALE'`                                                                   | `string`                                              |
| `domain`   | Cookie domain. Default: `undefined`                                                                         | `string`                                              |
| `path`     | Cookie path. Default: `undefined`                                                                           | `string`                                              |
| `secure`   | Require HTTPS. Default: `undefined`                                                                         | `boolean`                                             |
| `httpOnly` | HTTP-only flag. Default: `undefined`                                                                        | `boolean`                                             |
| `sameSite` | SameSite policy.                                                                                            | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | A `number` is days from creation; a `Date` (or ISO date string) is an absolute expiry. Default: `undefined` | `Date` &#124; <br/> `number` &#124; <br/> `string`    |
| `maxAge`   | Lifetime in seconds from creation. Takes precedence over `expires`. Default: `undefined`                    | `number`                                              |

#### Locale Storage Attributes

When using localStorage or sessionStorage:

| Field  | Description                                    | Type                                             |
| ------ | ---------------------------------------------- | ------------------------------------------------ |
| `type` | Storage type.                                  | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Storage key name. Default: `'INTLAYER_LOCALE'` | `string`                                         |

#### Configuration Examples

Here are some common configuration examples for the new v7 routing structure:

**Basic Configuration (Default)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**GDPR Compliant Configuration**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Search Parameters Mode**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**No Prefix Mode with Custom Storage**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Custom URL Rewriting with Dynamic Routes**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback for non-rewritten paths
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

### Content Configuration

Settings related to content handling within the application, including directory names, file extensions, and derived configurations.

| Field            | Description                                                                                          | Type       | Default                                                                                                                                                                   | Example                                                                                                                                                                               | Note                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Indicates if Intlayer should watch for changes in content declaration files to rebuild dictionaries. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                        |
| `fileExtensions` | File extensions to look for when building dictionaries.                                              | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Customizing can help avoid conflicts.                                                                                                  |
| `contentDir`     | Directory path where content definition files (`.content.*`) are stored.                             | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Used to watch for content files to rebuild dictionaries.                                                                               |
| `codeDir`        | Directory path where the code is stored, relative to the base directory.                             | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Used to watch for code files to transform (prune, optimize).<br/>• Keeping separate from `contentDir` can improve build performance. |
| `excludedPath`   | Directories excluded from content search.                                                            | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Not yet used; planned for future implementation.                                                                                       |
| `formatCommand`  | Command to format content files when Intlayer writes them locally.                                   | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` is replaced with the file path.<br/>• If not set, Intlayer auto-detects (tries prettier, biome, eslint).                  |

### System Configuration

Settings related to internal paths and output results of Intlayer. These settings are typically internal and should not need to be modified by the user.

| Field                     | Description                                                                           | Type     | Default                           | Example              | Note                                              |
| ------------------------- | ------------------------------------------------------------------------------------- | -------- | --------------------------------- | -------------------- | ------------------------------------------------- |
| `baseDir`                 | The base directory for the project.                                                   | `string` | `process.cwd()`                   | `'/path/to/project'` | Used to resolve all Intlayer-related directories. |
| `dictionariesDir`         | The directory path for storing localization dictionaries.                             | `string` | `'.intlayer/dictionary'`          |                      |                                                   |
| `moduleAugmentationDir`   | Directory for module augmentation, allowing better IDE suggestions and type checking. | `string` | `'.intlayer/types'`               | `'intlayer-types'`   | Be sure to include this in `tsconfig.json`.       |
| `unmergedDictionariesDir` | The directory for storing unmerged dictionaries.                                      | `string` | `'.intlayer/unmerged_dictionary'` |                      |                                                   |
| `typesDir`                | The directory for storing dictionary types.                                           | `string` | `'.intlayer/types'`               |                      |                                                   |
| `mainDir`                 | The directory where main application files are stored.                                | `string` | `'.intlayer/main'`                |                      |                                                   |
| `configDir`               | The directory where configuration files are stored.                                   | `string` | `'.intlayer/config'`              |                      |                                                   |
| `cacheDir`                | The directory where cache files are stored.                                           | `string` | `'.intlayer/cache'`               |                      |                                                   |

### Dictionary Configuration

Settings that control dictionary operations, including auto-fill behavior and content generation.

This dictionary configuration serves two main purposes:

1. **Default Values**: Define default values when creating content declaration files
2. **Fallback Behavior**: Provide fallback values when specific fields are not defined, allowing you to define dictionary operation behavior globally

For more information about content declaration files and how configuration values are applied, see the [Content File Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

| Field                       | Description                                                                                                                                               | Type                                                                                                            | Default        | Example                                                                                     | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Controls how auto-fill (AI translation) output files are generated.                                                                                       | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`         | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: default path (same file as source).<br/>• `false`: disable.<br/>• String/function template generates per-locale files.<br/>• Object per-locale: each locale maps to its own pattern; `false` skips that locale.<br/>• Including `{{locale}}` triggers per-locale generation.<br/>• Dictionary-level `fill` always takes priority over this global config.                                                                                                                         |
| `description`               | Helps understand the purpose of the dictionary in the editor and CMS. Also used as context for AI translation generation.                                 | `string`                                                                                                        | `undefined`    | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `locale`                    | Transforms the dictionary into a per-locale format. Each field declared becomes a translation node. If absent, the dictionary is treated as multilingual. | `LocalesValues`                                                                                                 | `undefined`    | `'en'`                                                                                      | Use this when the dictionary is specific to a single locale rather than containing translations for multiple locales.                                                                                                                                                                                                                                                                                                                                                                       |
| `contentAutoTransformation` | Automatically transforms content strings into typed nodes (markdown, HTML, or insertion).                                                                 | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`        | `true`                                                                                      | • Markdown: `### Title` → `md('### Title')`.<br/>• HTML: `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Insertion: `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                                                                                                   |
| `location`                  | Indicates where dictionary files are stored and their CMS synchronization mode.                                                                           | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`      | `'hybrid'`                                                                                  | • `'local'`: managed locally only.<br/>• `'remote'`: managed remotely only (CMS).<br/>• `'hybrid'`: managed both locally and remotely.<br/>• `'plugin'` or custom string: managed by a plugin or custom source.                                                                                                                                                                                                                                                                             |
| `importMode`                | Controls how dictionaries are imported.                                                                                                                   | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`     | `'dynamic'`                                                                                 | • `'static'`: imported statically (replaces `useIntlayer` with `useDictionary`).<br/>• `'dynamic'`: imported dynamically via Suspense (replaces with `useDictionaryDynamic`).<br/>• `'fetch'`: fetched via live sync API; falls back to `'dynamic'` on failure.<br/>• Relies on `@intlayer/babel` and `@intlayer/swc` plugins.<br/>• Keys must be declared statically.<br/>• Ignored if `optimize` is disabled.<br/>• Does not affect `getIntlayer`, `getDictionary`, `useDictionary`, etc. |
| `format`                    | The default message format for all dictionaries in the project.                                                                                           | `'intlayer'` &#124; <br/> `'icu'` &#124; <br/> `'i18next'` &#124; <br/> `'vue-i18n'` &#124; <br/> `'po'`        | `'intlayer'`   | `'icu'`                                                                                     | • `'intlayer'`: Native intlayer format.<br/>• `'icu'`: ICU message format.<br/>• `'i18next'`: i18next interpolation format.<br/>• `'vue-i18n'`: Vue I18n format.<br/>• `'po'`: GNU Gettext PO format.                                                                                                                                                                                                                                                                                       |
| `priority`                  | Priority of the dictionary. Higher values take precedence over lower ones when resolving conflicts between dictionaries.                                  | `number`                                                                                                        | `undefined`    | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `live`                      | Deprecated - use `importMode: 'fetch'` instead. Indicated whether dictionary content was fetched dynamically via the live sync API.                       | `boolean`                                                                                                       | `undefined`    |                                                                                             | Renamed to `importMode: 'fetch'` in v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `schema`                    | Auto-generated by Intlayer for JSON schema validation.                                                                                                    | `'https://intlayer.org/schema.json'`                                                                            | auto-generated |                                                                                             | Do not modify manually.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `title`                     | Helps identify the dictionary in the editor and CMS.                                                                                                      | `string`                                                                                                        | `undefined`    | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tags`                      | Categorizes dictionaries and provides context or instructions for the editor and AI.                                                                      | `string[]`                                                                                                      | `undefined`    | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `version`                   | Version of the remote dictionary; helps track which version is currently in use.                                                                          | `string`                                                                                                        | `undefined`    | `'1.0.0'`                                                                                   | • Manageable on the CMS.<br/>• Do not modify locally.                                                                                                                                                                                                                                                                                                                                                                                                                                       |

**`fill` example**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

### Logger Configuration

Settings that control the logger, including the prefix to use.

| Field    | Description                       | Type                                                           | Default         | Example                 | Note                                                                                           |
| -------- | --------------------------------- | -------------------------------------------------------------- | --------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| `mode`   | Indicates the mode of the logger. | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`             | • `'verbose'`: logs more info for debugging.<br/>• `'disabled'`: disables the logger entirely. |
| `prefix` | The prefix of the logger.         | `string`                                                       | `'[intlayer] '` | `'[my custom prefix] '` |                                                                                                |

### AI Configuration

Settings that control the AI features of Intlayer, including the provider, model, and API key.

This configuration is optional if you're registered on the [Intlayer Dashboard](https://app.intlayer.org/project) using an access key. Intlayer will automatically manage the most efficient and cost-effective AI solution for your needs. Using the default options ensures better long-term maintainability as Intlayer continuously updates to use the most relevant models.

If you prefer to use your own API key or specific model, you can define your custom AI configuration.
This AI configuration will be used globally across your Intlayer environment. CLI commands will use these settings as defaults for the commands (e.g. `fill`), as well as the SDK, Visual Editor, and CMS. You can override these default values for specific use cases using command parameters.

Intlayer supports multiple AI providers for enhanced flexibility and choice. Currently supported providers are:

- **OpenAI** (default)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**
- **LM Studio**

| Field                | Description                                                                                                                         | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default     | Example                                                       | Note                                                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | The provider to use for the AI features of Intlayer.                                                                                | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` &#124; <br/> `'lmstudio'` &#124; <br/> `'moonshotai'` | `undefined` | `'anthropic'`                                                 | Different providers require different API keys and have different pricing.                                                                                                                              |
| `model`              | The model to use for AI features.                                                                                                   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | None        | `'gpt-4o-2024-11-20'`                                         | Specific model varies by provider.                                                                                                                                                                      |
| `temperature`        | Controls the randomness of AI responses.                                                                                            | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                             | None        | `0.1`                                                         | Higher temperature = more creative and less predictable.                                                                                                                                                |
| `apiKey`             | Your API key for the selected provider.                                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | None        | `process.env.OPENAI_API_KEY`                                  | Keep secret; store in environment variables.                                                                                                                                                            |
| `applicationContext` | Additional context about your application to help the AI generate more accurate translations (domain, audience, tone, terminology). | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | None        | `'My application context'`                                    | Can be used to add rules (e.g. `"You should not transform urls"`).                                                                                                                                      |
| `baseURL`            | The base URL for the AI API.                                                                                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | None        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Can point to a local or custom AI API endpoint.                                                                                                                                                         |
| `dataSerialization`  | Data serialization format for AI features.                                                                                          | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                                                                       | `undefined` | `'toon'`                                                      | • `'json'`: standard, reliable; uses more tokens.<br/>• `'toon'`: fewer tokens, less consistent.<br/>• Additional parameters are passed to the AI model as context (reasoning effort, verbosity, etc.). |

### Build Configuration

Settings that control how Intlayer optimizes and builds your application's internationalization.

Build options apply to the `@intlayer/babel` and `@intlayer/swc` plugins.

> In development mode, Intlayer uses static imports for dictionaries to simplify the development experience.

> When optimized, Intlayer will replace dictionary calls to optimize chunking, so the final bundle only imports dictionaries that are actually used.

| Field                 | Description                                                                                                              | Type                             | Default                                                                                                                                                                           | Example                                                                       | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                | Controls the mode of the build.                                                                                          | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: build enabled automatically when the application is built.<br/>• `'manual'`: only runs when the build command is executed.<br/>• Can be used to disable dictionary builds (e.g. to avoid running in Node.js environments).                                                                                                                                                                                                                                                                                     |
| `optimize`            | Controls whether the build should be optimized.                                                                          | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • If unset, optimization is triggered on framework build (Vite/Next.js).<br/>• `true` forces optimization including dev mode.<br/>• `false` disables it.<br/>• When enabled, replaces dictionary calls to optimize chunking - only used dictionaries are imported.<br/>• Relies on `@intlayer/babel` and `@intlayer/swc` plugins.<br/>• Keys must be declared statically.                                                                                                                                                  |
| `minify`              | Whether to minify the dictionaries to reduce the bundle size.                                                            | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Indicates whether the bundle should be minified.<br/>• Default: `false`.<br/>• This option will be ignored if `optimize` is disabled.<br/>• This option will be ignored if `editor.enabled` is true.                                                                                                                                                                                                                                                                                                                     |
| `purge`               | Whether to purge the unused keys in a dictionaries.                                                                      | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Indicates whether the bundle should be purged.<br/>• Default: `false`.<br/>• This option will be ignored if `optimize` is disabled.                                                                                                                                                                                                                                                                                                                                                                                      |
| `checkTypes`          | Indicates if the build should check TypeScript types and log errors.                                                     | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Can slow down the build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `chunkGrouping`       | Whether to group the per-locale dictionary chunks by the code-split boundary that uses them.                             | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Without grouping, a page assembled from many components issues one request per dictionary.<br/>• Dictionaries reached from several boundaries move to a shared chunk, so no page ships another page's content.<br/>• Only applies to dictionaries using `importMode: 'dynamic'`.<br/>• Only applies to the client build, and only when bundling (not in dev).                                                                                                                                                            |
| `dictionariesPreload` | Whether a dictionary should load together with the chunk that uses it, instead of being fetched once that chunk renders. | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • The generated entry point requests the browsing locale as it evaluates, so the request leaves with the chunk that needs it instead of once that chunk renders.<br/>• Readers usually render synchronously instead of suspending, so navigating no longer flashes a loading state.<br/>• Only the resolved locale is requested, so a page still downloads only the language it renders.<br/>• Only applies to dictionaries using `importMode: 'dynamic'`, on the client build.<br/>• Not applied by Metro-based bundlers. |
| `outputFormat`        | Controls the output format of the dictionaries.                                                                          | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `traversePattern`     | Patterns defining which files to traverse during optimization.                                                           | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Limit optimization to relevant files to improve build performance.<br/>• Ignored if `optimize` is disabled.<br/>• Uses glob pattern.                                                                                                                                                                                                                                                                                                                                                                                     |

### Compiler Configuration

Settings that control the Intlayer compiler, which extracts dictionaries straight from your components.

| Field                 | Description                                                                                                                                                                                                                                                                                                | Type                                                                                                            | Default     | Example                                                                                                                                                  | Note                                                                                                                                                                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Indicates if the compiler should be enabled to extract dictionaries.                                                                                                                                                                                                                                       | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` skips the compiler during development to speed up builds; only runs on build commands.                                                                                                                                                                                                      |
| `dictionaryKeyPrefix` | Prefix for the extracted dictionary keys.                                                                                                                                                                                                                                                                  | `string`                                                                                                        | `''`        | `'my-key-'`                                                                                                                                              | Added to the generated key (based on file name) to prevent conflicts.                                                                                                                                                                                                                                      |
| `saveComponents`      | Indicates if the components should be saved after being transformed.                                                                                                                                                                                                                                       | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • If `true`, the compiler will rewrite the component file in the disk. The transformation will be permanent, and the compiler can then be removed.<br/>• If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. |
| `output`              | Defines the output file path. Replaces `outputDir`. Supports template variables: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` paths resolve relative to the component directory.<br/>• `/` paths resolve relative to the project root.<br/>• Including `{{locale}}` generates separate per-locale dictionaries.<br/>• Supports per-locale object notation; `false` skips that locale.                                             |
| `noMetadata`          | If `true`, the compiler omits dictionary metadata (key, content wrapper) from the output.                                                                                                                                                                                                                  | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • Useful for i18next or ICU MessageFormat JSON outputs.<br/>• Works well with `loadJSON` plugin.                                                                                                                                                                                                           |
| `dictionaryKeyPrefix` | Dictionary key prefix                                                                                                                                                                                                                                                                                      | `string`                                                                                                        | `''`        |                                                                                                                                                          | Add an optional prefix for the extracted dictionary keys                                                                                                                                                                                                                                                   |

### Custom Schemas

| Field     | Description                                                                       | Type                        |
| --------- | --------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Permet de définir des schémas Zod pour valider la structure de vos dictionnaires. | `Record<string, ZodSchema>` |

### Plugins

| Field     | Description                           | Type               |
| --------- | ------------------------------------- | ------------------ |
| `plugins` | Liste des plugins Intlayer à activer. | `IntlayerPlugin[]` |

## Frequently Asked Questions

<FAQ>

<Question title="Where should the intlayer.config.ts file live?">

At the root of your project, next to `package.json`. Intlayer also accepts `intlayer.config.js`, `intlayer.config.mjs`, `intlayer.config.cjs` and JSON, so the file matches whichever module system your project uses.

</Question>
<Question title="How much does i18n add to my bundle size?">

Much less than a namespace based setup, because a page never downloads a catalog it does not render. Server rendered markup resolves its content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped. [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md).

</Question>
<Question title="Can I migrate from `i18next`, `next-intl` or `react-i18next` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md) or the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-intl_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the exact same API as `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` and `Lingui`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>
<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>
<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) does the same at build time on JSX, TSX, Vue and Svelte source, generating the dictionaries on every change so there are no keys to maintain by hand. It works by static analysis, so strings that only exist at runtime stay out of reach, and it needs a few annotations to tell user facing text apart from application logic.

</Question>
<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>
<Question title="How do I add a new language to my app?">

Add the locale to `internationalization.locales`, then run `npx intlayer fill` to translate the existing content into it. The generated types update at the same time, so any content file missing the new locale becomes a type error rather than a silent fallback.

</Question>
<Question title="How do I remove the locale prefix from my URLs?">

Set `routing.mode`. The default `"prefix-no-default"` gives `/about` for the default locale and `/fr/about` for the others. `"prefix-all"` prefixes every locale. `"no-prefix"` keeps the locale out of the path entirely and resolves it from a cookie, a header or a domain. `"search-params"` puts it in the query string as `/about?locale=fr`.

</Question>
<Question title="Can I serve each language from its own domain?">

Yes. `routing.domains` maps a locale to a hostname, for example `{ fr: 'example.fr', en: 'example.com' }`. The domain identifies the locale, so no prefix is added to the path, and `getLocalizedUrl` returns an absolute URL on the right domain.

</Question>
<Question title="How is the user's language detected?">

Through `routing.storage`, which lists the sources to read in order, typically the URL, then a cookie, then the `Accept-Language` header. An explicit choice by the user is persisted so it wins on the next visit.

</Question>
<Question title="What does routing.enableProxy do?">

It controls the locale routing proxy, the middleware that resolves prefixes and redirects. Left unset, the proxy runs but development and preview servers ignore the stored locale as a redirect source, which avoids being bounced to a language you are not testing; production behaves as if it were `true`. Set it to `false` to handle locale routing yourself.

</Question>
<Question title="What is the difference between importMode static, dynamic and fetch?">

`"static"`, the default, imports dictionaries statically so they are bundled and read synchronously. `"dynamic"` imports them through Suspense, so a locale is downloaded only when a component renders it, which is what you want for large content sets. `"fetch"` retrieves them from the live sync API and falls back to `"dynamic"` on failure. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md).

</Question>
<Question title="Where do I set the AI provider and API key for automatic translation?">

Either in the configuration file or on the command line with `--provider`, `--model` and `--api-key`. The key stays yours: the translation calls go from your machine or your CI runner to the provider you chose, so nothing is routed through a third party. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md).

</Question>
<Question title="Do I need to restart the dev server after changing the configuration?">

Usually not. The Intlayer watcher watches `intlayer.config.ts` itself: on save it reloads the configuration and prepares the dictionaries again, so adding a locale or changing a routing mode is picked up like a content change. However the config may by cached by the systems. Restarting your app may be a good solution.

</Question>

</FAQ>
