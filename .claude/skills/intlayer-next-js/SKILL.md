---
name: intlayer-next-js
description: Integrates Intlayer internationalization with Next.js App Router and Pages Router. Use when the user asks to "setup Next.js i18n", use "useIntlayer" in Server Components, or handle client-side translations in Next.js.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, nextjs]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Next.js Usage

## Core Philosophy

Intlayer promotes **Component-Level Content Declaration**. Instead of a massive global translation file, content is declared in `*.content.ts` files adjacent to the Next.js components that use them.

## Workflow

To create a translated component, you need two files:

1.  **Declaration:** A content file (e.g., `myComponent.content.ts`) defining the dictionary.
2.  **Implementation:** A Next.js component (Server or Client) using the `useIntlayer` hook.

### 1. Declare Content

Create a content file using `t()` for translations.
**File:** `src/components/MyComponent/myComponent.content.ts`

```typescript
import { t, type Dictionary } from "intlayer";

const content = {
  // The 'key' must be unique and matches what you pass to useIntlayer()
  key: "my-component",
  content: {
    text: t({
      en: "Welcome",
      fr: "Bienvenue",
      es: "Hola",
    }),
  },
} satisfies Dictionary;

export default content;
```

## Setup

- [Next.js](references/environment_nextjs.md)
- [Next.js 14](references/environment_nextjs_14.md)
- [Next.js 15](references/environment_nextjs_15.md)
- [Page Router](references/environment_nextjs_next-with-page-router.md)

## Provider

Mount one `IntlayerProvider` (from `next-intlayer/server`) in the `[locale]` layout. It serves both server and client components, so pages don't wrap themselves (see the [Next.js guide](references/environment_nextjs.md)).

## useIntlayer Hook

`next-intlayer` is isomorphic: the same `useIntlayer` import works in Server Components and in `"use client"` components.

```tsx
import { useIntlayer } from "next-intlayer";

export const MyComponent = () => {
  const content = useIntlayer("my-component");

  return <h1>{content.text}</h1>;
};
```

[Next.js package Documentation](references/packages_next-intlayer_exports.md)

## Compiler

The [Intlayer Compiler](references/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Next.js](references/environment_nextjs.md)
- [Next.js 14](references/environment_nextjs_14.md)
- [Next.js 15](references/environment_nextjs_15.md)
- [Next.js with Page Router](references/environment_nextjs_next-with-page-router.md)
- [Intlayer with next-intl](references/next-intl.md)
- [Intlayer with next-i18next](references/next-i18next.md)

### Concepts

- [Variants](references/concept_variants.md)
- [Collections](references/concept_collections.md)
- [Compiler](references/compiler.md)
- [Formatters (number, currency, date, …)](references/formatters.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Next Intlayer Exports](references/packages_next-intlayer_exports.md)
- [Next Intlayer Middleware](references/packages_next-intlayer_intlayerMiddleware.md)
- [Next Intlayer T](references/packages_next-intlayer_t.md)
- [Next Intlayer useDictionary](references/packages_next-intlayer_useDictionary.md)
- [Next Intlayer useIntlayer](references/packages_next-intlayer_useIntlayer.md)
- [Next Intlayer useLocale](references/packages_next-intlayer_useLocale.md)
- [next-intlayer usePathname](references/packages_next-intlayer_usePathname.md)
- [next-intlayer useRewriteURL](references/packages_next-intlayer_useRewriteURL.md)
