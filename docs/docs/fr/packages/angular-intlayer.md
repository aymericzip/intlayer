---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package angular-intlayer
description: Intégration spécifique à Angular pour Intlayer, fournissant des providers et des services pour les applications Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour toutes les exportations
---

# Package angular-intlayer

Le package `angular-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans les applications Angular. Il inclut des providers et des services pour gérer le contenu multilingue.

## Installation

```bash
npm install angular-intlayer
```

## Exports

### Configuration

| Fonction          | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `provideIntlayer` | Fonction pour fournir Intlayer dans votre application Angular. |

### Services

| Service           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `IntlayerService` | Service qui sélectionne un dictionnaire par sa clé et renvoie le contenu. |
| `LocaleService`   | Service qui renvoie la locale courante et une fonction pour la définir.   |

### Composants

| Composant                   | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `IntlayerMarkdownComponent` | Composant Angular qui affiche du contenu Markdown. |
