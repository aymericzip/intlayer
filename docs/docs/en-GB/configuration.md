---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Configuration
description: Learn how to configure Intlayer for your application. Understand the various settings and options available to customise Intlayer according to your needs.
keywords:
  - Configuration
  - Settings
  - Customisation
  - Intlayer
  - Options
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Added per-locale object notation for 'compiler.output' and 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Moved 'baseDir' from 'content' configuration to 'system' configuration
  - version: 8.2.0
    date: 2026-03-09
    changes: Updated compiler options, added support for 'output' and 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Updated compiler options
  - version: 8.1.5
    date: 2026-02-23
    changes: Added compiler option 'build-only' and dictionary prefix
  - version: 8.0.6
    date: 2026-02-12
    changes: Added support for Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face and Together.ai providers
  - version: 8.0.5
    date: 2026-02-06
    changes: Added `dataSerialization` to AI configuration
  - version: 8.0.0
    date: 2026-01-24
    changes: Renamed import mode `live` to `fetch` to better describe the underlying mechanism.
  - version: 8.0.0
    date: 2026-01-22
    changes: Moved build configuration `importMode` to `dictionary` configuration.
  - version: 8.0.0
    date: 2026-01-22
    changes: Added `rewrite` option to routing configuration
  - version: 8.0.0
    date: 2026-01-18
    changes: Separated system configuration from content configuration. Moved internal paths to `system` property. Added `codeDir` to separate content files and code transformation.
  - version: 8.0.0
    date: 2026-01-18
    changes: Added dictionary options `location` and `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Added support for JSON5 and JSONC file formats
  - version: 7.5.0
    date: 2025-12-17
    changes: Added `buildMode` option
  - version: 7.0.0
    date: 2025-10-25
    changes: Added `dictionary` configuration
  - version: 7.0.0
    date: 2025-10-21
    changes: Replaced `middleware` by `routing` configuration
  - version: 7.0.0
    date: 2025-10-12
    changes: Added `formatCommand` option
  - version: 6.2.0
    date: 2025-10-12
    changes: Updated `excludedPath` option
  - version: 6.0.2
    date: 2025-09-23
    changes: Added `outputFormat` option
  - version: 6.0.0
    date: 2025-09-21
    changes: Deleted `dictionaryOutput` field and `i18nextResourcesDir` field
  - version: 6.0.0
    date: 2025-09-16
    changes: Added `live` import mode
  - version: 6.0.0
    date: 2025-09-04
    changes: Replaced `hotReload` field with `liveSync` and added `liveSyncPort` and `liveSyncURL` fields
  - version: 5.6.1
    date: 2025-07-25
    changes: Replaced `activateDynamicImport` with `importMode` option
  - version: 5.6.0
    date: 2025-07-13
    changes: Changed default contentDir from `['src']` to `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Added `docs` commands
---

# Intlayer Configuration Documentation

## Overview

Intlayer configuration files allow you to customise various aspects of the plugin, such as internationalisation (internationalisation), middleware, and content handling. This documentation provides an in-depth description of each property in the configuration.

---

## Table of Contents

<TOC/>

---

## Supported Configuration File Formats

