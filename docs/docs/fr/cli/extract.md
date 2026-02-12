---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Extraire des chaînes
description: Apprenez comment extraire des chaînes depuis vos composants dans un fichier .content proche du composant.
keywords:
  - Extraction
  - Composants
  - Migration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Extraire des chaînes

```bash
npx intlayer extract
```

Cette commande analyse vos fichiers de code pour extraire les chaînes des composants dans un fichier .content proche du composant. Elle prend en charge la sélection interactive des fichiers ou le ciblage de fichiers spécifiques.

## Alias:

- `npx intlayer ext`

## Arguments :

**Options de sélection des fichiers :**

/// **`-f, --file [files...]`** : Liste des fichiers spécifiques à extraire. Si non fourni, la CLI analysera les fichiers correspondants (`**/*.{tsx,jsx,vue,svelte,ts,js}`) et vous invitera à sélectionner ceux que vous souhaitez extraire.

> Exemple : `npx intlayer extract -f src/components/MyComponent.tsx`

**Options de sortie :**

- **`-o, --output-content-declarations [outputContentDeclarations]`** : Répertoire dans lequel enregistrer les fichiers de déclaration de contenu générés.

  > Exemple : `npx intlayer extract -o src/content`

- **`--code-only`** : N'extraire que le code du composant (ne pas écrire de déclaration de contenu).

  > Exemple : `npx intlayer extract --code-only`

- **`--declaration-only`** : Générer uniquement la déclaration de contenu (ne pas réécrire le composant).

  > Exemple : `npx intlayer extract --declaration-only`

**Options de configuration :**

- **`--base-dir`**: Spécifie le répertoire de base du projet.
- **`--env`**: Spécifie l'environnement.
- **`--env-file`**: Fournit un fichier d'environnement personnalisé.
- **`--verbose`**: Active la journalisation détaillée.

**Plugins requis :**

La commande extract fonctionne sans plugin supplémentaire pour les fichiers TypeScript / JSX. Cependant, elle nécessite l'installation des plugins suivants pour les projets Vue et Svelte :

- **`@intlayer/vue-transformer`**: Pour les fichiers Vue.
- **`@intlayer/svelte-transformer`**: Pour les fichiers Svelte.
