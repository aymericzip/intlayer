---
createdAt: 2024-08-13
updatedAt: 2026-02-12
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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
    storage: "cookie",

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
     * Default: true
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: "*"
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
     * Default: ['esm', 'cjs']
     */
    outputFormat: ["esm"],

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
     * Set to 'build-only' to skip the compiler during development and speed up start times.
     */
    enabled: true,

    /**
     * Pattern to traverse the code to optimize.
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * Pattern to exclude from the optimization.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * Output directory for the optimized dictionaries.
     */
    outputDir: "i18n",

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "", // Remove base prefix
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
```

---

## Configuration Reference

The following sections describe the various configuration settings available for Intlayer.

---

### Internationalization Configuration

Defines settings related to internationalization, including available locales and the default locale for the application.

#### Properties

- **locales**:
  - _Type_: `string[]`
  - _Default_: `['en']`
  - _Description_: The list of supported locales in the application.
  - _Example_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Type_: `string[]`
  - _Default_: `[]`
  - _Description_: The list of required locales in the application.
  - _Example_: `[]`
  - _Note_: If empty, all locales are required in `strict` mode.
  - _Note_: Ensure required locales are also defined in the `locales` field.
- **strictMode**:
  - _Type_: `string`
  - _Default_: `inclusive`
  - _Description_: Ensure strong implementations of internationalized content using typescript.
  - _Note_: If set to "strict", the translation `t` function will require each declared locales to be defined. If one locale is missing, or if a locale is not declared in your config, it will throw an error.
  - _Note_: If set to "inclusive", the translation `t` function will require each declared locales to be defined. If one locale is missing, it will throw a warning. But will accept if a locale is not declared in your config, but exists.
  - _Note_: If set to "loose", the translation `t` function will accept any existing locale.

- **defaultLocale**:
  - _Type_: `string`
  - _Default_: `'en'`
  - _Description_: The default locale used as a fallback if the requested locale is not found.
  - _Example_: `'en'`
  - _Note_: This is used to determine the locale when none is specified in the URL, cookie, or header.

---

### Editor Configuration

Defines settings related to the integrated editor, including server port and active status.

#### Properties

- **applicationURL**:
  - _Type_: `string`
  - _Default_: `http://localhost:3000`
  - _Description_: The URL of the application. Used to restrict the origin of the editor for security reasons.
  - _Example_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Note_: The URL of the application. Used to restrict the origin of the editor for security reasons. If set to `'*'`, the editor is accessible from any origin.

- **port**:
  - _Type_: `number`
  - _Default_: `8000`
  - _Description_: The port used by the visual editor server.

- **editorURL**:
  - _Type_: `string`
  - _Default_: `'http://localhost:8000'`
  - _Description_: The URL of the editor server. Used to restrict the origin of the editor for security reasons.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Note_: The URL of the editor server to reach from the application. Used to restrict the origins that can interact with the application for security reasons. If set to `'*'`, the editor is accessible from any origin. Should be set if port is changed, or if the editor is hosted on a different domain.

- **cmsURL**:
  - _Type_: `string`
  - _Default_: `'https://intlayer.org'`
  - _Description_: The URL of the Intlayer CMS.
  - _Example_: `'https://intlayer.org'`
  - _Note_: The URL of the Intlayer CMS.

- **backendURL**:
  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: The URL of the backend server.
  - _Example_: `http://localhost:4000`

- **enabled**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: Indicates if the application interact with the visual editor.
  - _Example_: `process.env.NODE_ENV !== 'production'`
  - _Note_: If true, the editor will be able to interact with the application. If false, the editor will not be able to interact with the application. In any case, the editor can only be enabled by the visual editor. Disabling the editor for specific environments is a way to enforce the security.

- **clientId**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication. An access token is used to authenticate the user related to the project. To get an access token, go to https://app.intlayer.org/project and create an account.
  - _Example_: `true`
  - _Note_: Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication. An access token is used to authenticate the user related to the project. To get an access token, go to https://app.intlayer.org/project and create an account.
  - _Example_: `true`
  - _Note_: Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

