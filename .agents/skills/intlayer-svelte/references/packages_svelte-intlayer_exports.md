---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer Package Documentation
description: Svelte-specific integration for Intlayer, providing setup functions and stores for Svelte applications.
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# svelte-intlayer Package

The `svelte-intlayer` package provides the necessary tools to integrate Intlayer into Svelte applications. It includes setup functions and stores for handling multilingual content.

## Installation

```bash
npm install svelte-intlayer
```

## Exports

### Setup

Import:

```tsx
import "svelte-intlayer";
```

| Function        | Description                                            |
| --------------- | ------------------------------------------------------ |
| `setupIntlayer` | Function to setup Intlayer in your Svelte application. |

### Store

Import:

```tsx
import "svelte-intlayer";
```

| Store           | Description                                            |
| --------------- | ------------------------------------------------------ |
| `intlayerStore` | Svelte store that contains the current Intlayer state. |

### Hooks (Context)

Import:

```tsx
import "svelte-intlayer";
```

| Function               | Description                                                                                                       | Related Doc                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Based on `useDictionary`, but injects an optimized version of the dictionary from the generated declaration.      | -                                                                                                                        |
| `useDictionary`        | Processes objects that look like dictionaries (key, content). It processes `t()` translations, enumerations, etc. | -                                                                                                                        |
| `useDictionaryAsync`   | Same as `useDictionary`, but handles asynchronous dictionaries.                                                   | -                                                                                                                        |
| `useDictionaryDynamic` | Same as `useDictionary`, but handles dynamic dictionaries.                                                        | -                                                                                                                        |
| `useLocale`            | Returns the current locale and a function to set it.                                                              | -                                                                                                                        |
| `useRewriteURL`        | Client-side function to manage URL rewrites. Automatically updates the URL if a localized rewrite rule exists.    | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Returns the Intl object for the current locale.                                                                   | -                                                                                                                        |

### Markdown

Import:

```tsx
import "svelte-intlayer";
```

| Function              | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `setIntlayerMarkdown` | Function to set the markdown context in your Svelte application. |
