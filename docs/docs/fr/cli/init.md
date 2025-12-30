---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Initialiser Intlayer
description: Apprenez comment initialiser Intlayer dans votre projet.
keywords:
  - Initialiser
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Ajout de la commande init
---

# Initialiser Intlayer

```bash
npx intlayer init
```

La commande `init` configure automatiquement Intlayer dans votre projet en créant et en paramétrant les fichiers et réglages nécessaires. C'est la méthode recommandée pour commencer avec Intlayer.

## Alias:

- `npx intlayer init`

## Arguments:

- `--project-root [projectRoot]` - Optionnel. Spécifie le répertoire racine du projet. S'il n'est pas fourni, la commande recherchera le répertoire racine du projet en partant du répertoire de travail courant.

## Ce que cela fait:

The `init` command performs the following setup tasks:

1. **Valide la structure du projet** - Vérifie que vous êtes dans un répertoire de projet valide contenant un fichier `package.json`
2. **Met à jour `.gitignore`** - Ajoute `.intlayer` à votre fichier `.gitignore` pour exclure les fichiers générés du contrôle de version
3. **Configure TypeScript** - Met à jour tous les fichiers `tsconfig.json` pour inclure les définitions de types Intlayer (`.intlayer/**/*.ts`)
4. **Crée le fichier de configuration** - Génère un `intlayer.config.ts` (pour les projets TypeScript) ou `intlayer.config.mjs` (pour les projets JavaScript) avec les réglages par défaut
5. **Met à jour la config Vite** - Si un fichier de configuration Vite est détecté, ajoute l'import du plugin `vite-intlayer`
6. **Met à jour la configuration Next.js** - Si un fichier de configuration Next.js est détecté, ajoute l'import du plugin `next-intlayer`

## Exemples :

### Initialisation basique :

```bash
npx intlayer init
```

Cela initialisera Intlayer dans le répertoire courant, en détectant automatiquement la racine du projet.

### Initialiser avec une racine de projet personnalisée :

```bash
npx intlayer init --project-root ./my-project
```

Cela initialisera Intlayer dans le répertoire spécifié.

## Exemple de sortie :

```bash
npx intlayer init
Vérification de la configuration d'Intlayer...
✓ Ajout de .intlayer à .gitignore
✓ Mise à jour de tsconfig.json pour inclure les types intlayer
Créé intlayer.config.ts
✓ Import injecté dans vite.config.ts
✓ Initialisation d'Intlayer terminée.
```

## Remarques :

- La commande est idempotente - vous pouvez l'exécuter plusieurs fois en toute sécurité. Elle sautera les étapes déjà configurées.
- Si un fichier de configuration existe déjà, il ne sera pas écrasé.
- Les fichiers de configuration TypeScript sans tableau `include` (par ex., les configurations de type solution avec des références) sont ignorés.
- La commande se terminera avec une erreur si aucun `package.json` n'est trouvé à la racine du projet.
