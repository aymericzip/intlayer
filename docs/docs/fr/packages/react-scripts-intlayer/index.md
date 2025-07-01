---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du package | react-scripts-intlayer
description: Voir comment utiliser le package react-scripts-intlayer
keywords:
  - Intlayer
  - react-scripts-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer : Package NPM pour utiliser Intlayer dans une application React Create App

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le package `react-scripts-intlayer`** inclut les commandes et plugins `react-scripts-intlayer` pour intégrer Intlayer dans une application basée sur Create React App. Ces plugins sont basés sur [craco](https://craco.js.org/) et incluent une configuration supplémentaire pour le bundler [Webpack](https://webpack.js.org/).

## Configuration

Le package `react-scripts-intlayer` fonctionne parfaitement avec le [`package react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md) et le [`package intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/index.md). Consultez la documentation correspondante pour plus d'informations.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Utilisation

### Commandes CLI

Le package `react-scripts-intlayer` fournit les commandes CLI suivantes :

- `npx react-scripts-intlayer build` : Compile l'application React avec la configuration Intlayer.
- `npx react-scripts-intlayer start` : Démarre le serveur de développement avec la configuration Intlayer.

### Remplacer les scripts dans package.json

Pour utiliser le package `react-scripts-intlayer`, vous devez remplacer les scripts dans `package.json` par les commandes suivantes :

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Utiliser une configuration Webpack personnalisée

`react-scripts-intlayer` est basé sur [craco](https://craco.js.org/), qui vous permet de personnaliser la configuration Webpack.
Si vous avez besoin de personnaliser la configuration Webpack, vous pouvez également mettre en place votre propre configuration basée sur le plugin craco d'intlayer. [Voir un exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lire le guide complet d'Intlayer pour React Create App

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application React.
[Voir comment utiliser intlayer avec React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md).

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
