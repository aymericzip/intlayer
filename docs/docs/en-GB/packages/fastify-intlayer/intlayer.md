---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Fastify Plugin Documentation | fastify-intlayer
description: See how to use the intlayer plugin for the fastify-intlayer package
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initialised documentation
---

# intlayer Fastify Plugin Documentation

The `intlayer` plugin for Fastify detects the user's locale and decorates the request object with Intlayer functions. It also enables the use of global translation functions within the request context.

## Usage

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    "en-GB": "Hello",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Description

The plugin performs the following tasks:

1. **Locale Detection**: It analyses the request (headers, cookies, etc.) to determine the user's preferred locale.
2. **Request Decoration**: It adds an `intlayer` property to the `FastifyRequest` object, containing:
   - `locale`: The detected locale.
   - `t`: A translation function.
   - `getIntlayer`: A function to retrieve dictionaries.
3. **Context Management**: It uses `cls-hooked` to manage an asynchronous context, allowing global Intlayer functions to access the request-specific locale.
