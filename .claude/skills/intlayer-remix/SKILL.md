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

- [Remix 3](references/environment_remix-3.md)

Register the `intlayer()` [router middleware](references/packages_remix-intlayer_intlayerMiddleware.md) in `createRouter()`, before `render()`. It strips the locale prefix before route matching, so routes are declared once without a `:locale` segment.

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

The [Intlayer Compiler](references/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Remix 3](references/environment_remix-3.md)

### Concepts

- [Variants](references/concept_variants.md)
- [Collections](references/concept_collections.md)
- [Compiler](references/compiler.md)
- [Formatters (number, currency, date, …)](references/formatters.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Remix Intlayer Exports](references/packages_remix-intlayer_exports.md)
- [remix-intlayer Intlayer](references/packages_remix-intlayer_Intlayer.md)
- [remix-intlayer intlayerMiddleware](references/packages_remix-intlayer_intlayerMiddleware.md)
- [remix-intlayer useDictionary](references/packages_remix-intlayer_useDictionary.md)
- [remix-intlayer useIntlayer](references/packages_remix-intlayer_useIntlayer.md)
- [remix-intlayer useLocale](references/packages_remix-intlayer_useLocale.md)