- **dictionaryPriorityStrategy**:
  - _Type_: `string`
  - _Default_: `'local_first'`
  - _Description_: The strategy to prioritize dictionaries in the case of both local and distant dictionaries being present. If set to `'distant_first'`, the application will prioritize distant dictionaries over local dictionaries. If set to `'local_first'`, the application will prioritize local dictionaries over distant dictionaries.
  - _Example_: `'distant_first'`

- **liveSync**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Indicates if the application server should hot reload the content of the application when a change is detected on the CMS / Visual Editor / Backend.
  - _Example_: `true`
  - _Note_: For example, when a new dictionary is added or updated, the application will update the content to display in the page.
  - _Note_: Live sync need to externalize the content of the application to another server. That means that it can slightly impact the performance of the application. To limit this, we recommand to host the application and the live sync server on the same machine. Also, the combination of live sync and `optimize` can apply a consequent number of requests to the live sync server. Depending of your infrastructure, we recommand to test both options and their combination.

- **liveSyncPort**:
  - _Type_: `number`
  - _Default_: `4000`
  - _Description_: The port of the live sync server.
  - _Example_: `4000`
  - _Note_: The port of the live sync server.

- **liveSyncURL**:
  - _Type_: `string`
  - _Default_: `'http://localhost:{liveSyncPort}'`
  - _Description_: The URL of the live sync server.
  - _Example_: `'https://example.com'`
  - _Note_: Point to localhost by default but can be changed to any URL in the case of a remote live sync server.

### Routing Configuration

Settings that control routing behavior, including URL structure, locale storage, and middleware handling.

#### Properties

- **mode**:
  - _Type_: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
  - _Default_: `'prefix-no-default'`
  - _Description_: URL routing mode for locale handling.
  - _Examples_:
    - `'prefix-no-default'`: `/dashboard` (en) or `/fr/dashboard` (fr)
    - `'prefix-all'`: `/en/dashboard` (en) or `/fr/dashboard` (fr)
    - `'no-prefix'`: `/dashboard` (locale handled via other means)
    - `'search-params'`: `/dashboard?locale=fr`
  - _Note_: This setting does not impact cookie or locale storage management.

- **storage**:
  - _Type_: `false | 'cookie' | 'localStorage' | 'sessionStorage' | 'header' | CookiesAttributes | StorageAttributes | Array`
  - _Default_: `'localStorage'`
  - _Description_: Configuration for storing the locale in the client.

  - **cookie**:
    - _Description_: Stores data in cookies, small pieces of data stored on the client's browser, accessible on both client and server side.
    - _Note_: For GDPR compliant storage, ensure proper user consent before usage.
    - _Note_: Cookies parameters are customizable if set as CookiesAttributes (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).

  - **localStorage**:
    - _Description_: Stores data in the browser without expiration dates, allowing for data persistence across sessions, accessible only on the client side.
    - _Note_: Ideal for storing long-term data but mindful of the privacy and security implications due to non-expiring nature unless explicitly cleared.
    - _Note_: Locale storage is only accessible on the client side, the intlayer proxy will not be able to access it.
    - _Note_: Locale storage parameters are customizable if set as StorageAttributes (`{ type: 'localStorage', name: 'custom-locale' }`).

  - **sessionStorage**:
    - _Description_: Stores data for the duration of a page session, meaning it gets cleared once the tab or window is closed, accessible only on the client side.
    - _Note_: Suitable for temporary data storage for each session.
    - _Note_: Locale storage is only accessible on the client side, the intlayer proxy will not be able to access it.
    - _Note_: Locale storage parameters are customizable if set as StorageAttributes (`{ type: 'sessionStorage', name: 'custom-locale' }`).

  - **header**:
    - _Description_: Utilizes HTTP headers to store or transmit locale data, suitable for server-side language determination.
    - _Note_: Useful in API calls for maintaining consistent language settings across requests.
    - _Note_: Header is only accessible on the server side, the client side will not be able to access it.
    - _Note_: Header name is customizable if set as StorageAttributes (`{ type: 'header', name: 'custom-locale' }`).

