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
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pacchetto vue-intlayer

Il pacchetto `vue-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Vue. Include un plugin Vue e dei composables per gestire contenuti multilingue.

## Installazione

```bash
npm install vue-intlayer
```

## Esportazioni

### Plugin

| Funzione          | Descrizione                                                |
| ----------------- | ---------------------------------------------------------- |
| `installIntlayer` | Plugin Vue per installare Intlayer nella tua applicazione. |

### Composables

| Composable      | Descrizione                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `useIntlayer`   | Seleziona un dizionario tramite la sua chiave e restituisce il contenuto. |
| `useDictionary` | Seleziona un dizionario tramite la sua chiave e restituisce il contenuto. |
| `useLocale`     | Restituisce la locale corrente e una funzione per impostarla.             |
| `useIntl`       | Restituisce l'oggetto Intl per la locale corrente.                        |

### Funzioni

| Funzione        | Descrizione                             |
| --------------- | --------------------------------------- |
| `getDictionary` | Recupera un dizionario.                 |
| `getIntlayer`   | Recupera il contenuto da un dizionario. |

### Markdown

| Funzione                  | Descrizione                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue per installare Intlayer Markdown nella tua applicazione. |
