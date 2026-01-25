---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer Package Documentation
description: Next.js-specific integration for Intlayer, providing middleware and providers for App Router and Page Router.
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
  - version: 1.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# next-intlayer Package

The `next-intlayer` package provides the necessary tools to integrate Intlayer into Next.js applications. It supports both the App Router and the Page Router, including middleware for locale-based routing.

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

| Function             | Description                                                                                                                                    | Related Doc                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js middleware to handle locale-based routing and redirects. Detects locale from headers/cookies and redirects to appropriate locale path. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/intlayerMiddleware.md) |

### Configuration Helpers

Import:

```tsx
import "next-intlayer/server";
```

| Function           | Description                                                                                                                                                          | Related Doc |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `withIntlayer`     | Asynchronous helper to wrap Next.js configuration, ensuring Intlayer dictionaries are prepared before build. Prepares content files and sets up webpack/SWC plugins. | -           |
| `withIntlayerSync` | Synchronous helper to wrap Next.js configuration, ideal for configurations where async is not possible/desired. Does not prepare dictionaries on server start.       | -           |

### Providers

Import:

```tsx
import "next-intlayer";
```

or

```tsx
import "next-intlayer/server";
```

| Component                | Description                                                                                                  | Related Doc |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------- |
| `IntlayerClientProvider` | Provider for client-side components in Next.js App Router. Wraps `IntlayerProvider` from react-intlayer.     | -           |
| `IntlayerServerProvider` | Provider for server-side components in Next.js (App Router). Provides locale context on the server.          | -           |
| `IntlayerServer`         | Server-side wrapper for Intlayer content in App Router. Ensures proper locale handling in Server Components. | -           |

### Hooks (Client-side)

Import:

```tsx
import "next-intlayer";
```

Re-exports most hooks from `react-intlayer`.

| Hook                   | Description                                                                                                                               | Related Doc                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Client-side hook that picks one dictionary by its key and returns its content. Uses the locale from context if not provided.              | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook that transforms a dictionary object and returns the content for the current locale. Processes `t()` translations, enumerations, etc. | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook that handles asynchronous dictionaries. Accepts a promise-based dictionary map and resolves it for the current locale.               | -                                                                                                                       |
| `useDictionaryDynamic` | Hook that handles dynamic dictionaries loaded by key. Uses React Suspense internally for loading states.                                  | -                                                                                                                       |
| `useLocale`            | Client-side hook to get the current locale and a function to set it. Enhanced for Next.js App Router with navigation support.             | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Client-side hook to manage URL rewrites. Automatically updates the URL if a prettier localized rewrite rule exists.                       | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Next.js Page Router specific hook for locale management. Handles redirections and page reloads upon locale changes.                       | -                                                                                                                       |
| `useI18n`              | Hook that provides a translation function `t()` for accessing nested content by key. Mimics i18next/next-intl pattern.                    | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook that provides a locale-bound `Intl` object. Automatically injects the current locale and uses optimized caching.                     | -                                                                                                                       |
| `useLoadDynamic`       | Hook to load dynamic dictionaries using React Suspense. Accepts a key and promise, caches results.                                        | -                                                                                                                       |

### Functions (Server-side)

Import:

```tsx
import "next-intlayer/server";
```

| Function               | Description                                                                                                                                        | Related Doc                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Server-side version of the translation function for Next.js App Router. Returns the translation of multilang content for the server locale.        | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md) |
| `getLocale`            | Helper function to extract the current locale from Next.js headers and cookies. Designed for Server Components, Server Actions, or Route Handlers. | -                                                                                                      |
| `generateStaticParams` | Generates static parameters for Next.js's dynamic routes based on configured locales. Returns array of locale objects for pre-rendering.           | -                                                                                                      |
| `locale`               | Function to get or set the locale in the server context (App Router). Provides locale management in Server Components.                             | -                                                                                                      |

### Types

Import:

```tsx
import "next-intlayer";
```

| Type                   | Description                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Type for Next.js pages with Intlayer support. Generic type that includes locale parameter.                             |
| `Next14PageIntlayer`   | Type for Next.js 14 pages with Intlayer support.                                                                       |
| `Next15PageIntlayer`   | Type for Next.js 15 pages with Intlayer support.                                                                       |
| `NextLayoutIntlayer`   | Type for Next.js layouts with Intlayer support. Generic type that includes locale parameter.                           |
| `Next14LayoutIntlayer` | Type for Next.js 14 layouts with Intlayer support.                                                                     |
| `Next15LayoutIntlayer` | Type for Next.js 15 layouts with Intlayer support.                                                                     |
| `LocalParams`          | Type for Next.js route parameters with locale. Object with `locale` property.                                          |
| `LocalPromiseParams`   | Type for Next.js route parameters with locale (async version). Promise that resolves to object with `locale` property. |
