---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Découvrez comment utiliser le CLI Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - CLI
  - Interface en ligne de commande
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: Ajout de la commande transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Ajout de l'option skipIfExists à la commande translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Ajout d'alias pour les arguments et commandes CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Ajout de l'option build aux commandes
  - version: 6.1.2
    date: 2025-09-26
    changes: Ajout de la commande version
  - version: 6.1.0
    date: 2025-09-26
    changes: Définir l'option verbose par défaut à true via le CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Ajout de la commande watch et de l'option with
  - version: 6.0.1
    date: 2025-09-23
    changes: Ajout de la commande editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Ajout des commandes content test et list
  - version: 5.5.11
    date: 2025-07-11
    changes: Mise à jour de la documentation des paramètres des commandes CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Initialisation de l'historique
---

# CLI Intlayer

---

## Table des matières

<TOC/>

---

## Installer le package

Installez les packages nécessaires en utilisant npm :

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Si le package `intlayer` est déjà installé, le CLI est automatiquement installé. Vous pouvez passer cette étape.

## Package intlayer-cli

Le package `intlayer-cli` a pour but de transpiler vos [déclarations intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md) en dictionnaires.

Ce package va transpiler tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs, tels que [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Support des fichiers de configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour voir comment configurer les locales disponibles, ou d'autres paramètres, référez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Exécuter les commandes intlayer

### Authentification

- **[Connexion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/login.md)** - S'authentifier avec le CMS Intlayer et obtenir les identifiants d'accès

### Commandes principales

- **[Construire les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/build.md)** - Construisez vos dictionnaires à partir des fichiers de déclaration de contenu
- **[Surveiller les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/watch.md)** - Surveillez les changements et construisez automatiquement les dictionnaires
- **[Vérifier la version CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/version.md)** - Vérifiez la version installée de la CLI Intlayer

### Gestion des dictionnaires

- **[Pousser les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/push.md)** - Poussez les dictionnaires vers l'éditeur Intlayer et le CMS
- **[Récupérer les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/pull.md)** - Récupérez les dictionnaires depuis l'éditeur et le CMS Intlayer
- **[Remplir les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md)** - Remplissez, auditez et traduisez les dictionnaires à l'aide de l'IA
- **[Tester les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/test.md)** - Testez et identifiez les traductions manquantes
- **[Lister les fichiers de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/list.md)** - Listez tous les fichiers de déclaration de contenu dans votre projet

### Gestion des composants

- **[Transformer les composants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/transform.md)** - Transformer les composants existants pour utiliser Intlayer

### Configuration

- **[Gérer la configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/configuration.md)** - Récupérer et pousser votre configuration Intlayer vers le CMS

### Gestion de la documentation

- **[Traduire un document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-translate.md)** - Traduire automatiquement les fichiers de documentation avec l'IA
- **[Relire un document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-review.md)** - Relire les fichiers de documentation pour la qualité et la cohérence

### Éditeur & Synchronisation en direct

- **[Commandes de l’éditeur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/editor.md)** - Utilisez les commandes de l’éditeur Intlayer
- **[Commandes Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/live.md)** - Utilisez Live Sync pour refléter les changements de contenu du CMS en temps réel

### Outils de développement

- **[SDK CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/sdk.md)** - Utilisez le SDK CLI Intlayer dans votre propre code
- **[Commande Debug Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/debug.md)** - Déboguez et résolvez les problèmes du CLI Intlayer

## Utilisez les commandes intlayer dans votre `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Note** : Vous pouvez également utiliser les alias plus courts :
>
> - `npx intlayer list` au lieu de `npx intlayer content list`
> - `npx intlayer test` au lieu de `npx intlayer content test`
