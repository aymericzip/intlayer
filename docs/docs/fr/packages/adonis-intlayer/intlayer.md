---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentation du Middleware AdonisJS Intlayer | adonis-intlayer
description: Découvrez comment utiliser le middleware intlayer pour le package adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentation initiale
---

# Documentation du Middleware AdonisJS Intlayer

Le middleware `intlayer` pour AdonisJS détecte la locale de l'utilisateur et fournit des fonctions de traduction via le contexte de la requête. Il permet également l'utilisation de fonctions de traduction globales au sein du flux de la requête.

## Utilisation

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Description

Le middleware effectue les tâches suivantes :

1. **Détection de la Locale** : Il analyse la requête (en-têtes, cookies, etc.) pour déterminer la locale préférée de l'utilisateur.
2. **Configuration du Contexte** : Il remplit le contexte de la requête avec les informations de locale.
3. **Async Local Storage** : Il utilise `cls-hooked` pour gérer un contexte asynchrone, permettant aux fonctions Intlayer globales comme `t`, `getIntlayer` et `getDictionary` d'accéder à la locale spécifique de la requête sans avoir à la passer manuellement.

> Note : Pour utiliser les cookies pour la détection de la locale, assurez-vous que `@adonisjs/cookie` est configuré et utilisé dans votre application.
