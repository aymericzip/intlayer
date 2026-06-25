---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "Documentation du package @intlayer/babel"
description: Plugins Babel pour Intlayer afin de gérer l'extraction de contenu, l'optimisation des importations, la purge des champs inutilisés et le masquage des noms de champs lors de la construction.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internationalisation
  - i18n
  - compilateur
  - optimiser
  - purger
  - minifier
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Documentation unifiée de toutes les exportations"
author: aymericzip
---

# Package @intlayer/babel

Le package `@intlayer/babel` fournit un ensemble de plugins Babel spécialisés pour Intlayer. Ces plugins couvrent l'ensemble du cycle de construction : extraction des déclarations de contenu, réécriture des appels `useIntlayer` / `getIntlayer` en importations de dictionnaires optimisés, purge des champs inutilisés et minification des noms de champs.

## Installation

```bash
npm install @intlayer/babel
```

## Exportations

Importation :

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugins

| Fonction / Classe              | Description                                                                                                                                                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Plugin Babel qui extrait le contenu traduisible des fichiers sources et injecte automatiquement les hooks `useIntlayer` / `getIntlayer`. Conçu pour être utilisé avec Next.js et les outils de construction basés sur Babel. |
| `intlayerOptimizeBabelPlugin`  | Plugin Babel qui transforme les appels `useIntlayer` et `getIntlayer` et réécrit leurs importations en importations de dictionnaires JSON optimisées (statiques, dynamiques ou via fetch).                                   |
| `intlayerPurgeBabelPlugin`     | Plugin Babel qui analyse les fichiers sources et réécrit les fichiers JSON des dictionnaires compilés pour supprimer les champs inutilisés (`build.purge`) ou les renommer en alias courts (`build.minify`).                 |
| `intlayerMinifyBabelPlugin`    | Plugin Babel qui réécrit les fichiers sources pour utiliser les alias de champs courts attribués pendant la phase de minification (par exemple, `content.title` ← `content.a`). Dépend de `intlayerPurgeBabelPlugin`.        |
| `makeFieldRenameBabelPlugin`   | Fonction factory qui produit un plugin Babel pour renommer les accès aux champs de contenu des dictionnaires dans les fichiers sources selon la `dictionaryKeyToFieldRenameMap` renseignée dans le `PruneContext`.           |
| `makeUsageAnalyzerBabelPlugin` | Fonction factory qui produit un plugin Babel pour analyser l'utilisation de `useIntlayer` / `getIntlayer` dans le code source et regrouper les données d'utilisation des champs dans le `PruneContext` partagé.              |
| `getSharedPruneContext`        | Fonction utilitaire qui renvoie l'objet `PruneContext` partagé pour le répertoire de base spécifié, ou `null` si le contexte n'a pas encore été initialisé.                                                                  |

---

### Utilitaires de configuration des plugins

| Fonction                   | Description                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getExtractPluginOptions`  | Charge la configuration Intlayer et renvoie les `ExtractPluginOptions` prêtes à l'emploi avec `intlayerExtractBabelPlugin`.                                  |
| `getOptimizePluginOptions` | Charge la configuration Intlayer et les dictionnaires compilés, et renvoie les `OptimizePluginOptions` prêtes à l'emploi avec `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | Charge la configuration Intlayer et renvoie les `PurgePluginOptions` prêtes à l'emploi avec `intlayerPurgeBabelPlugin`.                                      |
| `getMinifyPluginOptions`   | Charge la configuration Intlayer et renvoie les `MinifyPluginOptions` prêtes à l'emploi avec `intlayerMinifyBabelPlugin`.                                    |

---

### Types

| Type                    | Description                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `CompilerMode`          | Mode du compilateur : `'dev'` pour le développement avec support HMR, ou `'build'` pour les builds de production.                          |
| `ExtractPluginOptions`  | Options pour `intlayerExtractBabelPlugin` : liste des fichiers, configuration, callback `onExtract`, etc.                                  |
| `ExtractResult`         | Résultat de l'extraction : clé de dictionnaire, chemin du fichier, contenu et locale.                                                      |
| `OptimizePluginOptions` | Options pour `intlayerOptimizeBabelPlugin` : chemins des dictionnaires, mode d'importation, carte des modes par dictionnaire, etc.         |
| `PurgePluginOptions`    | Options pour `intlayerPurgeBabelPlugin` : répertoire de base, drapeaux purge/minify/optimize, liste des fichiers de composants.            |
| `MinifyPluginOptions`   | Options pour `intlayerMinifyBabelPlugin` : répertoire de base, drapeaux minify/optimize/editorEnabled.                                     |
| `PruneContext`          | État partagé entre les plugins d'analyse et de purge : cartes d'utilisation des champs, cartes de renommage, etc.                          |
| `DictionaryFieldUsage`  | Résultat de l'utilisation des champs pour un seul dictionnaire : `Set<string>` ou `'all'` lorsque l'analyse statique n'est pas concluante. |
| `NestedRenameEntry`     | Nœud dans l'arbre de renommage : le `shortName` et la carte des enfants.                                                                   |
| `NestedRenameMap`       | Un niveau dans l'arbre de renommage : `Map<string, NestedRenameEntry>`.                                                                    |
| `CompatCallerConfig`    | Configuration pour un analyseur d'utilisation compatible pour les packages compat-adapter (nom de l'appelant et options de traitement).    |
| `ScriptBlock`           | Bloc de script extrait d'un fichier SFC (Vue ou Svelte) : contenu, décalage de début et décalage de fin.                                   |

---

### Fonctions utilitaires

| Fonction                          | Description                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Convertit un entier (en commençant par zéro) en un identifiant alphabétique court : `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, etc.                                                                |
| `buildNestedRenameMapFromContent` | Construit de manière récursive une `NestedRenameMap` à partir de la valeur du contenu d'un dictionnaire compilé, en respectant les structures de nœuds Intlayer (translation, enumeration, etc.). |
| `createPruneContext`              | Crée un nouvel objet `PruneContext` vide initialisé avec les valeurs par défaut.                                                                                                                  |
| `extractScriptBlocks`             | Extrait les blocs `<script>` des fichiers SFC (Vue / Svelte) pour une analyse Babel ultérieure.                                                                                                   |
| `BABEL_PARSER_OPTIONS`            | Constante représentant les options du parseur Babel couvrant les frameworks pris en charge (React/Vue/Svelte/Angular/...).                                                                        |
| `INTLAYER_CALLER_NAMES`           | Liste constante des noms d'appelants originaux d'Intlayer : `['useIntlayer', 'getIntlayer']`.                                                                                                     |

---

## Exemple d'utilisation

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Note :** Le plugin `intlayerPurgeBabelPlugin` doit être déclaré **avant** `intlayerMinifyBabelPlugin`, car ce dernier lit la carte de renommage construite par le premier. De plus, ils doivent tous deux être précédés par `intlayerOptimizeBabelPlugin` afin que celui-ci puisse voir les clés de dictionnaire avant que les appels à `useIntlayer` ne soient réécrits.
