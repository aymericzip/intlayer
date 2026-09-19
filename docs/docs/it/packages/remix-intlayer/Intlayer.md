---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentazione del contesto Intlayer | remix-intlayer
description: Scopri come utilizzare la chiave e la proprietà del contesto di richiesta Intlayer nelle applicazioni Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - contesto
  - RequestContext
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentazione del contesto Intlayer

In `remix-intlayer`, `Intlayer` è la chiave di `RequestContext` utilizzata per accedere allo stato di internazionalizzazione all'interno dei gestori di richieste di Remix 3.

## Utilizzo

Quando il middleware `intlayer()` viene eseguito, memorizza un oggetto `IntlayerState` nel contesto della richiesta sotto la chiave `Intlayer`. Puoi recuperarlo all'interno di qualsiasi gestore di route:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Accesso tramite context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Puoi accedere anche utilizzando la scorciatoia diretta della proprietà `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Struttura di `IntlayerState`

L'oggetto `IntlayerState` contiene:

| Proprietà          | Tipo                | Descrizione                                                            |
| ------------------ | ------------------- | ---------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | La locale risolta per la richiesta corrente.                           |
| `defaultLocale`    | `DeclaredLocales`   | La locale di fallback predefinita configurata in `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | L'elenco di tutte le locale supportate configurate per il progetto.    |

## Documentazione correlata

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/remix-intlayer/useIntlayer.md)
