---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentazione del Pacchetto hono-intlayer
description: Middleware Hono per Intlayer, che fornisce funzioni di traduzione e rilevamento della locale.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Documentazione unificata per tutti gli export
---

# Pacchetto hono-intlayer

Il pacchetto `hono-intlayer` fornisce un middleware per le applicazioni Hono per gestire l'internazionalizzazione. Rileva la locale dell'utente e popola l'oggetto contesto.

## Installazione

```bash
npm install hono-intlayer
```

## Export

### Middleware

Importazione:

```tsx
import { intlayer } from "hono-intlayer";
```

| Funzione   | Descrizione                                                                                                                                                                                                                                                                                               | Documentazione Correlata                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware Hono che integra Intlayer nella tua applicazione Hono. Gestisce il rilevamento della locale dallo storage (cookie, intestazioni), popola il contesto con `t`, `getIntlayer` e `getDictionary` e imposta il namespace CLS per l'accesso programmatico durante il ciclo di vita della richiesta. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/hono-intlayer/intlayer.md) |

### Funzioni

Importazione:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Funzione        | Descrizione                                                                                                                                                                                                                                                                        | Documentazione Correlata                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t`             | Funzione di traduzione globale che recupera il contenuto per la locale corrente in Hono. Utilizza CLS (Async Local Storage) e deve essere utilizzata all'interno di un contesto di richiesta gestito dal middleware `intlayer`. Può essere accessibile anche tramite contesto.     | [traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getIntlayer`   | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e restituisce il suo contenuto per la locale specificata. Versione ottimizzata di `getDictionary`. Utilizza CLS per accedere al contesto della richiesta. Può essere accessibile anche tramite contesto. | -                                                                                                     |
| `getDictionary` | Elabora oggetti dizionario e restituisce il contenuto per la locale specificata. Elabora traduzioni `t()`, enumerazioni, markdown, HTML, ecc. Utilizza CLS per accedere al contesto della richiesta. Può essere accessibile anche tramite contesto.                                | -                                                                                                     |
