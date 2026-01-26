---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package vue-intlayer
description: Intégration spécifique à Vue pour Intlayer, fournissant des plugins et des composables pour les applications Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package vue-intlayer

Le package `vue-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Vue. Il inclut un plugin Vue et des composables pour gérer le contenu multilingue.

## Installation

```bash
npm install vue-intlayer
```

## Exports

### Plugin

| Fonction          | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `installIntlayer` | Plugin Vue pour installer Intlayer dans votre application. |

### Composables

| Composable      | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `useIntlayer`   | Sélectionne un dictionnaire par sa clé et renvoie le contenu. |
| `useDictionary` | Sélectionne un dictionnaire par sa clé et renvoie le contenu. |
| `useLocale`     | Renvoie la locale courante et une fonction pour la définir.   |
| `useIntl`       | Renvoie l'objet Intl pour la locale courante.                 |

### Fonctions

| Function        | Description                            |
| --------------- | -------------------------------------- |
| `getDictionary` | Récupère un dictionnaire.              |
| `getIntlayer`   | Récupère le contenu d'un dictionnaire. |

### Markdown

| Fonction                  | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue pour installer Intlayer Markdown dans votre application. |
