---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione Middleware intlayer per Express | express-intlayer
description: Scopri come usare il middleware intlayer per il package express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Documentazione Middleware intlayer per Express

Il middleware `intlayer` per Express rileva la locale dell'utente e fornisce funzioni di traduzione tramite l'oggetto `res.locals`. Consente inoltre l'utilizzo delle funzioni `t` e `getIntlayer` all'interno dei tuoi handler di richiesta.

## Uso

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Descrizione

Il middleware esegue le seguenti operazioni:

1. **Rilevamento della lingua/locale**: Controlla i cookie, gli header (come `Accept-Language`) e i parametri URL per determinare la locale dell'utente.
2. **Configurazione del contesto**: popola `res.locals` con:
   - `locale`: La locale rilevata.
   - `t`: Una funzione di traduzione legata alla locale rilevata.
   - `getIntlayer`: Una funzione per recuperare dizionari legati alla locale rilevata.
3. **Storage locale asincrono**: imposta un contesto che consente l'uso delle funzioni globali `t` e `getIntlayer` importate da `express-intlayer` all'interno del flusso della richiesta.
