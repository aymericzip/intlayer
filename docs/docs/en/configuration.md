---
createdAt: 2024-08-13
updatedAt: 2026-04-08
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
---

# Intlayer Configuration Documentation

## Overview

Intlayer configuration files allow customization of various aspects of the plugin, such as internationalization, middleware, and content handling. This document provides a detailed description of each property in the configuration.

---

## Table of Contents

<TOC/>

---

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

---

## Example config file

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
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
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
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
     * Build execution mode.
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
   * Plugins configuration.
   */
  plugins: [],
};

export default config;
````

---

## Configuration Reference

The following sections describe the various configuration settings available for Intlayer.

---

### Internationalization Configuration

Defines settings related to internationalization, including available locales and the default locale for the application.

| Field             | Description                                                                  | Type       | Default             | Example              | Note                                                                                                                                                                                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | The list of supported locales in the application.                            | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                            |
| `requiredLocales` | The list of required locales in the application.                             | `string[]` | `[]`                | `[]`                 | • If empty, all locales are required in `strict` mode.<br/>• Ensure required locales are also defined in the `locales` field.                                                                                                                                              |
| `strictMode`      | Ensure strong implementations of internationalized content using TypeScript. | `string`   | `'inclusive'`       |                      | • If `"strict"`: the `t` function requires each declared locale to be defined — throws an error if one is missing or undeclared.<br/>• If `"inclusive"`: warns on missing locales but accepts undeclared ones that exist.<br/>• If `"loose"`: accepts any existing locale. |
| `defaultLocale`   | The default locale used as a fallback if the requested locale is not found.  | `string`   | `Locales.ENGLISH`   | `'en'`               | Used to determine the locale when none is specified in the URL, cookie, or header.                                                                                                                                                                                         |

---

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

### Routing Configuration

Settings that control routing behavior, including URL structure, locale storage, and middleware handling.

| Field      | Description                                                                                                                                                                  | Type                                                                                                                                                                                                         | Default                | Example                                                                                                                                                                                     | Note                                                                                                                                                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | URL routing mode for locale handling.                                                                                                                                        | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) or `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale handled via other means. `'search-params'`: `/dashboard?locale=fr` | Does not impact cookie or locale storage management.                                                                                                                                                                                                                   |
| `storage`  | Configuration for storing the locale in the client.                                                                                                                          | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                          | See Storage Options table below.                                                                                                                                                                                                                                       |
| `basePath` | The base path for the application URLs.                                                                                                                                      | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                 | If app is at `https://example.com/my-app, basePath is `'/my-app'`and URLs become`https://example.com/my-app/en`.                                                                                                                                                       |
| `rewrite`  | Custom URL rewriting rules that override the default routing mode for specific paths. Supports `[param]` dynamic parameters.                                                 | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | See example below                                                                                                                                                                           | • Rewrite rules take precedence over `mode`.<br/>• Works with Next.js and Vite.<br/>• `getLocalizedUrl()` automatically applies matching rules.<br/>• See [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |
| `domains`  | Maps locales to domain hostnames for domain-based routing. When set, URLs for a locale use that domain as the base (absolute URL) and no locale prefix is added to the path. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                 | • Protocol defaults to `https://` when not included in the hostname.<br/>• The domain itself identifies the locale, so no `/zh/` prefix is added.<br/>• `getLocalizedUrl('/', 'zh')` returns `https://intlayer.zh/`.                                                   |

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
| `'cookie'`         | • For GDPR compliance, ensure proper user consent.<br/>• Customizable via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).       | Stores locale in cookies — accessible on both client and server side.  |
| `'localStorage'`   | • No expiration unless explicitly cleared.<br/>• Intlayer proxy cannot access it.<br/>• Customizable via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). | Stores locale in the browser without expiration — client side only.    |
| `'sessionStorage'` | • Cleared when tab/window is closed.<br/>• Intlayer proxy cannot access it.<br/>• Customizable via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).     | Stores locale for the duration of the page session — client side only. |
| `'header'`         | • Useful for API calls.<br/>• Client side cannot access it.<br/>• Customizable via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                             | Stores or transmits locale via HTTP headers — server side only.        |

#### Cookie Attributes

When using cookie storage, you can configure additional cookie attributes:

| Field      | Description                                   | Type                                                  |
| ---------- | --------------------------------------------- | ----------------------------------------------------- |
| `name`     | Cookie name. Default: `'INTLAYER_LOCALE'`     | `string`                                              |
| `domain`   | Cookie domain. Default: `undefined`           | `string`                                              |
| `path`     | Cookie path. Default: `undefined`             | `string`                                              |
| `secure`   | Require HTTPS. Default: `undefined`           | `boolean`                                             |
| `httpOnly` | HTTP-only flag. Default: `undefined`          | `boolean`                                             |
| `sameSite` | SameSite policy.                              | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Expiration date or days. Default: `undefined` | `Date` &#124; <br/> `number`                          |

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

