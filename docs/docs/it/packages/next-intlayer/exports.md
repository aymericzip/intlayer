---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto next-intlayer
description: Integrazione specifica per Next.js di Intlayer, che fornisce middleware e provider per App Router e Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto next-intlayer

Il pacchetto `next-intlayer` fornisce gli strumenti necessari per integrare Intlayer in applicazioni Next.js. Supporta sia l'App Router che il Page Router, incluso il middleware per il routing basato sulla locale.

## Installazione

```bash
npm install next-intlayer
```

## Esportazioni

### Middleware

Importazione:

```tsx
import "next-intlayer/middleware";
```

| Funzione             | Descrizione                                                                                                                                                              | Documento correlato                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware di Next.js per gestire il routing basato sulla locale e i redirect. Rileva la locale dagli header/cookie e reindirizza al percorso appropriato per la locale. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/intlayerMiddleware.md) |

### Helper di configurazione

Importa:

```tsx
import "next-intlayer/server";
```

| Funzione           | Descrizione                                                                                                                                                                                              | Doc correlata |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `withIntlayer`     | Helper asincrono per avvolgere la configurazione di Next.js, garantendo che i dizionari di Intlayer siano preparati prima della build. Prepara i file di contenuto e configura i plugin per webpack/SWC. | -             |
| `withIntlayerSync` | Helper sincrono per avvolgere la configurazione di Next.js, ideale per configurazioni in cui l'async non è possibile o non è desiderato. Non prepara i dizionari all'avvio del server.                   | -             |

### Provider

Importazione:

```tsx
import "next-intlayer";
```

or

```tsx
import "next-intlayer/server";
```

| Componente               | Descrizione                                                                                                                       | Documentazione correlata |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `IntlayerClientProvider` | Provider per componenti lato client nell'App Router di Next.js. Avvolge `IntlayerProvider` di react-intlayer.                     | -                        |
| `IntlayerServerProvider` | Provider per componenti lato server in Next.js (App Router). Fornisce il contesto della locale sul server.                        | -                        |
| `IntlayerServer`         | Wrapper lato server per i contenuti Intlayer nell'App Router. Garantisce la gestione corretta della locale nei Server Components. | -                        |

### Hook (lato client)

Importazione:

```tsx
import "next-intlayer";
```

Re-esporta la maggior parte degli hook da `react-intlayer`.

| Hook                   | Descrizione                                                                                                                                                | Doc correlata                                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook lato client che seleziona un dizionario tramite la sua chiave e ne restituisce il contenuto. Usa la locale dal contesto se non fornita.               | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook che trasforma un oggetto dizionario e restituisce il contenuto per la locale corrente. Elabora le traduzioni `t()`, enumerazioni, ecc.                | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook che gestisce dizionari asincroni. Accetta una mappa di dizionari basata su Promise e la risolve per la locale corrente.                               | -                                                                                                                       |
| `useDictionaryDynamic` | Hook che gestisce dizionari dinamici caricati per chiave. Utilizza internamente React Suspense per gli stati di caricamento.                               | -                                                                                                                       |
| `useLocale`            | Hook lato client per ottenere la locale corrente e una funzione per impostarla. Migliorato per Next.js App Router con supporto alla navigazione.           | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook lato client per gestire la riscrittura degli URL. Aggiorna automaticamente l'URL se esiste una regola di riscrittura localizzata più pulita.          | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook specifico per il Page Router di Next.js per la gestione della localizzazione. Gestisce i redirect e i ricaricamenti della pagina al cambio di locale. | -                                                                                                                       |
| `useI18n`              | Hook che fornisce una funzione di traduzione `t()` per accedere a contenuti nidificati tramite chiave. Riprende il pattern di i18next/next-intl.           | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook che fornisce un oggetto `Intl` vincolato alla locale. Inietta automaticamente la locale corrente e utilizza caching ottimizzato.                      | -                                                                                                                       |
| `useLoadDynamic`       | Hook per caricare dizionari dinamici usando React Suspense. Accetta una chiave e una Promise, memorizza i risultati in cache.                              | -                                                                                                                       |

### Funzioni (Server-side)

Importazione:

```tsx
import "next-intlayer/server";
```

| Funzione               | Descrizione                                                                                                                                                      | Doc correlata                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Versione server-side della funzione di traduzione per Next.js App Router. Restituisce la traduzione di contenuti multilingue per la locale del server.           | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getLocale`            | Funzione helper per estrarre la locale corrente dagli header e dai cookie di Next.js. Progettata per Server Components, Server Actions o Route Handlers.         | -                                                                                                      |
| `generateStaticParams` | Genera parametri statici per le route dinamiche di Next.js basate sulle localizzazioni configurate. Restituisce un array di oggetti locale per il pre-rendering. | -                                                                                                      |
| `locale`               | Funzione per ottenere o impostare la locale nel contesto server (App Router). Fornisce la gestione della locale nei Server Components.                           | -                                                                                                      |

### Tipi

Importazione:

```tsx
import "next-intlayer";
```

| Tipo                   | Descrizione                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Tipo per le pagine di Next.js con supporto Intlayer. Tipo generico che include il parametro locale.                                 |
| `Next14PageIntlayer`   | Tipo per le pagine di Next.js 14 con supporto Intlayer.                                                                             |
| `Next15PageIntlayer`   | Tipo per le pagine di Next.js 15 con supporto Intlayer.                                                                             |
| `NextLayoutIntlayer`   | Tipo per i layout di Next.js con supporto Intlayer. Tipo generico che include il parametro locale.                                  |
| `Next14LayoutIntlayer` | Tipo per i layout di Next.js 14 con supporto Intlayer.                                                                              |
| `Next15LayoutIntlayer` | Tipo per i layout di Next.js 15 con supporto Intlayer.                                                                              |
| `LocalParams`          | Tipo per i parametri di route di Next.js con locale. Oggetto con proprietà `locale`.                                                |
| `LocalPromiseParams`   | Tipo per i parametri di route di Next.js con locale (versione asincrona). Promise che risolve in un oggetto con proprietà `locale`. |
