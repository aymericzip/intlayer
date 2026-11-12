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

Register the middleware / plugin from the table above **before** the routes that read content (see the [Express guide](references/environment_express.md)), then call the helpers in any handler:

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

- [Express](references/environment_express.md)
- [Fastify](references/environment_fastify.md)
- [Hono](references/environment_hono.md)
- [NestJS](references/environment_nest.md)
- [AdonisJS](references/environment_adonisjs.md)
- [Elysia](references/environment_elysia.md)
- [HTMX](references/environment_htmx.md)

### Concepts

- [Variants](references/concept_variants.md)
- [Collections](references/concept_collections.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Express Intlayer Exports](references/packages_express-intlayer_exports.md)
- [Fastify Intlayer Exports](references/packages_fastify-intlayer_exports.md)
- [Hono Intlayer Exports](references/packages_hono-intlayer_exports.md)
- [Adonis Intlayer Exports](references/packages_adonis-intlayer_exports.md)
- [Elysia Intlayer Exports](references/packages_elysia-intlayer_exports.md)
- [adonis-intlayer intlayer](references/packages_adonis-intlayer_intlayer.md)
- [adonis-intlayer t](references/packages_adonis-intlayer_t.md)
- [elysia-intlayer intlayer](references/packages_elysia-intlayer_intlayer.md)
- [express-intlayer intlayer](references/packages_express-intlayer_intlayer.md)
- [express-intlayer t](references/packages_express-intlayer_t.md)
- [fastify-intlayer intlayer](references/packages_fastify-intlayer_intlayer.md)
- [hono-intlayer intlayer](references/packages_hono-intlayer_intlayer.md)
- [hono-intlayer t](references/packages_hono-intlayer_t.md)
