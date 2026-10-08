---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer Middleware Documentation | remix-intlayer
description: See how to use the intlayer middleware in Remix 3 applications for locale-based routing and request context management.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - routing
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# intlayer Remix 3 Middleware Documentation

The `intlayer` middleware for Remix 3 manages the internationalization layer across your application. Built on web standards (`Request` and `Response`), it handles locale routing (redirects and internal rewrites), detects the request locale, persists it to cookies and headers, and establishes an `AsyncLocalStorage` scope so that downstream handlers and components can access translations without prop drilling.

## Usage

Register the `intlayer` middleware when initializing your Remix 3 router:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Serves `/`, `/fr`, `/es`, the locale is resolved from the request
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Description

The `intlayer` middleware performs the following tasks:

1. **Dictionary Preparation**: Runs `prepareIntlayer` on startup to ensure all generated dictionaries are built and available.
2. **Locale Routing**: Evaluates the request against the configured routing strategy (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Redirects**: If a user visits `/about` and should be routed to a locale prefix (e.g. `/fr/about`), the middleware issues a redirect response with appropriate `location` and `Set-Cookie` headers.
   - **Internal Rewrites**: When a user accesses `/fr/about`, the URL is rewritten internally so your route handler matches `/about`, while the resolved locale is captured as `fr`.
   - **Localized URL Aliases**: Respects URL rewrite rules defined in `intlayer.config.ts` (e.g., rewriting `/fr/about` to `/fr/a-propos`).
3. **Locale Resolution**: Detects the active locale based on URL prefix, persisted cookies, custom headers, or `Accept-Language` browser preferences.
4. **Context Injection**:
   - Attaches `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) to the Remix `RequestContext` under the `Intlayer` key and `context.intlayer`.
   - Runs the rest of the request inside an `AsyncLocalStorage` scope (`requestStorage`), enabling `useIntlayer`, `useDictionary`, and `useLocale` to be invoked cleanly in handlers, views, and components.
5. **Persistence**: Attaches outgoing locale headers and cookies to the final HTTP response to persist the user's preference.

## Parameters

The `intlayer` function accepts optional `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Custom routing configuration overrides
};

const middleware = intlayer(options);
```

## Accessing Context Directly

In addition to using hooks, you can access the resolved `IntlayerState` directly from the Remix request context:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Via context.get()
  const state = context.get(Intlayer);

  // Or via direct context.intlayer property
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Related Documentation

- [`Intlayer` Context](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/remix-intlayer/Intlayer.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/remix-intlayer/useLocale.md)
