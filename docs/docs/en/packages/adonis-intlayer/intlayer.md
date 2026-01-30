---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS Middleware Documentation | adonis-intlayer
description: See how to use the intlayer middleware for adonis-intlayer package
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Initial documentation
---

# intlayer AdonisJS Middleware Documentation

The `intlayer` middleware for AdonisJS detects the user's locale and provides translation functions through the request context. It also enables the use of global translation functions within the request flow.

## Usage

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Description

The middleware performs the following tasks:

1. **Locale Detection**: It analyzes the request (headers, cookies, etc.) to determine the user's preferred locale.
2. **Context Setup**: It populates the request context with locale information.
3. **Async Local Storage**: It uses `cls-hooked` to manage an asynchronous context, allowing global Intlayer functions like `t`, `getIntlayer`, and `getDictionary` to access the request-specific locale without passing it manually.

> Note: To use cookies for locale detection, ensure `@adonisjs/cookie` is configured and used in your application.
