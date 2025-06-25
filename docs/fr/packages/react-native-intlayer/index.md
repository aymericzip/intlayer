---
docName: package__react-native-intlayer
url: /doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentation du package | react-native-intlayer
description: Découvrez comment utiliser le package react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React, et Express.js.

**Le package `react-native-intlayer`** vous permet d'internationaliser votre application Vite. Il inclut le plugin Metro pour configurer les variables d'environnement dans le [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## Pourquoi internationaliser votre application React Native ?

Internationaliser votre application React Native est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

## Configuration

Le package `react-native-intlayer` fonctionne parfaitement avec le [`package react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/index.md), et le [`package intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). Consultez la documentation pertinente pour plus d'informations.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Exemple d'utilisation

Voici un exemple pour inclure les plugins dans votre configuration Vite.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Maîtriser l'internationalisation de votre application Vite

Intlayer propose de nombreuses fonctionnalités pour vous aider à internationaliser votre application Vite.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation (i18n) avec Intlayer et React Native](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_react_native+expo.md) pour les applications React Native.**

## En savoir plus sur Intlayer

- [Site Web Intlayer](https://intlayer.org)
- [Documentation Intlayer](https://intlayer.org/doc)
- [GitHub Intlayer](https://github.com/aymericzip/intlayer)

- [Posez vos questions à notre documentation intelligente](https://intlayer.org/docchat)
