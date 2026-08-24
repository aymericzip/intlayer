---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentazione del plugin intlayer per Elysia | elysia-intlayer
description: Scopri come utilizzare il plugin intlayer del pacchetto elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Inizializzazione della documentazione"
author: aymericzip
---

# Documentazione del plugin intlayer per Elysia

Il plugin `intlayer` per Elysia rileva la locale dell'utente e inietta un oggetto `intlayer` nel contesto della route. Consente inoltre l'uso di funzioni di traduzione globali all'interno del contesto della richiesta.

## Utilizzo

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Gli stessi helper sono disponibili come export autonomi, così puoi richiamarli senza destrutturare il contesto della route:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Descrizione

Il plugin esegue le seguenti operazioni:

1. **Rilevamento della locale**: Legge la locale impostata esplicitamente dal client dallo storage (cookie, header), quindi ricade sulla locale negoziata a partire dall'header `Accept-Language`.
2. **Iniezione nel contesto**: Aggiunge una proprietà `intlayer` al contesto della route di Elysia, contenente:
   - `locale`: La locale da usare per questa richiesta, con `locale_storage` che ha la precedenza su `locale_detected`.
   - `locale_storage`: La locale richiesta esplicitamente dal client tramite un cookie o un header.
   - `locale_detected`: La locale negoziata a partire dagli header della richiesta.
   - `defaultLocale`: La locale configurata come fallback in `intlayer.config.ts`.
   - `t`: Una funzione di traduzione.
   - `getIntlayer`: Una funzione per recuperare i dizionari tramite chiave.
   - `getDictionary`: Una funzione per elaborare gli oggetti dizionario.
3. **Gestione del contesto**: Utilizza `AsyncLocalStorage` per gestire un contesto asincrono, consentendo alle funzioni globali di Intlayer (`t`, `getIntlayer`, `getDictionary`) di accedere alla locale specifica della richiesta senza dover passare l'oggetto di contesto.

> A differenza dei plugin Intlayer basati su Node, `elysia-intlayer` si affida ad `AsyncLocalStorage` anziché a `cls-hooked`, poiché `cls-hooked` dipende da `async_hooks.createHook`, che Bun non implementa.

Il contesto della richiesta viene rilasciato una volta mappata la risposta, così gli helper autonomi non si risolvono mai su una richiesta già terminata. Quando vengono chiamati al di fuori di una richiesta gestita dal plugin, ricadono sulla locale predefinita configurata.

## Configurazione

Il plugin legge il tuo file `intlayer.config.ts`. Puoi personalizzare il cookie e l'header utilizzati per il rilevamento della locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> Per maggiori informazioni sulla configurazione, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
