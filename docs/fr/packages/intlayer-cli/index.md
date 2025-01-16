# intlayer-cli: Paquet NPM pour utiliser l'Intlayer CLI

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React et Express.js.

Le **`intlayer-cli`** est un paquet NPM qui consomme le paquet `@intlayer/cli` et le rend disponible pour les interfaces de ligne de commande `intlayer`.

> Notez que ce paquet n'est pas nécessaire si le paquet [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/fr/packages/intlayer/index.md) est installé. En comparaison avec le paquet `intlayer`, le paquet `intlayer-cli` est un paquet plus léger qui ne contient que l'outil CLI, sans les dépendances `@intlayer/core`.

## Installation

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

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

Voici un exemple de comment utiliser le paquet `intlayer-cli` :

```bash
npx intlayer build
```

## Commandes CLI

Intlayer fournit un outil CLI pour :

- auditer vos déclarations de contenu et compléter les traductions manquantes
- construire des dictionnaires à partir de vos déclarations de contenu
- pousser et tirer des dictionnaires distants de votre CMS vers votre projet local

Consultez [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md) pour plus d'informations.
