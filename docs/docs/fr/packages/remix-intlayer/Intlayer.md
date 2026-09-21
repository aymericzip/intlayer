---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du contexte Intlayer | remix-intlayer
description: Découvrez comment utiliser la clé et la propriété de contexte de requête Intlayer dans les applications Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - context
  - RequestContext
  - Internationalisation
  - Documentation
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

# Documentation du contexte Intlayer

Dans `remix-intlayer`, `Intlayer` est la clé de `RequestContext` utilisée pour accéder à l'état d'internationalisation dans les gestionnaires de requêtes Remix 3.

## Utilisation

Lorsque le middleware `intlayer()` s'exécute, il stocke un objet `IntlayerState` dans le contexte de requête sous la clé `Intlayer`. Vous pouvez le récupérer dans n'importe quel gestionnaire de route :

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Accès via context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Vous pouvez également y accéder à l'aide du raccourci de propriété directe `context.intlayer` :

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Structure de `IntlayerState`

L'objet `IntlayerState` contient :

| Propriété          | Type                | Description                                                |
| ------------------ | ------------------- | ---------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | La locale résolue pour la requête en cours.                |
| `defaultLocale`    | `DeclaredLocales`   | La locale de secours configurée dans `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | La liste de toutes les locales configurées dans le projet. |

## Documentation associée

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useIntlayer.md)
