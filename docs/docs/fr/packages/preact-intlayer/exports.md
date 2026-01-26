---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package preact-intlayer
description: Intégration spécifique à Preact pour Intlayer, fournissant des providers et des hooks pour les applications Preact.
keywords:
  - preact-intlayer
  - preact
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package preact-intlayer

Le package `preact-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Preact. Il inclut des providers et des hooks pour gérer du contenu multilingue.

## Installation

```bash
npm install preact-intlayer
```

## Exports

### Provider

| Composant          | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Le provider principal qui enveloppe votre application et fournit le contexte d'Intlayer. |

### Hooks

| Hook            | Description                                                                                                                   | Doc associée                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Basé sur `useDictionary`, mais injecte une version optimisée du dictionnaire issue de la déclaration générée.                 | -                                                                                                     |
| `useDictionary` | Traite les objets qui ressemblent à des dictionnaires (clé, contenu). Il traite les traductions `t()`, les énumérations, etc. | -                                                                                                     |
| `useLocale`     | Renvoie la locale actuelle et une fonction pour la définir.                                                                   | -                                                                                                     |
| `t`             | Sélectionne le contenu en fonction de la locale courante.                                                                     | [traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |

### Composants

| Composant          | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `MarkdownProvider` | Provider pour le contexte de rendu Markdown.                |
| `MarkdownRenderer` | Rend le contenu Markdown avec des composants personnalisés. |
