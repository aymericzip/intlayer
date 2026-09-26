---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: remix-intlayer Package Documentation
description: Remix 3 integration for Intlayer, providing middleware, context, hooks, and formatters for locale-based routing and content management.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Unified documentation for all exports"
author: aymericzip
---

# remix-intlayer Package

The `remix-intlayer` package provides the necessary tools to integrate Intlayer into Remix 3 applications. Built entirely on web standards (`Request`, `Response`, `Headers`, and `URL`), it offers a router middleware for locale-based routing and internal rewrites, context storage, hooks, and formatting utilities for seamless multilingual content management.

## Installation

```bash
npm install remix-intlayer
```

## Exports

### Middleware

Import:

```tsx
import { intlayer } from "remix-intlayer";
```

| Function   | Description                                                                                                                                                                                            | Related Doc                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Remix 3 router middleware that handles locale-based routing (redirects and internal rewrites), resolves the request locale, persists it in cookies/headers, and establishes the request context scope. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/intlayerMiddleware.md) |

### Context

Import:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| Export                      | Type         | Description                                                                                                                                        | Related Doc                                                                                                      |
| --------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | RequestContext key holding the `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) for the current request.                            | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | Property name (`'intlayer'`) installed directly on the request context, allowing access via `context.intlayer` as well as `context.get(Intlayer)`. | -                                                                                                                |

### Hooks

Import:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| Hook            | Description                                                                                                                                        | Related Doc                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Picks one dictionary by its key and returns its content for the locale of the request being handled. Automatically reads from the request context. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforms an imported dictionary object and returns its content for the current request locale. Supports selector overrides.                      | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Returns the resolved locale of the current request, along with the configured `defaultLocale` and `availableLocales`.                              | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useLocale.md)         |

### Utilities

Import:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Function              | Description                                                                                                                          | Related Doc |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `createLocaleRouting` | Pure function that computes locale routing decisions (`redirect`, `rewrite`, or `pass`) given a request, configuration, and options. | -           |
| `getIntlayerState`    | Reads the current `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) from the `AsyncLocalStorage` request scope.        | -           |

### Formatters (remix-intlayer/format)

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
} from "remix-intlayer/format";
```

| Hook              | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Returns an Intl instance bound to the request locale with caching and subscription capabilities.         |
| `useDate`         | Returns a date formatting function pre-bound to the request locale (`Intl.DateTimeFormat`).              |
| `useNumber`       | Returns a number formatting function pre-bound to the request locale (`Intl.NumberFormat`).              |
| `useCurrency`     | Returns a currency formatting function pre-bound to the request locale.                                  |
| `usePercentage`   | Returns a percentage formatting function pre-bound to the request locale.                                |
| `useRelativeTime` | Returns a relative time formatting function pre-bound to the request locale (`Intl.RelativeTimeFormat`). |
| `useList`         | Returns a list formatting function pre-bound to the request locale (`Intl.ListFormat`).                  |
| `useUnit`         | Returns a unit formatting function pre-bound to the request locale.                                      |
| `useCompact`      | Returns a compact number formatting function pre-bound to the request locale (e.g. `1.5K`).              |

### HTML Utilities (remix-intlayer/html)

Import:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Export            | Type       | Description                                                     |
| ----------------- | ---------- | --------------------------------------------------------------- |
| `renderHTML`      | `Function` | Standalone utility function to render HTML nodes outside of UI. |
| `useHTML`         | `Hook`     | Hook to get the HTML provider context and configuration.        |
| `useHTMLRenderer` | `Hook`     | Hook to obtain a pre-configured HTML renderer function.         |

### Markdown Utilities (remix-intlayer/markdown)

Import:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Type                        | Description                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | The state object holding `locale`, `defaultLocale`, and `availableLocales` stored in the Remix request context. |
| `IntlayerMiddlewareOptions` | Configuration options passed to the `intlayer()` middleware.                                                    |
| `LocaleRoutingOptions`      | Options customising locale prefixing, detection, and redirects.                                                 |
| `LocaleRoutingAction`       | Discriminated union representing the routing decision: `redirect`, `rewrite`, or `pass`.                        |
| `LocaleRoutingRequest`      | Minimal request representation required by `createLocaleRouting`.                                               |
| `UseLocaleResult`           | Return type of `useLocale()`, containing `locale`, `defaultLocale`, and `availableLocales`.                     |
