---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Package Documentation
description: The core package of Intlayer, providing the foundational functions and types for internationalisation.
keywords:
  - intlayer
  - core
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# intlayer Package

The `intlayer` package is the core library of the Intlayer ecosystem. It provides the essential functions, types and utilities for managing multilingual content in JavaScript and TypeScript applications.

## Installation

```bash
npm install intlayer
```

## Exports

### Configuration

Import:

```tsx
import "intlayer";
```

| Variable           | Type                   | Description                                                                              | Related Doc                                                                                                                     |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | The Intlayer configuration object.                                                       | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getConfiguration.md)      |
| `getConfiguration` | `() => IntlayerConfig` | Returns the Intlayer configuration object. (**Deprecated**: Use `configuration` instead) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | The list of all supported locales.                                                       | -                                                                                                                               |
| `requiredLocales`  | `Locales[]`            | The list of all required locales.                                                        | -                                                                                                                               |
| `defaultLocale`    | `Locales`              | The default locale.                                                                      | -                                                                                                                               |

### Types

Import:

```tsx
import "intlayer";
```

| Type                  | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `Dictionary`          | The dictionary type used to define a dictionary's structure. |
| `DeclarationContent`  | (**Deprecated**) Use `Dictionary<T>` instead.                |
| `IntlayerConfig`      | The type that defines the Intlayer configuration.            |
| `ContentNode`         | A node within the dictionary content.                        |
| `Locale`              | The type representing a locale.                              |
| `LocalesValues`       | The possible values for a locale.                            |
| `StrictModeLocaleMap` | A map of locales with strict type-checking.                  |

### Content Functions

Import:

```tsx
import "intlayer";
```

| Function                 | Type       | Description                                                                                                      | Related Doc                                                                                               |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | Selects content based on the current locale.                                                                     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Selects content based on a quantity.                                                                             | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Picks content based on a boolean condition.                                                                      | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/condition.md)     |
| `gender`                 | `Function` | Picks content based on a gender.                                                                                 | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/gender.md)           |
| `insert`                 | `Function` | Inserts values into a content string.                                                                            | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Nests another dictionary.                                                                                        | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/nesting.md)         |
| `md`                     | `Function` | Processes Markdown content.                                                                                      | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/markdown.md)       |
| `html`                   | `Function` | Processes HTML content.                                                                                          | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/html.md)               |
| `file`                   | `Function` | Handles file content.                                                                                            | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/file.md)               |
| `getDictionary`          | `Function` | Processes objects that resemble dictionaries (key, content). It processes `t()` translations, enumerations, etc. | -                                                                                                         |
| `getIntlayer`            | `Function` | Based on `getDictionary`, but injects an optimised version of the dictionary from the generated declaration.     | -                                                                                                         |

### Localisation Utilities

Import:

```tsx
import "intlayer";
```

| Function               | Type       | Description                                      | Related documentation                                                                                                              |
| ---------------------- | ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Detects the locale from a string or a path.      | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Gets the language component of a locale.         | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Gets the display name for a locale.              | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Resolves a canonical path to a localized one.    | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Resolves a localized path to its canonical form. | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Generates a localized URL.                       | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Generates URLs for all supported locales.        | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Removes the locale prefix from a path.           | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Retrieves the locale prefix from a path.         | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Retrieves the text direction (LTR/RTL).          | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Validates a locale prefix.                       | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/validatePrefix.md)             |

### Browser Utilities

Import:

```tsx
import "intlayer";
```

| Function               | Type       | Description                             |
| ---------------------- | ---------- | --------------------------------------- |
| `getBrowserLocale`     | `Function` | Detects the browser's preferred locale. |
| `getCookie`            | `Function` | Retrieves a cookie value.               |
| `getLocaleFromStorage` | `Function` | Retrieves the locale from storage.      |
| `setLocaleInStorage`   | `Function` | Saves the locale to storage.            |

### Formatters

Import:

```tsx
import "intlayer";
```

| Function       | Description                       |
| -------------- | --------------------------------- |
| `number`       | Formats a number.                 |
| `currency`     | Formats a currency value.         |
| `percentage`   | Formats a percentage.             |
| `compact`      | Formats a number in compact form. |
| `date`         | Formats a date.                   |
| `relativeTime` | Formats relative time.            |
| `units`        | Formats a value with units.       |
| `Intl`         | The standard Intl object.         |
