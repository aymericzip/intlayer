---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du hook useDictionary | astro-intlayer
description: Découvrez comment utiliser le hook useDictionary dans les composants et scripts Astro pour résoudre des objets de dictionnaire.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internationalisation
  - documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc initiale"
author: aymericzip
---

# Documentation du hook useDictionary

Le hook `useDictionary` résout un objet dictionnaire importé ou inline et retourne son contenu pour la locale actuelle dans les applications Astro.

Contrairement à `useIntlayer`, qui récupère les dictionnaires par clé depuis le registre global de dictionnaires, `useDictionary` fonctionne directement avec un objet dictionnaire.

## Utilisation

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Vous pouvez également passer des dictionnaires inline définis avec `t()` :

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      fr: "Tous droits réservés.",
      en: "All rights reserved.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Paramètres

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`** : Un objet dictionnaire ou un groupe de dictionnaires qualifié.
2. **`localeOrSelector`** (optionnel) : Une locale spécifique ou un objet sélecteur (`{ item }`, `{ variant }`, éventuellement avec `locale`).

## Description

Le hook effectue les tâches suivantes :

1. **Détection de la locale** : Côté serveur, il obtient la locale depuis `Astro.locals.intlayer`. Dans le navigateur, il utilise la locale du store côté client.
2. **Traitement du contenu** : Résout les traductions (`t()`), énumérations, conditions et structures imbriquées selon la locale résolue.
3. **Sélecteurs** : Applique les sélecteurs d'éléments ou de variantes fournis dans les arguments.

## Documentation associée

- [Intégration `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useLocale.md)
