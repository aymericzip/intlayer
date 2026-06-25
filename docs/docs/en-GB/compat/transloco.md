---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrate from Transloco to Intlayer"
description: "Learn how to migrate your Angular application from Transloco to Intlayer using the compat adapter."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrate from Transloco to Intlayer

If your Angular application currently uses `@jsverse/transloco`, you can migrate to Intlayer using our compat adapter. This transition allows you to maintain your existing template syntax whilst utilising Intlayer's powerful dictionary structure.

## What to do

Simply run the initialisation command in your project:

```bash
npx intlayer init
```

This will generate the necessary `intlayer.config.ts` configuration. You will then replace your Transloco imports with `@intlayer/transloco` modules or rely on the build aliases.

## What it does under the hood

Transloco uses scopes and a `TranslocoService` (`translate`, `selectTranslate`), alongside structural directives (`*transloco="let t"`) and pipes (`| transloco`).

Under the hood:

- **Scopes:** Map naturally to Intlayer dictionary keys, providing a great pruning story for bundle optimisation.
- **Service & Directives:** Intlayer's Angular adapter seamlessly replaces the providers, allowing your existing template pipes and directives to resolve strings against Intlayer dictionaries.
- **Build time parsing:** The TypeScript analyser recognises `instant/get` calls, and fallback pruning ensures correctness even when template usage isn't statically trackable.
