---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentazione del pacchetto elysia-intlayer
description: Plugin Elysia per Intlayer, che fornisce funzioni di traduzione e rilevamento della locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Documentazione unificata per tutte le esportazioni"
author: aymericzip
---

# Pacchetto elysia-intlayer

Il pacchetto `elysia-intlayer` fornisce un plugin per applicazioni Elysia per gestire l'internazionalizzazione. Rileva la locale dell'utente e inietta un oggetto `intlayer` nel contesto della route.

## Installazione

```bash
npm install elysia-intlayer
```

## Esportazioni

### Plugin

Importazione:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Funzione   | Descrizione                                                                                                                                                                                                                                                                                                                                  | Documento correlato                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia che integra Intlayer nella tua applicazione Elysia. Gestisce il rilevamento della locale dallo storage (cookie, header) e poi da `Accept-Language`, inietta un oggetto `intlayer` che espone `locale`, `t`, `getIntlayer` e `getDictionary` nel contesto della route e configura il contesto di richiesta `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/elysia-intlayer/intlayer.md) |

### Funzioni

Importazione:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Funzione        | Descrizione                                                                                                                                                                                                                                                                                       | Documento correlato                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funzione di traduzione globale che recupera il contenuto per la locale corrente in Elysia. Utilizza `AsyncLocalStorage` per accedere al contesto di richiesta configurato dal plugin `intlayer` e ricade sulla locale predefinita al di fuori di esso. Accessibile anche tramite `intlayer.t`.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getIntlayer`   | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e ne restituisce il contenuto per la locale corrente. Versione ottimizzata di `getDictionary`. Utilizza `AsyncLocalStorage` per accedere al contesto della richiesta. Accessibile anche tramite `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Elabora gli oggetti dizionario e restituisce il contenuto per la locale corrente. Elabora traduzioni `t()`, enumerazioni, markdown, HTML, ecc. Utilizza `AsyncLocalStorage` per accedere al contesto della richiesta. Accessibile anche tramite `intlayer.getDictionary`.                         | -                                                                                                      |

### Tipi

Importazione:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipo                | Descrizione                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Forma dell'oggetto `intlayer` iniettato in ogni contesto di route: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Firma della funzione di traduzione, che traduce una locale map nel contenuto corrispondente alla locale della richiesta corrente.                                       |
