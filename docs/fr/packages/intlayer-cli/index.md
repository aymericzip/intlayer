# intlayer-cli : Package NPM pour utiliser l'Intlayer CLI

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

Le package **`intlayer-cli`** est un package NPM qui consomme le package `@intlayer/cli` et le rend disponible pour les interfaces en ligne de commande `intlayer`.

> Notez que ce package n'est pas nécessaire si le package [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer/index.md) est installé. En comparaison avec le package `intlayer`, le package `intlayer-cli` est un package plus léger qui ne contient que l'outil CLI, sans les dépendances de `@intlayer/core`.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## Utilisation

Voici un exemple d'utilisation du package `intlayer-cli` :

```bash
npx intlayer build
```

## Commandes CLI

Intlayer fournit un outil CLI pour :

- auditer vos déclarations de contenu et compléter les traductions manquantes
- construire des dictionnaires à partir de vos déclarations de contenu
- pousser et tirer des dictionnaires distants depuis votre CMS vers votre projet local

Consultez [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md) pour plus d'informations.
