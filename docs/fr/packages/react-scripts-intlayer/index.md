# react-scripts-intlayer: Paquet NPM pour utiliser Intlayer dans une application React Create App

**Intlayer** est une suite de paquets conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks tels que React, React et Express.js.

**Le paquet `react-scripts-intlayer`** comprend les commandes et les plugins `react-scripts-intlayer` pour intégrer Intlayer avec l'application basée sur Create React App. Ces plugins sont basés sur [craco](https://craco.js.org/) et incluent une configuration additionnelle pour le bundler [Webpack](https://webpack.js.org/).

## Configuration

Le paquet `react-scripts-intlayer` fonctionne parfaitement avec le [paquet `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/index.md) et le [paquet `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). Consultez la documentation pertinente pour plus d'informations.

## Installation

Installez le paquet nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Usage

### Commandes CLI

Le paquet `react-scripts-intlayer` fournit les commandes CLI suivantes :

- `npx react-scripts-intlayer build`: Construit l'application React avec la configuration Intlayer.
- `npx react-scripts-intlayer start`: Démarre le serveur de développement avec la configuration Intlayer.

### Remplacer les scripts de package.json

Pour utiliser le paquet `react-scripts-intlayer`, vous devez remplacer les scripts `package.json` par les commandes suivantes :

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Utiliser une configuration Webpack personnalisée

`react-scripts-intlayer` est basé sur [craco](https://craco.js.org/), ce qui vous permet de personnaliser la configuration Webpack.
Si vous avez besoin de personnaliser la configuration Webpack, vous pouvez également mettre en œuvre votre propre configuration basée sur le plugin craco d'intlayer. [Voir l'exemple ici](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lisez le guide complet d'Intlayer pour React Create App

Intlayer fournit de nombreuses fonctionnalités pour vous aider à internationaliser votre application React.
[Voir comment utiliser intlayer avec React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md).
