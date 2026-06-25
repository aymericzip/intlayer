---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrare da next-i18next a Intlayer"
description: "Scopri come migrare la tua applicazione Next.js da next-i18next a Intlayer utilizzando l'adapter di compatibilità."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migra da next-i18next a Intlayer

Per un tutorial completo e dettagliato passo dopo passo, consulta la nostra [Guida alla migrazione da next-i18next](../migration_from_next-i18next_to_intlayer.md).

Intlayer gestisce tutte le implementazioni di Next.js Pages Router e App Router in modo trasparente. Utilizzando l'adapter puoi migrare la tua implementazione `next-i18next` senza riscrivere il codice.

## Cosa fare

Per iniziare, esegui:

```bash
npx intlayer init
```

Questo crea il file di configurazione Intlayer necessario. Per integrare Intlayer dietro le quinte, aggiorna il tuo `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Come funziona internamente

Il `createNextI18nPlugin` combina il comportamento nativo di Next.js insieme al plugin core `next-intlayer`, iniettando tutti gli alias Webpack/Turbopack richiesti per `next-i18next`, `react-i18next` e `i18next`.

Internamente:

- **`serverSideTranslations` & `appWithTranslation`:** Ora funzionano come wrapper per i loader interni di Intlayer, evitando l'iniezione di grandi JSON statici.
- **Client hooks:** Delega immediatamente a `@intlayer/react-i18next` mantenendo tutti i formati, i plurali e le funzionalità degli spazi dei nomi annidati.
