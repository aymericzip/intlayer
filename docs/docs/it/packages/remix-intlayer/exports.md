---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentazione del pacchetto remix-intlayer
description: Integrazione di Remix 3 per Intlayer, fornendo middleware, contesto, hook e formattatori per il routing basato sulla locale e la gestione dei contenuti.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Documentazione unificata per tutte le esportazioni"
author: aymericzip
---

# Pacchetto remix-intlayer

Il pacchetto `remix-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Remix 3. Costruito interamente sugli standard web (`Request`, `Response`, `Headers` e `URL`), offre un middleware di router per il routing basato sulla locale e riscritture interne, archiviazione del contesto, hook e utilità di formattazione per la gestione dei contenuti multilingue.

## Installazione

```bash
npm install remix-intlayer
```

## Esportazioni

### Middleware

Importazione:

```tsx
import { intlayer } from "remix-intlayer";
```

| Funzione   | Descrizione                                                                                                                                                                                                                               | Doc correlata                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware del router Remix 3 che gestisce il routing basato sulla locale (reindirizzamenti e riscritture interne), risolve la locale della richiesta, la persiste nei cookie/header e inizializza l'ambito del contesto della richiesta. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/intlayerMiddleware.md) |

### Contesto

Importazione:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| Esportazione                | Tipo         | Descrizione                                                                                                                                                 | Doc correlata                                                                                                 |
| --------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | Chiave di RequestContext contenente l'`IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) per la richiesta corrente.                            | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | Nome della proprietà (`'intlayer'`) installata direttamente sul contesto della richiesta, accessibile tramite `context.intlayer` e `context.get(Intlayer)`. | -                                                                                                             |

### Hook

Importazione:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| Hook            | Descrizione                                                                                                                                                              | Doc correlata                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Seleziona un dizionario tramite la sua chiave e restituisce il suo contenuto per la locale della richiesta corrente. Legge automaticamente dal contesto della richiesta. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Trasforma un oggetto dizionario importato e restituisce il suo contenuto per la locale della richiesta corrente. Supporta selettori.                                     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Restituisce la locale risolta della richiesta corrente, insieme a `defaultLocale` e `availableLocales` configurate.                                                      | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useLocale.md)         |

### Utilità

Importazione:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Funzione              | Descrizione                                                                                                                      | Doc correlata |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `createLocaleRouting` | Funzione pura che determina le azioni di routing (`redirect`, `rewrite` o `pass`) in base a richiesta, configurazione e opzioni. | -             |
| `getIntlayerState`    | Legge l'`IntlayerState` corrente (`locale`, `defaultLocale`, `availableLocales`) dallo scope `AsyncLocalStorage`.                | -             |

### Formattatori (remix-intlayer/format)

Importazione:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Descrizione                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Restituisce un'istanza Intl associata alla locale della richiesta con funzionalità di caching e sottoscrizione.                 |
| `useDate`         | Restituisce una funzione di formattazione della data associata alla locale della richiesta (`Intl.DateTimeFormat`).             |
| `useNumber`       | Restituisce una funzione di formattazione dei numeri associata alla locale della richiesta (`Intl.NumberFormat`).               |
| `useCurrency`     | Restituisce una funzione di formattazione della valuta associata alla locale della richiesta.                                   |
| `usePercentage`   | Restituisce una funzione di formattazione percentuale associata alla locale della richiesta.                                    |
| `useRelativeTime` | Restituisce una funzione di formattazione del tempo relativo associata alla locale della richiesta (`Intl.RelativeTimeFormat`). |
| `useList`         | Restituisce una funzione di formattazione delle liste associata alla locale della richiesta (`Intl.ListFormat`).                |
| `useUnit`         | Restituisce una funzione di formattazione delle unità associata alla locale della richiesta.                                    |
| `useCompact`      | Restituisce una funzione di formattazione numerica compatta associata alla locale della richiesta (es. `1.5K`).                 |

### Utilità HTML (remix-intlayer/html)

Importazione:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Esportazione      | Tipo       | Descrizione                                                                                     |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Funzione di utilità per eseguire il rendering di nodi HTML all'esterno dell'interfaccia utente. |
| `useHTML`         | `Hook`     | Hook per ottenere il contesto e la configurazione del provider HTML.                            |
| `useHTMLRenderer` | `Hook`     | Hook per ottenere una funzione di rendering HTML preconfigurata.                                |

### Utilità Markdown (remix-intlayer/markdown)

Importazione:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Esportazione          | Tipo       | Descrizione                                                          |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compila stringhe markdown in una rappresentazione strutturata.       |
| `renderMarkdown`      | `Function` | Esegue il rendering del contenuto markdown in nodi di output.        |
| `parseMarkdown`       | `Function` | Analizza il contenuto markdown non elaborato in un AST.              |
| `useMarkdown`         | `Hook`     | Hook per accedere al contesto del provider markdown.                 |
| `useMarkdownRenderer` | `Hook`     | Hook per ottenere una funzione di rendering Markdown preconfigurata. |

### Tipi

Importazione:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Tipo                        | Descrizione                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Oggetto di stato contenente `locale`, `defaultLocale` e `availableLocales` memorizzato nel contesto Remix. |
| `IntlayerMiddlewareOptions` | Opzioni di configurazione passate al middleware `intlayer()`.                                              |
| `LocaleRoutingOptions`      | Opzioni che personalizzano i prefissi di locale, il rilevamento e i reindirizzamenti.                      |
| `LocaleRoutingAction`       | Unione discriminata che rappresenta la decisione di routing: `redirect`, `rewrite` o `pass`.               |
| `LocaleRoutingRequest`      | Rappresentazione minima della richiesta richiesta da `createLocaleRouting`.                                |
| `UseLocaleResult`           | Tipo restituito da `useLocale()`, contenente `locale`, `defaultLocale` e `availableLocales`.               |
