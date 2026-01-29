---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentazione del Middleware intlayer per Hono | hono-intlayer
description: Scopri come usare il middleware intlayer per il pacchetto hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Inizializzazione doc
---

# Documentazione del Middleware intlayer per Hono

Il middleware `intlayer` per Hono rileva la locale dell'utente e popola l'oggetto contesto con le funzioni Intlayer. Consente inoltre l'uso di funzioni di traduzione globale all'interno del contesto della richiesta.

## Utilizzo

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    it: "Ciao",
  });

  return c.text(content);
});
```

## Descrizione

Il middleware esegue i seguenti compiti:

1. **Rilevamento della Locale**: Analizza la richiesta (intestazioni, cookie, ecc.) per determinare la locale preferita dell'utente.
2. **Popolamento del Contesto**: Aggiunge i dati Intlayer al contesto Hono, accessibili tramite `c.get()`. Questo include:
   - `locale`: La locale rilevata.
   - `t`: Una funzione di traduzione.
   - `getIntlayer`: Una funzione per recuperare i dizionari.
   - `getDictionary`: Una funzione per elaborare oggetti dizionario.
3. **Gestione del Contesto**: Utilizza `cls-hooked` per gestire un contesto asincrono, consentendo alle funzioni globali di Intlayer (`t`, `getIntlayer`, `getDictionary`) di accedere alla locale specifica della richiesta senza passare l'oggetto contesto.
