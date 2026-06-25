---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da Transloco a Intlayer"
description: "Scopri come migrare la tua applicazione Angular da Transloco a Intlayer utilizzando l'adattatore di compatibilità."
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

# Migrare da Transloco a Intlayer

Se la tua applicazione Angular utilizza attualmente `@jsverse/transloco`, puoi migrare a Intlayer utilizzando il nostro compat adapter. Questa transizione ti consente di mantenere la sintassi del template esistente mentre sfrutti la potente struttura del dizionario di Intlayer.

## Cosa fare

Esegui semplicemente il comando di inizializzazione nel tuo progetto:

```bash
npx intlayer init
```

Questo genererà la configurazione necessaria `intlayer.config.ts`. Potrai quindi sostituire i tuoi import Transloco con i moduli `@intlayer/transloco` o affidarti agli alias di build.

## Come funziona sotto il cofano

Transloco utilizza scopes e un `TranslocoService` (`translate`, `selectTranslate`), insieme a direttive strutturali (`*transloco="let t"`) e pipe (`| transloco`).

Sotto il cofano:

- **Scopes:** Mappano naturalmente alle chiavi del dizionario Intlayer, fornendo un'ottima strategia di pruning per l'ottimizzazione del bundle.
- **Service & Directives:** L'adattatore Angular di Intlayer sostituisce facilmente i provider, permettendo alle tue pipe di template e alle direttive esistenti di risolvere le stringhe rispetto ai dizionari Intlayer.
- **Build time parsing:** L'analizzatore TypeScript riconosce le chiamate `instant/get`, e il fallback pruning garantisce la correttezza anche quando l'utilizzo del template non è staticamente tracciabile.
