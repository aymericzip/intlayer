---
createdAt: 2024-08-13
updatedAt: 2026-03-12
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
  - version: 8.4.0
    date: 2026-03-20
    changes: Add object per-locale notation for 'compiler.output' and 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Move 'baseDir' from 'content' to 'system' config
  - version: 8.2.0
    date: 2026-03-09
    changes: Update compiler options, add 'output' and 'noMetadata' support
  - version: 8.1.7
    date: 2026-02-25
    changes: Update compiler options
  - version: 8.1.5
    date: 2026-02-23
    changes: Add compiler option 'build-only', and dictionary prefix
  - version: 8.0.6
    date: 2026-02-12
    changes: Add support for Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, and Together.ai providers
  - version: 8.0.5
    date: 2026-02-06
    changes: Add `dataSerialization` to the AI configuration
  - version: 8.0.0
    date: 2026-01-24
    changes: Rename `live` import mode to `fetch` to better describe the underlying mechanism.
  - version: 8.0.0
    date: 2026-01-22
    changes: Move `importMode` build configuration to `dictionary` configuration.
  - version: 8.0.0
    date: 2026-01-22
    changes: Add `rewrite` option to the routing configuration
  - version: 8.0.0
    date: 2026-01-18
    changes: Separate system configuration from content configuration. Move internal paths to `system` property. Add `codeDir` to separate content files from code transformation.
  - version: 8.0.0
    date: 2026-01-18
    changes: Add `location` and `schema` dictionary options
  - version: 7.5.1
    date: 2026-01-10
    changes: Add support for JSON5 and JSONC file formats
  - version: 7.5.0
    date: 2025-12-17
    changes: Add `buildMode` option
  - version: 7.0.0
    date: 2025-10-25
    changes: Add `dictionary` configuration
  - version: 7.0.0
    date: 2025-10-21
    changes: Replace `middleware` by `routing` configuration
  - version: 7.0.0
    date: 2025-10-12
    changes: Add `formatCommand` option
  - version: 6.2.0
    date: 2025-10-12
    changes: Update `excludedPath` option
  - version: 6.0.2
    date: 2025-09-23
    changes: Add `outputFormat` option
  - version: 6.0.0
    date: 2025-09-21
    changes: Remove `dictionaryOutput` field and `i18nextResourcesDir` field
  - version: 6.0.0
    date: 2025-09-16
    changes: Add `live` import mode
  - version: 6.0.0
    date: 2025-09-04
    changes: Replace `hotReload` field by `liveSync` and add `liveSyncPort` and `liveSyncURL` fields
  - version: 5.6.1
    date: 2025-07-25
    changes: Replace `activateDynamicImport` with `importMode` option
  - version: 5.6.0
    date: 2025-07-13
    changes: Change default contentDir from `['src']` to `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Add `docs` commands
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
     * Command to format newly created / updated .content files.
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
     * That way, the compiler can be run only once to transform the app, and then it can be removed.
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

| Field             | Type       | Description                                                                                            | Example              | Note                                                                                                                                                                                                                                                         |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | `string[]` | The list of supported locales in the application. Default: `[Locales.ENGLISH]`                         | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                              |
| `requiredLocales` | `string[]` | The list of required locales in the application. Default: `[]`                                         | `[]`                 | If empty, all locales are required in `strict` mode. Ensure required locales are also defined in the `locales` field.                                                                                                                                        |
| `strictMode`      | `string`   | Ensure strong implementations of internationalized content using TypeScript. Default: `inclusive`      |                      | If `"strict"`: the `t` function requires each declared locale to be defined — throws an error if one is missing or undeclared. If `"inclusive"`: warns on missing locales but accepts undeclared ones that exist. If `"loose"`: accepts any existing locale. |
| `defaultLocale`   | `string`   | The default locale used as a fallback if the requested locale is not found. Default: `Locales.ENGLISH` | `'en'`               | Used to determine the locale when none is specified in the URL, cookie, or header.                                                                                                                                                                           |

---

### Editor Configuration

Defines settings related to the integrated editor, including server port and active status.

| Field                        | Type                      | Description                                                                                                                                                                          | Example                                                                               | Note                                                                                                                                                                                                   |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationURL`             | `string`                  | The URL of the application. Default: `''`                                                                                                                                            | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Used to restrict the origin of the editor for security reasons. If set to `'*'`, the editor is accessible from any origin.                                                                             |
| `port`                       | `number`                  | The port used by the visual editor server. Default: `8000`                                                                                                                           |                                                                                       |                                                                                                                                                                                                        |
| `editorURL`                  | `string`                  | The URL of the editor server. Default: `'http://localhost:8000'`                                                                                                                     | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Used to restrict the origins that can interact with the application. If set to `'*'`, accessible from any origin. Should be set if port is changed or editor is hosted on a different domain.          |
| `cmsURL`                     | `string`                  | The URL of the Intlayer CMS. Default: `'https://intlayer.org'`                                                                                                                       | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                        |
| `backendURL`                 | `string`                  | The URL of the backend server. Default: `https://back.intlayer.org`                                                                                                                  | `http://localhost:4000`                                                               |                                                                                                                                                                                                        |
| `enabled`                    | `boolean`                 | Indicates if the application interacts with the visual editor. Default: `true`                                                                                                       | `process.env.NODE_ENV !== 'production'`                                               | If `false`, the editor cannot interact with the application. Disabling for specific environments enforces security.                                                                                    |
| `clientId`                   | `string &#124; undefined` | Allows intlayer packages to authenticate with the backend using oAuth2. To get an access token, go to [intlayer.org/project](https://app.intlayer.org/project). Default: `undefined` |                                                                                       | Keep secret; store in environment variables.                                                                                                                                                           |
| `clientSecret`               | `string &#124; undefined` | Allows intlayer packages to authenticate with the backend using oAuth2. To get an access token, go to [intlayer.org/project](https://app.intlayer.org/project). Default: `undefined` |                                                                                       | Keep secret; store in environment variables.                                                                                                                                                           |
| `dictionaryPriorityStrategy` | `string`                  | Strategy to prioritize dictionaries when both local and distant are present. Default: `'local_first'`                                                                                | `'distant_first'`                                                                     | `'distant_first'`: prioritizes distant over local. `'local_first'`: prioritizes local over distant.                                                                                                    |
| `liveSync`                   | `boolean`                 | Indicates if the app server should hot reload content when a change is detected on the CMS / Visual Editor / Backend. Default: `true`                                                | `true`                                                                                | When a dictionary is added/updated, the app updates page content. Live sync externalizes content to another server, which may slightly impact performance. Recommend hosting both on the same machine. |
| `liveSyncPort`               | `number`                  | The port of the live sync server. Default: `4000`                                                                                                                                    | `4000`                                                                                |                                                                                                                                                                                                        |
| `liveSyncURL`                | `string`                  | The URL of the live sync server. Default: `'http://localhost:{liveSyncPort}'`                                                                                                        | `'https://example.com'`                                                               | Points to localhost by default; can be changed for a remote live sync server.                                                                                                                          |

### Routing Configuration

Settings that control routing behavior, including URL structure, locale storage, and middleware handling.

| Field      | Type                                                                                                                                                 | Description                                                                                                                                       | Example                                                                                                                                                                                     | Note                                                                                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | URL routing mode for locale handling. Default: `'prefix-no-default'`                                                                              | `'prefix-no-default'`: `/dashboard` (en) or `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale handled via other means. `'search-params'`: `/dashboard?locale=fr` | Does not impact cookie or locale storage management.                                                                                                                                                                                               |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Configuration for storing the locale in the client. Default: `['cookie', 'header']`                                                               | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                               | See Storage Options table below.                                                                                                                                                                                                                   |
| `basePath` | `string`                                                                                                                                             | The base path for the application URLs. Default: `''`                                                                                             | `'/my-app'`                                                                                                                                                                                 | If app is at `https://example.com/my-app`, basePath is `'/my-app'` and URLs become `https://example.com/my-app/en`.                                                                                                                                |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Custom URL rewriting rules that override the default routing mode for specific paths. Supports `[param]` dynamic parameters. Default: `undefined` | See example below                                                                                                                                                                           | Rewrite rules take precedence over `mode`. Works with Next.js and Vite. `getLocalizedUrl()` automatically applies matching rules. See [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |

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

| Value              | Description                                                            | Note                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Stores locale in cookies — accessible on both client and server side.  | For GDPR compliance, ensure proper user consent. Customizable via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Stores locale in the browser without expiration — client side only.    | No expiration unless explicitly cleared. Intlayer proxy cannot access it. Customizable via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`). |
| `'sessionStorage'` | Stores locale for the duration of the page session — client side only. | Cleared when tab/window is closed. Intlayer proxy cannot access it. Customizable via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).     |
| `'header'`         | Stores or transmits locale via HTTP headers — server side only.        | Useful for API calls. Client side cannot access it. Customizable via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                             |

#### Cookie Attributes

When using cookie storage, you can configure additional cookie attributes:

| Field      | Type                                  | Description                                   |
| ---------- | ------------------------------------- | --------------------------------------------- |
| `name`     | `string`                              | Cookie name. Default: `'INTLAYER_LOCALE'`     |
| `domain`   | `string`                              | Cookie domain. Default: `undefined`           |
| `path`     | `string`                              | Cookie path. Default: `undefined`             |
| `secure`   | `boolean`                             | Require HTTPS. Default: `undefined`           |
| `httpOnly` | `boolean`                             | HTTP-only flag. Default: `undefined`          |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite policy.                              |
| `expires`  | `Date &#124; number`                  | Expiration date or days. Default: `undefined` |

#### Locale Storage Attributes

When using localStorage or sessionStorage:

| Field  | Type                                     | Description                                    |
| ------ | ---------------------------------------- | ---------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Storage type.                                  |
| `name` | `string`                                 | Storage key name. Default: `'INTLAYER_LOCALE'` |

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

| Field            | Type       | Description                                                                                                                                                                                                                  | Example                                                                                                                                                                               | Note                                                                                                                           |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `watch`          | `boolean`  | Indicates if Intlayer should watch for changes in content declaration files to rebuild dictionaries. Default: `process.env.NODE_ENV === 'development'`                                                                       |                                                                                                                                                                                       |                                                                                                                                |
| `fileExtensions` | `string[]` | File extensions to look for when building dictionaries. Default: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`       | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Customizing can help avoid conflicts.                                                                                          |
| `contentDir`     | `string[]` | Directory path where content definition files (`.content.*`) are stored. Default: `['.']`                                                                                                                                    | `['src', '../../ui-library', require.resolve("@my-package/content")]`                                                                                                                 | Used to watch for content files to rebuild dictionaries.                                                                       |
| `codeDir`        | `string[]` | Directory path where the code is stored, relative to the base directory. Default: `['.']`                                                                                                                                    | `['src', '../../ui-library']`                                                                                                                                                         | Used to watch for code files to transform (prune, optimize). Keeping separate from `contentDir` can improve build performance. |
| `excludedPath`   | `string[]` | Directories excluded from content search. Default: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Not yet used; planned for future implementation.                                                                               |
| `formatCommand`  | `string`   | Command to format content files when Intlayer writes them locally. Default: `undefined`                                                                                                                                      | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | `{{file}}` is replaced with the file path. If not set, Intlayer auto-detects (tries prettier, biome, eslint).                  |

---

### System Configuration

Settings related to internal paths and output results of Intlayer. These settings are typically internal and should not need to be modified by the user.

| Field                     | Type     | Description                                                                                                        | Example              | Note                                              |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------- |
| `baseDir`                 | `string` | The base directory for the project. Default: `process.cwd()`                                                       | `'/path/to/project'` | Used to resolve all Intlayer-related directories. |
| `dictionariesDir`         | `string` | The directory path for storing localization dictionaries. Default: `'.intlayer/dictionary'`                        |                      |                                                   |
| `moduleAugmentationDir`   | `string` | Directory for module augmentation, allowing better IDE suggestions and type checking. Default: `'.intlayer/types'` | `'intlayer-types'`   | Be sure to include this in `tsconfig.json`.       |
| `unmergedDictionariesDir` | `string` | The directory for storing unmerged dictionaries. Default: `'.intlayer/unmerged_dictionary'`                        |                      |                                                   |
| `typesDir`                | `string` | The directory for storing dictionary types. Default: `'.intlayer/types'`                                           |                      |                                                   |
| `mainDir`                 | `string` | The directory where main application files are stored. Default: `'.intlayer/main'`                                 |                      |                                                   |
| `configDir`               | `string` | The directory where configuration files are stored. Default: `'.intlayer/config'`                                  |                      |                                                   |
| `cacheDir`                | `string` | The directory where cache files are stored. Default: `'.intlayer/cache'`                                           |                      |                                                   |

### Dictionary Configuration

Settings that control dictionary operations, including auto-fill behavior and content generation.

This dictionary configuration serves two main purposes:

1. **Default Values**: Define default values when creating content declaration files
2. **Fallback Behavior**: Provide fallback values when specific fields are not defined, allowing you to define dictionary operation behavior globally

For more information about content declaration files and how configuration values are applied, see the [Content File Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

| Field                       | Type                                                                                            | Description                                                                                                                                                                    | Example                  | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Controls how auto-fill (AI translation) output files are generated. Default: `true`                                                                                            | See example below        | `true`: default path (same file as source). `false`: disable. String/function template generates per-locale files. Object per-locale: each locale maps to its own pattern; `false` skips that locale. Including `{{locale}}` triggers per-locale generation. Dictionary-level `fill` always takes priority over this global config.                                                                                                                   |
| `description`               | `string`                                                                                        | Helps understand the purpose of the dictionary in the editor and CMS. Also used as context for AI translation generation. Default: `undefined`                                 | `'User profile section'` |                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `locale`                    | `LocalesValues`                                                                                 | Transforms the dictionary into a per-locale format. Each field declared becomes a translation node. If absent, the dictionary is treated as multilingual. Default: `undefined` | `'en'`                   | Use this when the dictionary is specific to a single locale rather than containing translations for multiple locales.                                                                                                                                                                                                                                                                                                                                 |
| `contentAutoTransformation` | `boolean &#124; { markdown?: boolean; html?: boolean; insertion?: boolean }`                    | Automatically transforms content strings into typed nodes (markdown, HTML, or insertion). Default: `false`                                                                     | `true`                   | Markdown: `### Title` → `md('### Title')`. HTML: `<div>Title</div>` → `html('<div>Title</div>')`. Insertion: `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                                                                           |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; 'plugin' &#124; string`                         | Indicates where dictionary files are stored and their CMS synchronization mode. Default: `'local'`                                                                             | `'hybrid'`               | `'local'`: managed locally only. `'remote'`: managed remotely only (CMS). `'hybrid'`: managed both locally and remotely. `'plugin'` or custom string: managed by a plugin or custom source.                                                                                                                                                                                                                                                           |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Controls how dictionaries are imported. Default: `'static'`                                                                                                                    | `'dynamic'`              | `'static'`: imported statically (replaces `useIntlayer` with `useDictionary`). `'dynamic'`: imported dynamically via Suspense (replaces with `useDictionaryDynamic`). `'fetch'`: fetched via live sync API; falls back to `'dynamic'` on failure. Relies on `@intlayer/babel` and `@intlayer/swc` plugins. Keys must be declared statically. Ignored if `optimize` is disabled. Does not affect `getIntlayer`, `getDictionary`, `useDictionary`, etc. |
| `priority`                  | `number`                                                                                        | Priority of the dictionary. Higher values take precedence over lower ones when resolving conflicts between dictionaries. Default: `undefined`                                  | `1`                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `live`                      | `boolean`                                                                                       | Deprecated — use `importMode: 'fetch'` instead. Indicated whether dictionary content was fetched dynamically via the live sync API. Default: `undefined`                       |                          | Renamed to `importMode: 'fetch'` in v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `schema`                    | `'https://intlayer.org/schema.json'`                                                            | Auto-generated by Intlayer for JSON schema validation. Default: auto-generated                                                                                                 |                          | Do not modify manually.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `title`                     | `string`                                                                                        | Helps identify the dictionary in the editor and CMS. Default: `undefined`                                                                                                      | `'User Profile'`         |                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tags`                      | `string[]`                                                                                      | Categorizes dictionaries and provides context or instructions for the editor and AI. Default: `undefined`                                                                      | `['user', 'profile']`    |                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `version`                   | `string`                                                                                        | Version of the remote dictionary; helps track which version is currently in use. Default: `undefined`                                                                          | `'1.0.0'`                | Manageable on the CMS. Do not modify locally.                                                                                                                                                                                                                                                                                                                                                                                                         |

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

| Field    | Type                                           | Description                                            | Example                 | Note                                                                                   |
| -------- | ---------------------------------------------- | ------------------------------------------------------ | ----------------------- | -------------------------------------------------------------------------------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Indicates the mode of the logger. Default: `'default'` | `'verbose'`             | `'verbose'`: logs more info for debugging. `'disabled'`: disables the logger entirely. |
| `prefix` | `string`                                       | The prefix of the logger. Default: `'[intlayer] '`     | `'[my custom prefix] '` |                                                                                        |

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

| Field                | Type                   | Description                                                                                                                                       | Example                                                  | Note                                                                                                                                                                                                                                                                                                        |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | The provider to use for the AI features of Intlayer. Default: `'openai'`                                                                          | `'anthropic'`                                            | Options: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`. Different providers require different API keys and have different pricing. |
| `model`              | `string`               | The model to use for AI features. Default: None                                                                                                   | `'gpt-4o-2024-11-20'`                                    | Specific model varies by provider.                                                                                                                                                                                                                                                                          |
| `temperature`        | `number`               | Controls the randomness of AI responses. Default: None                                                                                            | `0.1`                                                    | Higher temperature = more creative and less predictable.                                                                                                                                                                                                                                                    |
| `apiKey`             | `string`               | Your API key for the selected provider. Default: None                                                                                             | `process.env.OPENAI_API_KEY`                             | Keep secret; store in environment variables.                                                                                                                                                                                                                                                                |
| `applicationContext` | `string`               | Additional context about your application to help the AI generate more accurate translations (domain, audience, tone, terminology). Default: None | `'My application context'`                               | Can be used to add rules (e.g. `"You should not transform urls"`).                                                                                                                                                                                                                                          |
| `baseURL`            | `string`               | The base URL for the AI API. Default: None                                                                                                        | `'https://api.openai.com/v1'`, `'http://localhost:5000'` | Can point to a local or custom AI API endpoint.                                                                                                                                                                                                                                                             |
| `dataSerialization`  | `'json' &#124; 'toon'` | Data serialization format for AI features. Default: `'json'`                                                                                      | `'toon'`                                                 | `'json'`: standard, reliable; uses more tokens. `'toon'`: fewer tokens, less consistent. Additional parameters are passed to the AI model as context (reasoning effort, verbosity, etc.).                                                                                                                   |

### Build Configuration

Settings that control how Intlayer optimizes and builds your application's internationalization.

Build options apply to the `@intlayer/babel` and `@intlayer/swc` plugins.

> In development mode, Intlayer uses static imports for dictionaries to simplify the development experience.

> When optimized, Intlayer will replace dictionary calls to optimize chunking, so the final bundle only imports dictionaries that are actually used.

| Field             | Type                     | Description                                                                                                                       | Example                                                                       | Note                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `'auto' &#124; 'manual'` | Controls the mode of the build. Default: `'auto'`                                                                                 | `'manual'`                                                                    | `'auto'`: build enabled automatically when the application is built. `'manual'`: only runs when the build command is executed. Can be used to disable dictionary builds (e.g. to avoid running in Node.js environments).                                                                                                                  |
| `optimize`        | `boolean`                | Controls whether the build should be optimized. Default: `undefined`                                                              | `process.env.NODE_ENV === 'production'`                                       | If unset, optimization is triggered on framework build (Vite/Next.js). `true` forces optimization including dev mode. `false` disables it. When enabled, replaces dictionary calls to optimize chunking — only used dictionaries are imported. Relies on `@intlayer/babel` and `@intlayer/swc` plugins. Keys must be declared statically. |
| `checkTypes`      | `boolean`                | Indicates if the build should check TypeScript types and log errors. Default: `false`                                             |                                                                               | Can slow down the build.                                                                                                                                                                                                                                                                                                                  |
| `outputFormat`    | `('esm' &#124; 'cjs')[]` | Controls the output format of the dictionaries. Default: `['cjs', 'esm']`                                                         | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                           |
| `traversePattern` | `string[]`               | Patterns defining which files to traverse during optimization. Default: `['**/*.{js,ts,mjs,cjs,jsx,tsx}', '!**/node_modules/**']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | Limit optimization to relevant files to improve build performance. Ignored if `optimize` is disabled. Uses glob pattern.                                                                                                                                                                                                                  |

---

### Compiler Configuration

Settings that control the Intlayer compiler, which extracts dictionaries straight from your components.

| Field                 | Type                                                                                            | Description                                                                                                                                                                                                                                                                     | Example                                               | Note                                                                                                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`             | `boolean &#124; 'build-only'`                                                                   | Indicates if the compiler should be enabled to extract dictionaries. Default: `true`                                                                                                                                                                                            | `'build-only'`                                        | `'build-only'` skips the compiler during development to speed up builds; only runs on build commands.                                                                                                                                      |
| `dictionaryKeyPrefix` | `string`                                                                                        | Prefix for the extracted dictionary keys. Default: `''`                                                                                                                                                                                                                         | `'my-key-'`                                           | Added to the generated key (based on file name) to prevent conflicts.                                                                                                                                                                      |
| `saveComponents`      | `boolean`                                                                                       | Indicates if components should be saved after being transformed. Default: `false`                                                                                                                                                                                               |                                                       | If `true`, replaces original files with transformed files. The compiler can then be removed after one run.                                                                                                                                 |
| `transformPattern`    | `string &#124; string[]`                                                                        | Patterns defining which files to traverse during optimization. Default: `['**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}', '!**/node_modules/**']`                                                                                                                                    | `['src/**/*.{ts,tsx}', '!**/node_modules/**']`        | Limit to relevant code files to improve build performance.                                                                                                                                                                                 |
| `excludePattern`      | `string &#124; string[]`                                                                        | Patterns defining which files to exclude during optimization. Default: `['**/node_modules/**']`                                                                                                                                                                                 | `['**/node_modules/**', '!**/node_modules/react/**']` |                                                                                                                                                                                                                                            |
| `output`              | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Defines the output file path. Replaces `outputDir`. Supports template variables: `{{fileName}}`, `{{key}}`, `{{locale}}`, `{{extension}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{format}}`, `{{componentFormat}}`, `{{componentDirPath}}`. Default: `undefined` | See examples below                                    | `./` paths resolve relative to the component directory. `/` paths resolve relative to the project root. Including `{{locale}}` generates separate per-locale dictionaries. Supports per-locale object notation; `false` skips that locale. |
| `noMetadata`          | `boolean`                                                                                       | If `true`, the compiler omits dictionary metadata (key, content wrapper) from the output. Default: `false`                                                                                                                                                                      |                                                       | Useful for i18next or ICU MessageFormat JSON outputs. Works well with `loadJSON` plugin.                                                                                                                                                   |

**`output` examples**:

- Multilingual file near component: `'./{{fileName}}{{extension}}'` or `({ fileName, extension }) => \`./${fileName}${extension}\``
- Centralized per-locale JSON: `'/locales/{{locale}}/{{key}}.content.json'` or `({ key, locale }) => \`/locales/${locale}/${key}.content.json\``
- Object per-locale (different pattern per locale, skip some):

```ts
output: {
  en: ({ key }) => `./locales/en/${key}.json`,
  fr: '/locales/fr/{{key}}.content.json',
  es: false, // skip Spanish
}
```

**`noMetadata` example**:

If `true`:

```json
{
  "key": "value"
}
```

If `false`:

```json
{
  "key": "value",
  "content": {
    "key": "value"
  }
}
```
