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
- [No Locale Path](references/environment_nextjs_no-locale-path.md)
- [Page Router](references/environment_nextjs_next-with-page-router.md)

## Server Components

To use Intlayer in Server Components, use `IntlayerServerProvider` to provide the locale and `useIntlayer` from `next-intlayer/server`.

```tsx
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const MyServerComponent = () => {
  const content = useIntlayer("my-component");
  return (
    <div>
      <h1>{content.text}</h1>
    </div>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;
  return (
    <IntlayerServerProvider locale={locale}>
      <MyServerComponent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

## Client Components

For Client Components, add the `"use client"` directive and use `useIntlayer` from `next-intlayer`. Ensure the component is wrapped in an `IntlayerClientProvider`.

```tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const MyClientComponent = () => {
  const content = useIntlayer("my-component");

  return (
    <div>
      <h1>{content.text}</h1>
    </div>
  );
};
```

[Next.js package Documentation](references/packages_next-intlayer_exports.md)

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Environments

- [Next.js](references/environment_nextjs.md)
- [Next.js 14](references/environment_nextjs_14.md)
- [Next.js 15](references/environment_nextjs_15.md)
- [Next.js No Locale Path](references/environment_nextjs_no-locale-path.md)
- [Next.js with Page Router](references/environment_nextjs_next-with-page-router.md)

### Packages

- [Intlayer Exports](references/packages_intlayer_exports.md)
- [Next Intlayer Exports](references/packages_next-intlayer_exports.md)
- [Next Intlayer Middleware](references/packages_next-intlayer_intlayerMiddleware.md)
- [Next Intlayer T](references/packages_next-intlayer_t.md)
- [Next Intlayer useDictionary](references/packages_next-intlayer_useDictionary.md)
- [Next Intlayer useIntlayer](references/packages_next-intlayer_useIntlayer.md)
- [Next Intlayer useLocale](references/packages_next-intlayer_useLocale.md)
