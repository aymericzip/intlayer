---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto svelte-intlayer
description: Integrazione specifica per Svelte di Intlayer, che fornisce funzioni di setup e store per applicazioni Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto svelte-intlayer

Il pacchetto `svelte-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Svelte. Include funzioni di setup e store per gestire contenuti multilingue.

## Installazione

```bash
npm install svelte-intlayer
```

## Esportazioni

### Configurazione

Importazione:

```tsx
import "svelte-intlayer";
```

| Funzione        | Descrizione                                                      |
| --------------- | ---------------------------------------------------------------- |
| `setupIntlayer` | Funzione per configurare Intlayer nella tua applicazione Svelte. |

### Store

Importa:

```tsx
import "svelte-intlayer";
```

| Store           | Descrizione                                              |
| --------------- | -------------------------------------------------------- |
| `intlayerStore` | Svelte store che contiene lo stato corrente di Intlayer. |

### Hooks (Contesto)

Importa:

```tsx
import "svelte-intlayer";
```

| Funzione               | Descrizione                                                                                                                                | Doc correlata                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Basato su `useDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.                                | -                                                                                                                        |
| `useDictionary`        | Elabora oggetti che assomigliano a dizionari (key, content). Gestisce le traduzioni `t()`, le enumerazioni, ecc.                           | -                                                                                                                        |
| `useDictionaryAsync`   | Come `useDictionary`, ma gestisce dizionari asincroni.                                                                                     | -                                                                                                                        |
| `useDictionaryDynamic` | Come `useDictionary`, ma gestisce dizionari dinamici.                                                                                      | -                                                                                                                        |
| `useLocale`            | Restituisce la locale corrente e una funzione per impostarla.                                                                              | -                                                                                                                        |
| `useRewriteURL`        | Funzione lato client per gestire le riscritture degli URL. Aggiorna automaticamente l'URL se esiste una regola di riscrittura localizzata. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Restituisce l'oggetto Intl per la locale corrente.                                                                                         | -                                                                                                                        |

### Markdown

Importazione:

```tsx
import "svelte-intlayer";
```

| Funzione              | Descrizione                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `setIntlayerMarkdown` | Funzione per impostare il contesto Markdown nella tua applicazione Svelte. |
