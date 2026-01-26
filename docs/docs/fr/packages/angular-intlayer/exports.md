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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour toutes les exportations
---

# Package angular-intlayer

Le package `angular-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Angular. Il inclut des providers et des services pour gérer du contenu multilingue.

## Installation

```bash
npm install angular-intlayer
```

## Exportations

Import :

```tsx
import "angular-intlayer";
```

### Configuration

| Fonction          | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `provideIntlayer` | Fonction pour fournir Intlayer dans votre application Angular. |

### Hooks

| Hook                   | Description                                                                                                                 | Documentation associée |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `useIntlayer`          | Basé sur `useDictionary`, mais injecte une version optimisée du dictionnaire issue de la déclaration générée.               | -                      |
| `useDictionary`        | Traite les objets qui ressemblent à des dictionnaires (clé, contenu). Il gère les traductions `t()`, les énumérations, etc. | -                      |
| `useDictionaryAsync`   | Identique à `useDictionary`, mais gère les dictionnaires asynchrones.                                                       | -                      |
| `useDictionaryDynamic` | Identique à `useDictionary`, mais gère les dictionnaires dynamiques.                                                        | -                      |
| `useLocale`            | Retourne la locale actuelle et une fonction pour la définir.                                                                | -                      |
| `useIntl`              | Retourne l'objet Intl pour la locale courante.                                                                              | -                      |
| `useLoadDynamic`       | Hook pour charger des dictionnaires dynamiques.                                                                             | -                      |

### Composants

| Composant                   | Description                                     |
| --------------------------- | ----------------------------------------------- |
| `IntlayerMarkdownComponent` | Composant Angular qui rend le contenu Markdown. |
