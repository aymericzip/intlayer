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

| Component                 | Description                                                                                                                  | Related documentation                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | The main provider that wraps your application and provides the Intlayer context. Includes editor support enabled by default. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | A provider component focused on content, without the editor features. Use this when you do not require the visual editor.    | -                                                                                                                                |
| `HTMLProvider`            | Provider for HTML-related internationalisation settings. Allows component overrides for HTML elements.                       | -                                                                                                                                |

### Hooks

Import:

```tsx
import "react-intlayer";
```

| Hook                   | Description                                                                                                                               | Related Doc                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Client-side hook that selects a dictionary by its key and returns its content. Uses the locale from the context if not provided.          | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useIntlayer.md)          |
| `useDictionary`        | Hook that transforms a dictionary object and returns the content for the current locale. Processes `t()` translations, enumerations, etc. | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useDictionary.md)      |
| `useDictionaryAsync`   | Hook that handles asynchronous dictionaries. Accepts a promise-based dictionary map and resolves it for the current locale.               | -                                                                                                                               |
| `useDictionaryDynamic` | Hook that handles dynamic dictionaries loaded by key. Uses React Suspense internally to manage loading states.                            | -                                                                                                                               |
| `useLocale`            | Client-side hook to get the current locale, default locale, available locales, and a function to change the locale.                       | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useLocale.md)              |
| `useLocaleBase`        | Hook to obtain the current locale and all related fields (locale, defaultLocale, availableLocales, setLocale) from context.               | -                                                                                                                               |
| `useRewriteURL`        | Client-side hook to manage URL rewrites. If a rewrite rule exists for the current pathname and locale, it will update the URL.            | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook that provides a translation function `t()` for accessing nested content by key. Emulates i18next/next-intl pattern.                  | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useI18n.md)                  |
| `useIntl`              | Hook that provides a locale-bound `Intl` object. Automatically injects the current locale and uses optimised caching.                     | -                                                                                                                               |
| `useLocaleStorage`     | Hook that provides locale persistence in localStorage or cookies. Returns getter and setter functions.                                    | -                                                                                                                               |
| `useLocaleCookie`      | Deprecated. Use `useLocaleStorage` instead. Hook that manages locale persistence via cookies.                                             | -                                                                                                                               |
| `useLoadDynamic`       | Hook to load dynamic dictionaries using React Suspense. Accepts a key and a promise; caches the results.                                  | -                                                                                                                               |
| `useIntlayerContext`   | Hook that provides the current Intlayer client context values (locale, setLocale, etc.).                                                  | -                                                                                                                               |
| `useHTMLContext`       | Hook to access HTML component overrides from the HTMLProvider context.                                                                    | -                                                                                                                               |

### Functions

Import:

```tsx
import "react-intlayer";
```

| Function             | Description                                                                                                                                              | Related Doc                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `t`                  | Client-side translation function that returns the translation of the provided multilingual content. Uses the context locale if none is provided.         | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md) |
| `getDictionary`      | Processes dictionary objects and returns the content for the specified locale. Processes `t()` translations, enumerations, Markdown, HTML, etc.          | -                                                                                                         |
| `getIntlayer`        | Retrieves a dictionary by its key from the generated declaration and returns its content for the specified locale. Optimised version of `getDictionary`. | -                                                                                                         |
| `setLocaleInStorage` | Sets the locale in storage (local storage or cookie, depending on configuration).                                                                        | -                                                                                                         |
| `setLocaleCookie`    | Deprecated. Use `setLocaleInStorage` instead. Sets the locale in a cookie.                                                                               | -                                                                                                         |
| `localeInStorage`    | Retrieves the locale from storage (local storage or cookie).                                                                                             | -                                                                                                         |
| `localeCookie`       | Deprecated. Use `localeInStorage` instead. Retrieves the locale from a cookie.                                                                           | -                                                                                                         |

### Components

Import:

```tsx
import "react-intlayer";
```

or

```tsx
import "react-intlayer/markdown";
```

| Component          | Description                                                                                                            | Related documentation                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Provider for Markdown rendering context. Allows custom component overrides for Markdown elements.                      | -                                                                                                                                |
| `MarkdownRenderer` | Renders Markdown content with custom components. Supports all standard Markdown features and Intlayer-specific syntax. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/MarkdownRenderer.md) |

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
| `useLocale`              | `Hook`      | Hook to access the locale on the server side.    |
| `useIntlayer`            | `Hook`      | Server-side version of `useIntlayer`.            |
| `useDictionary`          | `Hook`      | Server-side version of `useDictionary`.          |
| `useI18n`                | `Hook`      | Server-side version of `useI18n`.                |
| `locale`                 | `Function`  | Function to get or set the locale on the server. |
