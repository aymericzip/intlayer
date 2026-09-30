---
createdAt: 2026-01-21
updatedAt: 2026-09-29
priority: 5
title: Documentazione del plugin intlayer per Fastify | fastify-intlayer
description: "Il plugin intlayer per Fastify rileva la locale dell'utente e aggiunge a ogni richiesta le funzioni di traduzione di Intlayer."
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Documentazione del plugin intlayer per Fastify

Il plugin `intlayer` per Fastify rileva la locale dell'utente e decora l'oggetto request con le funzioni di Intlayer. Consente inoltre l'uso di funzioni di traduzione globali all'interno del contesto della richiesta.

## Utilizzo

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Descrizione

Il plugin esegue le seguenti operazioni:

1. **Rilevamento della locale**: Analizza la richiesta (header, cookie, ecc.) per determinare la locale preferita dall'utente.
2. **Decorazione della richiesta**: Aggiunge una proprietà `intlayer` all'oggetto `FastifyRequest`, contenente:
   - `locale`: La locale rilevata.
   - `t`: Una funzione di traduzione.
   - `getIntlayer`: Una funzione per recuperare i dizionari.
