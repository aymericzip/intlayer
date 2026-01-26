---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package express-intlayer
description: Middleware Express pour Intlayer, fournissant des fonctions de traduction et la détection de la locale.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package express-intlayer

Le package `express-intlayer` fournit un middleware pour les applications Express afin de gérer l'internationalisation. Il détecte la locale de l'utilisateur et fournit des fonctions de traduction.

## Installation

```bash
npm install express-intlayer
```

## Exports

### Middleware

Import :

```tsx
import "express-intlayer";
```

| Fonction   | Description                                                                                                                                                                                                                                                                                                                 | Doc lié                                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware Express qui détecte la locale de l'utilisateur et remplit `res.locals` avec les données d'Intlayer. Effectue la détection de la locale à partir des cookies/en-têtes, injecte `t`, `getIntlayer` et `getDictionary` dans `res.locals`, et configure un namespace CLS pour l'accès au cycle de vie de la requête. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/express-intlayer/intlayer.md) |

### Fonctions

Importer :

```tsx
import "express-intlayer";
```

| Fonction        | Description                                                                                                                                                                                                                        | Doc associée                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Fonction de traduction qui récupère le contenu pour la locale courante. Fonctionne dans le cycle de vie de la requête géré par le middleware `intlayer`. Utilise CLS (Async Local Storage) pour accéder au contexte de la requête. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `getIntlayer`   | Récupère un dictionnaire par sa clé depuis la déclaration générée et renvoie son contenu pour la locale spécifiée. Version optimisée de `getDictionary`. Utilise CLS pour accéder au contexte de la requête.                       | -                                                                                                      |
| `getDictionary` | Traite les objets dictionnaire et renvoie le contenu pour la locale spécifiée. Traite les traductions `t()`, les énumérations, le Markdown, le HTML, etc. Utilise CLS pour accéder au contexte de la requête.                      | -                                                                                                      |
