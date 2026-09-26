---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Documentazione del pacchetto astro-intlayer
description: Integrazione Astro per Intlayer, che fornisce configurazione per il routing basato su locale, middleware, hook, store client e gestione dei dizionari.
keywords:
  - astro-intlayer
  - astro
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Aggiunta documentazione degli hook useIntlayer, useDictionary, useLocale, del middleware e dei formattatori"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentazione unificata per tutte le esportazioni"
author: aymericzip
---

# Pacchetto astro-intlayer

Il pacchetto `astro-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Astro. Configura il routing basato su locale, la gestione dei dizionari, la riscrittura delle pagine in fase di compilazione, il middleware di richiesta e gli hook per accedere a contenuti multilingue sia nei componenti `.astro` renderizzati dal server sia negli script lato client.

## Installazione

```bash
npm install astro-intlayer
```

## Esportazioni

### Integrazione

Il pacchetto `astro-intlayer` fornisce un'integrazione Astro che configura Intlayer nel tuo progetto.

Importazione:

```tsx
import { intlayer } from "astro-intlayer";
```

o importazione predefinita in `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Funzione   | Descrizione                                                                                                                                                                                                          | Documentazione correlata                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Integrazione Astro che prepara i dizionari, configura i plugin Vite (alias, proxy di routing, eliminazione), registra automaticamente il middleware di richiesta ed emette pagine pre-renderizzate su URL riscritti. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/intlayer.md) |

### Hook (Server e Client)

Importazione:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Descrizione                                                                                                                                                                                                  | Documentazione correlata                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Seleziona un dizionario tramite la sua chiave e restituisce il suo contenuto localizzato. Nel frontmatter `.astro`, legge il locale di richiesta da `Astro.locals`. In `<script>`, legge dallo store client. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Trasforma un oggetto dizionario e restituisce il contenuto per il locale risolto. Funziona nel frontmatter e negli script client.                                                                            | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Restituisce il locale corrente, il locale predefinito, i locale disponibili e una funzione per aggiornare il locale.                                                                                         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Importazione:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Esportazione | Tipo                | Descrizione                                                                                                                                                                      | Documentazione correlata                                                                                        |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest`  | `MiddlewareHandler` | Middleware Astro che rileva il locale della richiesta e allega `Astro.locals.intlayer`. Registrato automaticamente da `intlayer()`, o importato manualmente per essere composto. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/onRequest.md) |

### Utilità

Importazione:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Funzione            | Descrizione                                                                                                                              | Documentazione correlata |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `getIntlayerLocals` | Funzione helper per recuperare l'oggetto `IntlayerLocals` corrente dall'ambito di archiviazione della richiesta fuori da `Astro.locals`. | -                        |

### Utilità Client (astro-intlayer/client)

Importazione:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Quando importato nel browser o all'interno dei tag client `<script>`, `astro-intlayer` si mappa automaticamente su `astro-intlayer/client` (alimentato da `vanilla-intlayer`), fornendo getter di dizionario lato client, sottoscrittori dello store e strumenti di persistenza del locale.

### Formattatori (astro-intlayer/format)

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
} from "astro-intlayer/format";
```

| Hook              | Descrizione                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Restituisce un'istanza Intl associata al locale con funzionalità di memorizzazione nella cache e iscrizione.           |
| `useDate`         | Restituisce una funzione di formattazione della data associata al locale corrente (`Intl.DateTimeFormat`).             |
| `useNumber`       | Restituisce una funzione di formattazione numerica associata al locale corrente (`Intl.NumberFormat`).                 |
| `useCurrency`     | Restituisce una funzione di formattazione della valuta associata al locale corrente.                                   |
| `usePercentage`   | Restituisce una funzione di formattazione della percentuale associata al locale corrente.                              |
| `useRelativeTime` | Restituisce una funzione di formattazione del tempo relativo associata al locale corrente (`Intl.RelativeTimeFormat`). |
| `useList`         | Restituisce una funzione di formattazione di elenchi associata al locale corrente (`Intl.ListFormat`).                 |
| `useUnit`         | Restituisce una funzione di formattazione delle unità associata al locale corrente.                                    |
| `useCompact`      | Restituisce una funzione di formattazione numerica compatta associata al locale corrente (es. `1.5K`).                 |

### Utilità HTML (astro-intlayer/html)

Importazione:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Esportazione      | Tipo       | Descrizione                                                          |
| ----------------- | ---------- | -------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Funzione di utilità autonoma per il rendering dei nodi HTML.         |
| `useHTML`         | `Hook`     | Hook per ottenere il contesto e la configurazione del provider HTML. |
| `useHTMLRenderer` | `Hook`     | Hook per ottenere una funzione di rendering HTML preconfigurata.     |

### Utilità Markdown (astro-intlayer/markdown)

Importazione:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Esportazione          | Tipo       | Descrizione                                                          |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compila stringhe markdown in una rappresentazione strutturata.       |
| `renderMarkdown`      | `Function` | Renderizza il contenuto markdown in nodi di output.                  |
| `parseMarkdown`       | `Function` | Analizza il contenuto markdown non elaborato in un AST.              |
| `useMarkdown`         | `Hook`     | Hook per ottenere il contesto del provider markdown.                 |
| `useMarkdownRenderer` | `Hook`     | Hook per ottenere una funzione di rendering Markdown preconfigurata. |

### Tipi

Importazione:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Tipo              | Descrizione                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | L'oggetto allegato a `Astro.locals.intlayer` contenente `locale`, `defaultLocale` e `availableLocales`. |
| `UseLocaleProps`  | Proprietà di configurazione opzionali accettate da `useLocale()`.                                       |
| `UseLocaleResult` | Il tipo restituito da `useLocale()`, che fornisce proprietà del locale e metodi di aggiornamento.       |
