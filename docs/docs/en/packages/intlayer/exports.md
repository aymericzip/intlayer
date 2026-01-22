---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Package Documentation
description: The core package of Intlayer, providing the base functions and types for internationalization.
keywords:
  - intlayer
  - core
  - internationalization
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

The `intlayer` package is the core library of the Intlayer ecosystem. It provides the essential functions, types, and utilities for managing multilingual content in JavaScript and TypeScript applications.

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

| Variable           | Type                   | Description                                                                              | Related Doc                                                                                                             |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | The Intlayer configuration object.                                                       | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Returns the Intlayer configuration object. (**Deprecated**: Use `configuration` instead) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | The list of all supported locales.                                                       | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | The list of all required locales.                                                        | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | The default locale.                                                                      | -                                                                                                                       |

### Types

Import:

```tsx
import "intlayer";
```

| Type                  | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `Dictionary`          | The dictionary type used to define the structure of a dictionary. |
| `DeclarationContent`  | (**Deprecated**) Use `Dictionary<T>` instead.                     |
| `IntlayerConfig`      | The type defining the Intlayer configuration.                     |
| `ContentNode`         | A node in the dictionary content.                                 |
| `Locale`              | The type representing a locale.                                   |
| `LocalesValues`       | The possible values for a locale.                                 |
| `StrictModeLocaleMap` | A map of locales with strict type checking.                       |

### Content Functions

Import:

```tsx
import "intlayer";
```

| Function                 | Type       | Description                                                                                                       | Related Doc                                                                                            |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Picks content based on the current locale.                                                                        | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Picks content based on a quantity.                                                                                | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Picks content based on a boolean condition.                                                                       | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md)     |
| `gender`                 | `Function` | Picks content based on a gender.                                                                                  | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md)           |
| `insert`                 | `Function` | Inserts values into a content string.                                                                             | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Nests another dictionary.                                                                                         | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md)         |
| `md`                     | `Function` | Processes markdown content.                                                                                       | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)       |
| `html`                   | `Function` | Processes HTML content.                                                                                           | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/html.md)               |
| `file`                   | `Function` | Handles file content.                                                                                             | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)               |
| `getDictionary`          | `Function` | Processes objects that look like dictionaries (key, content). It processes `t()` translations, enumerations, etc. | -                                                                                                      |
| `getIntlayer`            | `Function` | Based on `getDictionary`, but injects an optimized version of the dictionary from the generated declaration.      | -                                                                                                      |

### Localization Utilities

Import:

```tsx
import "intlayer";
```

| Function               | Type       | Description                               | Related Doc                                                                                                                     |
| ---------------------- | ---------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Detects the locale from a string or path. | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Gets the language part of a locale.       | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Gets the display name of a locale.        | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)               |
| `getLocalizedUrl`      | `Function` | Generates a localized URL.                | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Generates URLs for all supported locales. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Removes the locale prefix from a path.    | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Gets the locale prefix from a path.       | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Gets the text direction (LTR/RTL).        | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Validates a locale prefix.                | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/validatePrefix.md)             |

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
