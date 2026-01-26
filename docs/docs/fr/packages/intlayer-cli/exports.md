---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package intlayer-cli
description: Outil CLI pour Intlayer, fournissant des commandes pour construire et auditer les dictionnaires.
keywords:
  - cli
  - outils
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package intlayer-cli

Le package `intlayer-cli` fournit un ensemble de commandes pour gérer les dictionnaires et la configuration d'Intlayer.

## Installation

```bash
npm install intlayer-cli
```

## Exports

### Commandes CLI (fonctions)

Le package exporte des fonctions qui alimentent les commandes CLI, vous permettant de déclencher des opérations Intlayer de manière programmatique.

Import :

```tsx
import "intlayer-cli";
```

| Fonction       | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `build`        | Construit les dictionnaires Intlayer.                                        |
| `audit`        | Audite les dictionnaires pour les traductions manquantes.                    |
| `liveSync`     | Synchronise les dictionnaires en temps réel.                                 |
| `pull`         | Récupère les dictionnaires depuis une source distante.                       |
| `push`         | Pousse les dictionnaires vers une source distante.                           |
| `test`         | Exécute des tests sur les dictionnaires.                                     |
| `transform`    | Transforme les dictionnaires d'un format à un autre.                         |
| `fill`         | Remplit les dictionnaires avec les traductions manquantes en utilisant l'IA. |
| `reviewDoc`    | Revoit la documentation pour l'internationalisation.                         |
| `translateDoc` | Traduit la documentation à l'aide de l'IA.                                   |
