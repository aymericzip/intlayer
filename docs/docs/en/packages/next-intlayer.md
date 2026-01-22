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
history:
  - version: 8.0.0
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

| Function             | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js middleware to handle locale-based routing and redirects. |

### Providers

| Component                | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `IntlayerClientProvider` | Provider for client-side components in Next.js.              |
| `IntlayerServerProvider` | Provider for server-side components in Next.js (App Router). |

### Hooks (Client-side)

Re-exports most hooks from `react-intlayer`.

| Hook            | Description                                              |
| --------------- | -------------------------------------------------------- |
| `useIntlayer`   | Picks one dictionary by its key and returns the content. |
| `useDictionary` | Picks one dictionary by its key and returns the content. |
| `useLocale`     | Returns the current locale and a function to set it.     |
| `useI18n`       | Returns the current Intlayer context values.             |

### Functions (Server-side)

| Function               | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `t`                    | Server-side version of the translation function for Next.js App Router. |
| `generateStaticParams` | Generates static parameters for Next.js's dynamic routes.               |

### Types

| Type                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| `NextPageIntlayer`   | Type for Next.js pages with Intlayer support.   |
| `NextLayoutIntlayer` | Type for Next.js layouts with Intlayer support. |