---

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

---

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
| `priority`                  | Priority of the dictionary. Higher values take precedence over lower ones when resolving conflicts between dictionaries.                                  | `number`                                                                                                        | `undefined`    | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `live`                      | Deprecated — use `importMode: 'fetch'` instead. Indicated whether dictionary content was fetched dynamically via the live sync API.                       | `boolean`                                                                                                       | `undefined`    |                                                                                             | Renamed to `importMode: 'fetch'` in v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
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

---

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
- **ollama**

| Field                | Description                                                                                                                         | Type                                                                                                                                                                                                                                                                                                                                                                                           | Default     | Example                                                       | Note                                                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | The provider to use for the AI features of Intlayer.                                                                                | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Different providers require different API keys and have different pricing.                                                                                                                              |
| `model`              | The model to use for AI features.                                                                                                   | `string`                                                                                                                                                                                                                                                                                                                                                                                       | None        | `'gpt-4o-2024-11-20'`                                         | Specific model varies by provider.                                                                                                                                                                      |
| `temperature`        | Controls the randomness of AI responses.                                                                                            | `number`                                                                                                                                                                                                                                                                                                                                                                                       | None        | `0.1`                                                         | Higher temperature = more creative and less predictable.                                                                                                                                                |
| `apiKey`             | Your API key for the selected provider.                                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                       | None        | `process.env.OPENAI_API_KEY`                                  | Keep secret; store in environment variables.                                                                                                                                                            |
| `applicationContext` | Additional context about your application to help the AI generate more accurate translations (domain, audience, tone, terminology). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | None        | `'My application context'`                                    | Can be used to add rules (e.g. `"You should not transform urls"`).                                                                                                                                      |
| `baseURL`            | The base URL for the AI API.                                                                                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                       | None        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Can point to a local or custom AI API endpoint.                                                                                                                                                         |
| `dataSerialization`  | Data serialization format for AI features.                                                                                          | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: standard, reliable; uses more tokens.<br/>• `'toon'`: fewer tokens, less consistent.<br/>• Additional parameters are passed to the AI model as context (reasoning effort, verbosity, etc.). |

### Build Configuration

Settings that control how Intlayer optimizes and builds your application's internationalization.

Build options apply to the `@intlayer/babel` and `@intlayer/swc` plugins.

> In development mode, Intlayer uses static imports for dictionaries to simplify the development experience.

> When optimized, Intlayer will replace dictionary calls to optimize chunking, so the final bundle only imports dictionaries that are actually used.

| Field             | Description                                                          | Type                             | Default                                                                                                                                                                           | Example                                                                       | Note                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Controls the mode of the build.                                      | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: build enabled automatically when the application is built.<br/>• `'manual'`: only runs when the build command is executed.<br/>• Can be used to disable dictionary builds (e.g. to avoid running in Node.js environments).                                                                                                                                    |
| `optimize`        | Controls whether the build should be optimized.                      | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • If unset, optimization is triggered on framework build (Vite/Next.js).<br/>• `true` forces optimization including dev mode.<br/>• `false` disables it.<br/>• When enabled, replaces dictionary calls to optimize chunking — only used dictionaries are imported.<br/>• Relies on `@intlayer/babel` and `@intlayer/swc` plugins.<br/>• Keys must be declared statically. |
| `minify`          | Whether to minify the dictionaries to reduce the bundle size.        | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Indicates whether the bundle should be minified.<br/>• Default: `false`.<br/>• This option will be ignored if `optimize` is disabled.<br/>• This option will be ignored if `editor.enabled` is true.                                                                                                                                                                    |
| `purge`           | Whether to purge the unused keys in a dictionaries.                  | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • Indicates whether the bundle should be purged.<br/>• Default: `false`.<br/>• This option will be ignored if `optimize` is disabled.                                                                                                                                                                                                                                     |
| `checkTypes`      | Indicates if the build should check TypeScript types and log errors. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Can slow down the build.                                                                                                                                                                                                                                                                                                                                                  |
| `outputFormat`    | Controls the output format of the dictionaries.                      | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                                                           |
| `traversePattern` | Patterns defining which files to traverse during optimization.       | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Limit optimization to relevant files to improve build performance.<br/>• Ignored if `optimize` is disabled.<br/>• Uses glob pattern.                                                                                                                                                                                                                                    |

---

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

---

### Plugins

| Field     | Description                           | Type               |
| --------- | ------------------------------------- | ------------------ |
| `plugins` | Liste des plugins Intlayer à activer. | `IntlayerPlugin[]` |
