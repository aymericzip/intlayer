---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar do NGX-Translate para Intlayer"
description: "Aprenda como migrar sua aplicação Angular do ngx-translate para Intlayer usando o adaptador de compatibilidade."
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

# Migrar de NGX-Translate para Intlayer

Migrar sua aplicação Angular de `ngx-translate` para Intlayer é fácil com o compat adapter, permitindo que você evite a necessidade de reescrever todos os seus templates.

## O que fazer

Comece executando:

```bash
npx intlayer init
```

Isso configura o `intlayer.config.ts`. Substitua suas configurações `TranslateModule.forRoot()` e aliases de importação apropriadamente para apontar para `@intlayer/ngx-translate`.

## O que faz por trás dos bastidores

`ngx-translate` uses `TranslateService` (`instant`, `get`, `stream`) alongside the `{{ 'KEY' | translate:params }}` pipe and the `[translate]` directive.

Por trás dos bastidores:

- **Services:** `TranslateService` wraps `getIntlayer` and a locale observable, providing exactly the same methods.
- **Pipes & Directives:** Re-implemented to resolve against Intlayer dictionaries directly.
- **Loaders:** `TranslateHttpLoader` setups are converted to warning stubs because Intlayer inherently resolves and bundles your dictionaries at build time (or through standard dynamic imports), completely eliminating the need for HTTP loaders.
