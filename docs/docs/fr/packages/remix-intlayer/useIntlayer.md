---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du hook useIntlayer | remix-intlayer
description: Découvrez comment utiliser le hook useIntlayer dans les applications Remix 3 pour accéder au contenu localisé par clé.
keywords:
  - useIntlayer
  - dictionnaire
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentation du hook useIntlayer

Le hook `useIntlayer` vous permet de récupérer du contenu localisé depuis un dictionnaire Intlayer par clé dans les applications Remix 3.

Il lit automatiquement la locale active à partir du contexte de requête actuel (via `AsyncLocalStorage`), vous évitant de propager manuellement la locale dans vos gestionnaires de route, templates de vue ou composants.

## Utilisation

### Dans les gestionnaires de route

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### Dans les templates de vue / composants

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Paramètres

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`** : La clé unique du dictionnaire (telle que définie dans vos fichiers de déclaration `.content.ts`).
2. **`localeOrSelector`** (optionnel) : Une locale spécifique ou un objet sélecteur (`{ item }`, `{ variant }`, éventuellement avec `locale`). Lorsqu'il est fourni, il remplace la locale détectée depuis le contexte de la requête.

## Description

Le hook effectue les tâches suivantes :

1. **Récupération de la locale du contexte** : Détecte la locale actuelle à partir de la portée `AsyncLocalStorage` liée à la requête, établie par le middleware `intlayer()`.
2. **Récupération du dictionnaire** : Récupère le dictionnaire pré-compilé correspondant à la clé fournie.
3. **Traitement de la traduction** : Résout les traductions, énumérations, markdown et contenus conditionnels pour la locale résolue.
4. **Gestion de secours** : S'il est appelé hors d'un contexte de requête HTTP active, il bascule proprement vers la `defaultLocale` configurée.

## Documentation associée

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useLocale.md)
