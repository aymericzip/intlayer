---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package solid-intlayer
description: Intégration spécifique à Solid pour Intlayer, fournissant des providers et des hooks pour les applications Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package solid-intlayer

Le package `solid-intlayer` fournit les outils nécessaires pour intégrer Intlayer aux applications Solid. Il inclut des providers et des hooks pour gérer du contenu multilingue.

## Installation

```bash
npm install solid-intlayer
```

## Exports

### Provider

Import :

```tsx
import "solid-intlayer";
```

| Composant          | Description                                                                               | Documentation associée                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Le fournisseur principal qui enveloppe votre application et fournit le contexte Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Importer :

```tsx
import "solid-intlayer";
```

| Hook                   | Description                                                                                                                      | Related Doc                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basé sur `useDictionary`, mais injecte une version optimisée du dictionnaire provenant de la déclaration générée.                | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Traite les objets qui ressemblent à des dictionnaires (clé, contenu). Il traite les traductions `t()`, les énumérations, etc.    | -                                                                                                                       |
| `useDictionaryAsync`   | Identique à `useDictionary`, mais gère les dictionnaires asynchrones.                                                            | -                                                                                                                       |
| `useDictionaryDynamic` | Identique à `useDictionary`, mais gère les dictionnaires dynamiques.                                                             | -                                                                                                                       |
| `useLocale`            | Retourne la locale actuelle et une fonction pour la définir.                                                                     | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook côté client pour gérer les réécritures d'URL. Met à jour automatiquement l'URL si une règle de réécriture localisée existe. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Retourne l'objet Intl pour la locale actuelle.                                                                                   | -                                                                                                                       |
| `useLoadDynamic`       | Hook pour charger des dictionnaires dynamiques.                                                                                  | -                                                                                                                       |
| `t`                    | Sélectionne le contenu en fonction de la locale courante.                                                                        | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)                  |

### Composants

Import :

```tsx
import "solid-intlayer";
```

| Composant          | Description                      |
| ------------------ | -------------------------------- |
| `MarkdownProvider` | Provider pour le rendu Markdown. |
