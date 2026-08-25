---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer Package Documentation
description: Elysia plugin for Intlayer, providing translation functions and locale detection.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Unified documentation for all exports"
author: aymericzip
---

# elysia-intlayer Package

The `elysia-intlayer` package provides a plugin for Elysia applications to handle internationalisation. It detects the user's locale and injects an `intlayer` object into the route context.

## Installation

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` is a peer dependency (`>=1.0.0`). Elysia targets the **Bun** runtime.

## Exports

### Plugin

Import:

```ts
import { intlayer } from "elysia-intlayer";
```

| Function   | Description                                                                                                                                                                                                                                                                                                                    | Related documentation                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Elysia plugin that integrates Intlayer into your Elysia application. Handles locale detection from storage (cookies, headers) then from `Accept-Language`, injects an `intlayer` object exposing `locale`, `t`, `getIntlayer` and `getDictionary` into the route context, and sets up the `AsyncLocalStorage` request context. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/elysia-intlayer/intlayer.md) |

### Functions

Import:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Function        | Description                                                                                                                                                                                                                                                             | Related documentation                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `t`             | Global translation function that retrieves content for the current locale in Elysia. Uses `AsyncLocalStorage` to access the request context set up by the `intlayer` plugin, and falls back to the default locale outside of it. Can also be accessed via `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/translation.md) |
| `getIntlayer`   | Retrieves a dictionary by its key from the generated declaration and returns its content for the current locale. Optimised version of `getDictionary`. Uses `AsyncLocalStorage` to access the request context. Can also be accessed via `intlayer.getIntlayer`.         | -                                                                                                         |
| `getDictionary` | Processes dictionary objects and returns content for the current locale. Processes `t()` translations, enumerations, markdown, HTML, etc. Uses `AsyncLocalStorage` to access the request context. Can also be accessed via `intlayer.getDictionary`.                    | -                                                                                                         |

### Types

Import:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Type                | Description                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Shape of the `intlayer` object injected into every route context: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Signature of the translation function, translating a locale map into the content matching the current request locale.                                                  |

## Usage

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Load the internationalisation plugin
  .use(intlayer())
  // Read the locale and the helpers from the route context
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Or use the standalone helpers, bound to the current request
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> The plugin registers its context through a **global** `derive`, which Elysia types as `Partial<{ intlayer: IntlayerContext }>`. The value is always present at runtime for routes registered after `.use(intlayer())`, so use the non-null assertion (`intlayer!.locale`) — or optional chaining — to satisfy TypeScript in `strict` mode.

## Related Doc

- [Elysia i18n - Complete guide to translate your app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_elysia.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)
