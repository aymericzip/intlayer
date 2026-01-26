---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer Package Documentation
description: Solid-specific integration for Intlayer, providing providers and hooks for Solid applications.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# solid-intlayer Package

The `solid-intlayer` package provides the necessary tools to integrate Intlayer into Solid applications. It includes providers and hooks for handling multilingual content.

## Installation

```bash
npm install solid-intlayer
```

## Exports

### Provider

Import:

```tsx
import "solid-intlayer";
```

| Component          | Description                                                                         | Related doc                                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | The primary provider that wraps your application and supplies the Intlayer context. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Import:

```tsx
import "solid-intlayer";
```

| Hook                   | Description                                                                                                  | Related Doc                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Based on `useDictionary`, but injects an optimised version of the dictionary from the generated declaration. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Processes objects resembling dictionaries (key, content). Handles `t()` translations, enumerations, etc.     | -                                                                                                                          |
| `useDictionaryAsync`   | Same as `useDictionary`, but handles asynchronous dictionaries.                                              | -                                                                                                                          |
| `useDictionaryDynamic` | Same as `useDictionary`, but handles dynamic dictionaries.                                                   | -                                                                                                                          |
| `useLocale`            | Returns the current locale and a function to set it.                                                         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Client-side hook to manage URL rewrites. Automatically updates the URL if a localised rewrite rule exists.   | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Returns the Intl object for the current locale.                                                              | -                                                                                                                          |
| `useLoadDynamic`       | Hook to load dynamic dictionaries.                                                                           | -                                                                                                                          |
| `t`                    | Selects content based on the current locale.                                                                 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md)                  |

### Components

Import:

```tsx
import "solid-intlayer";
```

| Component          | Description                              |
| ------------------ | ---------------------------------------- |
| `MarkdownProvider` | Provider for Markdown rendering context. |
