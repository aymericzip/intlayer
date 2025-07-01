---
docName: package__intlayer-cli
url: https://intlayer.org/doc/package/intlayer-cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer-cli/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Outil en ligne de commande pour l'internationalisation
description: Package d'interface en ligne de commande pour Intlayer fournissant des outils pour gérer les traductions, construire des dictionnaires et automatiser les flux de travail d'internationalisation.
keywords:
  - intlayer
  - CLI
  - ligne de commande
  - internationalisation
  - i18n
  - outils
  - NPM
  - automatisation
---

# intlayer-cli : Package NPM pour utiliser la CLI Intlayer

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le package `intlayer-cli` est un package NPM qui utilise le package `@intlayer/cli` et le rend disponible pour les interfaces en ligne de commande `intlayer`.**

> Notez que ce package n'est pas nécessaire si le package [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer/index.md) est installé. Comparé au package `intlayer`, le package `intlayer-cli` est un package plus léger qui ne contient que l'outil CLI, sans les dépendances `@intlayer/core`.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Utilisation

Voici un exemple d'utilisation du package `intlayer-cli` :

```bash
npx intlayer dictionaries build
```

## Commandes CLI

Intlayer fournit un outil CLI pour :

- auditer vos déclarations de contenu et compléter les traductions manquantes
- construire des dictionnaires à partir de vos déclarations de contenu
- pousser et tirer des dictionnaires distants depuis votre CMS vers votre projet local

Consultez [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md) pour plus d'informations.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
