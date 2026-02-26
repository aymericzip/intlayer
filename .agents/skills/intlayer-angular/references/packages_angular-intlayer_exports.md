---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer Package Documentation
description: Angular-specific integration for Intlayer, providing providers and services for Angular applications.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# angular-intlayer Package

The `angular-intlayer` package provides the necessary tools to integrate Intlayer into Angular applications. It includes providers and services for handling multilingual content.

## Installation

```bash
npm install angular-intlayer
```

## Exports

Import:

```tsx
import "angular-intlayer";
```

### Setup

| Function          | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `provideIntlayer` | Function to provide Intlayer in your Angular application. |

### Hooks

| Hook                   | Description                                                                                                       | Related Doc |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| `useIntlayer`          | Based on `useDictionary`, but injects an optimized version of the dictionary from the generated declaration.      | -           |
| `useDictionary`        | Processes objects that look like dictionaries (key, content). It processes `t()` translations, enumerations, etc. | -           |
| `useDictionaryAsync`   | Same as `useDictionary`, but handles asynchronous dictionaries.                                                   | -           |
| `useDictionaryDynamic` | Same as `useDictionary`, but handles dynamic dictionaries.                                                        | -           |
| `useLocale`            | Returns the current locale and a function to set it.                                                              | -           |
| `useIntl`              | Returns the Intl object for the current locale.                                                                   | -           |
| `useLoadDynamic`       | Hook to load dynamic dictionaries.                                                                                | -           |

### Components

| Component                   | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `IntlayerMarkdownComponent` | Angular component that renders markdown content. |
