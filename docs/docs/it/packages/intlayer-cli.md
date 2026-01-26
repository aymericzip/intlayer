---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto intlayer-cli
description: Strumento CLI per Intlayer, che fornisce comandi per la build e l'audit dei dizionari.
keywords:
  - intlayer-cli
  - cli
  - strumenti
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto intlayer-cli

Il pacchetto `intlayer-cli` fornisce un set di comandi per gestire i dizionari e la configurazione di Intlayer.

## Installazione

```bash
npm install intlayer-cli
```

## Esportazioni

### Comandi CLI (Funzioni)

Il pacchetto esporta funzioni che alimentano i comandi CLI.

| Funzione    | Descrizione                                           |
| ----------- | ----------------------------------------------------- |
| `build`     | Costruisce i dizionari Intlayer.                      |
| `audit`     | Esegue l'audit dei dizionari per traduzioni mancanti. |
| `liveSync`  | Sincronizza i dizionari in tempo reale.               |
| `pull`      | Recupera i dizionari da una sorgente remota.          |
| `push`      | Invia i dizionari a una sorgente remota.              |
| `test`      | Esegue test sui dizionari.                            |
| `transform` | Trasforma i dizionari tra formati.                    |
