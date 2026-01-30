---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: adonis-intlayer Package Documentation
description: AdonisJS middleware for Intlayer, providing translation functions and locale detection.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Initial documentation
---

# adonis-intlayer Package

The `adonis-intlayer` package provides a middleware for AdonisJS applications to handle internationalisation. It detects the user's locale and provides translation functions.

## Installation

```bash
npm install adonis-intlayer
```

## Exports

### Middleware

The package provides an AdonisJS middleware to handle internationalisation.

| Function             | Description                                                                                                                                                                                                                                                     | Related Doc                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | AdonisJS middleware that detects the user's locale and populates the request context with Intlayer data. It also sets up a CLS (Async Local Storage) namespace for request lifecycle access, enabling the use of global functions like `t`, `getIntlayer`, etc. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/adonis-intlayer/intlayer.md) |

### Functions

| Function        | Description                                                                                                                                                                                            | Related Doc                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `t`             | Translation function that retrieves content for the current locale. Works within the request lifecycle managed by the `intlayer` middleware. Uses CLS (Async Local Storage) to access request context. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md) |
| `getIntlayer`   | Retrieves a dictionary by its key from the generated declaration and returns its content for the specified locale. Optimised version of `getDictionary`. Uses CLS to access request context.           | -                                                                                                         |
| `getDictionary` | Processes dictionary objects and returns content for the specified locale. Processes `t()` translations, enumerations, markdown, HTML, etc. Uses CLS to access request context.                        | -                                                                                                         |
| `getLocale`     | Retrieves the current locale from the request context using CLS.                                                                                                                                       | -                                                                                                         |
