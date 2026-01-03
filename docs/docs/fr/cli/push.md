---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Pousser les dictionnaires
description: Apprenez comment pousser vos dictionnaires vers l'éditeur Intlayer et le CMS.
keywords:
  - Pousser
  - Dictionnaires
  - CLI
  - Intlayer
  - Éditeur
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Pousser les dictionnaires

```bash
npx intlayer dictionary push
```

Si [l'éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également pousser les dictionnaires vers l'éditeur. Cette commande permettra de rendre les dictionnaires disponibles dans [l'éditeur](https://app.intlayer.org/). De cette manière, vous pouvez partager vos dictionnaires avec votre équipe et éditer votre contenu sans modifier le code de votre application.

## Alias :

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Arguments :

**Options du dictionnaire :**

- **`-d`, `--dictionaries`** : identifiants des dictionnaires à pousser. Si non spécifié, tous les dictionnaires seront poussés.

  > Exemple : `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`** : identifiants des dictionnaires à pousser (alias de --dictionaries).

  > Exemple : `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Options de configuration :**

- **`--base-dir`** : Spécifie le répertoire de base du projet. Pour récupérer la configuration intlayer, la commande recherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`** : Désactive le cache.

  > Exemple : `npx intlayer build --no-cache`

**Options des variables d'environnement :**

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`). Utile dans le cas où vous utilisez des variables d'environnement dans votre fichier de configuration intlayer.
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables. Utile dans le cas où vous utilisez des variables d'environnement dans votre fichier de configuration intlayer.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

  > Exemple : `npx intlayer dictionary push --env production`

**Options de sortie :**

- **`-r`, `--delete-locale-dictionary`** : Ignore la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et les supprime. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.

  > Exemple : `npx intlayer dictionary push -r`

  > Exemple : `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`** : Ignore la question demandant de supprimer les répertoires des locales une fois les dictionnaires poussés, et les conserve. Par défaut, si le dictionnaire est défini localement, il écrasera le contenu des dictionnaires distants.

  > Exemple : `npx intlayer dictionary push -k`

  > Exemple : `npx intlayer dictionary push --keep-locale-dictionary`

**Options de préparation :**

- **`--build`** : Construire les dictionnaires avant de les pousser pour s'assurer que le contenu est à jour. True forcera la construction, false la sautera, undefined permettra d'utiliser le cache de la construction.

**Options de journalisation :**

- **`--verbose`** : Activer la journalisation détaillée pour le débogage. (par défaut à true en utilisant la CLI)

**Options Git :**

- **`--git-diff`** : Ne s'exécute que sur les dictionnaires qui incluent des modifications depuis la base (par défaut `origin/main`) vers la branche courante (par défaut : `HEAD`).
- **`--git-diff-base`** : Spécifier la référence de base pour le git diff (par défaut `origin/main`).
- **`--git-diff-current`** : Spécifier la référence courante pour le git diff (par défaut : `HEAD`).
- **`--uncommitted`** : Inclure les modifications non validées.
- **`--unpushed`** : Inclure les modifications non poussées.
- **`--untracked`** : Inclure les fichiers non suivis.

  > Exemple : `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Exemple : `npx intlayer dictionary push --uncommitted --unpushed --untracked`
