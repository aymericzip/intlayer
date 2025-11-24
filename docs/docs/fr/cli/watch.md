---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Surveiller les dictionnaires
description: Apprenez à surveiller les modifications dans vos fichiers de déclaration de contenu et à construire automatiquement les dictionnaires.
keywords:
  - Surveiller
  - Dictionnaires
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Surveiller les dictionnaires

```bash
npx intlayer watch
```

Cette commande surveillera les modifications dans vos fichiers de déclaration de contenu et construira les dictionnaires dans le répertoire `.intlayer`.
Cette commande est l'équivalent de `npx intlayer build --watch --skip-prepare`.

## Alias :

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Arguments :

- **`--with`** : Démarrer une commande en parallèle avec la surveillance.

> Exemple : `npx intlayer watch --with "next dev --turbopack"`
