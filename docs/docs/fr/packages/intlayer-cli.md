---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package intlayer-cli
description: Outil CLI pour Intlayer, fournissant des commandes pour construire et auditer les dictionnaires.
keywords:
  - intlayer-cli
  - cli
  - outils
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
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

Le package exporte des fonctions qui alimentent les commandes CLI.

| Fonction    | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `build`     | Construit les dictionnaires Intlayer.                              |
| `audit`     | Audite les dictionnaires pour détecter les traductions manquantes. |
| `liveSync`  | Synchronise les dictionnaires en temps réel.                       |
| `pull`      | Récupère les dictionnaires depuis une source distante.             |
| `push`      | Envoie les dictionnaires vers une source distante.                 |
| `test`      | Exécute des tests sur les dictionnaires.                           |
| `transform` | Transforme les dictionnaires entre différents formats.             |
