---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto next-intlayer
description: Integrazione specifica per Next.js di Intlayer, che fornisce middleware e provider per App Router e Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# next-intlayer Package

Il pacchetto `next-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Next.js. Supporta sia l'App Router che il Page Router, incluso il middleware per il routing basato sulla locale.

## Installazione

```bash
npm install next-intlayer
```

## Esportazioni

### Middleware

| Funzione             | Descrizione                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware di Next.js per gestire il routing basato sulla locale e i reindirizzamenti. |

### Provider

| Componente               | Descrizione                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `IntlayerClientProvider` | Provider per componenti lato client in Next.js.              |
| `IntlayerServerProvider` | Provider per componenti lato server in Next.js (App Router). |

### Hooks (client-side)

Re-esporta la maggior parte degli hook da `react-intlayer`.

| Hook            | Descrizione                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `useIntlayer`   | Seleziona un dizionario tramite la sua chiave e restituisce il contenuto. |
| `useDictionary` | Seleziona un dizionario tramite la sua chiave e restituisce il contenuto. |
| `useLocale`     | Restituisce la locale corrente e una funzione per impostarla.             |
| `useI18n`       | Restituisce i valori correnti del contesto Intlayer.                      |

### Funzioni (Server-side)

| Funzione               | Descrizione                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `t`                    | Versione server-side della funzione di traduzione per l'App Router di Next.js. |
| `generateStaticParams` | Genera parametri statici per le route dinamiche di Next.js.                    |

### Tipi

| Tipo                 | Descrizione                                          |
| -------------------- | ---------------------------------------------------- |
| `NextPageIntlayer`   | Tipo per le pagine di Next.js con supporto Intlayer. |
| `NextLayoutIntlayer` | Tipo per i layout di Next.js con supporto Intlayer.  |
