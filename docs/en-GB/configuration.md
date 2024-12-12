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

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5
// .intlayerrc

{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
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
- **strictMode**:

  - _Type_: `string`
  - _Default_: `required_only`
  - _Description_: Ensure strong implementations of internationalized content using typescript.
  - _Note_: If set to "strict", the translation `t` function will require each declared locales to be defined. If one locale is missing, or if a locale is not declared in your config, it will throw an error.
  - _Note_: If set to "required_only", the translation `t` function will require each declared locales to be defined. If one locale is missing, it will throw a warning. But will accept if a locale is not declared in your config, but exists.
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

- **backendURL**:

  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: The URL of the backend server.
  - _Example_: `http://localhost:4000`

- **enabled**:

  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: Indicates if the editor is active.
  - _Example_: `true`
  - _Note_: Can be set using NODE_ENV, or other dedicated env variable

- **clientId**:

  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication. An access token is used to authenticate the user related to the project. To get an access token, go to https://back.intlayer.org/dashboard/project and create an account.
  - _Example_: `true`
  - _Note_: Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId and clientSecret allow the intlayer packages to authenticate with the backend using oAuth2 authentication. An access token is used to authenticate the user related to the project. To get an access token, go to https://back.intlayer.org/dashboard/project and create an account.
  - _Example_: `true`
  - _Note_: Important: The clientId and clientSecret should be kept secret and not shared publicly. Please ensure to keep them in a secure location, such as environment variables.

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
  - _Default_: `true`
  - _Description_: Whether to include the default locale in the URL.
  - _Example_: `false`
  - _Note_: If `false`, URLs for the default locale will not have a locale prefix.
- **basePath**:
  - _Type_: `string`
  - _Default_: `''`
  - _Description_: The base path for the application URLs.
  - _Example_: `'/my-app'`
  - _Note_: This affects how URLs are constructed for the application.
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
  - _Note_: If `true`, URLs will not contain locale information.

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
- **contentDirName**:
  - _Type_: `string`
  - _Default_: `'src'`
  - _Description_: The name of the directory where the content is stored.
  - _Example_: `'data'`, `'content'`, `'locales'`
  - _Note_: If not at the base directory level, update the `contentDir`.
- **contentDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Description_: The directory path where content is stored.

- **resultDirName**:
  - _Type_: `string`
  - _Default_: `'.intlayer'`
  - _Description_: The name of the directory where results are stored.
  - _Example_: `'outputOFIntlayer'`
  - _Note_: If this directory is not at the base level, update `resultDir`.
- **resultDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Description_: The directory path for storing intermediate or output results.

- **moduleAugmentationDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: Directory for module augmentation, allowing better IDE suggestions and type checking.
  - _Example_: `'intlayer-types'`
  - _Note_: Be sure to include this in `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_: The path for module augmentation and additional type definitions.

- **dictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'dictionary'`
  - _Description_: Directory for storing dictionaries.
  - _Example_: `'translations'`
  - _Note_: If not at the result directory level, update `dictionariesDir`.
- **dictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Description_: The directory for storing localization dictionaries.

- **i18nDictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'i18n_dictionary'`
  - _Description_: Directory for storing i18n dictionaries.
  - _Example_: `'translations'`
  - _Note_: If not at the result directory level, update `i18nDictionariesDir`.
  - _Note_: Ensure the i18n dictionaries output includes i18next to build the dictionaries for i18next
- **i18nDictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Description_: The directory for storing i18n dictionaries.
  - _Note_: Ensure this directory is configured for the i18next output type.

- **typeDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: Directory for storing dictionary types.
  - _Example_: `'intlayer-types'`
  - _Note_: If not at the result directory level, update `typesDir`.

- **typesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Description_: The directory for storing dictionary types.

- **mainDirName**:
  - _Type_: `string`
  - _Default_: `'main'`
  - _Description_: Directory for storing main files.
  - _Example_: `'intlayer-main'`
  - _Note_: If not at the result directory level, update `mainDir`.
- **mainDir**:
  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Description_: The directory where main application files are stored.
- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: Directories excluded from content search.
  - _Note_: This setting is not yet used, but planned for future implementation.
