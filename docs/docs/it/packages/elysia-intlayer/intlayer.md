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

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Il plugin registra il proprio contesto tramite un `derive` **globale**, che Elysia tipizza come `Partial<{ intlayer: IntlayerContext }>`. A runtime il valore è sempre presente per le route registrate dopo `.use(intlayer())`, quindi usa la non-null assertion (`intlayer!.t`) — oppure l'optional chaining — per soddisfare TypeScript in modalità `strict`.

Gli stessi helper sono disponibili come export autonomi, così puoi richiamarli senza destrutturare il contesto della route:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Descrizione

Il plugin esegue le seguenti operazioni:

1. **Rilevamento della locale**: Legge la locale impostata esplicitamente dal client dallo storage (cookie, header), quindi ricade sulla locale negoziata a partire dall'header `Accept-Language`.
2. **Iniezione nel contesto**: Aggiunge una proprietà `intlayer` al contesto della route di Elysia (vedi la tabella Contesto della route qui sotto).
3. **Gestione del contesto**: Utilizza `AsyncLocalStorage` per gestire un contesto asincrono, consentendo alle funzioni globali di Intlayer (`t`, `getIntlayer`, `getDictionary`) di accedere alla locale specifica della richiesta senza dover passare l'oggetto di contesto.
4. **Preparazione dei dizionari**: Richiama `prepareIntlayer` alla creazione del plugin, così i dizionari vengono costruiti all'avvio dell'applicazione.

### Contesto della route

| Proprietà         | Tipo                   | Descrizione                                                                                              |
| ----------------- | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | La locale da usare per questa richiesta, con `locale_storage` che ha la precedenza su `locale_detected`. |
| `locale_storage`  | `Locale` (opzionale)   | La locale richiesta esplicitamente dal client tramite un cookie o un header.                             |
| `locale_detected` | `Locale`               | La locale negoziata a partire dagli header della richiesta.                                              |
| `defaultLocale`   | `Locale`               | La locale configurata come fallback in `intlayer.config.ts`.                                             |
| `t`               | `TranslateFunction`    | Una funzione di traduzione.                                                                              |
| `getIntlayer`     | `typeof getIntlayer`   | Una funzione per recuperare i dizionari tramite chiave.                                                  |
| `getDictionary`   | `typeof getDictionary` | Una funzione per elaborare gli oggetti dizionario.                                                       |

> A differenza dei plugin Intlayer basati su Node, `elysia-intlayer` si affida ad `AsyncLocalStorage` anziché a `cls-hooked`, poiché `cls-hooked` dipende da `async_hooks.createHook`, che Bun non implementa.

Il contesto della richiesta viene rilasciato una volta mappata la risposta, così gli helper autonomi non si risolvono mai su una richiesta già terminata. Quando vengono chiamati al di fuori di una richiesta gestita dal plugin, ricadono sulla locale predefinita configurata.

## Ordine di risoluzione della locale

Per impostazione predefinita, il plugin risolve la locale in questo ordine:

1. Il cookie `INTLAYER_LOCALE`.
2. L'header `x-intlayer-locale`.
3. La negoziazione dell'header `Accept-Language`.
4. La `defaultLocale` configurata.

```bash
# Negoziata da `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Il cookie ha la precedenza su `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# L'header ha la precedenza su `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Configurazione

Il plugin legge il tuo file `intlayer.config.ts`. Puoi personalizzare il cookie e l'header utilizzati per il rilevamento della locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Per maggiori informazioni sulla configurazione, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Documentazione correlata

- [Documentazione del pacchetto elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Guida completa per tradurre la tua app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_elysia.md)
