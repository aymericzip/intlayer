---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto preact-intlayer
description: Integrazione specifica per Preact di Intlayer, che fornisce provider e hook per applicazioni Preact.
keywords:
  - preact-intlayer
  - preact
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto preact-intlayer

Il pacchetto `preact-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni Preact. Include provider e hook per gestire contenuti multilingue.

## Installazione

```bash
npm install preact-intlayer
```

## Esportazioni

### Provider

| Componente         | Descrizione                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Il provider principale che avvolge la tua applicazione e fornisce il contesto Intlayer. |

### Hooks

| Hook            | Descrizione                                                                                                      | Documento correlato                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Si basa su `useDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.     | -                                                                                                     |
| `useDictionary` | Processa oggetti che assomigliano a dizionari (chiave, contenuto). Gestisce traduzioni `t()`, enumerazioni, ecc. | -                                                                                                     |
| `useLocale`     | Restituisce la locale corrente e una funzione per impostarla.                                                    | -                                                                                                     |
| `t`             | Seleziona il contenuto in base alla locale corrente.                                                             | [traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |

### Componenti

| Component          | Descrizione                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `MarkdownProvider` | Provider per il contesto di rendering del markdown.                      |
| `MarkdownRenderer` | Esegue il rendering di contenuti markdown con componenti personalizzati. |
