---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: intlayer Elysia Plugin Documentation | elysia-intlayer
description: See how to use the intlayer plugin for elysia-intlayer package
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Init doc"
author: aymericzip
---

# intlayer Elysia Plugin Documentation

The `intlayer` plugin for Elysia detects the user's locale and injects an `intlayer` object into the route context. It also enables the use of global translation functions within the request context.

## Usage

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  })
);
```

The same helpers are available as standalone exports, so you can call them without destructuring the route context:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Description

The plugin performs the following tasks:

1. **Locale Detection**: It reads the locale explicitly set by the client from storage (cookie, header), then falls back to the locale negotiated from the `Accept-Language` header.
2. **Context Injection**: It adds an `intlayer` property to the Elysia route context, containing:
   - `locale`: The locale to use for this request, `locale_storage` taking precedence over `locale_detected`.
   - `locale_storage`: The locale explicitly requested by the client through a cookie or a header.
   - `locale_detected`: The locale negotiated from the request headers.
   - `defaultLocale`: The locale configured as fallback in `intlayer.config.ts`.
   - `t`: A translation function.
   - `getIntlayer`: A function to retrieve dictionaries by key.
   - `getDictionary`: A function to process dictionary objects.
3. **Context Management**: It uses `AsyncLocalStorage` to manage an asynchronous context, allowing the global Intlayer functions (`t`, `getIntlayer`, `getDictionary`) to access the request-specific locale without passing the context object around.

> Unlike the Node-based Intlayer plugins, `elysia-intlayer` relies on `AsyncLocalStorage` instead of `cls-hooked`, because `cls-hooked` depends on `async_hooks.createHook`, which Bun does not implement.

The request context is released once the response is mapped, so the standalone helpers never resolve against an already terminated request. When called outside of a request handled by the plugin, they fall back to the configured default locale.

## Configuration

The plugin reads your `intlayer.config.ts` file. You can customize the cookie and header used for locale detection:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> For more information on configuration, visit the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
