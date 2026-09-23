---
name: intlayer-remix
description: Integrates Intlayer internationalization with Remix 3 applications. Use when the user asks to "setup Remix i18n", register the Intlayer router middleware, or use the "useIntlayer" / "useLocale" hooks in Remix route handlers and views.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, remix]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Remix Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the views that use them.

### Declare Content

**File:** `src/views/home.content.ts`

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Welcome",
      fr: "Bienvenue",
      es: "Hola",
    }),
  },
} satisfies Dictionary;

export default content;
```

## Setup

- [Remix 3](https://intlayer.org/doc/environment/remix-3.md)

Register the `intlayer()` [router middleware](https://intlayer.org/doc/packages/remix-intlayer/intlayerMiddleware.md) in `createRouter()`, before `render()`. It strips the locale prefix before route matching, so routes are declared once without a `:locale` segment.

## Hooks

`useIntlayer`, `useDictionary` and `useLocale` read the request locale with no argument, anywhere downstream of the middleware (route handlers and `remix/ui` views).

```tsx
import { useIntlayer, useLocale } from "remix-intlayer";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");

  return <h1>{home.title}</h1>;
};
```

> - `useIntlayer("home", "fr")` overrides the request locale for one call.
> - Remix JSX is not React: `class` is written as-is, and re-renders are triggered with `handle.update()`.
> - Outside of a request, the hooks fall back to the default locale.

## Compiler

The [Intlayer Compiler](https://intlayer.org/doc/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Remix 3](https://intlayer.org/doc/environment/remix-3.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Compiler](https://intlayer.org/doc/compiler.md)
- [Formatters (number, currency, date, …)](https://intlayer.org/doc/formatters.md)

### Packages

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Remix Intlayer Exports](https://intlayer.org/doc/packages/remix-intlayer/exports.md)
- [remix-intlayer Intlayer](https://intlayer.org/doc/packages/remix-intlayer/Intlayer.md)
- [remix-intlayer intlayerMiddleware](https://intlayer.org/doc/packages/remix-intlayer/intlayerMiddleware.md)
- [remix-intlayer useDictionary](https://intlayer.org/doc/packages/remix-intlayer/useDictionary.md)
- [remix-intlayer useIntlayer](https://intlayer.org/doc/packages/remix-intlayer/useIntlayer.md)
- [remix-intlayer useLocale](https://intlayer.org/doc/packages/remix-intlayer/useLocale.md)
