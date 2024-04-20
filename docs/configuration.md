## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

# Configuration Reference

This document outlines the types and default settings for the configuration of the plugin.

## Table of Contents

- [InternationalizationConfig](#InternationalizationConfig)
- [MiddlewareConfig](#MiddlewareConfig)
- [CustomIntlayerConfig](#CustomIntlayerConfig)
- [IntlayerConfig](#IntlayerConfig)
- [ContentConfig](#ContentConfig)

## InternationalizationConfig

Configuration settings for internationalization, detailing available locales and the default locale.

### Properties

- `locales`: Array of `Locales`. Specifies the available locales in the application.
  - Default: `[Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]`
- `defaultLocale`: `Locales`. Specifies the default locale for fallback operations.
  - Default: `Locales.ENGLISH`

## MiddlewareConfig

Configuration settings for middleware behavior, including headers and cookies for locale management.

### Properties

- `headerName`: String. Name of the HTTP header from which the locale is retrieved.
  - Default: `'x-intlayer-locale'`
- `cookieName`: String. Name of the cookie where the locale information is stored.
  - Default: `'NEXT_LOCALE'`
- `prefixDefault`: Boolean. Determines whether to prefix the default locale in the URL.
  - Default: `false`
- `basePath`: String. Base path for application URLs.
  - Default: `''`
- `serverSetCookie`: `ServerSetCookieRule`. Strategy for setting the locale cookie on the server.
  - Default: `'always'`
- `noPrefix`: Boolean. Indicates if no prefix should be used in the URL for locale.
  - Default: `false`

## CustomIntlayerConfig

Allows providing custom settings to override the default configurations for internationalization, middleware, and content.

### Properties

- `internationalization`: `Partial<InternationalizationConfig>`. Optional custom settings for internationalization.
- `middleware`: `Partial<MiddlewareConfig>`. Optional custom settings for middleware.
- `content`: `Partial<ContentConfig>`. Optional custom settings for content handling.

## IntlayerConfig

Combined configuration settings for internationalization, middleware, and content.

### Properties

- `internationalization`: `InternationalizationConfig`. Configuration for internationalization.
- `middleware`: `MiddlewareConfig`. Configuration for middleware behavior.
- `content`: `ContentConfig`. Configuration for content handling.

## ContentConfig

Configuration settings related to content handling within the application.

### Properties

- `fileExtensions`: Array of String. File extensions of content to look for.
  - Default: `['.content.ts', '.content.js', '.content.json']`
- `baseDir`: String. Absolute path of the project's base directory.
  - Default: `process.cwd()`
- `contentDirName`: String. Name of the directory where the content is stored.
  - Default: `'src'`
- `excludedPath`: Array of String. Directories to be excluded from content processing.
  - Default: `['node_modules']`
- `resultDirName`: String. Name of the directory where results are stored.
  - Default: `'.intlayer'`
- `moduleAugmentationDirName`: String. Directory for module augmentation.
  - Default: `'types'`
- `bundleDirName`: String. Directory where bundles are stored.
  - Default: `'bundle'`
- `bundleFileExtension`: String. File extension for bundle files.
  - Default: `'.bundle.js'`
- `dictionariesDirName`: String. Directory where dictionaries are stored.
  - Default: `'dictionary'`
- `typeDirName`: String. Directory where dictionary types are stored.
  - Default: `'types'`
- `mainDirName`: String. Directory where the main files are stored.
  - Default: `'main'`
- `contentDir`: String. Directory where the content is stored, relative to the base directory.
  - Derived: `{{baseDir}} / {{contentDirName}}`
- `resultDir`: String. Directory where the results are stored, relative to the base directory.
  - Derived: `{{baseDir}} / {{resultDirName}}`
- `moduleAugmentationDir`: String. Directory for module augmentation, relative to the base directory.
  - Derived: `{{baseDir}} / {{moduleAugmentationDirName}}`
- `bundleDir`: String. Directory where bundles are stored, relative to the result directory.
  - Derived: `{{resultDir}} / {{bundleDirName}}`
- `dictionariesDir`: String. Directory where dictionaries are stored, relative to the result directory.
  - Derived: `{{resultDir}} / {{dictionariesDirName}}`
- `typesDir`: String. Directory where dictionary types are stored, relative to the result directory.
  - Derived: `{{resultDir}} / {{typeDirName}}`
- `mainDir`: String. Directory where the main files are stored, relative to the result directory.
  - Derived: `{{resultDir}} / {{mainDirName}}`
- `watchedFilesPattern`: Array of String. Patterns of files to watch for changes.
- `watchedFilesPatternWithPath`: Array of String. Patterns of files to watch for changes including the relative path.
- `outputFilesPatternWithPath`: String. Pattern for output files including the relative path.
