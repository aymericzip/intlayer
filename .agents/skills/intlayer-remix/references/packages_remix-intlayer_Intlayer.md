---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Intlayer Context Documentation | remix-intlayer
description: See how to use the Intlayer request context key and property in Remix 3 applications.
keywords:
  - Intlayer
  - remix
  - remix-3
  - context
  - RequestContext
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Intlayer Context Documentation

In `remix-intlayer`, `Intlayer` is the `RequestContext` key used to access internationalization state within Remix 3 request handlers.

## Usage

When the `intlayer()` middleware runs, it stores an `IntlayerState` object in the request context under the `Intlayer` key. You can retrieve it inside any route handler:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Access via context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

You can also access it using the direct property shorthand `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## `IntlayerState` Structure

The `IntlayerState` object contains:

| Property           | Type                | Description                                                   |
| ------------------ | ------------------- | ------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | The locale resolved for the current request.                  |
| `defaultLocale`    | `DeclaredLocales`   | The fallback locale defined in `intlayer.config.ts`.          |
| `availableLocales` | `DeclaredLocales[]` | The list of all supported locales configured for the project. |

## Related Documentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/remix-intlayer/useIntlayer.md)
