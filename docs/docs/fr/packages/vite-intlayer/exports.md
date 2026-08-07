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

| Fonction             | Description                                                                                  | Documentation associée                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Plugin Vite principal qui intègre Intlayer dans le processus de build.                       | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Déprécié**) Alias pour `intlayer`.                                                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Plugin middleware de développement pour gérer la détection de la locale et le routage.       | -                                                                                                                      |
| `intlayerMiddleware` | (**Déprécié**) Alias pour `intlayerProxy`.                                                   | -                                                                                                                      |
| `intlayerPrune`      | Plugin pour effectuer du tree-shaking et élaguer les dictionnaires inutilisés lors du build. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayerPrune.md) |

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
