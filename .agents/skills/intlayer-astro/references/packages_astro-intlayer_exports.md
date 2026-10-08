---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: astro-intlayer Package Documentation
description: Astro integration for Intlayer, providing setup for locale-based routing, middleware, hooks, client store, and dictionary management.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Add useIntlayer, useDictionary, useLocale hooks, middleware, and formatters documentation"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Unified documentation for all exports"
author: aymericzip
---

# astro-intlayer Package

The `astro-intlayer` package provides the necessary tools to integrate Intlayer into Astro applications. It configures locale-based routing, dictionary management, build-time page rewriting, request middleware, and hooks for accessing multilingual content across both server-rendered `.astro` components and client-side scripts.

## Installation

```bash
npm install astro-intlayer
```

## Exports

### Integration

The `astro-intlayer` package provides an Astro integration that sets up Intlayer in your project.

Import:

```tsx
import { intlayer } from "astro-intlayer";
```

or default import in `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Function   | Description                                                                                                                                                                                                 | Related Doc                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Astro integration that prepares dictionaries, configures Vite plugins (aliases, routing proxy, prune), automatically registers request middleware, and emits prerendered pages at localized rewritten URLs. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/intlayer.md) |

### Hooks (Server & Client)

Import:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Description                                                                                                                                                                                        | Related Doc                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Picks one dictionary by its key and returns its localized content. In `.astro` frontmatter, it reads the request locale from `Astro.locals`. In client `<script>`, it reads from the client store. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforms a dictionary object and returns content for the resolved locale. Works in frontmatter and client scripts.                                                                               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Returns the current locale, default locale, available locales, and a function to update the locale.                                                                                                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Import:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Export      | Type                | Description                                                                                                                                                       | Related Doc                                                                                                     |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Astro middleware that detects the request locale and attaches `Astro.locals.intlayer`. Registered automatically by `intlayer()`, or imported manually to compose. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/onRequest.md) |

### Utilities

Import:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Function            | Description                                                                                                             | Related Doc |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------- |
| `getIntlayerLocals` | Helper function to retrieve the current `IntlayerLocals` object from the request storage scope outside of Astro.locals. | -           |

### Client Utilities (astro-intlayer/client)

Import:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

When imported in the browser or inside client `<script>` tags, `astro-intlayer` automatically maps to `astro-intlayer/client` (powered by `vanilla-intlayer`), providing client-side dictionary getters, store subscribers, and locale persistence tools.

### Formatters (astro-intlayer/format)

Import:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| Hook              | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Returns an Intl instance bound to the request or client locale with caching and subscription capabilities. |
| `useDate`         | Returns a date formatting function pre-bound to the current locale (`Intl.DateTimeFormat`).                |
| `useNumber`       | Returns a number formatting function pre-bound to the current locale (`Intl.NumberFormat`).                |
| `useCurrency`     | Returns a currency formatting function pre-bound to the current locale.                                    |
| `usePercentage`   | Returns a percentage formatting function pre-bound to the current locale.                                  |
| `useRelativeTime` | Returns a relative time formatting function pre-bound to the current locale (`Intl.RelativeTimeFormat`).   |
| `useList`         | Returns a list formatting function pre-bound to the current locale (`Intl.ListFormat`).                    |
| `useUnit`         | Returns a unit formatting function pre-bound to the current locale.                                        |
| `useCompact`      | Returns a compact number formatting function pre-bound to the current locale (e.g. `1.5K`).                |

### HTML Utilities (astro-intlayer/html)

Import:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Export            | Type       | Description                                              |
| ----------------- | ---------- | -------------------------------------------------------- |
| `renderHTML`      | `Function` | Standalone utility function to render HTML nodes.        |
| `useHTML`         | `Hook`     | Hook to get the HTML provider context and configuration. |
| `useHTMLRenderer` | `Hook`     | Hook to obtain a pre-configured HTML renderer function.  |

### Markdown Utilities (astro-intlayer/markdown)

Import:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Export                | Type       | Description                                                 |
| --------------------- | ---------- | ----------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compiles markdown strings into structured representation.   |
| `renderMarkdown`      | `Function` | Renders markdown content into output nodes.                 |
| `parseMarkdown`       | `Function` | Parses raw markdown content into an AST.                    |
| `useMarkdown`         | `Hook`     | Hook to get the markdown provider context.                  |
| `useMarkdownRenderer` | `Hook`     | Hook to obtain a pre-configured Markdown renderer function. |

### Types

Import:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Type              | Description                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `IntlayerLocals`  | The object attached to `Astro.locals.intlayer` containing `locale`, `defaultLocale`, and `availableLocales`. |
| `UseLocaleProps`  | Optional configuration properties accepted by `useLocale()`.                                                 |
| `UseLocaleResult` | The return type of `useLocale()`, providing locale properties and update methods.                            |
