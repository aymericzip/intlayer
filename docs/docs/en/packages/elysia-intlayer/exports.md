---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer Package Documentation
description: Elysia plugin for Intlayer, providing translation functions and locale detection.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Unified documentation for all exports"
author: aymericzip
---

# elysia-intlayer Package

The `elysia-intlayer` package provides a plugin for Elysia applications to handle internationalization. It detects the user's locale and injects an `intlayer` object into the route context.

## Installation

```bash
npm install elysia-intlayer
```

## Exports

### Plugin

Import:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Function   | Description                                                                                                                                                                                                                                                                                                                    | Related Doc                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Elysia plugin that integrates Intlayer into your Elysia application. Handles locale detection from storage (cookies, headers) then from `Accept-Language`, injects an `intlayer` object exposing `locale`, `t`, `getIntlayer` and `getDictionary` into the route context, and sets up the `AsyncLocalStorage` request context. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/elysia-intlayer/intlayer.md) |

### Functions

Import:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Function        | Description                                                                                                                                                                                                                                                             | Related Doc                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Global translation function that retrieves content for the current locale in Elysia. Uses `AsyncLocalStorage` to access the request context set up by the `intlayer` plugin, and falls back to the default locale outside of it. Can also be accessed via `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md) |
| `getIntlayer`   | Retrieves a dictionary by its key from the generated declaration and returns its content for the current locale. Optimized version of `getDictionary`. Uses `AsyncLocalStorage` to access the request context. Can also be accessed via `intlayer.getIntlayer`.         | -                                                                                                      |
| `getDictionary` | Processes dictionary objects and returns content for the current locale. Processes `t()` translations, enumerations, markdown, HTML, etc. Uses `AsyncLocalStorage` to access the request context. Can also be accessed via `intlayer.getDictionary`.                    | -                                                                                                      |

### Types

Import:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Type                | Description                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Shape of the `intlayer` object injected into every route context: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Signature of the translation function, translating a locale map into the content matching the current request locale.                                                  |
