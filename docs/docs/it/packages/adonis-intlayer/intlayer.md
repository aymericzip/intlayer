---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentazione del middleware intlayer per AdonisJS | adonis-intlayer
description: Scopri come utilizzare il middleware intlayer per il pacchetto adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentazione iniziale
---

# Documentazione del middleware intlayer per AdonisJS

Il middleware `intlayer` per AdonisJS rileva la locale dell'utente e fornisce funzioni di traduzione attraverso il contesto della richiesta. Consente inoltre l'uso di funzioni di traduzione globali all'interno del flusso della richiesta.

## Utilizzo

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Descrizione

Il middleware esegue i seguenti compiti:

1. **Rilevamento della locale**: Analizza la richiesta (intestazioni, cookie, ecc.) per determinare la locale preferita dell'utente.
2. **Configurazione del contesto**: Popola il contesto della richiesta con le informazioni sulla locale.
3. **Async Local Storage**: Utilizza `cls-hooked` per gestire un contesto asincrono, consentendo alle funzioni Intlayer globali come `t`, `getIntlayer` e `getDictionary` di accedere alla locale specifica della richiesta senza doverla passare manualmente.

> Nota: Per utilizzare i cookie per il rilevamento della locale, assicurarsi che `@adonisjs/cookie` sia configurato e utilizzato nella propria applicazione.
