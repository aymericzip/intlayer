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

The `intlayer` plugin for Elysia detects the user's locale and injects an `intlayer` object into the route context. It also enables the use of the standalone translation functions within the request context.

## Usage

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> The plugin registers its context through a **global** `derive`, which Elysia types as `Partial<{ intlayer: IntlayerContext }>`. The value is always present at runtime for routes registered after `.use(intlayer())`, so use the non-null assertion (`intlayer!.t`) — or optional chaining — to satisfy TypeScript in `strict` mode.

The same helpers are available as standalone exports, so you can call them without destructuring the route context:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Description

The plugin performs the following tasks:

1. **Locale Detection**: It reads the locale explicitly set by the client from storage (cookie, header), then falls back to the locale negotiated from the `Accept-Language` header. If no supported locale matches, it falls back to the configured `defaultLocale`.
2. **Context Injection**: It adds an `intlayer` property to the Elysia route context (see the table below).
3. **Context Management**: It uses `AsyncLocalStorage` to manage an asynchronous context, allowing the standalone Intlayer functions (`t`, `getIntlayer`, `getDictionary`) to access the request-specific locale without passing the context object around.
4. **Dictionary Preparation**: It calls `prepareIntlayer` when the plugin is created, so the dictionaries are built when the app boots.

### Route Context

| Property          | Type                   | Description                                                                                   |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | The locale to use for this request. `locale_storage` takes precedence over `locale_detected`. |
| `locale_storage`  | `Locale` (optional)    | The locale explicitly requested by the client through a cookie or a header.                   |
| `locale_detected` | `Locale`               | The locale negotiated from the request headers.                                               |
| `defaultLocale`   | `Locale`               | The locale configured as fallback in `intlayer.config.ts`.                                    |
| `t`               | `TranslateFunction`    | Translates an inline locale map.                                                              |
| `getIntlayer`     | `typeof getIntlayer`   | Reads a dictionary by key, defaulting to the request locale.                                  |
| `getDictionary`   | `typeof getDictionary` | Reads an imported dictionary, defaulting to the request locale.                               |

> Unlike the Node-based Intlayer plugins, `elysia-intlayer` relies on `AsyncLocalStorage` instead of `cls-hooked`, because `cls-hooked` depends on `async_hooks.createHook`, which Bun does not implement.

The request context is released once the response is mapped, so the standalone helpers never resolve against an already terminated request. When called outside of a request handled by the plugin, they fall back to the configured default locale.

## Locale Resolution Order

By default, the plugin resolves the locale in this order:

1. The `INTLAYER_LOCALE` cookie.
2. The `x-intlayer-locale` header.
3. The `Accept-Language` header negotiation.
4. The configured `defaultLocale`.

```bash
# Negotiated from `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# The cookie takes precedence over `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# The header takes precedence over `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Configuration

The plugin reads your `intlayer.config.ts` file. You can customize the cookie and header used for locale detection:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> For more information on configuration, visit the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

## Related Doc

- [elysia-intlayer package exports](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/elysia-intlayer/exports.md)
- [Translate your Elysia backend website using Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_elysia.md)
