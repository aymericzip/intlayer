---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto fastify-intlayer
description: Plugin Fastify per Intlayer, che fornisce funzioni di traduzione e rilevamento della locale.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto fastify-intlayer

Il pacchetto `fastify-intlayer` fornisce un plugin per applicazioni Fastify per gestire l'internazionalizzazione. Rileva la locale dell'utente e decora l'oggetto request.

## Installazione

```bash
npm install fastify-intlayer
```

## Esportazioni

### Plugin

Importazione:

```tsx
import "fastify-intlayer";
```

| Funzione   | Descrizione                                                                                                                                                                                                                                                                                                                          | Documento correlato                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Fastify che integra Intlayer nella tua applicazione Fastify. Gestisce il rilevamento della locale da storage (cookie, header), decora l'oggetto request con dati `intlayer` contenenti `t`, `getIntlayer` e `getDictionary`, e configura il namespace CLS per l'accesso programmatico durante il ciclo di vita della request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/fastify-intlayer/intlayer.md) |

### Funzioni

Importa:

```tsx
import "fastify-intlayer";
```

| Funzione        | Descrizione                                                                                                                                                                                                                                                                                   | Documentazione correlata                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funzione di traduzione globale che recupera il contenuto per la locale corrente in Fastify. Utilizza CLS (Async Local Storage) e deve essere utilizzata all'interno di un contesto di richiesta gestito dal plugin `intlayer`. È inoltre accessibile tramite `req.intlayer.t`.                | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getIntlayer`   | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e restituisce il suo contenuto per la locale specificata. Versione ottimizzata di `getDictionary`. Utilizza CLS per accedere al contesto della richiesta. È inoltre accessibile tramite `req.intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Elabora gli oggetti dizionario e restituisce il contenuto per la locale specificata. Elabora le traduzioni `t()`, enumerazioni, markdown, HTML, ecc. Usa CLS per accedere al contesto della richiesta. Può anche essere accessibile tramite `req.intlayer.getDictionary`.                     | -                                                                                                      |
