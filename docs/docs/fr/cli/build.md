---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Construire des Dictionnaires
description: Apprenez à construire vos dictionnaires Intlayer à partir des fichiers de déclaration de contenu.
keywords:
  - Construire
  - Dictionnaires
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Construire des Dictionnaires

Pour construire vos dictionnaires, vous pouvez exécuter les commandes :

```bash
npx intlayer build
```

ou en mode surveillance

```bash
npx intlayer build --watch
```

Cette commande trouvera par défaut vos fichiers de déclaration de contenu sous la forme `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Et construira les dictionnaires dans le répertoire `.intlayer`.

## Alias :

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Arguments :

- **`--base-dir`** : Spécifiez le répertoire de base pour le projet. Pour récupérer la configuration intlayer, la commande cherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer build --base-dir ./src`

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`). Utile dans le cas où vous utilisez des variables d'environnement dans votre fichier de configuration intlayer.

  > Exemple : `npx intlayer build --env production`

- **`--env-file`** : Fournissez un fichier d'environnement personnalisé pour charger les variables. Utile dans le cas où vous utilisez des variables d'environnement dans votre fichier de configuration intlayer.

  > Exemple : `npx intlayer build --env-file .env.production.local`

- **`--with`** : Démarrer une commande en parallèle avec la construction.

  > Exemple : `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`** : Ignorer l'étape de préparation.

  > Exemple : `npx intlayer build --skip-prepare`

- **`--no-cache`** : Désactiver le cache.

  > Exemple : `npx intlayer build --no-cache`
