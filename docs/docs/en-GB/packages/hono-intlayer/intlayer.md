---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono Middleware Documentation | hono-intlayer
description: See how to use the intlayer middleware for hono-intlayer package
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Init doc
---

# intlayer Hono Middleware Documentation

The `intlayer` middleware for Hono detects the user's locale and populates the context object with Intlayer functions. It also enables the use of global translation functions within the request context.

## Usage

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
  });

  return c.text(content);
});
```

## Description

The middleware performs the following tasks:

1. **Locale Detection**: It analyzes the request (headers, cookies, etc.) to determine the user's preferred locale.
2. **Context Population**: It adds Intlayer data to the Hono context, accessible via `c.get()`. This includes:
   - `locale`: The detected locale.
   - `t`: A translation function.
   - `getIntlayer`: A function to retrieve dictionaries.
   - `getDictionary`: A function to process dictionary objects.
3. **Context Management**: It uses `cls-hooked` to manage an asynchronous context, allowing global Intlayer functions (`t`, `getIntlayer`, `getDictionary`) to access the request-specific locale without passing the context object.
