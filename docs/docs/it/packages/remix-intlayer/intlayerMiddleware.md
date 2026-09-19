---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentazione del middleware intlayer | remix-intlayer
description: Scopri come utilizzare il middleware intlayer nelle applicazioni Remix 3 per il routing basato sulla locale e la gestione del contesto di richiesta.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - routing
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentazione del middleware Remix 3 intlayer

Il middleware `intlayer` per Remix 3 gestisce il livello di internazionalizzazione nell'intera applicazione. Costruito su standard web (`Request` e `Response`), gestisce il routing basato sulla locale (reindirizzamenti e riscritture interne), rileva la locale della richiesta, la persiste nei cookie e nelle intestazioni e imposta un ambito `AsyncLocalStorage` in modo che gestori e componenti possano accedere alle traduzioni senza passare esplicitamente props.

## Utilizzo

Registra il middleware `intlayer` durante l'inizializzazione del router Remix 3:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Serve `/`, `/fr`, `/es`, la locale viene risolta dalla richiesta
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Descrizione

Il middleware `intlayer` esegue le seguenti attività:

1. **Preparazione dei dizionari**: Esegue `prepareIntlayer` all'avvio per garantire che tutti i dizionari generati siano compilati e disponibili.
2. **Routing basato sulla locale**: Valuta la richiesta rispetto alla strategia di routing configurata (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Reindirizzamenti**: Se un utente visita `/about` e deve essere reindirizzato a un prefisso di locale (es. `/it/about`), il middleware invia una risposta di reindirizzamento con le intestazioni `location` e `Set-Cookie` appropriate.
   - **Riscritture interne**: Quando un utente accede a `/it/about`, l'URL viene riscritto internamente in modo che il gestore corrisponda a `/about`, mentre la locale risolta viene catturata come `it`.
   - **Alias URL localizzati**: Rispetta le regole di riscrittura URL definite in `intlayer.config.ts` (es. riscrittura da `/it/about` a `/it/chi-siamo`).
3. **Risoluzione della locale**: Rileva la locale attiva in base al prefisso URL, cookie persistenti, intestazioni personalizzate o preferenze del browser `Accept-Language`.
4. **Iniezione del contesto**:
   - Associa `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) al `RequestContext` di Remix sotto la chiave `Intlayer` e `context.intlayer`.
   - Esegue il resto della richiesta all'interno di un ambito `AsyncLocalStorage` (`requestStorage`), consentendo a `useIntlayer`, `useDictionary` e `useLocale` di essere richiamati in modo pulito in gestori, viste e componenti.
5. **Persistenza**: Allega le intestazioni e i cookie della locale in uscita alla risposta HTTP finale per conservare la preferenza dell'utente.

## Parametri

La funzione `intlayer` accetta `IntlayerMiddlewareOptions` opzionali:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Sostituzioni di configurazione di routing personalizzate
};

const middleware = intlayer(options);
```

## Accesso diretto al contesto

Oltre all'uso degli hook, puoi accedere direttamente all'`IntlayerState` risolto dal contesto della richiesta di Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Tramite context.get()
  const state = context.get(Intlayer);

  // Oppure tramite la proprietà diretta context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Documentazione correlata

- [Contesto `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useLocale.md)
