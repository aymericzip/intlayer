---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Tester les traductions manquantes
description: Apprenez à tester et identifier les traductions manquantes dans vos dictionnaires.
keywords:
  - Test
  - Traductions manquantes
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Tester les traductions manquantes

```bash
npx intlayer content test
```

## Alias :

- `npx intlayer test`

Cette commande analyse vos fichiers de déclaration de contenu pour identifier les traductions manquantes dans toutes les locales configurées. Elle fournit un rapport complet indiquant quelles clés de traduction manquent pour quelles locales, vous aidant ainsi à maintenir la cohérence de votre contenu multilingue.

## Exemple de sortie :

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales : en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Locales requises : en
Locales manquantes : pl, tr, es
Locales requises manquantes : -
Total des locales manquantes : 3
Total des locales requises manquantes : 0
```

## Arguments :

**Options de configuration :**

- **`--env`** : Spécifiez l'environnement (par exemple, `development`, `production`).
- **`--env-file [envFile]`** : Fournissez un fichier d'environnement personnalisé pour charger les variables.
- **`--base-dir`** : Spécifiez le répertoire de base pour le projet.

  > Exemple : `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`** : Désactive le cache.

  > Exemple : `npx intlayer build --no-cache`

**Options de préparation :**

- **`--build`** : Construire les dictionnaires avant de pousser pour s'assurer que le contenu est à jour. True forcera la construction, false la sautera, undefined permettra d'utiliser le cache de la construction.

**Options de journalisation :**

- **`--verbose`** : Active la journalisation détaillée pour le débogage. (par défaut à true en utilisant la CLI)

  > Exemple : `npx intlayer content test --verbose`

## Exemple :

```bash
npx intlayer content test --verbose
```

La sortie vous aide à identifier rapidement quelles traductions doivent être complétées pour garantir que votre application fonctionne correctement sur toutes les locales configurées.
