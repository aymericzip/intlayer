---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto express-intlayer
description: Middleware Express per Intlayer, che fornisce funzioni di traduzione e rilevamento della locale.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto express-intlayer

Il pacchetto `express-intlayer` fornisce un middleware per applicazioni Express per gestire l'internazionalizzazione. Rileva la locale dell'utente e fornisce funzioni di traduzione.

## Installazione

```bash
npm install express-intlayer
```

## Esportazioni

### Middleware

Importazione:

```tsx
import "express-intlayer";
```

| Funzione   | Descrizione                                                                                                                                                                                                                                                                                                | Documento correlato                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware Express che rileva la locale dell'utente e popola `res.locals` con i dati di Intlayer. Esegue il rilevamento della locale dai cookie/headers, inietta `t`, `getIntlayer` e `getDictionary` in `res.locals`, e configura uno namespace CLS per l'accesso durante il ciclo di vita della request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/express-intlayer/intlayer.md) |

### Funzioni

Importazione:

```tsx
import "express-intlayer";
```

| Funzione        | Descrizione                                                                                                                                                                                                                                | Documento correlato                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funzione di traduzione che recupera il contenuto per la locale corrente. Funziona all'interno del ciclo di vita della richiesta gestito dal middleware `intlayer`. Usa CLS (Async Local Storage) per accedere al contesto della richiesta. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getIntlayer`   | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e restituisce il suo contenuto per la locale specificata. Versione ottimizzata di `getDictionary`. Utilizza CLS per accedere al contesto della richiesta.        | -                                                                                                      |
| `getDictionary` | Elabora gli oggetti dizionario e restituisce il contenuto per la locale specificata. Elabora le traduzioni `t()`, le enumerazioni, il markdown, l'HTML, ecc. Utilizza CLS per accedere al contesto della richiesta.                        | -                                                                                                      |
