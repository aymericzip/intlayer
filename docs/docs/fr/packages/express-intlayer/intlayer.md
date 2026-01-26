---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du middleware intlayer pour Express | express-intlayer
description: Découvrez comment utiliser le middleware intlayer pour le package express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initialisation de la documentation
---

# Documentation du middleware intlayer pour Express

Le middleware `intlayer` pour Express détecte la locale de l'utilisateur et fournit des fonctions de traduction via l'objet `res.locals`. Il permet également d'utiliser les fonctions `t` et `getIntlayer` dans vos handlers de requête.

## Utilisation

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    fr: "Bonjour",
    en: "Hello",
  });

  res.send(content);
});
```

## Description

The middleware performs the following tasks:

1. **Détection de la locale** : Il vérifie les cookies, les en-têtes (comme `Accept-Language`) et les paramètres d'URL pour déterminer la locale de l'utilisateur.
2. **Configuration du contexte** : il remplit `res.locals` avec :
   - `locale` : la locale détectée.
   - `t` : une fonction de traduction liée à la locale détectée.
   - `getIntlayer` : une fonction pour récupérer des dictionnaires liés à la locale détectée.
3. **Async Local Storage** : il met en place un contexte qui permet l'utilisation des fonctions globales `t` et `getIntlayer` importées depuis `express-intlayer` dans le flux de la requête.
