---
createdAt: 2024-08-13
updatedAt: 2025-07-25
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
---

# Intlayer Configuration Documentation

## Overview

Intlayer configuration files allow customization of various aspects of the plugin, such as internationalization, middleware, and content handling. This document provides a detailed description of each property in the configuration.

---

## Configuration File Support

Intlayer accepts JSON, JS, MJS, and TS configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Example config file

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "contentDir": ["src", "../ui-library"],
  },
  "middleware": {
    "noPrefix": false,
  },
  "editor": {
    "applicationURL": "https://example.com",
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "This is a test application",
  },
  "build": {
    "importMode": "dynamic",
  },
}
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
  - _Description_: clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication. An access token is used to authenticate the user related to the project. To get an access token, go to https://intlayer.org/dashboard/project and create an account.
  - _Example_: `true`
  - _Note_: Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

- **clientSecret**:

  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication. An access token is used to authenticate the user related to the project. To get an access token, go to https://intlayer.org/dashboard/project and create an account.
  - _Example_: `true`
  - _Note_: Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

- **hotReload**:

  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Indicates if the application server should hot reload the locale configurations when a change is detected.
  - _Example_: `true`
  - _Note_: For example, when a new dictionary is added or updated, the application will update the content to display in the page.
  - _Note_: Because the hot reloading needs an continuous connection to the server, it is only available for clients of the `enterprise` plan.

- **dictionaryPriorityStrategy**:
  - _Type_: `string`
  - _Default_: `'local_first'`
  - _Description_: The strategy to prioritize dictionaries in the case of both local and distant dictionaries being present. If set to `'distant_first'`, the application will prioritize distant dictionaries over local dictionaries. If set to `'local_first'`, the application will prioritize local dictionaries over distant dictionaries.
  - _Example_: `'distant_first'`

### Middleware Configuration

Settings that control middleware behavior, including how the application handles cookies, headers, and URL prefixes for locale management.

#### Properties

- **headerName**:

  - _Type_: `string`
  - _Default_: `'x-intlayer-locale'`
  - _Description_: The name of the HTTP header used to determine the locale.
  - _Example_: `'x-custom-locale'`
  - _Note_: This is useful for API-based locale determination.

- **cookieName**:

  - _Type_: `string`
  - _Default_: `'intlayer-locale'`
  - _Description_: The name of the cookie used to store the locale.
  - _Example_: `'custom-locale'`
  - _Note_: Used to persist the locale across sessions.

- **prefixDefault**:

  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Whether to include the default locale in the URL.
  - _Example_: `true`
  - _Note_:
    - If `true` and `defaultLocale = 'en'`: path = `/en/dashboard` or `/fr/dashboard`
    - If `false` and `defaultLocale = 'en'`: path = `/dashboard` or `/fr/dashboard`

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

- **serverSetCookie**:

  - _Type_: `string`
  - _Default_: `'always'`
  - _Description_: Rule for setting the locale cookie on the server.
  - _Options_: `'always'`, `'never'`
  - _Example_: `'never'`
  - _Note_: Controls whether the locale cookie is set on every request or never.

- **noPrefix**:

  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Whether to omit the locale prefix from URLs.
  - _Example_: `true`
  - _Note_:
    - If `true`: No prefix in the URL
    - If `false`: Prefix in the URL
    - Example with `basePath = '/my-app'`:
      - If `noPrefix = false`: URL will be `https://example.com/my-app/en`
      - If `noPrefix = true`: URL will be `https://example.com`

- **detectLocaleOnPrefetchNoPrefix**:

  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: Controls whether locale detection occurs during Next.js prefetch requests.
  - _Example_: `true`
  - _Note_: This setting affects how Next.js handles locale prefetching:
    - **Example scenario:**
      - User's browser language is `'fr'`
      - Current page is `/fr/about`
      - Link prefetches `/about`
    - **With `detectLocaleOnPrefetchNoPrefix: true`:**
      - Prefetch detects `'fr'` locale from browser
      - Redirects prefetch to `/fr/about`
    - **With `detectLocaleOnPrefetchNoPrefix: false` (default):**
      - Prefetch uses default locale
      - Redirects prefetch to `/en/about` (assuming `'en'` is default)
    - **When to use `true`:**
      - Your app uses non-localized internal links (e.g. `<a href="/about">`)
      - You want consistent locale detection behavior between regular and prefetch requests
    - **When to use `false` (default):**
      - Your app uses locale-prefixed links (e.g. `<a href="/fr/about">`)
      - You want to optimize prefetching performance
      - You want to avoid potential redirect loops

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

- **dictionaryOutput**:

  - _Type_: `string[]`
  - _Default_: `['intlayer']`
  - _Description_: The type of dictionary output to use, e.g., `'intlayer'` or `'i18next'`.

- **contentDir**:

  - _Type_: `string[]`
  - _Default_: `['.']`
  - _Example_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Description_: The directory path where content is stored.

