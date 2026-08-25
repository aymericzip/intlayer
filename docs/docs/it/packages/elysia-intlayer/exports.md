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

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` è una peer dependency (`>=1.0.0`). Elysia è pensato per il runtime **Bun**.

## Esportazioni

### Plugin

Importazione:

```ts
import { intlayer } from "elysia-intlayer";
```

| Funzione   | Descrizione                                                                                                                                                                                                                                                                                                                                  | Documento correlato                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia che integra Intlayer nella tua applicazione Elysia. Gestisce il rilevamento della locale dallo storage (cookie, header) e poi da `Accept-Language`, inietta un oggetto `intlayer` che espone `locale`, `t`, `getIntlayer` e `getDictionary` nel contesto della route e configura il contesto di richiesta `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/elysia-intlayer/intlayer.md) |

### Funzioni

Importazione:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Funzione        | Descrizione                                                                                                                                                                                                                                                                                       | Documento correlato                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funzione di traduzione globale che recupera il contenuto per la locale corrente in Elysia. Utilizza `AsyncLocalStorage` per accedere al contesto di richiesta configurato dal plugin `intlayer` e ricade sulla locale predefinita al di fuori di esso. Accessibile anche tramite `intlayer.t`.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getIntlayer`   | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e ne restituisce il contenuto per la locale corrente. Versione ottimizzata di `getDictionary`. Utilizza `AsyncLocalStorage` per accedere al contesto della richiesta. Accessibile anche tramite `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Elabora gli oggetti dizionario e restituisce il contenuto per la locale corrente. Elabora traduzioni `t()`, enumerazioni, markdown, HTML, ecc. Utilizza `AsyncLocalStorage` per accedere al contesto della richiesta. Accessibile anche tramite `intlayer.getDictionary`.                         | -                                                                                                      |

### Tipi

Importazione:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipo                | Descrizione                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Forma dell'oggetto `intlayer` iniettato in ogni contesto di route: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Firma della funzione di traduzione, che traduce una locale map nel contenuto corrispondente alla locale della richiesta corrente.                                       |

## Utilizzo

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Carica il plugin di internazionalizzazione
  .use(intlayer())
  // Leggi la locale e gli helper dal contesto della route
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      it: "Ciao",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Oppure usa gli helper standalone, legati alla richiesta corrente
  .get("/t_example", () =>
    t({
      it: "Esempio di contenuto restituito in italiano",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Il plugin registra il proprio contesto tramite un `derive` **globale**, che Elysia tipizza come `Partial<{ intlayer: IntlayerContext }>`. A runtime il valore è sempre presente per le route registrate dopo `.use(intlayer())`, quindi usa la non-null assertion (`intlayer!.locale`) — oppure l'optional chaining — per soddisfare TypeScript in modalità `strict`.

## Documentazione correlata

- [Elysia i18n - Guida completa per tradurre la tua app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_elysia.md)
- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
