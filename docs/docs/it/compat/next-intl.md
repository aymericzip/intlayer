---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: adattatore di compatibilità per next-intl"
description: "Mantieni il tuo codice next-intl e servilo con Intlayer: installa @intlayer/next-intl, reindirizza gli import e scopri cosa cambia l'adattatore dietro le quinte."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-intl: adattatore di compatibilità per next-intl

Per un tutorial completo e dettagliato passo dopo passo, consulta la nostra [Guida alla Migrazione da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md).

La migrazione da `next-intl` a Intlayer ti consente di mantenere il routing dell'applicazione e la sintassi completamente intatti.

## Cosa fare

Esegui il seguente comando nel tuo repository:

```bash
npx intlayer init --interactive
```

Questo creerà un file `intlayer.config.ts`. Nel tuo `next.config.ts`, utilizza il wrapper del plugin per iniettare facilmente gli alias `next-intl` verso `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Cosa fa sotto il cofano

Il bundler wrapper sostituisce le traduzioni, ma **lascia intatte le funzionalità di `next-intl/navigation`** (ad es. `Link`, `redirect`, `usePathname`).

Sotto il cofano:

- **ICU runtime:** I plurali (`=0`, `one`, `other`), select/selectordinal, gli argomenti `#` e gli argomenti formattati (`{ts, date, long}`) funzionano correttamente utilizzando il resolver condiviso `resolveMessage(..., 'icu')`.
- **`useTranslations()` & `getTranslations()`:** Le chiamate di scope bare estraggono il primo segmento di chiave come identificatore corretto del dizionario. Gli spazi dei nomi annidati si dividono elegantemente in percorsi di dizionario e prefissi.
- **Rich formatting:** Sia `t.rich()` che `t.markup()` sono completamente implementati in modo nativo, convertendo i nodi simili a HTML in chunk React renderizzati.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` e i formati denominati dalla configurazione si collegano ai formatter `Intl` nativi principali.

> Per capire da dove vengono queste librerie, leggi la storia dell'i18n in JavaScript.

- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)
