---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du hook useDictionary | remix-intlayer
description: Découvrez comment utiliser le hook useDictionary dans les applications Remix 3 pour résoudre des objets dictionnaires pour la locale de la requête.
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentation du hook useDictionary

Le hook `useDictionary` transforme un objet dictionnaire importé ou inline et retourne son contenu résolu pour la locale de la requête actuelle dans les applications Remix 3.

Contrairement à `useIntlayer`, qui résout les dictionnaires par leur clé textuelle depuis le registre global, `useDictionary` accepte directement un objet dictionnaire.

## Utilisation

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Vous pouvez également passer des dictionnaires inline définis avec `t()` :

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        fr: "Tous droits réservés.",
        en: "All rights reserved.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Paramètres

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`** : Un objet dictionnaire ou groupe de dictionnaires qualifié.
2. **`localeOrSelector`** (optionnel) : Une locale spécifique ou un objet sélecteur (`{ item }`, `{ variant }`, éventuellement avec `locale`).

## Description

Le hook effectue les tâches suivantes :

1. **Détection de la locale** : Lit la locale active de la requête depuis le stockage `AsyncLocalStorage` créé par le middleware `intlayer()`.
2. **Résolution du contenu** : Évalue les traductions (`t()`), énumérations, conditions et structures imbriquées selon la locale résolue.
3. **Traitement des sélecteurs** : Applique les sélecteurs d'élément ou de variante fournis dans les arguments.

## Documentation associée

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useLocale.md)
