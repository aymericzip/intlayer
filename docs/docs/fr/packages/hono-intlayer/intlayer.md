---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentation du Middleware Hono intlayer | hono-intlayer
description: Voir comment utiliser le middleware intlayer pour le paquet hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Initialisation de la doc
---

# Documentation du Middleware Hono intlayer

Le middleware `intlayer` pour Hono détecte la langue de l'utilisateur et remplit l'objet de contexte avec les fonctions Intlayer. Il permet également l'utilisation de fonctions de traduction globales dans le contexte de la requête.

## Utilisation

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
  });

  return c.text(content);
});
```

## Description

Le middleware effectue les tâches suivantes :

1. **Détection de la langue** : Il analyse la requête (en-têtes, cookies, etc.) pour déterminer la langue préférée de l'utilisateur.
2. **Remplissage du contexte** : Il ajoute les données Intlayer au contexte Hono, accessibles via `c.get()`. Cela inclut :
   - `locale` : La langue détectée.
   - `t` : Une fonction de traduction.
   - `getIntlayer` : Une fonction pour récupérer les dictionnaires.
   - `getDictionary` : Une fonction pour traiter les objets de dictionnaire.
3. **Gestion du contexte** : Il utilise `cls-hooked` pour gérer un contexte asynchrone, permettant aux fonctions globales d'Intlayer (`t`, `getIntlayer`, `getDictionary`) d'accéder à la langue spécifique à la requête sans passer l'objet de contexte.
