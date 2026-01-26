---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer Package Documentation
description: Express middleware for Intlayer, providing translation functions and locale detection.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# express-intlayer Package

The `express-intlayer` package provides a middleware for Express applications to handle internationalization. It detects the user's locale and provides translation functions.

## Installation

```bash
npm install express-intlayer
```

## Exports

### Middleware

Import:

```tsx
import "express-intlayer";
```

| Function   | Description                                                                                                                                                                                                                                                                 | Related Doc                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Express middleware that detects the user's locale and populates `res.locals` with Intlayer data. Performs locale detection from cookies/headers, injects `t`, `getIntlayer`, and `getDictionary` into `res.locals`, and sets up CLS namespace for request lifecycle access. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/intlayer.md) |

### Functions

Import:

```tsx
import "express-intlayer";
```

| Function        | Description                                                                                                                                                                                            | Related Doc                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Translation function that retrieves content for the current locale. Works within the request lifecycle managed by the `intlayer` middleware. Uses CLS (Async Local Storage) to access request context. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md) |
| `getIntlayer`   | Retrieves a dictionary by its key from the generated declaration and returns its content for the specified locale. Optimized version of `getDictionary`. Uses CLS to access request context.           | -                                                                                                      |
| `getDictionary` | Processes dictionary objects and returns content for the specified locale. Processes `t()` translations, enumerations, markdown, HTML, etc. Uses CLS to access request context.                        | -                                                                                                      |
