---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package svelte-intlayer
description: Intégration spécifique à Svelte pour Intlayer, fournissant des fonctions de setup et des stores pour les applications Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package svelte-intlayer

Le package `svelte-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Svelte. Il inclut des fonctions de setup et des stores pour gérer du contenu multilingue.

## Installation

```bash
npm install svelte-intlayer
```

## Exports

### Configuration

Import :

```tsx
import "svelte-intlayer";
```

| Function        | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `setupIntlayer` | Fonction pour configurer Intlayer dans votre application Svelte. |

### Store

Import:

```tsx
import "svelte-intlayer";
```

| Store           | Description                                         |
| --------------- | --------------------------------------------------- |
| `intlayerStore` | Store Svelte qui contient l'état actuel d'Intlayer. |

### Hooks (Contexte)

Import:

```tsx
import "svelte-intlayer";
```

| Fonction               | Description                                                                                                                          | Documentation associée                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Basé sur `useDictionary`, mais injecte une version optimisée du dictionnaire issue de la déclaration générée.                        | -                                                                                                                        |
| `useDictionary`        | Traite les objets ressemblant à des dictionnaires (clé, contenu). Il prend en charge les traductions `t()`, les énumérations, etc.   | -                                                                                                                        |
| `useDictionaryAsync`   | Identique à `useDictionary`, mais gère les dictionnaires asynchrones.                                                                | -                                                                                                                        |
| `useDictionaryDynamic` | Identique à `useDictionary`, mais gère les dictionnaires dynamiques.                                                                 | -                                                                                                                        |
| `useLocale`            | Retourne la locale courante et une fonction pour la définir.                                                                         | -                                                                                                                        |
| `useRewriteURL`        | Fonction côté client pour gérer les réécritures d'URL. Met automatiquement à jour l'URL si une règle de réécriture localisée existe. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Retourne l'objet Intl pour la locale courante.                                                                                       | -                                                                                                                        |

### Markdown

Import :

```tsx
import "svelte-intlayer";
```

| Fonction              | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `setIntlayerMarkdown` | Fonction pour définir le contexte Markdown dans votre application Svelte. |
