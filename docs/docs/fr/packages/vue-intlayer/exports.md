---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Package vue-intlayer
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
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Ajout de l'utilitaire usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentation unifiée pour toutes les exportations"
author: aymericzip
---

# Package vue-intlayer

Le package `vue-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Vue. Il inclut un plugin Vue et des composables pour gérer le contenu multilingue.

## Installation

```bash
npm install vue-intlayer
```

## Exportations

### Plugin

Import :

```tsx
import "vue-intlayer";
```

| Fonction          | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `installIntlayer` | Plugin Vue pour installer Intlayer dans votre application. |

### Composables

Import :

```tsx
import "vue-intlayer";
```

| Composable             | Description                                                                                                                                      | Doc associée                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basé sur `useDictionary`, mais injecte une version optimisée du dictionnaire provenant de la déclaration générée.                                | -                                                                                                                     |
| `useDictionary`        | Traite les objets qui ressemblent à des dictionnaires (clé, contenu). Il traite les traductions `t()`, les énumérations, etc.                    | -                                                                                                                     |
| `useDictionaryAsync`   | Identique à `useDictionary`, mais gère les dictionnaires asynchrones.                                                                            | -                                                                                                                     |
| `useDictionaryDynamic` | Identique à `useDictionary`, mais gère les dictionnaires dynamiques.                                                                             | -                                                                                                                     |
| `useLocale`            | Renvoie la locale actuelle et une fonction pour la définir.                                                                                      | -                                                                                                                     |
| `usePathname`          | Retourne le chemin (pathname) actuel sous forme de `ComputedRef<string>` avec le segment de la locale retiré. Réactif aux événements `popstate`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vue-intlayer/usePathname.md)     |
| `useRewriteURL`        | Composable côté client pour gérer les réécritures d'URL. Met automatiquement à jour l'URL si une règle de réécriture localisée existe.           | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Retourne l'objet Intl pour la locale courante.                                                                                                   | -                                                                                                                     |
| `useLoadDynamic`       | Composable pour charger des dictionnaires dynamiques.                                                                                            | -                                                                                                                     |

### Fonctions

Importer :

```tsx
import "vue-intlayer";
```

| Fonction        | Description                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Traite des objets qui ressemblent à des dictionnaires (clé, contenu). Il traite les traductions `t()`, les énumérations, etc. |
| `getIntlayer`   | Basé sur `getDictionary`, mais injecte une version optimisée du dictionnaire à partir de la déclaration générée.              |

### Markdown

Importer :

```tsx
import "vue-intlayer/markdown";
```

| Fonction                  | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue pour installer Intlayer Markdown dans votre application. |
