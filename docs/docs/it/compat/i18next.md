---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da i18next a Intlayer"
description: "Scopri come migrare la tua applicazione Vanilla JS/TS da i18next a Intlayer utilizzando l'adattatore di compatibilità."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrazione da i18next a Intlayer

Per un tutorial dettagliato passo-passo, consulta la nostra completa [Guida alla migrazione da i18next](../migration_from_i18next_to_intlayer.md).

Intlayer replica perfettamente le caratteristiche runtime core di `i18next`. Utilizzando il package compat, le tue applicazioni Vanilla o i moduli interni possono continuare a sfruttare la sintassi familiare.

## Cosa fare

Per iniziare, inizializza Intlayer nel tuo progetto:

```bash
npx intlayer init
```

Se stai utilizzando Vite, includi il plugin Intlayer per instradare gli import a `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Cosa fa sotto il cofano

Il `i18nextVitePlugin` reindirizza gli import `i18next` a `@intlayer/i18next`, evitando l'aumento del bundle dalle inclusioni dei file JSON.

Sotto il cofano:

- **Configurazione dell'istanza:** `createInstance` analizza correttamente e applica i fallback degli namespace sfruttando la pipeline di compilazione di Intlayer per il recupero del dizionario.
- **Interpolazione:** Supporto nativo per le sostituzioni `{{name}}` e l'annidamento ricorsivo di `$t(key)`.
- **Contesto e plurali:** Identifica e risolve i formati di suffisso come `key_male` e `key_one`/`key_other` valutandoli rispetto allo standard `Intl.PluralRules`.
- **Oggetti di ritorno:** La modalità `returnObjects: true` estrae in sicurezza gli alberi dai dizionari di Intlayer.
