---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da Polyglot.js a Intlayer"
description: "Scopri come migrare da Polyglot.js a Intlayer utilizzando l'adapter di compatibilità."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrare da Polyglot.js a Intlayer

Se stai usando Polyglot.js di Airbnb, migrare a Intlayer è estremamente semplice usando il livello di compatibilità.

## Cosa fare

Esegui semplicemente il comando di inizializzazione nel tuo progetto:

```bash
npx intlayer init
```

Questo genera `intlayer.config.ts`. Puoi quindi utilizzare l'alias del plugin bundler per reindirizzare trasparentemente gli import di Polyglot a `@intlayer/polyglot`.

## Cosa fa dietro le quinte

La sintassi di Polyglot.js si basa tipicamente su `polyglot.t('key', {name})` con interpolazioni `%{name}` e plurali `smart_count` separati da `"singular |||| plural"`.

Dietro le quinte:

- **Interpolazione:** Il layer di compatibilità gestisce nativamente i placeholder `%{var}`.
- **Plurali:** La stringa viene divisa a `||||` e valutata rispetto a `Intl.PluralRules` nativo secondo la locale attiva, rispecchiando l'ordine dei bucket di Polyglot per locale.
- **Dizionari:** Eviti la necessità di fornire configurazioni JSON enormi a `new Polyglot()` – Intlayer gestisce i dizionari dinamicamente e li ripulisce automaticamente.
