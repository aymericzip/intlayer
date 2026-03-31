---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Toutes les commandes CLI Intlayer pour votre site multilingue
description: Découvrez comment utiliser le CLI Intlayer pour gérer votre site multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.
keywords:
  - CLI
  - Command Line Interface
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Ajout de la commande standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Ajout de la commande CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Ajout de la commande list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajout de la commande init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Ajout de la commande extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Ajout de l'option skipIfExists à la commande translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Ajout d'alias pour les arguments et commandes CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Ajout de l'option build aux commandes"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Ajout de la commande version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Réglage de l'option verbose par défaut sur vrai via CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Ajout de la commande watch et de l'option with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Ajout de la commande editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Ajout des commandes content test et list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Mise à jour de la documentation des paramètres des commandes CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialisation de l'historique"
---

# CLI Intlayer - Toutes les commandes CLI Intlayer pour votre site multilingue

---

## Table des matières

<TOC/>

---

## Installer le paquet

Installez les paquets nécessaires avec npm :

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Si le paquet `intlayer` est déjà installé, le CLI est automatiquement installé. Vous pouvez ignorer cette étape.

## paquet intlayer-cli

Le paquet `intlayer-cli` est destiné à transpiler vos [déclarations intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md) en dictionnaires.

Ce paquet transpilera tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Pour interpréter les dictionnaires intlayer, vous pouvez utiliser des interpréteurs, tels que [react-intlayer](https://www.npmjs.com/package/react-intlayer), ou [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Support des fichiers de configuration

Intlayer accepte plusieurs formats de fichiers de configuration :

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Pour voir comment configurer les locales disponibles ou d'autres paramètres, reportez-vous à la [documentation de configuration ici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Exécuter des commandes intlayer

### Authentification

- **[Connexion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/login.md)** - S'authentifier auprès du CMS Intlayer et obtenir les identifiants d'accès

### Commandes principales

- **[Build de dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/build.md)** - Construisez vos dictionnaires à partir des fichiers de déclaration de contenu
- **[Surveillance de dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/watch.md)** - Surveillez les changements et construisez automatiquement les dictionnaires
- **[Créer un bundle autonome](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/standalone.md)** - Créez un bundle JavaScript autonome contenant Intlayer et les paquets spécifiés
- **[Vérifier la version du CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/version.md)** - Vérifiez la version installée du CLI Intlayer
- **[Lister les projets](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/list_projects.md)** - Listez tous les projets Intlayer dans un répertoire ou un dépôt git

### Gestion des dictionnaires

- **[Pousser les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/push.md)** - Poussez les dictionnaires vers l'éditeur et le CMS Intlayer
- **[Récupérer les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/pull.md)** - Récupérez les dictionnaires depuis l'éditeur et le CMS Intlayer
- **[Remplir les dictionnaires](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md)** - Remplissez, auditez et traduisez les dictionnaires à l'aide de l'IA
- **[Tester les traductions manquantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/test.md)** - Testez et identifiez les traductions manquantes
- **[Lister les fichiers de déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/list.md)** - Listez tous les fichiers de déclaration de contenu dans votre projet

### Gestion des composants

- **[Extraire des chaînes de caractères](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md)** - Extrayez les chaînes des composants dans un fichier .content à proximité du composant

### Configuration

- **[Initialiser Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/init.md)** - Configurez Intlayer dans votre projet avec une configuration automatique
- **[Gérer la configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/configuration.md)** - Récupérez et poussez votre configuration Intlayer vers le CMS

### Gestion de la documentation

- **[Traduire un document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-translate.md)** - Traduisez automatiquement des fichiers de documentation à l'aide de l'IA
- **[Réviser un document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-review.md)** - Révisez les fichiers de documentation pour la qualité et la cohérence

### Éditeur & Live Sync

- **[Commandes de l'éditeur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/editor.md)** - Utilisez les commandes de l'éditeur Intlayer
- **[Commandes Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/live.md)** - Utilisez Live Sync pour refléter les changements de contenu du CMS au moment de l'exécution

### CI/CD & Automatisation

- **[Commande CI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/ci.md)** - Exécutez des commandes Intlayer avec des identifiants auto-injectés pour les pipelines CI/CD

### Outils de développement

- **[SDK CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/sdk.md)** - Utilisez le SDK CLI Intlayer dans votre propre code
- **[Déboguer la commande Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/debug.md)** - Déboguez et dépannez les problèmes liés au CLI Intlayer

## Utiliser les commandes intlayer dans votre `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Note** : Vous pouvez également utiliser les alias plus courts :
>
> - `npx intlayer list` au lieu de `npx intlayer content list`
> - `npx intlayer test` au lieu de `npx intlayer content test`
> - `npx intlayer projects-list` ou `npx intlayer pl` au lieu de `npx intlayer projects list`
