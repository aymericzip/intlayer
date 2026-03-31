---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Initialiser Intlayer
description: Apprenez à initialiser Intlayer dans votre projet.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Ajout de l'option --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajout de la commande init"
---

# Initialiser Intlayer

```bash
npx intlayer init
```

La commande `init` configure automatiquement Intlayer dans votre projet en paramétrant les fichiers et réglages nécessaires. C'est le moyen recommandé pour commencer avec Intlayer.

## Alias :

- `npx intlayer init`

## Arguments :

- `--project-root [projectRoot]` - Optionnel. Spécifiez le répertoire racine du projet. Si non fourni, la commande recherchera la racine du projet à partir du répertoire de travail actuel.
- `--no-gitignore` - Optionnel. Ignore la mise à jour automatique du fichier `.gitignore`. Si ce drapeau est défini, `.intlayer` ne sera pas ajouté au `.gitignore`.

## Ce qu'il fait :

La commande `init` effectue les tâches de configuration suivantes :

1. **Valide la structure du projet** - S'assure que vous êtes dans un répertoire de projet valide avec un fichier `package.json`.
2. **Met à jour le `.gitignore`** - Ajoute `.intlayer` à votre fichier `.gitignore` pour exclure les fichiers générés du contrôle de version (peut être ignoré avec `--no-gitignore`).
3. **Configure TypeScript** - Met à jour tous les fichiers `tsconfig.json` pour inclure les définitions de types Intlayer (`.intlayer/**/*.ts`).
4. **Crée le fichier de configuration** - Génère un `intlayer.config.ts` (pour les projets TypeScript) ou `intlayer.config.mjs` (pour les projets JavaScript) avec les paramètres par défaut.
5. **Met à jour la config Vite** - Si un fichier de configuration Vite est détecté, ajoute l'importation du plugin `vite-intlayer`.
6. **Met à jour la config Next.js** - Si un fichier de configuration Next.js est détecté, ajoute l'importation du plugin `next-intlayer`.

## Exemples :

### Initialisation de base :

```bash
npx intlayer init
```

Cela initialisera Intlayer dans le répertoire actuel, en détectant automatiquement la racine du projet.

### Initialisation avec une racine de projet personnalisée :

```bash
npx intlayer init --project-root ./my-project
```

Cela initialisera Intlayer dans le répertoire spécifié.

### Initialisation sans mettre à jour le .gitignore :

```bash
npx intlayer init --no-gitignore
```

Cela configurera tous les fichiers de configuration mais ne modifiera pas votre `.gitignore`.

## Exemple de sortie :

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Remarques :

- La commande est idempotente - vous pouvez l'exécuter plusieurs fois en toute sécurité. Elle ignorera les étapes déjà configurées.
- Si un fichier de configuration existe déjà, il ne sera pas écrasé.
- Les fichiers de config TypeScript sans tableau `include` (par exemple, les configs de type solution avec des références) sont ignorés.
- La commande s'arrêtera avec une erreur si aucun `package.json` n'est trouvé à la racine du projet.
