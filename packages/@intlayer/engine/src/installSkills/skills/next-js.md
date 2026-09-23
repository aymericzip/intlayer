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

- [Next.js](https://intlayer.org/doc/environment/nextjs.md)
- [Next.js 14](https://intlayer.org/doc/environment/nextjs/14.md)
- [Next.js 15](https://intlayer.org/doc/environment/nextjs/15.md)
- [Page Router](https://intlayer.org/doc/environment/nextjs/next-with-page-router.md)

## Provider

Mount one `IntlayerProvider` (from `next-intlayer/server`) in the `[locale]` layout. It serves both server and client components, so pages don't wrap themselves (see the [Next.js guide](https://intlayer.org/doc/environment/nextjs.md)).

## useIntlayer Hook

`next-intlayer` is isomorphic: the same `useIntlayer` import works in Server Components and in `"use client"` components.

```tsx
import { useIntlayer } from "next-intlayer";

export const MyComponent = () => {
  const content = useIntlayer("my-component");

  return <h1>{content.text}</h1>;
};
```

[Next.js package Documentation](https://intlayer.org/doc/packages/next-intlayer/exports.md)

## Compiler

The [Intlayer Compiler](https://intlayer.org/doc/compiler.md) can extract all your content keys from your components, using one CLI command (`npx intlayer extract`) or automatically at app build.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Next.js](https://intlayer.org/doc/environment/nextjs.md)
- [Next.js 14](https://intlayer.org/doc/environment/nextjs/14.md)
- [Next.js 15](https://intlayer.org/doc/environment/nextjs/15.md)
- [Next.js with Page Router](https://intlayer.org/doc/environment/nextjs/next-with-page-router.md)
- [Intlayer with next-intl](https://intlayer.org/doc/next-intl.md)
- [Intlayer with next-i18next](https://intlayer.org/doc/next-i18next.md)

### Concepts

- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Compiler](https://intlayer.org/doc/compiler.md)
- [Formatters (number, currency, date, …)](https://intlayer.org/doc/formatters.md)

### Packages

- [Intlayer Exports](https://intlayer.org/doc/packages/intlayer/exports.md)
- [Next Intlayer Exports](https://intlayer.org/doc/packages/next-intlayer/exports.md)
- [Next Intlayer Middleware](https://intlayer.org/doc/packages/next-intlayer/intlayerMiddleware.md)
- [Next Intlayer T](https://intlayer.org/doc/packages/next-intlayer/t.md)
- [Next Intlayer useDictionary](https://intlayer.org/doc/packages/next-intlayer/useDictionary.md)
- [Next Intlayer useIntlayer](https://intlayer.org/doc/packages/next-intlayer/useIntlayer.md)
- [Next Intlayer useLocale](https://intlayer.org/doc/packages/next-intlayer/useLocale.md)
- [next-intlayer usePathname](https://intlayer.org/doc/packages/next-intlayer/usePathname.md)
- [next-intlayer useRewriteURL](https://intlayer.org/doc/packages/next-intlayer/useRewriteURL.md)
