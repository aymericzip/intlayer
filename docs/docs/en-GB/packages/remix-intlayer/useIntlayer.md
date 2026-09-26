---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer Hook Documentation | remix-intlayer
description: See how to use the useIntlayer hook in Remix 3 applications to access localised content by key.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useIntlayer Hook Documentation

The `useIntlayer` hook allows you to retrieve localised content from an Intlayer dictionary by key in Remix 3 applications.

It automatically reads the active locale from the current request context (via `AsyncLocalStorage`), so you do not need to pass the locale through route handlers, view templates, or components.

## Usage

### In Route Handlers

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### In View Templates / Components

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parameters

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: The unique key of the dictionary (as defined in your `.content.ts` declaration files).
2. **`localeOrSelector`** (optional): A specific locale or selector object (`{ item }`, `{ variant }`, optionally with `locale`). When provided, it overrides the locale detected from the request context.

## Description

The hook performs the following tasks:

1. **Context Locale Retrieval**: Detects the current locale from the request-bound `AsyncLocalStorage` scope established by the `intlayer()` middleware.
2. **Dictionary Retrieval**: Retrieves the pre-compiled dictionary corresponding to the provided key.
3. **Translation Processing**: Resolves translations, enumerations, markdown, and conditional content for the resolved locale.
4. **Fallback Handling**: If called outside of an active HTTP request context, it gracefully falls back to the configured `defaultLocale`.

## Related Documentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useDictionary.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useLocale.md)
