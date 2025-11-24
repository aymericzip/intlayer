---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Récupérer des Dictionnaires
description: Apprenez comment récupérer des dictionnaires depuis l'éditeur Intlayer et le CMS.
keywords:
  - Récupérer
  - Dictionnaires
  - CLI
  - Intlayer
  - Éditeur
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Récupérer des Dictionnaires Distants

```bash
npx intlayer pull
```

Si l'[éditeur intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) est installé, vous pouvez également récupérer des dictionnaires depuis l'éditeur. De cette manière, vous pouvez écraser le contenu de vos dictionnaires selon les besoins de votre application.

## Alias :

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Arguments :

**Options du dictionnaire :**

- **`-d, --dictionaries`** : Identifiants des dictionnaires à récupérer. Si non spécifié, tous les dictionnaires seront récupérés.

  > Exemple : `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`** : Identifiants des dictionnaires à récupérer (alias de --dictionaries).

  > Exemple : `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Options de configuration :**

- **`--base-dir`** : Spécifie le répertoire de base du projet. Pour récupérer la configuration intlayer, la commande cherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`** : Désactive le cache.

  > Exemple : `npx intlayer build --no-cache`

**Options des variables d'environnement :**

- **`--env`** : Spécifie l'environnement (par exemple, `development`, `production`).
- **`--env-file`** : Fournit un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifie le répertoire de base du projet. Pour récupérer la configuration intlayer, la commande cherchera le fichier `intlayer.config.{ts,js,json,cjs,mjs}` dans le répertoire de base.

  > Exemple : `npx intlayer dictionary push --env-file .env.production.local`

  > Exemple : `npx intlayer dictionary push --env production`

**Options de sortie :**

- **`--new-dictionaries-path`** : Chemin vers le répertoire où les nouveaux dictionnaires seront enregistrés. Si non spécifié, les nouveaux dictionnaires seront enregistrés dans le répertoire `./intlayer-dictionaries` du projet. Si un champ `filePath` est spécifié dans le contenu de votre dictionnaire, les dictionnaires ne prendront pas en compte cet argument et seront enregistrés dans le répertoire `filePath` spécifié.

**Options de journalisation :**

- **`--verbose`** : Active la journalisation détaillée pour le débogage. (activé par défaut via la CLI)

## Exemple :

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
