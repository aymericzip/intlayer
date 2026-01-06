---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Lister les projets Intlayer
description: Apprenez comment lister tous les projets Intlayer dans un répertoire ou un dépôt git.
keywords:
  - Liste
  - Projets
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Ajouter l'option de sortie absolue à la commande list projects
---

# Lister les projets Intlayer

```bash
npx intlayer projects list
```

Cette commande recherche et liste tous les projets Intlayer en trouvant les répertoires qui contiennent des fichiers de configuration Intlayer. Elle est utile pour découvrir tous les projets Intlayer dans un monorepo, un workspace ou un dépôt git.

## Alias :

- `npx intlayer projects-list`
- `npx intlayer pl`

## Arguments :

- **`--base-dir [path]`** : Spécifiez le répertoire de base à partir duquel effectuer la recherche. Par défaut, le répertoire de travail courant est utilisé.

  > Exemple : `npx intlayer projects list --base-dir /path/to/workspace`

  > Exemple : `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`** : Rechercher à partir du répertoire racine git au lieu du répertoire de base. Ceci est utile pour trouver tous les projets Intlayer dans un monorepo ou un dépôt git.

  > Exemple : `npx intlayer projects list --git-root`

- **`--json`** : Affiche les résultats au format JSON au lieu de texte formaté. Utile pour le scripting et l'accès programmatique.

  > Exemple : `npx intlayer projects list --json`

- **`--absolute`** : Affiche les résultats en tant que chemins absolus au lieu de chemins relatifs.

  > Exemple : `npx intlayer projects list --absolute`

## Comment ça fonctionne :

La commande recherche les fichiers de configuration Intlayer dans le répertoire spécifié (ou la racine git si `--git-root` est utilisé). Elle recherche les modèles de fichiers de configuration suivants :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Chaque répertoire contenant un de ces fichiers est considéré comme un projet Intlayer et sera listé dans la sortie.

## Exemples :

### Lister les projets dans le répertoire courant :

```bash
npx intlayer projects list
```

### Lister les projets dans un répertoire spécifique :

```bash
npx intlayer projects list --base-dir ./packages
```

### Lister tous les projets dans le dépôt git :

```bash
npx intlayer projects list --git-root
```

### Utiliser l'alias raccourci :

```bash
npx intlayer pl --git-root
```

### Sortie au format JSON :

```bash
npx intlayer projects list --json
```

## Exemple de sortie :

### Sortie formatée :

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Sortie JSON :

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Cas d'utilisation :

- **Gestion de monorepo** : Découvrir tous les projets Intlayer dans une structure monorepo
- **Découverte de projets** : Trouver tous les projets utilisant Intlayer dans un workspace
- **CI/CD** : Vérifier les projets Intlayer dans les workflows automatisés
- **Documentation** : Générer une documentation listant tous les projets utilisant Intlayer
- **Documentation** : Générer une documentation listant tous les projets utilisant Intlayer

La sortie fournit des chemins absolus vers chaque répertoire de projet, ce qui facilite la navigation ou l'automatisation d'opérations sur plusieurs projets Intlayer.
