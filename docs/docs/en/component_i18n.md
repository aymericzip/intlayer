---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Make a component multilingual (i18n library) in React and Next.js
description: Learn how to declare and retrieve localized content to build a multilingual React or Next.js component with Intlayer.
keywords:
  - i18n
  - component
  - react
  - multilingual
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# How to make a component multilingual (i18n) with Intlayer

This guide shows the minimal steps to make a UI component multilingual in two common setups:

- React (Vite/SPA)
- Next.js (App Router)

You will first declare your content, then retrieve it in your component.

## 1) Declare your content (shared for React and Next.js)

Create a content declaration file near your component. This keeps translations close to where they are used and enables type safety.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

JSON is also supported if you prefer configuration files.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Retrieve your content

### Case A — React app (Vite/SPA)

Default approach: use `useIntlayer` to retrieve by key. This keeps components lean and typed.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Server-side rendering or outside provider: use `react-intlayer/server` and pass an explicit `locale` when needed.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternative: `useDictionary` can read a whole declared object if you prefer collocating structure at call site.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Case B — Next.js (App Router)

Prefer server components for data safety and performance. Use `useIntlayer` from `next-intlayer/server` in server files, and `useIntlayer` from `next-intlayer` in client components.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Tip: For page metadata and SEO, you can also fetch content using `getIntlayer` and generate multilingual URLs via `getMultilingualUrls`.

## Why Intlayer’s component approach is best

- **Collocation**: Content declarations live near components, reducing drift and improving reuse across design systems.
- **Type safety**: Keys and structures are strongly typed; missing translations surface at build-time rather than at runtime.
- **Server-first**: Works natively in server components for better security and performance; client hooks remain ergonomic.
- **Tree-shaking**: Only content used by the component is bundled, keeping payloads small in large apps.
- **DX & tooling**: Built-in middleware, SEO helpers, and optional Visual Editor/AI translations streamline everyday work.

See the comparisons and patterns in the Next.js-focused roundup: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Related guides and references

- React setup (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack Start: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Next.js setup: https://intlayer.org/doc/environment/nextjs
- Why Intlayer vs. next-intl vs. next-i18next - https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

These pages include end-to-end setup, providers, routing, and SEO helpers.
