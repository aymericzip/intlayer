---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Transformer les composants
description: Apprenez comment transformer des composants existants pour utiliser Intlayer.
keywords:
  - Transformation
  - Composants
  - Migration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Transformer les composants

```bash
npx intlayer transform
```

Cette commande analyse vos fichiers de code pour aider à migrer les composants existants afin d’utiliser Intlayer. Elle prend en charge la sélection interactive des fichiers ou la cible de fichiers spécifiques.

## Alias :

- `npx intlayer trans`

## Arguments :

**Options de sélection des fichiers :**

- **`-f, --file [files...]`** : Liste des fichiers spécifiques à transformer. Si non fourni, le CLI analysera les fichiers correspondants (`**/*.{tsx,jsx,vue,svelte,ts,js}`) et vous invitera à sélectionner ceux à transformer.

  > Exemple : `npx intlayer transform -f src/components/MyComponent.tsx`

**Options de sortie :**

- **`-o, --output-content-declarations [outputContentDeclarations]`** : Répertoire pour enregistrer les fichiers de déclaration de contenu générés.

  > Exemple : `npx intlayer transform -o src/content`

- **`--code-only`** : Transformer uniquement le code du composant (ne pas écrire la déclaration de contenu).

  > Exemple : `npx intlayer transform --code-only`

- **`--declaration-only`** : Générer uniquement la déclaration de contenu (ne pas réécrire le composant).

  > Exemple : `npx intlayer transform --declaration-only`

**Options de configuration :**

- **`--base-dir`** : Spécifier le répertoire de base du projet.
- **`--env`** : Spécifier l’environnement.
- **`--env-file`** : Fournir un fichier d’environnement personnalisé.
- **`--verbose`** : Activer la journalisation détaillée.

**Plugins requis :**

La commande transform fonctionne sans plugin supplémentaire sur les fichiers TypeScript / JSX. Cependant, elle nécessite l'installation des plugins suivants pour les projets Vue et Svelte :

- **`@intlayer/vue-transformer`** : Pour les fichiers Vue.
- **`@intlayer/svelte-transformer`** : Pour les fichiers Svelte.