- **basePath**:
  - _Type_: `string`
  - _Default_: `''`
  - _Description_: The base path for the application URLs.
  - _Example_: `'/my-app'`
  - _Note_:
    - If the application is hosted at `https://example.com/my-app`
    - The base path is `'/my-app'`
    - The URL will be `https://example.com/my-app/en`
    - If the base path is not set, the URL will be `https://example.com/en`

- **rewrite**:
  - _Type_: `Record<string, StrictModeLocaleMap<string>>`
  - _Default_: `undefined`
  - _Description_: Custom URL rewriting rules that override the default routing mode for specific paths. Allows you to define locale-specific paths that differ from the standard routing behavior. Supports dynamic route parameters using `[param]` syntax.
  - _Example_:
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
  - _Note_: The rewrite rules take precedence over the default `mode` behavior. If a path matches a rewrite rule, the localized path from the rewrite configuration will be used instead of the standard locale prefixing.
  - _Note_: Dynamic route parameters are supported using bracket notation (e.g., `[slug]`, `[id]`). The parameter values are automatically extracted from the URL and interpolated into the rewritten path.
  - _Note_: Works with both Next.js and Vite applications. The middleware/proxy will automatically rewrite incoming requests to match the internal route structure.
  - _Note_: When generating URLs with `getLocalizedUrl()`, the rewrite rules are automatically applied if they match the provided path.
  - _Reference_: For more information, see [Custom URL Rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

#### Cookie Attributes

When using cookie storage, you can configure additional cookie attributes:

- **name**: Cookie name (default: `'INTLAYER_LOCALE'`)
- **domain**: Cookie domain (default: undefined)
- **path**: Cookie path (default: undefined)
- **secure**: Require HTTPS (default: undefined)
- **httpOnly**: HTTP-only flag (default: undefined)
- **sameSite**: SameSite policy (`'strict' | 'lax' | 'none'`)
- **expires**: Expiration date or days (default: undefined)

#### Locale Storage Attributes

When using localStorage or sessionStorage:

- **type**: Storage type (`'localStorage' | 'sessionStorage'`)
- **name**: Storage key name (default: `'INTLAYER_LOCALE'`)

#### Configuration Examples

Here are some common configuration examples for the new v7 routing structure:

**Basic Configuration (Default)**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**GDPR Compliant Configuration**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**Search Parameters Mode**:

```typescript
// intlayer.config.ts
export default defineConfig({
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    headerName: "x-intlayer-locale",
    basePath: "",
  },
});
```

**No Prefix Mode with Custom Storage**:

```typescript
// intlayer.config.ts
export default defineConfig({
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
    headerName: "x-custom-locale",
    basePath: "/my-app",
  },
});
```

**Custom URL Rewriting with Dynamic Routes**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

export default defineConfig({
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
});
```

---

### Content Configuration

Settings related to content handling within the application, including directory names, file extensions, and derived configurations.

#### Properties

- **watch**:
  - _Type_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'development'`
  - _Description_: Indicates if Intlayer should watch for changes in the content declaration files in the app to rebuild the related dictionaries.

- **fileExtensions**:
  - _Type_: `string[]`
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_: File extensions to look for when building dictionaries.
  - _Example_: `['.data.ts', '.data.js', '.data.json']`
  - _Note_: Customizing file extensions can help avoid conflicts.

- **baseDir**:
  - _Type_: `string`
  - _Default_: `process.cwd()`
  - _Description_: The base directory for the project.
  - _Example_: `'/path/to/project'`
  - _Note_: This is used to resolve all Intlayer-related directories.

- **contentDir**:
  - _Type_: `string[]`
  - _Default_: `['.']`
  - _Example_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Description_: The directory path where content definition files (`.content.*`) are stored.
  - _Note_: This is used to watch for content files to rebuild dictionaries.

- **codeDir**:
  - _Type_: `string[]`
  - _Default_: `['.']`
  - _Example_: `['src', '../../ui-library']`
  - _Description_: The directory path where the code is stored, relative to the base directory.
  - _Note_: This is used to watch for code files to transform (prune, optimize). Keeping this separate from `contentDir` can improve build performance by avoiding unnecessary scans of content files.

- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']`
  - _Description_: Directories excluded from content search.
  - _Note_: This setting is not yet used, but planned for future implementation.

- **formatCommand**:
  - _Type_: `string`
  - _Default_: `undefined`
  - _Description_: The command to format the content. When intlayer write your .content files locally, this command will be used to format the content.
  - _Example_: `'npx prettier --write "{{file}}" --log-level silent'` Using Prettier
  - _Example_: `'npx biome format "{{file}}" --write --log-level none'` Using Biome
  - _Example_: `'npx eslint --fix "{{file}}"  --quiet'` Using ESLint
  - _Note_: Intlayer will replace the {{file}} with the path of the file to format.
  - _Note_: If not set, Intlayer will try to detect the format command automatically. By trying to resolve the following commands: prettier, biome, eslint.

---

### System Configuration

Settings related to internal paths and output results of Intlayer. These settings are typically internal and should not need to be modified by the user.

#### Properties

- **dictionariesDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/dictionary'`
  - _Description_: The directory path for storing localization dictionaries.

- **moduleAugmentationDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/types'`
  - _Description_: Directory for module augmentation, allowing better IDE suggestions and type checking.
  - _Example_: `'intlayer-types'`
  - _Note_: Be sure to include this in `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/unmerged_dictionary'`
  - _Description_: The directory for storing unmerged dictionaries.

- **typesDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/types'`
  - _Description_: The directory for storing dictionary types.

- **mainDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/main'`
  - _Description_: The directory where main application files are stored.

- **configDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/config'`
  - _Description_: The directory where the configuration files are stored.

- **cacheDir**:
  - _Type_: `string`
  - _Default_: `'.intlayer/cache'`
  - _Description_: The directory where the cache files are stored.

- **outputFilesPatternWithPath**:
  - _Type_: `string`
  - _Default_: `'{{dictionariesDir}}/**/*.json'`
  - _Description_: Pattern for output files including the relative path.

### Dictionary Configuration

Settings that control dictionary operations, including auto-fill behavior and content generation.

This dictionary configuration serves two main purposes:

1. **Default Values**: Define default values when creating content declaration files
2. **Fallback Behavior**: Provide fallback values when specific fields are not defined, allowing you to define dictionary operation behavior globally

For more information about content declaration files and how configuration values are applied, see the [Content File Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

#### Properties

- **fill**
- **description**
- **locale**
- **contentAutoTransformation**:
- **location**
- **importMode**:
  - _Type_: `'static' | 'dynamic' | 'fetch'`
  - _Default_: `'static'`
  - _Description_: Controls how dictionaries are imported.
  - _Example_: `'dynamic'`
  - _Note_: Available modes:
    - "static": Dictionaries are imported statically. Replaces `useIntlayer` with `useDictionary`.
    - "dynamic": Dictionaries are imported dynamically using Suspense. Replaces `useIntlayer` with `useDictionaryDynamic`.
    - "fetch": Dictionaries are fetched dynamically using the live sync API. Replaces `useIntlayer` with `useDictionaryDynamic`.
  - _Note_: Dynamic imports rely on Suspense and may slightly impact rendering performance.
  - _Note_: If disabled all locales will be loaded at once, even if they are not used.
  - _Note_: This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
  - _Note_: Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
  - _Note_: This option will be ignored if `optimize` is disabled.
  - _Note_: If set to "fetch", only the dictionaries that are including remote content, and set as "fetch" flags will be transformed as fetch mode. Others will be imported dynamically as "dynamic" mode to optimize the number of fetch queries, and load performance.
  - _Note_: Fetch mode will use the live sync API to fetch the dictionaries. If the API call fails, the dictionaries will be imported dynamically as "dynamic" mode.
  - _Note_: This option will not impact the `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` and `useDictionaryDynamic` functions.
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

### Logger Configuration

Settings that control the logger, including the prefix to use.

#### Properties

- **mode**:
  - _Type_: `string`
  - _Default_: `default`
  - _Description_: Indicates the mode of the logger.
  - _Options_: `default`, `verbose`, `disabled`
  - _Example_: `default`
  - _Note_: The mode of the logger. Verbose mode will log more information, but can be used for debugging purposes. Disabled mode will disable the logger.

- **prefix**:
  - _Type_: `string`
  - _Default_: `'[intlayer] '`
  - _Description_: The prefix of the logger.
  - _Example_: `'[my custom prefix] '`
  - _Note_: The prefix of the logger.

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

#### Properties

- **provider**:
  - _Type_: `string`
  - _Default_: `'openai'`
  - _Description_: The provider to use for the AI features of Intlayer.
  - _Options_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`
  - _Example_: `'anthropic'`
  - _Note_: Different providers may require different API keys and have different pricing models.

- **model**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: The model to use for the AI features of Intlayer.
  - _Example_: `'gpt-4o-2024-11-20'`
  - _Note_: The specific model to use varies by provider.

- **temperature**:
  - _Type_: `number`
  - _Default_: None
  - _Description_: The temperature controls the randomness of the AI's responses.
  - _Example_: `0.1`
  - _Note_: A higher temperature will make the AI more creative and less predictable.

- **apiKey**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: Your API key for the selected provider.
  - _Example_: `process.env.OPENAI_API_KEY`
  - _Note_: Important: API keys should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

- **applicationContext**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: Provides additional context about your application to the AI model, helping it generate more accurate and contextually appropriate translations. This can include information about your app's domain, target audience, tone, or specific terminology.
  - _Note_: You can use it to add more rules to the AI model (e.g. "You should not transform urls").
  - _Example_: `'My application context'`

- **baseURL**:
  - _Type_: `string`
  - _Default_: None
  - _Description_: The base URL for the AI API.
  - _Example_: `'https://api.openai.com/v1'`
  - _Example_: `'http://localhost:5000'`
  - _Note_: Can be used to point to a local, or custom AI API endpoint.

- **dataSerialization**:
  - _Type_: `'json' | 'toon'`
  - _Default_: `'json'`
  - _Description_: The data serialization format to use for the AI features of Intlayer.
  - _Example_: `'toon'`
  - _Note_: `json`: Standard, reliable; uses more tokens. `toon`: Fewer tokens, less consistent than JSON.
    > If you provide additional parameters, Intlayer will pass them to the AI model as context. It can be used to customize the reasoning effort, text verbosity, etc

### Build Configuration

Settings that control how Intlayer optimizes and builds your application's internationalization.

Build options apply to the `@intlayer/babel` and `@intlayer/swc` plugins.

> In development mode, Intlayer uses static imports for dictionaries to simplify the development experience.

> When optimized, Intlayer will replace dictionary calls to optimize chunking, so the final bundle only imports dictionaries that are actually used.

#### Properties

- **mode**:
  - _Type_: `'auto' | 'manual'`
  - _Default_: `'auto'`
  - _Description_: Controls the mode of the build.
  - _Example_: `'manual'`
  - _Note_: If 'auto', the build will be enabled automatically when the application is built.
  - _Note_: If 'manual', the build will be set only when the build command is executed.
  - _Note_: Can be used to disable dictionaries build, for instance when execution on Node.js environment should be avoided.

- **optimize**:
  - _Type_: `boolean`
  - _Default_: `undefined`
  - _Description_: Controls whether the build should be optimized.
  - _Example_: `process.env.NODE_ENV === 'production'`
  - _Note_: By default, the build optimization is not fixed. If not set, Intlayer will trigger the build optimization on the build of your application (vite / nextjs / etc). Setting it to `true` will force the build optimization, including during dev mode. Setting it to `false` will disable the build optimization.
  - _Note_: When enabled, Intlayer will replace all calls of dictionaries to optimize chunking. That way the final bundle will import only the dictionaries that are used. All imports will stay as static import to avoid async processing when loading the dictionaries.
  - _Note_: Intlayer will replace all calls of `useIntlayer` with the defined mode by the `importMode` option and `getIntlayer` with `getDictionary`.
  - _Note_: This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
  - _Note_: Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.

- **importMode**:
  - _Type_: `'static' | 'dynamic' | 'fetch'`
  - _Default_: `'static'`
  - _Description_: Controls how dictionaries are imported.
  - _Example_: `'dynamic'`
  - _Note_: Available modes:
    - "static": Dictionaries are imported statically. Replaces `useIntlayer` with `useDictionary`.
    - "dynamic": Dictionaries are imported dynamically using Suspense. Replaces `useIntlayer` with `useDictionaryDynamic`.
    - "fetch": Dictionaries are fetched dynamically using the live sync API. Replaces `useIntlayer` with `useDictionaryDynamic`.
  - _Note_: Dynamic imports rely on Suspense and may slightly impact rendering performance.
  - _Note_: If disabled all locales will be loaded at once, even if they are not used.
  - _Note_: This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
  - _Note_: Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
  - _Note_: This option will be ignored if `optimize` is disabled.
  - _Note_: If set to "fetch", only the dictionaries that are including remote content, and set as "fetch" flags will be transformed as fetch mode. Others will be imported dynamically as "dynamic" mode to optimize the number of fetch queries, and load performance.
  - _Note_: Fetch mode will use the live sync API to fetch the dictionaries. If the API call fails, the dictionaries will be imported dynamically as "dynamic" mode.
  - _Note_: This option will not impact the `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` and `useDictionaryDynamic` functions.
  - _Note_: **Deprecated**: Use `dictionary.importMode` instead.
- **checkTypes**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Indicates if the build should check TypeScript types and log errors.
  - _Note_: This can slow down the build.

- **outputFormat**:
  - _Type_: `'esm' | 'cjs'`
  - _Default_: `'esm'`
  - _Description_: Controls the output format of the dictionaries.
  - _Example_: `'cjs'`
  - _Note_: The output format of the dictionaries.

- **traversePattern**:
  - _Type_: `string[]`
  - _Default_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx}', '!**\/node_modules/**']`
  - _Description_: Patterns that define which files should be traversed during optimization.
    - _Example_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_: Use this to limit optimization to relevant code files and improve build performance.
  - _Note_: This option will be ignored if `optimize` is disabled.
  - _Note_: Use glob pattern.

---

### Compiler Configuration

Settings that control the Intlayer compiler, which extracts dictionaries straight from your components.

#### Properties

- **enabled**:
  - _Type_: `boolean | 'build-only'`
  - _Default_: `true`
  - _Description_: Indicates if the compiler should be enabled to extract the dictionaries.
  - _Example_: `'build-only'`
  - _Note_: Setting it to `'build-only'` will skip the compiler during development mode to speed up build times. It will only run on build commands.

- **dictionaryKeyPrefix**:
  - _Type_: `string`
  - _Default_: `'comp-'`
  - _Description_: Prefix for the extracted dictionary keys.
  - _Example_: `'my-key-'`
  - _Note_: When dictionaries are extracted, the key is generated based on the file name. This prefix is added to the generated key to prevent conflicts.

- **transformPattern**:
  - _Type_: `string | string[]`
  - _Default_: `['**/*.{ts,tsx,jsx,js,cjs,mjs,svelte,vue}', '!**/node_modules/**']`
  - _Description_: Patterns that define which files should be traversed during optimization.
  - _Example_: `['src/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_: Use this to limit optimization to relevant code files and improve build performance.

- **excludePattern**:
  - _Type_: `string | string[]`
  - _Default_: `['**/node_modules/**']`
  - _Description_: Patterns that define which files should be excluded during optimization.
  - _Example_: `['**/node_modules/**', '!**/node_modules/react/**']`

- **outputDir**:
  - _Type_: `string`
  - _Default_: `'compiler'`
  - _Description_: The directory where the extracted dictionaries will be stored, relative to your project base path.
