---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Package Documentation | react-native-intlayer
description: See how to use the react-native-intlayer package
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-native-intlayer
---

# react-native-intlayer: Internationalize (i18n) an React Native application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

**The `react-native-intlayer` package** allows you to internationalize your Vite application. It includes the Metro plugin to set the configuration through environment variables into the [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## Why Internationalize Your React Native Application?

Internationalizing your React Native application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Configuration

The `react-native-intlayer` package works seamlessly with the [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md), and the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md). Have a look at the relevant documentation for more information.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Example of usage

See an example of how to include the plugins into your vite configuration.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Mastering the internationalization of your Vite application

Intlayer provides a lot of features to help you internationalize your Vite application.

**To learn more about these features, refer to the [React Internationalization (i18n) with Intlayer and React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md) guide for React Native Application.**

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docchat)

## Doc History

| Version | Date       | Changes      |
| ------- | ---------- | ------------ |
| 5.5.10  | 2025-06-29 | Init history |
