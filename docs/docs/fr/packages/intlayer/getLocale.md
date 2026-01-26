---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation de la fonction getLocale | intlayer
description: Voir comment utiliser la fonction getLocale pour le package intlayer
keywords:
  - getLocale
  - traduction
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initialisation de la documentation
---

# Documentation de la fonction getLocale

La fonction `getLocale` vous permet de détecter la locale à partir d'une chaîne donnée, comme une URL ou un chemin.

## Utilisation

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Sortie : 'fr'
```

## Paramètres

| Paramètre | Type     | Description                                                     |
| --------- | -------- | --------------------------------------------------------------- |
| `path`    | `string` | Le chemin ou la chaîne à partir de laquelle extraire la locale. |

## Valeur de retour

La locale détectée, ou la locale par défaut si aucune locale n'est détectée.
