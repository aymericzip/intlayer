---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: hono-intlayer Package Documentation
description: Hono middleware for Intlayer, providing translation functions and locale detection.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Unified documentation for all exports
---

# hono-intlayer Package

The `hono-intlayer` package provides a middleware for Hono applications to handle internationalization. It detects the user's locale and populates the context object.

## Installation

```bash
npm install hono-intlayer
```

## Exports

### Middleware

Import:

```tsx
import { intlayer } from "hono-intlayer";
```

| Function   | Description                                                                                                                                                                                                                                                                        | Related Doc                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Hono middleware that integrates Intlayer into your Hono application. Handles locale detection from storage (cookies, headers), populates the context with `t`, `getIntlayer`, and `getDictionary`, and sets up CLS namespace for programmatic access during the request lifecycle. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/hono-intlayer/intlayer.md) |

### Functions

Import:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Function        | Description                                                                                                                                                                                                                             | Related Doc                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Global translation function that retrieves content for the current locale in Hono. Utilizes CLS (Async Local Storage) and must be used within a request context managed by the `intlayer` middleware. Can also be accessed via context. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md) |
| `getIntlayer`   | Retrieves a dictionary by its key from the generated declaration and returns its content for the specified locale. Optimized version of `getDictionary`. Uses CLS to access request context. Can also be accessed via context.          | -                                                                                                      |
| `getDictionary` | Processes dictionary objects and returns content for the specified locale. Processes `t()` translations, enumerations, markdown, HTML, etc. Uses CLS to access request context. Can also be accessed via context.                       | -                                                                                                      |
