---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package vite-intlayer
description: Plugin Vite pour Intlayer, fournissant des alias de dictionnaire et des watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Mise à jour de l'index des exports – proxy et compiler désormais intégrés dans intlayer() ; ajout des docs intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentation unifiée pour tous les exports"
author: aymericzip
---

# Package vite-intlayer

Le package `vite-intlayer` fournit un plugin Vite pour intégrer Intlayer dans votre application basée sur Vite.

## Installation

```bash
npm install vite-intlayer
```

## Exports

### Plugin

Import :

```tsx
import "vite-intlayer";
```

| Fonction                   | Description                                                                                                                                                                   | Documentation associée                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Plugin Vite principal. Prépare les dictionnaires, configure les alias, démarre les observateurs du serveur de dév et (depuis v9) intègre le proxy et le compilateur.          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Déprécié**) Alias pour `intlayer`.                                                                                                                                         | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Déprécié**) Alias pour `intlayer`.                                                                                                                                         | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Plugin middleware de routage de locale (détection, redirection, réécriture). Depuis v9, il est intégré dans `intlayer()` – à enregistrer séparément uniquement si nécessaire. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Déprécié**) Alias pour `intlayerProxy`.                                                                                                                                    | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Déprécié**) Alias pour `intlayerProxy`.                                                                                                                                    | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Extrait les déclarations de contenu inline des composants et les écrit dans les dictionnaires. Depuis v9, il est intégré dans `intlayer()`.                                   | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Élimine les champs de dictionnaire inutilisés du bundle de production via tree-shaking.                                                                                       | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minifie les fichiers JSON de dictionnaires compilés et modifie facultativement les noms de champs.                                                                            | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerMinify.md)     |

### Utilities

| Export                       | Description                                                                                                  | Related Doc                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Retourne un middleware Node.js `(req, res, next)` agnostique du framework avec logique de routage de locale. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Options acceptées par `intlayer()`. Étend `GetConfigurationOptions` avec `compatCallers` et `proxy`.                      |
| `IntlayerProxyPluginOptions` | Options acceptées par `intlayerProxy()` et `createIntlayerProxyHandler()`. Inclut `ignore` et `configOptions`.            |
| `IntlayerCompilerOptions`    | Options acceptées par `intlayerCompiler()`. Inclut `configOptions` et `compilerConfig`.                                   |
| `CompatCallerConfig`         | Ré-export depuis `@intlayer/babel`. Décrit un motif d'appelant compat-adapter pour l'analyse de l'utilisation des champs. |
