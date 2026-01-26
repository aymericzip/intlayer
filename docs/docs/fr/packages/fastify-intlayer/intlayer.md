---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du plugin intlayer pour Fastify | fastify-intlayer
description: Découvrez comment utiliser le plugin intlayer pour le package fastify-intlayer
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initialisation de la documentation
---

# Documentation du plugin intlayer pour Fastify

Le plugin `intlayer` pour Fastify détecte la locale de l'utilisateur et décore l'objet de requête avec les fonctions Intlayer. Il permet également l'utilisation des fonctions globales de traduction dans le contexte de la requête.

## Utilisation

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    fr: "Bonjour",
    en: "Hello",
  });

  return content;
});
```

## Description

Le plugin effectue les opérations suivantes :

1. **Détection de la locale** : Il analyse la requête (en-têtes, cookies, etc.) pour déterminer la locale préférée de l'utilisateur.
2. **Décoration de la requête** : Il ajoute une propriété `intlayer` à l'objet `FastifyRequest`, contenant :
   - `locale`: La locale détectée.
   - `t`: Une fonction de traduction.
   - `getIntlayer`: Une fonction pour récupérer les dictionnaires.
3. **Gestion du contexte** : Il utilise `cls-hooked` pour gérer un contexte asynchrone, permettant aux fonctions globales d'Intlayer d'accéder à la locale spécifique à la requête.
