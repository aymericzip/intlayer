---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer Package Documentation
description: Next.js-specific integration for Intlayer, providing middleware and providers for the App Router and the Pages Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# next-intlayer Package

The `next-intlayer` package provides the necessary tools to integrate Intlayer into Next.js applications. It supports both the App Router and the Pages Router, including middleware for locale-based routing.

## Installation

```bash
npm install next-intlayer
```

## Exports

### Middleware

Import:

```tsx
import "next-intlayer/middleware";
```

| Function             | Description                                                                                                                                    | Related documentation                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js middleware to handle locale-based routing and redirects. Detects locale from headers/cookies and redirects to appropriate locale path. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/intlayerMiddleware.md) |

### Configuration Helpers

Import:

```tsx
import "next-intlayer/server";
```

| Function           | Description                                                                                                                                                                              | Related Doc |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `withIntlayer`     | Asynchronous helper to wrap Next.js configuration, ensuring Intlayer dictionaries are prepared before the build. Prepares content files and sets up webpack/SWC plugins.                 | -           |
| `withIntlayerSync` | Synchronous helper to wrap Next.js configuration, ideal for configurations where asynchronous operations are not possible or not desired. Does not prepare dictionaries on server start. | -           |

### Providers

Import:

```tsx
import "next-intlayer";
```

or

```tsx
import "next-intlayer/server";
```

| Component                | Description                                                                                                       | Related Doc |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| `IntlayerClientProvider` | Provider for client-side components in the Next.js App Router. Wraps `IntlayerProvider` from react-intlayer.      | -           |
| `IntlayerServerProvider` | Provider for server-side components in the Next.js App Router. Provides the locale context on the server.         | -           |
| `IntlayerServer`         | Server-side wrapper for Intlayer content in the App Router. Ensures correct locale handling in Server Components. | -           |

### Hooks (Client-side)

Import:

```tsx
import "next-intlayer";
```

Re-exports most hooks from `react-intlayer`.

| Hook                   | Description                                                                                                                               | Related documentation                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Client-side hook that selects a dictionary by its key and returns its content. Uses the locale from context if not provided.              | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook that transforms a dictionary object and returns the content for the current locale. Processes `t()` translations, enumerations, etc. | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook that handles asynchronous dictionaries. Accepts a promise-based dictionary map and resolves it for the current locale.               | -                                                                                                                          |
| `useDictionaryDynamic` | Hook that handles dynamic dictionaries loaded by key. Uses React Suspense internally for loading states.                                  | -                                                                                                                          |
| `useLocale`            | Client-side hook to retrieve the current locale and a function to set it. Enhanced for the Next.js App Router with navigation support.    | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Client-side hook to manage URL rewrites. Automatically updates the URL if a prettier localised rewrite rule exists.                       | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Next.js Page Router-specific hook for locale management. Handles redirections and page reloads when the locale changes.                   | -                                                                                                                          |
| `useI18n`              | Hook that provides a translation function `t()` for accessing nested content by key. Mimics the i18next/next-intl pattern.                | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook that provides a locale-bound `Intl` object. Automatically injects the current locale and uses optimised caching.                     | -                                                                                                                          |
| `useLoadDynamic`       | Hook to load dynamic dictionaries using React Suspense. Accepts a key and a promise, and caches results.                                  | -                                                                                                                          |

### Functions (Server-side)

Import:

```tsx
import "next-intlayer/server";
```

| Function               | Description                                                                                                                                        | Related doc                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `t`                    | Server-side version of the translation function for Next.js App Router. Returns the translation of multilingual content for the server locale.     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md) |
| `getLocale`            | Helper function to extract the current locale from Next.js headers and cookies. Intended for Server Components, Server Actions, or Route Handlers. | -                                                                                                         |
| `generateStaticParams` | Generates static parameters for Next.js dynamic routes based on configured locales. Returns an array of locale objects for pre-rendering.          | -                                                                                                         |
| `locale`               | Function to get or set the locale in the server context (App Router). Provides locale management in Server Components.                             | -                                                                                                         |

### Types

Import:

```tsx
import "next-intlayer";
```

| Type                   | Description                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `NextPageIntlayer`     | Type for Next.js pages with Intlayer support. Generic type that includes a locale parameter.                                         |
| `Next14PageIntlayer`   | Type for Next.js 14 pages with Intlayer support.                                                                                     |
| `Next15PageIntlayer`   | Type for Next.js 15 pages with Intlayer support.                                                                                     |
| `NextLayoutIntlayer`   | Type for Next.js layouts with Intlayer support. Generic type that includes a locale parameter.                                       |
| `Next14LayoutIntlayer` | Type for Next.js 14 layouts with Intlayer support.                                                                                   |
| `Next15LayoutIntlayer` | Type for Next.js 15 layouts with Intlayer support.                                                                                   |
| `LocalParams`          | Type for Next.js route parameters with a locale. Object with a `locale` property.                                                    |
| `LocalPromiseParams`   | Type for Next.js route parameters with a locale (asynchronous version). Promise that resolves to an object with a `locale` property. |
