---
name: intlayer-next-js
description: Integrates Intlayer internationalization with Next.js App Router and Pages Router. Use when the user asks to "setup Next.js i18n", use "useIntlayer" in Server Components, or handle client-side translations in Next.js.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: @intlayer/mcp
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
  version: 8.1.2
---

# Intlayer Next.js Usage

## Setup

- [Next.js](https://intlayer.org/doc/environment/nextjs.md)
- [Next.js 14](https://intlayer.org/doc/environment/nextjs/14.md)
- [Next.js 15](https://intlayer.org/doc/environment/nextjs/15.md)
- [No Locale Path](https://intlayer.org/doc/environment/nextjs/no-locale-path.md)
- [Page Router](https://intlayer.org/doc/environment/nextjs/next-with-page-router.md)

## Server Components

```tsx
import { useIntlayer } from "next-intlayer/server";
const MyComponent = async () => {
  const content = await useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```

## Client Components

```tsx
"use client";
import { useIntlayer } from "next-intlayer";
const MyComponent = async () => {
  const content = await useIntlayer("my-dictionary-key");
  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.image.src.value} alt={content.image.alt.value} />
    </div>
  );
};
```

Use `useIntlayer` from `next-intlayer` exactly like in React.
[Next.js Documentation](https://intlayer.org/doc/packages/next-intlayer.md)