Intlayer accepts configuration file formats including JSON, JS, MJS, and TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Configuration File Example

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Example Intlayer configuration file displaying all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalisation settings.
   */
  internationalization: {
    /**
     * List of locales supported in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of mandatory locales that must be defined in each dictionary.
     * If empty, all locales are mandatory in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Level of strictness for internationalised content.
     * - "strict": Error if any declared locale is missing or undeclared.
     * - "inclusive": Warning if a declared locale is missing.
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
   * Settings controlling dictionary operations and fallback behaviour.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Dynamically fetched via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy to fill missing translations automatically using AI.
     * Can be a boolean value or a path pattern to save the filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored both locally and in the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether the content should be automatically transformed (e.g. Markdown to HTML).
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
     * - "prefix-no-default": Prefixes all but the default locale (e.g. /dashboard, /fr/dashboard).
     * - "prefix-all": Prefixes all locales (e.g. /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in URL.
     * - "search-params": Uses ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Where to store the user-selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Base path for application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewrite rules for specific paths on a per-locale basis.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Settings pertaining to finding and processing content files.
   */
  content: {
    /**
     * File extensions for scanning dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Where the source code is located.
     * Used for build optimisation and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns excluded from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to monitor changes and rebuild dictionaries during development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command used to format newly created / updated .content files.
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
     * The URL of your application for origin validation.
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
     * Whether to enable real-time content sync.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * AI-based translation and construction settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model of the selected provider to use.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide AI in generating translations.
     */
    applicationContext: "This is a travel booking application.",

    /**
     * Base URL for AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Data Serialization
     *
     * Options:
     * - "json": Default, robust; consumes more tokens.
     * - "toon": Consumes fewer tokens, may not be as consistent as JSON.
     *
     * Default: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Build and optimisation settings.
   */
  build: {
    /**
     * Build execution mode.
     * - "auto": Builds automatically during application build.
     * - "manual": Requires an explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimise final bundle by removing unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indicates whether the build should check TypeScript types.
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
     * - "verbose": In-depth debug logging.
     * - "disabled": Disables logging.
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
   * System Configuration (For advanced use)
   */
  system: {
    /**
     * Directory for storing localised dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for TypeScript module augmentation.
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
     * Directory where the main application files are stored.
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
   * Compiler Configuration (For advanced use)
   */
  compiler: {
    /**
     * Indicates whether the compiler should be enabled.
     *
     * - false: Disables the compiler.
     * - true: Enables the compiler.
     * - "build-only": Skips the compiler during development and speeds up startup time.
     *
     * Default: false
     */
    enabled: true,

    /**
     * Defines path for output files. Replaces `outputDir`.
     *
     * - `./` paths are resolved relative to the component directory.
     * - `/` paths are resolved relative to the project root (`baseDir`).
     *
     * - Including `{{locale}}` variable in path will trigger the creation of separate dictionaries per-language.
     *
     * Example:
     * ```ts
     * {
     *   // Create multilingual .content.ts files next to component
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalent using template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Create centralised JSON per language on project root
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalent using template string
     * }
     * ```
     *
     * Variable list:
     *   - `fileName`: File name.
     *   - `key`: Content key.
     *   - `locale`: Content locale.
     *   - `extension`: File extension.
     *   - `componentFileName`: Component file name.
     *   - `componentExtension`: Component file extension.
     *   - `format`: Dictionary format.
     *   - `componentFormat`: Component dictionary format.
     *   - `componentDirPath`: Component directory path.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indicates whether components should be saved after being transformed.
     * In this way, the compiler can be run only once to transform the application and can then be removed.
     */
    saveComponents: false,

    /**
     * Only insert content into the generated file. Useful for per-language JSON output for i18next or ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "", // Add an optional prefix to the extracted dictionary keys
  },

  /**
   * Custom schemas for validating dictionary content.
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

The following sections describe the various configuration settings available in Intlayer.

---

### Internationalisation Configuration

Defines settings related to internationalisation, including available locales and the default locale for the application.

| Field             | Type       | Description                                                                                        | Example              | Note                                                                                                                                                                                                                                                            |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | List of locales supported in the application. Default: `[Locales.ENGLISH]`                         | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                 |
| `requiredLocales` | `string[]` | List of mandatory locales in the application. Default: `[]`                                        | `[]`                 | If empty, all locales are mandatory in `strict` mode. Ensure mandatory locales are also defined in the `locales` field.                                                                                                                                         |
| `strictMode`      | `string`   | Guarantees robust internationalised content implementation using TypeScript. Default: `inclusive`  |                      | If `"strict"`: the `t` function requires every declared locale to be defined — throws an error if any are missing or undeclared. If `"inclusive"`: warns about missing locales but accepts existing undeclared ones. If `"loose"`: accepts any existing locale. |
| `defaultLocale`   | `string`   | Default locale used as a fallback if the requested locale is not found. Default: `Locales.ENGLISH` | `'en'`               | Used to determine the locale when no locale is specified in the URL, cookie, or header.                                                                                                                                                                         |

---

### Editor Configuration

Defines settings related to the integrated editor, including server port and activity state.

| Field                        | Type                      | Description                                                                                                                                                                           | Example                                                                               | Note                                                                                                                                                                                                             |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | The URL of your application. Default: `''`                                                                                                                                            | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Used to restrict the origin of the editor for security reasons. If set to `'*'`, the editor can be accessed from any origin.                                                                                     |
| `port`                       | `number`                  | Port used by the Visual Editor server. Default: `8000`                                                                                                                                |                                                                                       |                                                                                                                                                                                                                  |
| `editorURL`                  | `string`                  | Editor server URL. Default: `'http://localhost:8000'`                                                                                                                                 | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Used to restrict the origins that can interact with the application. If set to `'*'`, accessible from any origin. Must be set if changing the port or if the editor is hosted on a different domain.             |
| `cmsURL`                     | `string`                  | Intlayer CMS URL. Default: `'https://intlayer.org'`                                                                                                                                   | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                  |
| `backendURL`                 | `string`                  | Backend server URL. Default: `https://back.intlayer.org`                                                                                                                              | `http://localhost:4000`                                                               |                                                                                                                                                                                                                  |
| `enabled`                    | `boolean`                 | Indicates whether the app will interact with the visual editor. Default: `true`                                                                                                       | `process.env.NODE_ENV !== 'production'`                                               | If `false`, the editor cannot interact with the app. Disabling it for specific environments strengthens security.                                                                                                |
| `clientId`                   | `string &#124; undefined` | Enables intlayer packages to authenticate with the backend using oAuth2. To get an access token, go to [intlayer.org/project](https://app.intlayer.org/project). Default: `undefined` |                                                                                       | Keep secret; store in environment variables.                                                                                                                                                                     |
| `clientSecret`               | `string &#124; undefined` | Enables intlayer packages to authenticate with the backend using oAuth2. To get an access token, go to [intlayer.org/project](https://app.intlayer.org/project). Default: `undefined` |                                                                                       | Keep secret; store in environment variables.                                                                                                                                                                     |
| `dictionaryPriorityStrategy` | `string`                  | Strategy for prioritising dictionaries when both local and distant dictionaries are present. Default: `'local_first'`                                                                 | `'distant_first'`                                                                     | `'distant_first'`: prioritises distant over local. `'local_first'`: prioritises local over distant.                                                                                                              |
| `liveSync`                   | `boolean`                 | Indicates whether the app server should hot-reload content when a change is detected on the CMS / Visual Editor / Backend. Default: `true`                                            | `true`                                                                                | When a dictionary is added/updated, the app updates the page content. Live sync outsources content to another server, which may slightly affect performance. It is recommended to host both on the same machine. |
| `liveSyncPort`               | `number`                  | Live sync server port. Default: `4000`                                                                                                                                                | `4000`                                                                                |                                                                                                                                                                                                                  |
| `liveSyncURL`                | `string`                  | Live sync server URL. Default: `'http://localhost:{liveSyncPort}'`                                                                                                                    | `'https://example.com'`                                                               | Points to localhost by default; can be changed to a remote live sync server.                                                                                                                                     |

### Routing Configuration

Settings that control routing behaviour, including URL structure, locale storage, and middleware handling.

| Field      | Type                                                                                                                                                 | Description                                                                                                                                     | Example                                                                                                                                                                                       | Note                                                                                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | URL routing mode for locale handling. Default: `'prefix-no-default'`                                                                            | `'prefix-no-default'`: `/dashboard` (en) or `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale is handled by other means. `'search-params'`: `/dashboard?locale=fr` | Does not affect cookie or locale storage management.                                                                                                                                                                                                    |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Configuration for storing the locale on the client. Default: `['cookie', 'header']`                                                             | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                 | See the Storage Options table below.                                                                                                                                                                                                                    |
| `basePath` | `string`                                                                                                                                             | Base path for application URLs. Default: `''`                                                                                                   | `'/my-app'`                                                                                                                                                                                   | If the app is at `https://example.com/my-app`, basePath is `'/my-app'` and URLs become `https://example.com/my-app/en`.                                                                                                                                 |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Custom URL rewrite rules that override the default routing mode for specific paths. Supports dynamic parameters `[param]`. Default: `undefined` | See example below                                                                                                                                                                             | Rewrite rules take priority over the `mode`. Works with Next.js and Vite. `getLocalizedUrl()` automatically applies matching rules. See [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/custom_url_rewrites.md). |

**`rewrite` Example**:

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

| Value              | Description                                                            | Note                                                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Stores locale in cookies — accessible by both client and server sides. | For GDPR compliance, ensure proper user consent is obtained. Customisable via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Stores locale in the browser with no expiry date — client-side only.   | Does not expire unless explicitly cleared. Intlayer proxy cannot access it. Customisable via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).           |
| `'sessionStorage'` | Stores locale for the duration of the page session — client-side only. | Cleared when tab/window is closed. Intlayer proxy cannot access it. Customisable via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                 |
| `'header'`         | Stores or transmits locale via HTTP headers — server-side only.        | Useful for API calls. Client-side cannot access it. Customisable via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                         |

#### Cookie Attributes

When using cookie storage, you can configure additional cookie attributes:

| Field      | Type                                  | Description                                         |
| ---------- | ------------------------------------- | --------------------------------------------------- |
| `name`     | `string`                              | Cookie name. Default: `'INTLAYER_LOCALE'`           |
| `domain`   | `string`                              | Cookie domain. Default: `undefined`                 |
| `path`     | `string`                              | Cookie path. Default: `undefined`                   |
| `secure`   | `boolean`                             | Requires HTTPS. Default: `undefined`                |
| `httpOnly` | `boolean`                             | HTTP-only flag. Default: `undefined`                |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite policy.                                    |
| `expires`  | `Date &#124; number`                  | Expiry date or number of days. Default: `undefined` |

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

**Custom URL Rewrite with Dynamic Paths**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback for paths not rewritten
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

Settings pertaining to the processing of content within the application (directory names, file extensions, and derived configurations).

| Field            | Type       | Description                                                                                                                                                                                 | Example                             | Note                                                                                                            |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Indicates whether Intlayer should watch for changes in content declaration files to rebuild dictionaries. Default: `process.env.NODE_ENV === 'development'`                                 |                                     |                                                                                                                 |
| `fileExtensions` | `string[]` | File extensions used for scanning content declaration files. Default: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                 |
| `contentDir`     | `string[]` | Paths to the directories where the content declaration files are located. Default: `['.']`                                                                                                  | `['src/content']`                   |                                                                                                                 |
| `codeDir`        | `string[]` | Paths to the directories where your application's source code files are located. Default: `['.']`                                                                                           | `['src']`                           | Used to optimise the build and ensure that code transformation and hot reloading only apply to necessary files. |
| `excludedPath`   | `string[]` | Paths excluded from content scanning. Default: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                    | `['src/styles']`                    |                                                                                                                 |
| `formatCommand`  | `string`   | Command that will be run to format newly created or updated content files. Default: `undefined`                                                                                             | `'npx prettier --write "{{file}}"'` | Used during content extraction or through the visual editor.                                                    |

---

### Dictionary Configuration

Settings that control dictionary operations, including auto-filling behaviour and content creation.

This dictionary configuration has two main purposes:

1. **Default values**: Defining default values when creating content declaration files.
2. **Fallback behaviour**: Allows setting up the behaviour of dictionary operations globally, providing fallback values when specific fields are not defined.

For more information on how content declaration files and configuration values are applied, see the [content file documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

| Field                       | Type                                                                                            | Description                                                                                                        | Example           | Note                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Controls how auto-fill (AI translation) output files are generated. Default: `true`                                | See example below | `true`: default path (same file as source). `false`: disabled. String/function patterns generate files per language. Object per language: each language maps to its own pattern; `false` skips that language. Including a `{{locale}}` variable triggers per-language generation. Dictionary-level `fill` always takes precedence over this global configuration. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Controls how dictionaries are imported. Default: `'static'`                                                        | `'dynamic'`       | `'static'`: Statically imported. `'dynamic'`: Dynamically imported via 'Suspense'. `'fetch'`: Dynamically fetched via 'Live Sync API'. Does not affect `getIntlayer`, `getDictionary`, `useDictionary`, etc.                                                                                                                                                      |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Where dictionaries are stored. Default: `'local'`                                                                  | `'remote'`        | `'local'`: filesystem. `'remote'`: Intlayer CMS. `'hybrid'`: both.                                                                                                                                                                                                                                                                                                |
| `contentAutoTransformation` | `boolean`                                                                                       | Indicates whether content files should be automatically transformed (e.g. from Markdown to HTML). Default: `false` | `true`            | Useful for processing Markdown fields via @intlayer/markdown.                                                                                                                                                                                                                                                                                                     |

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

### AI Configuration

Defines settings for Intlayer's AI-powered features, such as translation construction.

| Field                | Type                   | Description                                                      | Example                                     | Note                                                                                      |
| -------------------- | ---------------------- | ---------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `provider`           | `string`               | AI provider to use.                                              | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                           |
| `model`              | `string`               | AI model to use.                                                 | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                           |
| `apiKey`             | `string`               | API key for the selected provider.                               | `process.env.OPENAI_API_KEY`                |                                                                                           |
| `applicationContext` | `string`               | Extra context about your app to improve AI translation accuracy. | `'A learning platform for children.'`       |                                                                                           |
| `baseURL`            | `string`               | Optional base URL for API calls.                                 |                                             | Useful if you are using a proxy or local AI deployment.                                   |
| `dataSerialization`  | `'json' &#124; 'toon'` | Defines how data is sent to the AI. Default: `'json'`            | `'json'`                                    | `'json'`: more robust and accurate. `'toon'`: uses fewer tokens but might be less stable. |

---

### Build Configuration

Settings for the Intlayer build process and optimisations.

| Field          | Type                     | Description                                                                                             | Example | Note |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | ------- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | Indicates whether Intlayer should run automatically during the app's pre-build steps. Default: `'auto'` |         |      |
| `optimize`     | `boolean`                | Indicates whether compiled dictionaries should be optimised for runtime. Default: `true` in production  |         |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Output format for generated dictionary files. Default: `['cjs', 'esm']`                                 |         |      |
| `checkTypes`   | `boolean`                | Indicates whether Intlayer should check types in the generated files. Default: `false`                  |         |      |

---

### System Configuration

These settings are for advanced use cases and Intlayer's internal configuration.

| Field                     | Type     | Description                               | Default                           |
| ------------------------- | -------- | ----------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Compiled dictionaries directory.          | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript module augmentation directory. | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Unmerged dictionaries directory.          | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Generated types directory.                | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Main Intlayer file directory.             | `'.intlayer/main'`                |
| `configDir`               | `string` | Compiled configuration files directory.   | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Cache files directory.                    | `'.intlayer/cache'`               |

---

### Compiler Configuration

Settings for the Intlayer compiler (`intlayer compiler`).

| Field                 | Type                     | Description                                                                              | Default |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | Indicates whether the compiler is active.                                                | `false` |
| `output`              | `string &#124; Function` | Output path for extracted dictionaries.                                                  |         |
| `saveComponents`      | `boolean`                | Indicates whether original source files should be overwritten with transformed versions. | `false` |
| `noMetadata`          | `boolean`                | If `true`, the compiler will not include metadata in the generated files.                | `false` |
| `dictionaryKeyPrefix` | `string`                 | Optional dictionary key prefix.                                                          | `''`    |

---

### Logger Configuration

Settings for customising Intlayer log output.

| Field    | Type                                           | Description         | Default        |
| -------- | ---------------------------------------------- | ------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Logging mode.       | `'default'`    |
| `prefix` | `string`                                       | Log message prefix. | `'[intlayer]'` |

---

### Custom Schemas

| Field     | Type                        | Description                                                              |
| --------- | --------------------------- | ------------------------------------------------------------------------ |
| `schemas` | `Record<string, ZodSchema>` | Allows defining Zod schemas for validating your dictionaries' structure. |

---

### Plugins

| Field     | Type               | Description                           |
| --------- | ------------------ | ------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | List of Intlayer plugins to activate. |
