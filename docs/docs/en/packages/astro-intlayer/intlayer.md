---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: intlayer Integration Documentation | astro-intlayer
description: See how to configure and use the intlayer Astro integration in astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integration
  - i18n
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Update integration documentation with middleware and hooks details"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# intlayer Astro Integration Documentation

The `intlayer` integration for Astro configures your project for multilingual internationalization (i18n). It handles build-time dictionary preparation, Vite plugin injection, automatic request middleware registration, and emitting localized prerendered pages.

## Usage

Add `intlayer()` to your `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Astro CLI's codemod (`astro add astro-intlayer`) also generates a default import which is supported:

```ts
import intlayer from "astro-intlayer";
```

## Description

The integration hooks into Astro's build and runtime lifecycle:

1. **Config Setup (`astro:config:setup`)**:
   - **Dictionary Preparation**: Prepares Intlayer dictionaries and generated types before the build runs.
   - **Vite Plugins**: Injects plugins for Vite aliases (enabling seamless dictionary imports), locale routing proxies, and build pruning.
   - **Middleware Registration**: Automatically injects `astro-intlayer/middleware` into your project's middleware chain, populating `Astro.locals.intlayer` on every incoming request.
2. **Build Done (`astro:build:done`)**:
   - **Page Rewrites**: Inspects localized URL rewrite rules and emits prerendered HTML pages at their corresponding localized paths.

## What is Provided Out of the Box

Once configured, your Astro application can immediately use:

- The `useIntlayer`, `useDictionary`, and `useLocale` hooks inside `.astro` component frontmatter.
- The `Astro.locals.intlayer` object in Astro endpoints and pages.
- Client-side imports in `<script>` blocks that mirror the same API with reactive updates.
- Built-in formatters under `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, etc.).

## Related Documentation

- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useLocale.md)
- [`onRequest` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/onRequest.md)
