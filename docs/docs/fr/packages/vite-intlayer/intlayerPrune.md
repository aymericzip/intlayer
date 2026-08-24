---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du plugin intlayerPrune pour Vite | vite-intlayer
description: Découvrez comment utiliser le plugin intlayerPrune pour le package vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Documentation du plugin intlayerPrune pour Vite

Le plugin Vite `intlayerPrune` permet d'effectuer du tree-shaking et de supprimer les dictionnaires inutilisés du bundle de votre application. Cela aide à réduire la taille finale du bundle en n'incluant que le contenu multilingue nécessaire.

> Le plugin est déjà inclus et configuré automatiquement lorsque vous utilisez [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md). Vous n'avez besoin de l'enregistrer manuellement que si vous composez vous-même la pile de plugins.

## Utilisation

### Dans le cadre de `intlayer()` (recommandé)

Activez le pruning via votre configuration Intlayer et le plugin principal gère tout :

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // active à la fois le pruning et la minification
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Si vous composez manuellement la pile de plugins, `intlayerPrune` et `intlayerMinify` partagent un objet `PruneContext` qui doit être créé une seule fois et passé aux deux :

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // optionnel, lit depuis le même contexte
  ],
});
```

## Comment ça marche

### 1. Analyse d'utilisation (buildStart)

Durante `buildStart`, le plugin `intlayerOptimize` (également partie de `intlayer()`) analyse chaque fichier source de composant listé dans `build.filesList`. Pour chaque appel `useIntlayer('key')` ou `getIntlayer('key')`, il enregistre exactement quels champs sont accédés, par exemple :

```ts
const { title, description } = useIntlayer("myDict");
// enregistre : myDict → { title, description }
```

Cela construit `pruneContext.fieldUsageMap` avant que les appels `transform` ne s'exécutent.

### 2. Élagage JSON (transform, enforce: 'pre')

Lorsque Vite traite un fichier JSON de dictionnaire compilé, `intlayerPrune` l'intercepte avant la conversion JSON → ESM intégrée de Vite. Il lit la carte d'utilisation des champs à partir de `pruneContext` et supprime tout champ de contenu qui ne figure pas dans l'ensemble d'utilisation enregistré.

Deux formes de contenu sont supportées :

- **Dictionnaires statiques** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Les champs sont élagués par locale à l'intérieur de `translation`.
- **Dictionnaires dynamiques (par locale)** — flat `{ fieldA: ..., fieldB: ... }`. Les champs sont élagués au niveau supérieur.

### 3. Cas limites

Si la structure de contenu d'un dictionnaire ne peut pas être reconnue (par exemple, une forme imbriquée inhabituelle), il est ajouté à `pruneContext.dictionariesWithEdgeCases` et **laissé inchangé**. Un avertissement est enregistré. `intlayerMinify` ignore également ces dictionnaires.

### 4. Field-rename map

Lorsque l'élagage réussit, `intlayerPrune` écrit également `pruneContext.dictionaryKeyToFieldRenameMap` — un mapping entre les noms de champs originaux et leurs alias courts. `intlayerMinify` lit cette carte pour renommer les champs dans le JSON de sortie, et la passe de renommage Babel d'`intlayerOptimize` met à jour les accès aux propriétés dans les fichiers sources en conséquence.

## Conditions d'activation

`intlayerPrune` est actif **uniquement** quand toutes les conditions suivantes sont vraies :

1. La commande Vite est `build`.
2. `build.optimize` est `true` (ou `undefined`, qui est `true` par défaut pour les builds).
3. `build.purge` est `true` dans votre configuration Intlayer.

Il reste actif lorsque `editor.enabled` est `true` : l'éditeur visuel résout chaque modification via `dictionaryKey` + `keyPath` par rapport aux dictionnaires non fusionnés, que ce plugin ne touche jamais, et un champ purgé est un champ qu'aucun composant ne lit — il n'est donc jamais rendu ni sélectionnable dans la page.
