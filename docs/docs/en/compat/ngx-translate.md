---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from NGX-Translate to Intlayer"
description: "Learn how to migrate your Angular application from ngx-translate to Intlayer using the compat adapter."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from NGX-Translate to Intlayer

Migrating your Angular application from `ngx-translate` to Intlayer is easy with the compat adapter, allowing you to bypass the need to rewrite all your templates.

## What to do

Begin by running:

```bash
npx intlayer init
```

This sets up the `intlayer.config.ts`. Replace your `TranslateModule.forRoot()` setups and import aliases appropriately to point to `@intlayer/ngx-translate`.

## What it does under the hood

`ngx-translate` uses `TranslateService` (`instant`, `get`, `stream`) alongside the `{{ 'KEY' | translate:params }}` pipe and the `[translate]` directive.

Under the hood:

- **Services:** `TranslateService` wraps `getIntlayer` and a locale observable, providing exactly the same methods.
- **Pipes & Directives:** Re-implemented to resolve against Intlayer dictionaries directly.
- **Loaders:** `TranslateHttpLoader` setups are converted to warning stubs because Intlayer inherently resolves and bundles your dictionaries at build time (or through standard dynamic imports), completely eliminating the need for HTTP loaders.
