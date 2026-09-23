---
name: intlayer-backend
description: Integrates Intlayer internationalization with Node.js / Bun backends (Express, Fastify, Hono, NestJS, AdonisJS, Elysia, HTMX). Use when the user asks to "translate API responses", "setup server-side i18n", register the Intlayer middleware, or use "t" / "getIntlayer" in a route handler.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, backend, express, fastify, hono, nestjs, adonisjs, elysia]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Backend Usage

## Core Philosophy

Every backend integration works the same way:

1.  A **middleware / plugin** (`intlayer()`) resolves the locale of each request (cookie, header, `Accept-Language`) and scopes it to that request.
2.  **Helpers** (`t`, `getIntlayer`, `getDictionary`) read that request locale, so they are safe to call from services without threading a locale argument through every function.

| Framework | Package            | Registration                                           |
| --------- | ------------------ | ------------------------------------------------------ |
| Express   | `express-intlayer` | `app.use(intlayer())`                                  |
| NestJS    | `express-intlayer` | `consumer.apply(intlayer()).forRoutes("*")`            |
| Fastify   | `fastify-intlayer` | `await fastify.register(intlayer)`                     |
| Hono      | `hono-intlayer`    | `app.use("*", intlayer())`                             |
| Elysia    | `elysia-intlayer`  | `.use(intlayer())`, helpers read from route `intlayer` |
| AdonisJS  | `adonis-intlayer`  | Registered middleware (see the AdonisJS guide)         |

### Declare Content

**File:** `src/index.content.ts`

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
    }),
  },
} satisfies Dictionary;

export default content;
```

## Usage

Register the middleware / plugin from the table above **before** the routes that read content (see the [Express guide](https://intlayer.org/doc/environment/express.md)), then call the helpers in any handler:

```typescript
import { t, getIntlayer, getDictionary } from "express-intlayer";
import dictionaryExample from "./index.content";

app.get("/", (_req, res) => {
  res.send(t({ en: "Hello", fr: "Bonjour" })); // Inline translation
});

app.get("/by-key", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent); // Dictionary by key
});

app.get("/by-import", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent); // Imported dictionary
});
```

The same helpers are exported by `fastify-intlayer`, `hono-intlayer` and `adonis-intlayer`. On Elysia, read them from the route context: `({ intlayer }) => intlayer!.getIntlayer("index")`.

> For jobs, queues or emails (no incoming request), resolve content for the recipient's stored locale: `getIntlayer("index", user.locale)`.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Express](https://intlayer.org/doc/environment/express.md)
- [Fastify](https://intlayer.org/doc/environment/fastify.md)
- [Hono](https://intlayer.org/doc/environment/hono.md)
- [NestJS](https://intlayer.org/doc/environment/nest.md)
- [AdonisJS](https://intlayer.org/doc/environment/adonisjs.md)
- [Elysia](https://intlayer.org/doc/environment/elysia.md)
- [HTMX](https://intlayer.org/doc/environment/htmx.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)

### Packages

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Express Intlayer Exports](https://intlayer.org/doc/packages/express-intlayer/exports.md)
- [Fastify Intlayer Exports](https://intlayer.org/doc/packages/fastify-intlayer/exports.md)
- [Hono Intlayer Exports](https://intlayer.org/doc/packages/hono-intlayer/exports.md)
- [Adonis Intlayer Exports](https://intlayer.org/doc/packages/adonis-intlayer/exports.md)
- [Elysia Intlayer Exports](https://intlayer.org/doc/packages/elysia-intlayer/exports.md)
- [adonis-intlayer intlayer](https://intlayer.org/doc/packages/adonis-intlayer/intlayer.md)
- [adonis-intlayer t](https://intlayer.org/doc/packages/adonis-intlayer/t.md)
- [elysia-intlayer intlayer](https://intlayer.org/doc/packages/elysia-intlayer/intlayer.md)
- [express-intlayer intlayer](https://intlayer.org/doc/packages/express-intlayer/intlayer.md)
- [express-intlayer t](https://intlayer.org/doc/packages/express-intlayer/t.md)
- [fastify-intlayer intlayer](https://intlayer.org/doc/packages/fastify-intlayer/intlayer.md)
- [hono-intlayer intlayer](https://intlayer.org/doc/packages/hono-intlayer/intlayer.md)
- [hono-intlayer t](https://intlayer.org/doc/packages/hono-intlayer/t.md)
