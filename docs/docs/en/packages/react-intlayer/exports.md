---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer Package Documentation
description: React-specific implementation of Intlayer, providing hooks and providers for React applications.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# react-intlayer Package

The `react-intlayer` package provides the necessary tools to integrate Intlayer into React applications. It includes context providers, hooks, and components for handling multilingual content.

## Installation

```bash
npm install react-intlayer
```

## Exports

### Providers

Import:

```tsx
import "react-intlayer";
```

| Component                 | Description                                                                                                          | Related Doc                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | The main provider that wraps your application and provides the Intlayer context. Includes editor support by default. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | A provider component focused on content without the editor features. Use this when you don't need the visual editor. | -                                                                                                                             |
| `HTMLProvider`            | Provider for HTML-related internationalization settings. Allows component overrides for HTML tags.                   | -                                                                                                                             |

### Hooks

Import:

```tsx
import "react-intlayer";
```

| Hook                   | Description                                                                                                                               | Related Doc                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Client-side hook that picks one dictionary by its key and returns its content. Uses the locale from context if not provided.              | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook that transforms a dictionary object and returns the content for the current locale. Processes `t()` translations, enumerations, etc. | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook that handles asynchronous dictionaries. Accepts a promise-based dictionary map and resolves it for the current locale.               | -                                                                                                                       |
| `useDictionaryDynamic` | Hook that handles dynamic dictionaries loaded by key. Uses React Suspense internally for loading states.                                  | -                                                                                                                       |
| `useLocale`            | Client-side hook to get the current locale, default locale, available locales, and a function to update the locale.                       | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook to get the current locale and all related fields (locale, defaultLocale, availableLocales, setLocale) from context.                  | -                                                                                                                       |
| `useI18n`              | Hook that provides a translation function `t()` for accessing nested content by key. Mimics i18next/next-intl pattern.                    | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook that provides a locale-bound `Intl` object. Automatically injects the current locale and uses optimized caching.                     | -                                                                                                                       |
| `useLocaleStorage`     | Hook that provides locale persistence in local storage or cookies. Returns getter and setter functions.                                   | -                                                                                                                       |
| `useLocaleCookie`      | Deprecated. Use `useLocaleStorage` instead. Hook that manages locale persistence in cookies.                                              | -                                                                                                                       |
| `useLoadDynamic`       | Hook to load dynamic dictionaries using React Suspense. Accepts a key and promise, caches results.                                        | -                                                                                                                       |
| `useIntlayerContext`   | Hook that provides the current Intlayer client context values (locale, setLocale, etc.).                                                  | -                                                                                                                       |
| `useHTMLContext`       | Hook to access HTML component overrides from HTMLProvider context.                                                                        | -                                                                                                                       |

### Functions

Import:

```tsx
import "react-intlayer";
```

| Function             | Description                                                                                                                                              | Related Doc                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                  | Client-side translation function that returns the translation of the provided multilang content. Uses context locale if not provided.                    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md) |
| `getDictionary`      | Processes dictionary objects and returns content for the specified locale. Processes `t()` translations, enumerations, markdown, HTML, etc.              | -                                                                                                      |
| `getIntlayer`        | Retrieves a dictionary by its key from the generated declaration and returns its content for the specified locale. Optimized version of `getDictionary`. | -                                                                                                      |
| `setLocaleInStorage` | Sets the locale in storage (local storage or cookie based on configuration).                                                                             | -                                                                                                      |
| `setLocaleCookie`    | Deprecated. Use `setLocaleInStorage` instead. Sets the locale in a cookie.                                                                               | -                                                                                                      |
| `localeInStorage`    | Gets the locale from storage (local storage or cookie).                                                                                                  | -                                                                                                      |
| `localeCookie`       | Deprecated. Use `localeInStorage` instead. Gets the locale from cookie.                                                                                  | -                                                                                                      |

### Components

Import:

```tsx
import "react-intlayer";
```

or

```tsx
import "react-intlayer/markdown";
```

| Component          | Description                                                                                                            | Related Doc                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Provider for markdown rendering context. Allows custom component overrides for markdown elements.                      | -                                                                                                                             |
| `MarkdownRenderer` | Renders markdown content with custom components. Supports all standard markdown features and Intlayer-specific syntax. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/MarkdownRenderer.md) |

### Types

Import:

```tsx
import "react-intlayer";
```

| Type           | Description                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Type representing a node in the Intlayer content tree. Used for type-safe content manipulation. |

### Server-side (react-intlayer/server)

Import:

```tsx
import "react-intlayer/server";
```

| Export                   | Type        | Description                                      |
| ------------------------ | ----------- | ------------------------------------------------ |
| `IntlayerServerProvider` | `Component` | Provider for server-side rendering.              |
| `IntlayerServer`         | `Component` | Server-side wrapper for Intlayer content.        |
| `t`                      | `Function`  | Server-side version of the translation function. |
| `useLocale`              | `Hook`      | Hook to access locale on the server side.        |
| `useIntlayer`            | `Hook`      | Server-side version of `useIntlayer`.            |
| `useDictionary`          | `Hook`      | Server-side version of `useDictionary`.          |
| `useI18n`                | `Hook`      | Server-side version of `useI18n`.                |
| `locale`                 | `Function`  | Function to get or set the locale on the server. |