- **dictionariesDir**:

  - _Type_: `string`
  - _Default_: `'.intlayer/dictionaries'`
  - _Description_: The directory path for storing intermediate or output results.

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
  - _Example_: `'translations'`

- **dictionariesDir**:

  - _Type_: `string`
  - _Default_: `'.intlayer/dictionary'`
  - _Description_: The directory for storing localization dictionaries.
  - _Example_: `'translations'`

- **i18nextResourcesDir**:

  - _Type_: `string`
  - _Default_: `'i18next_dictionary'`
  - _Description_: The directory for storing i18n dictionaries.
  - _Example_: `'translations'`
  - _Note_: Ensure this directory is configured for the i18next output type.

- **typesDir**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: The directory for storing dictionary types.
  - _Example_: `'intlayer-types'`

- **mainDir**:

  - _Type_: `string`
  - _Default_: `'main'`
  - _Description_: The directory where main application files are stored.
  - _Example_: `'intlayer-main'`

- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: Directories excluded from content search.
  - _Note_: This setting is not yet used, but planned for future implementation.

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

This configuration is optional if you're registered on the [Intlayer Dashboard](https://intlayer.org/dashboard/project) using an access key. Intlayer will automatically manage the most efficient and cost-effective AI solution for your needs. Using the default options ensures better long-term maintainability as Intlayer continuously updates to use the most relevant models.

If you prefer to use your own API key or specific model, you can define your custom AI configuration.
This AI configuration will be used globally across your Intlayer environment. CLI commands will use these settings as defaults for the commands (e.g. `fill`), as well as the SDK, Visual Editor, and CMS. You can override these default values for specific use cases using command parameters.

Intlayer supports multiple AI providers for enhanced flexibility and choice. Currently supported providers are:

- **OpenAI** (default)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Properties

- **provider**:

  - _Type_: `string`
  - _Default_: `'openai'`
  - _Description_: The provider to use for the AI features of Intlayer.
  - _Options_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
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

### Build Configuration

Settings that control how Intlayer optimizes and builds your application's internationalization.

Build options apply to the `@intlayer/babel` and `@intlayer/swc` plugins.

> In development mode, Intlayer uses static imports for dictionaries to simplify the development experience.

> When optimized, Intlayer will replace dictionary calls to optimize chunking, so the final bundle only imports dictionaries that are actually used.

#### Properties

- **optimize**:

  - _Type_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'production'`
  - _Description_: Controls whether the build should be optimized.
  - _Example_: `true`
  - _Note_: When enabled, Intlayer will replace all calls of dictionaries to optimize chunking. That way the final bundle will import only the dictionaries that are used. All imports will stay as static import to avoid async processing when loading the dictionaries.
  - _Note_: Intlayer will replace all calls of `useIntlayer` with the defined mode by the `importMode` option and `getIntlayer` with `getDictionary`.
  - _Note_: This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
  - _Note_: Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.

- **importMode**:

  - _Type_: `'static' | 'dynamic' | 'async'`
  - _Default_: `'static'`
  - _Description_: Controls how dictionaries are imported.
  - _Example_: `'dynamic'`
  - _Note_: Available modes:
    - "static": Dictionaries are imported statically. Replaces `useIntlayer` with `useDictionary`.
    - "dynamic": Dictionaries are imported dynamically using Suspense. Replaces `useIntlayer` with `useDictionaryDynamic`.
    - "async": Dictionaries are imported dynamically asynchronously. Replaces `useIntlayer` with `await useDictionaryAsync`.
  - _Note_: Dynamic imports rely on Suspense and may slightly impact rendering performance.
  - _Note_: If disabled all locales will be loaded at once, even if they are not used.
  - _Note_: This option relies on the `@intlayer/babel` and `@intlayer/swc` plugins.
  - _Note_: Ensure all keys are declared statically in the `useIntlayer` calls. e.g. `useIntlayer('navbar')`.
  - _Note_: This option will be ignored if `optimize` is disabled.
  - _Note_: In most cases, `"dynamic"` will be used for React applications, `"async"` for Vue.js applications.
  - _Note_: This option will not impact the `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` and `useDictionaryDynamic` functions.

- **traversePattern**:
  - _Type_: `string[]`
  - _Default_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Description_: Patterns that define which files should be traversed during optimization.
    - _Example_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Note_: Use this to limit optimization to relevant code files and improve build performance.
  - _Note_: This option will be ignored if `optimize` is disabled.
  - _Note_: Use glob pattern.

## Doc History

| Version | Date       | Changes                                                  |
| ------- | ---------- | -------------------------------------------------------- |
| 5.6.1   | 2025-07-25 | Replace `activateDynamicImport` with `importMode` option |
| 5.6.0   | 2025-07-13 | Change default contentDir from `['src']` to `['.']`      |
| 5.5.11  | 2025-06-29 | Add `docs` commands                                      |
