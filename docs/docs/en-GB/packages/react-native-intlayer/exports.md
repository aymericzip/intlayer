---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer Package Documentation
description: React Native support for Intlayer, providing providers, hooks, polyfills, and Metro configuration.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Re-export the full react-intlayer API (hooks, utilities, format/html/markdown subpaths) so a React Native app only depends on react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Unified documentation for all exports"
author: aymericzip
---

# react-native-intlayer Package

The `react-native-intlayer` package provides the necessary tools to integrate Intlayer into React Native applications. It re-exports the full `react-intlayer` API (hooks and utilities) with a React Native-ready `IntlayerProvider`, plus the polyfills and Metro configuration required by React Native.

> In a React Native app, import **everything** from `react-native-intlayer`. You do not need to install or import `react-intlayer` directly.

## Installation

```bash
npm install react-native-intlayer
```

## Exports

### Provider

| Component          | Description                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider component that wraps your application and provides the Intlayer context. Automatically applies the required polyfills. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooks and utilities

These are re-exported from `react-intlayer`, so you can import them straight from `react-native-intlayer`:

| Export                                                                                                            | Description                                    |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `useIntlayer`                                                                                                     | Access localised content for a dictionary key. |
| `useLocale`                                                                                                       | Read and change the current locale.            |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Load dictionary content in various ways.       |
| `useI18n`                                                                                                         | i18next-compatible hook.                       |
| `t`                                                                                                               | Inline translation helper.                     |
| `getIntlayer`, `getDictionary`                                                                                    | Imperative content getters.                    |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Locale persistence helpers.                    |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Function           | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Function that applies necessary polyfills for React Native to support Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> The polyfill is applied automatically when you import `IntlayerProvider`. Call `intlayerPolyfill` manually only if you need the polyfills before the provider mounts.

### Formatters

Number, date, and other Intl-based formatting hooks are available from the `/format` subpath:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown and HTML rendering

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro Configuration

The `react-native-intlayer` package provides Metro configuration utilities to ensure that Intlayer works correctly with React Native.

| Function                  | Description                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Asynchronous function that prepares Intlayer and merges the Metro configuration.               |
| `configMetroIntlayerSync` | Synchronous function that merges the Metro configuration without preparing Intlayer resources. |
| `exclusionList`           | Creates a RegExp pattern for Metro's blockList to exclude content files from the bundle.       |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
