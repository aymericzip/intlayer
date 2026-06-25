---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentation du plugin Vite intlayerMinify | vite-intlayer
description: Plugin Vite qui minifie les fichiers JSON de dictionnaire Intlayer compilés et réduit éventuellement la taille du bundle en masquant les noms des champs de contenu.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minifier
  - taille du bundle
  - dictionnaire
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Initialisation de la doc"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` est un plugin Vite qui minifie les fichiers JSON de dictionnaire compilés lors d'un build de production. Il supprime tous les espaces inutiles et, lorsqu'il est combiné avec `intlayerPrune`, renomme éventuellement les noms des champs de contenu en alias alphabétiques courts (`a`, `b`, `c`, …) pour réduire davantage la taille du bundle.

> Le plugin est déjà inclus et configuré automatiquement lorsque vous utilisez [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/vite-intlayer/intlayer.md). Vous n'avez besoin de l'enregistrer manuellement que si vous composez vous-même la pile de plugins.

## Utilisation

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Conditions d'activation

`intlayerMinify` est actif **uniquement** lorsque les trois conditions suivantes sont remplies :

1. La commande Vite est `build` (pas `serve` / dev).
2. `build.optimize` est à `true` (ou `undefined`, qui vaut par défaut `true` pour les builds).
3. `build.minify` est à `true` dans votre configuration Intlayer.

Il est automatiquement **désactivé** lorsque `editor.enabled` est à `true` car l'éditeur a besoin du contenu complet et lisible par l'homme du dictionnaire.

## Ce qui est minifié

Le plugin cible deux emplacements de dictionnaire (tels que résolus depuis `intlayer.system`) :

- `dictionariesDir` — dictionnaires statiques toutes langues (ex. `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — dictionnaires dynamiques par langue

> Les dictionnaires en mode fetch (`fetchDictionariesDir`) ne sont **jamais** minifiés car ils sont servis depuis une API distante au moment de l'exécution en utilisant leurs noms de champs d'origine. Renommer les champs créerait un décalage entre la réponse du serveur et les accès aux propriétés côté client.

## Masquage des noms de champs (minification des propriétés)

Lorsque `intlayerPrune` a analysé la codebase et rempli `pruneContext.dictionaryKeyToFieldRenameMap`, `intlayerMinify` renomme également les noms de champs de contenu en alias courts. Par exemple :

```json
// avant
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// après (avec masquage)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Les accès aux propriétés correspondants dans les fichiers sources sont renommés par la passe Babel dans `intlayerOptimize`, le comportement au runtime reste donc inchangé.

Les champs internes d'Intlayer (`nodeType`, `translation`, etc.) ne sont jamais renommés.

## Dictionnaires de cas limites (Edge-cases)

Les dictionnaires signalés dans `pruneContext.dictionariesWithEdgeCases` (anomalies structurelles détectées lors de la phase de prune) sont entièrement ignorés — ni minifiés ni masqués — pour éviter de livrer des données corrompues.

## Groupes qualifiés (collections / variantes / enregistrements méta)

Pour les dictionnaires avec un tableau `qualifierTypes` (collections, variantes et enregistrements méta), le plugin préserve le tableau `qualifierTypes` et la table de correspondance `meta` textuellement. Seules les entrées de `content` ont leurs noms de champs masqués. Les clés composites (utilisées pour la correspondance des sélecteurs au runtime) ne sont jamais touchées.
