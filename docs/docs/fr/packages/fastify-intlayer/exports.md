---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package fastify-intlayer
description: Plugin Fastify pour Intlayer, fournissant des fonctions de traduction et la détection de la locale.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package fastify-intlayer

Le package `fastify-intlayer` fournit un plugin pour les applications Fastify afin de gérer l'internationalisation. Il détecte la locale de l'utilisateur et décore l'objet request.

## Installation

```bash
npm install fastify-intlayer
```

## Exports

### Plugin

Importer :

```tsx
import "fastify-intlayer";
```

| Fonction   | Description                                                                                                                                                                                                                                                                                                                                     | Documentation associée                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Fastify qui intègre Intlayer dans votre application Fastify. Gère la détection de la locale depuis le stockage (cookies, headers), décore l'objet request avec des données `intlayer` contenant `t`, `getIntlayer` et `getDictionary`, et configure un namespace CLS pour un accès programmatique pendant le cycle de vie de la requête. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/fastify-intlayer/intlayer.md) |

### Fonctions

Importer :

```tsx
import "fastify-intlayer";
```

| Fonction        | Description                                                                                                                                                                                                                                                                | Documentation associée                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fonction de traduction globale qui récupère le contenu pour la locale courante dans Fastify. Utilise CLS (Async Local Storage) et doit être utilisée dans le contexte d'une requête géré par le plugin `intlayer`. Est également accessible via `req.intlayer.t`.          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `getIntlayer`   | Récupère un dictionnaire par sa clé à partir de la déclaration générée et renvoie son contenu pour la locale spécifiée. Version optimisée de `getDictionary`. Utilise CLS pour accéder au contexte de la requête. Est également accessible via `req.intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Traite les objets dictionnaire et renvoie le contenu pour la locale spécifiée. Traite les traductions `t()`, les énumérations, le markdown, le HTML, etc. Utilise CLS pour accéder au contexte de la requête. Est également accessible via `req.intlayer.getDictionary`.   | -                                                                                                      |
