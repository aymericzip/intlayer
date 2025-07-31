---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Documentación del paquete | react-native-intlayer
description: Vea cómo usar el paquete react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-native-intlayer
---

# react-native-intlayer: Internacionalizar (i18n) una aplicación React Native

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `react-native-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin Metro para configurar mediante variables de entorno en el [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## ¿Por qué internacionalizar tu aplicación React Native?

Internacionalizar tu aplicación React Native es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

## Configuración

El paquete `react-native-intlayer` funciona perfectamente con el paquete [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) y el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/index.md). Consulta la documentación correspondiente para más información.

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## Ejemplo de uso

Ve un ejemplo de cómo incluir los plugins en tu configuración de vite.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Dominando la internacionalización de tu aplicación Vite

Intlayer ofrece muchas características para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas características, consulta la guía [Internacionalización React (i18n) con Intlayer y React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_native+expo.md) para aplicaciones React Native.**

## Lee sobre Intlayer

- [Sitio web de Intlayer](https://intlayer.org)
- [Documentación de Intlayer](https://intlayer.org/doc)
- [GitHub de Intlayer](https://github.com/aymericzip/intlayer)

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/docchat)

## Historial de la documentación

- 5.5.10 - 2025-06-29: Inicio del historial
