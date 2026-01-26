---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto vue-intlayer
description: Integrazione specifica per Vue di Intlayer, che fornisce plugin e composables per applicazioni Vue.
keywords:
  - vue-intlayer
  - vue
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto vue-intlayer

Il pacchetto `vue-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Vue. Include un plugin Vue e dei composables per gestire contenuti multilingue.

## Installazione

```bash
npm install vue-intlayer
```

## Esportazioni

### Plugin

Importazione:

```tsx
import "vue-intlayer";
```

| Funzione          | Descrizione                                                |
| ----------------- | ---------------------------------------------------------- |
| `installIntlayer` | Plugin Vue per installare Intlayer nella tua applicazione. |

### Composables

Importazione:

```tsx
import "vue-intlayer";
```

| Composable             | Descrizione                                                                                                                                  | Documentazione correlata                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basato su `useDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.                                  | -                                                                                                                     |
| `useDictionary`        | Elabora oggetti che sembrano dizionari (chiave, contenuto). Elabora traduzioni `t()`, enumerazioni, ecc.                                     | -                                                                                                                     |
| `useDictionaryAsync`   | Come `useDictionary`, ma gestisce dizionari asincroni.                                                                                       | -                                                                                                                     |
| `useDictionaryDynamic` | Come `useDictionary`, ma gestisce dizionari dinamici.                                                                                        | -                                                                                                                     |
| `useLocale`            | Restituisce la locale corrente e una funzione per impostarla.                                                                                | -                                                                                                                     |
| `useRewriteURL`        | Composable lato client per gestire le riscritture degli URL. Aggiorna automaticamente l'URL se esiste una regola di riscrittura localizzata. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Restituisce l'oggetto Intl per la locale corrente.                                                                                           | -                                                                                                                     |
| `useLoadDynamic`       | Composable per caricare dizionari dinamici.                                                                                                  | -                                                                                                                     |

### Funzioni

Import:

```tsx
import "vue-intlayer";
```

| Funzione        | Descrizione                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Elabora oggetti che assomigliano a dizionari (chiave, contenuto). Gestisce le traduzioni `t()`, le enumerazioni, ecc. |
| `getIntlayer`   | Basato su `getDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.           |

### Markdown

Import:

```tsx
import "vue-intlayer/markdown";
```

| Funzione                  | Descrizione                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue per installare Intlayer Markdown nella tua applicazione. |
