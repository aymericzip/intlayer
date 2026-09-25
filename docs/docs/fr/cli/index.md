---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "Ajouter la commande upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Ajouter la commande init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Remplacement de la commande `ci` par le drapeau `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Ajout de la commande scan"
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
author: aymericzip
---

# CLI Intlayer - Toutes les commandes CLI Intlayer pour votre site multilingue

## Table des matières

<TOC/>

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

Ce paquet transpilera tous les fichiers intlayer, tels que `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Voir comment déclarer vos fichiers de déclaration Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/login" />
</TechGrid>

> `intlayer login` génère une **clé d'accès** (`clientId` / `clientSecret`) que chaque commande authentifiée utilise. Le secret est une credential côté serveur et n'atteint jamais votre client bundle — voir [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/login.md#keeping-the-access-key-safe).

### Commandes principales

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/list_projects" />
</TechGrid>

### Gestion des dictionnaires

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/list" />
</TechGrid>

### Gestion des composants

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract" />
</TechGrid>

### Configuration

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/configuration" />
</TechGrid>

### Gestion de la documentation

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/doc-review" />
</TechGrid>

### Éditeur & Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/live" />
</TechGrid>

### Audit & Diagnostics

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/scan" />
</TechGrid>

### Outils de développement

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/debug" />
</TechGrid>

## Utiliser les commandes intlayer dans votre `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Note** : Vous pouvez également utiliser les alias plus courts :
>
> - `npx intlayer list` au lieu de `npx intlayer content list`
> - `npx intlayer test` au lieu de `npx intlayer content test`
> - `npx intlayer projects-list` ou `npx intlayer pl` au lieu de `npx intlayer projects list`
