---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da next-intl a Intlayer"
description: "Scopri come migrare la tua applicazione Next.js da next-intl a Intlayer utilizzando l'adapter di compatibilità."
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

# Migrare da next-intl a Intlayer

Per un tutorial completo e dettagliato passo dopo passo, consulta la nostra [Guida alla Migrazione da next-intl](../migration_from_next-intl_to_intlayer.md).

La migrazione da `next-intl` a Intlayer ti consente di mantenere il routing dell'applicazione e la sintassi completamente intatti.

## Cosa fare

Esegui il seguente comando nel tuo repository:

```bash
npx intlayer init
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
