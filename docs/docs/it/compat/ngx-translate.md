---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da NGX-Translate a Intlayer"
description: "Scopri come migrare la tua applicazione Angular da ngx-translate a Intlayer utilizzando l'adattatore di compatibilità."
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

# Migrare da NGX-Translate a Intlayer

Migrare la tua applicazione Angular da `ngx-translate` a Intlayer è facile con l'adapter di compatibilità, che ti permette di evitare la necessità di riscrivere tutti i tuoi template.

## Cosa fare

Inizia eseguendo:

```bash
npx intlayer init
```

Questo configura `intlayer.config.ts`. Sostituisci le tue configurazioni `TranslateModule.forRoot()` e gli alias di importazione in modo appropriato per puntare a `@intlayer/ngx-translate`.

## Cosa fa sotto il cofano

`ngx-translate` usa `TranslateService` (`instant`, `get`, `stream`) insieme alla pipe `{{ 'KEY' | translate:params }}` e alla direttiva `[translate]`.

Sotto il cofano:

- **Services:** `TranslateService` wraps `getIntlayer` e un locale observable, fornendo esattamente gli stessi metodi.
- **Pipes & Directives:** Re-implementate per risolvere direttamente contro i dizionari di Intlayer.
- **Loaders:** I setup di `TranslateHttpLoader` vengono convertiti in warning stubs perché Intlayer risolve e aggrega intrinsecamente i tuoi dizionari al momento della build (o attraverso standard dynamic imports), eliminando completamente la necessità di HTTP loaders.
