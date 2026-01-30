---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentazione del pacchetto adonis-intlayer
description: Middleware AdonisJS per Intlayer, che fornisce funzioni di traduzione e rilevamento della locale.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentazione iniziale
---

# Pacchetto adonis-intlayer

Il pacchetto `adonis-intlayer` fornisce un middleware per le applicazioni AdonisJS per gestire l'internazionalizzazione. Rileva la locale dell'utente e fornisce funzioni di traduzione.

## Installazione

```bash
npm install adonis-intlayer
```

## Esportazioni

### Middleware

Il pacchetto fornisce un middleware AdonisJS per gestire l'internazionalizzazione.

| Funzione             | Descrizione                                                                                                                                                                                                                                                                                  | Doc correlata                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware AdonisJS che rileva la locale dell'utente e popola il contesto della richiesta con i dati di Intlayer. Imposta inoltre un namespace CLS (Async Local Storage) per l'accesso al ciclo di vita della richiesta, consentendo l'uso di funzioni globali come `t`, `getIntlayer`, ecc. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/adonis-intlayer/intlayer.md) |

### Funzioni

| Funzione        | Descrizione                                                                                                                                                                                                                                     | Doc correlata                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funzione di traduzione che recupera il contenuto per la locale corrente. Funziona all'interno del ciclo di vita della richiesta gestito dal middleware `intlayer`. Utilizza CLS (Async Local Storage) per accedere al contesto della richiesta. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getIntlayer`   | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e restituisce il suo contenuto per la locale specificata. Versione ottimizzata di `getDictionary`. Utilizza CLS per accedere al contesto della richiesta.             | -                                                                                                      |
| `getDictionary` | Elabora gli oggetti dizionario e restituisce il contenuto per la locale specificata. Elabora le traduzioni `t()`, enumerazioni, markdown, HTML, ecc. Utilizza CLS per accedere al contesto della richiesta.                                     | -                                                                                                      |
| `getLocale`     | Recupera la locale corrente dal contesto della richiesta utilizzando CLS.                                                                                                                                                                       | -                                                                                                      |
