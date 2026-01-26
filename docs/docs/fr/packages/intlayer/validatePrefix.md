---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation de la fonction validatePrefix | intlayer
description: Voir comment utiliser la fonction validatePrefix pour le package intlayer
keywords:
  - validatePrefix
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initialisation de la documentation
---

# Documentation de la fonction validatePrefix

La fonction `validatePrefix` vérifie si un préfixe donné est un préfixe de locale valide selon la configuration.

## Utilisation

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Résultat : true
```

## Paramètres

| Paramètre | Type | Description |
| `prefix` | `string` | Le préfixe à valider. |

## Renvoie

`true` si le préfixe est valide, `false` sinon.
