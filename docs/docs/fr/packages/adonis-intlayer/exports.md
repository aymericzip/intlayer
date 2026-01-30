---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentation du package adonis-intlayer
description: Middleware AdonisJS pour Intlayer, fournissant des fonctions de traduction et la détection de la locale.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentation initiale
---

# Package adonis-intlayer

Le package `adonis-intlayer` fournit un middleware pour les applications AdonisJS afin de gérer l'internationalisation. Il détecte la locale de l'utilisateur et fournit des fonctions de traduction.

## Installation

```bash
npm install adonis-intlayer
```

## Exports

### Middleware

Le package fournit un middleware AdonisJS pour gérer l'internationalisation.

| Fonction             | Description                                                                                                                                                                                                                                                                                              | Doc associée                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware AdonisJS qui détecte la locale de l'utilisateur et remplit le contexte de la requête avec les données Intlayer. Il configure également un espace de noms CLS (Async Local Storage) pour l'accès au cycle de vie de la requête, permettant l'utilisation de fonctions globales comme `t`, etc. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/adonis-intlayer/intlayer.md) |

### Fonctions

| Fonction        | Description                                                                                                                                                                                                                        | Doc associée                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fonction de traduction qui récupère le contenu pour la locale actuelle. Fonctionne dans le cycle de vie de la requête géré par le middleware `intlayer`. Utilise CLS (Async Local Storage) pour accéder au contexte de la requête. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `getIntlayer`   | Récupère un dictionnaire par sa clé à partir de la déclaration générée et retourne son contenu pour la locale spécifiée. Version optimisée de `getDictionary`. Utilise CLS pour accéder au contexte de la requête.                 | -                                                                                                      |
| `getDictionary` | Traite les objets de dictionnaire et retourne le contenu pour la locale spécifiée. Traite les traductions `t()`, les énumérations, le markdown, l'HTML, etc. Utilise CLS pour accéder au contexte de la requête.                   | -                                                                                                      |
| `getLocale`     | Récupère la locale actuelle à partir du contexte de la requête en utilisant CLS.                                                                                                                                                   | -                                                                                                      |
