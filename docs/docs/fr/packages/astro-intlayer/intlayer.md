---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Documentation de l'intégration intlayer | astro-intlayer
description: Découvrez comment configurer et utiliser l'intégration Astro intlayer dans astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - intégration
  - i18n
  - internationalisation
  - documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Mise à jour de la documentation de l'intégration avec détails du middleware et des hooks"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Doc initiale"
author: aymericzip
---

# Documentation de l'intégration Astro intlayer

L'intégration `intlayer` pour Astro configure votre projet pour l'internationalisation (i18n) multilingue. Elle prend en charge la préparation des dictionnaires au moment du build, l'injection de plugins Vite, l'enregistrement automatique du middleware de requête et l'émission des pages pré-rendues localisées.

## Utilisation

Ajoutez `intlayer()` dans votre `astro.config.mjs` :

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Le codemod de l'Astro CLI (`astro add astro-intlayer`) génère également un import par défaut qui est pris en charge :

```ts
import intlayer from "astro-intlayer";
```

## Description

L'intégration s'insère dans le cycle de vie de build et d'exécution d'Astro :

1. **Configuration (`astro:config:setup`)** :
   - **Préparation des dictionnaires** : Prépare les dictionnaires Intlayer et les types générés avant l'exécution du build.
   - **Plugins Vite** : Injecte les plugins pour les alias Vite (permettant des imports directs de dictionnaires), les proxys de routage de locale et l'élagage du build.
   - **Enregistrement du Middleware** : Injecte automatiquement `astro-intlayer/middleware` dans la chaîne de middlewares de votre projet, remplissant `Astro.locals.intlayer` sur chaque requête entrante.
2. **Build terminé (`astro:build:done`)** :
   - **Réécritures de pages** : Inspecte les règles de réécriture d'URL localisées et émet les pages HTML pré-rendues à leurs chemins localisés correspondants.

## Ce qui est fourni immédiatement

Une fois configurée, votre application Astro peut immédiatement utiliser :

- Les hooks `useIntlayer`, `useDictionary` et `useLocale` dans le frontmatter des composants `.astro`.
- L'objet `Astro.locals.intlayer` dans les points de terminaison et pages Astro.
- Les imports côté client dans les blocs `<script>` qui reproduisent la même API avec des mises à jour réactives.
- Les formateurs intégrés sous `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, etc.).

## Documentation associée

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/onRequest.md)
