---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: onRequest Middleware Documentation | astro-intlayer
description: See how to use the onRequest middleware in Astro applications to resolve the request locale and populate Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# onRequest Astro Middleware Documentation

The `onRequest` middleware from `astro-intlayer/middleware` resolves the locale of each incoming HTTP request and populates `Astro.locals.intlayer`.

When you register the `intlayer()` integration in `astro.config.mjs`, this middleware is injected automatically. You only need to import it directly if you are manually composing Astro middleware using `sequence(...)`.

## Usage

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Access the resolved locale in your custom middleware
  const { locale } = context.locals.intlayer;
  console.log(`Handling request for locale: ${locale}`);

  return next();
});
```

## Description

The middleware performs the following:

1. **Locale Detection**:
   - **URL**: Analyzes the URL path prefix or `?locale=` search parameter (unless `routing.mode` is set to `no-prefix`).
   - **Cookies / Headers**: Checks persisted locale cookies or custom header values.
   - **Accept-Language**: Falls back to the browser's preferred language negotiation.
   - For prerendered pages (`context.isPrerendered`), the locale is extracted strictly from the URL to prevent Astro build warnings.
2. **Context Population**: Populates `Astro.locals.intlayer` with:
   - `locale`: The resolved locale.
   - `defaultLocale`: The default fallback locale.
   - `availableLocales`: The array of configured locales.
3. **AsyncLocalStorage Scope**: Wraps the downstream request processing inside an `AsyncLocalStorage` scope, allowing `useIntlayer()`, `useDictionary()`, and `useLocale()` to access request state without passing arguments.

## `IntlayerLocals` Type

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Related Documentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useLocale.md)
