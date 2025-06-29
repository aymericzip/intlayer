---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentación del paquete | react-native-intlayer
description: Descubre cómo usar el paquete react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `react-native-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin Metro para configurar a través de variables de entorno en el [Metro bundler](https://docs.expo.dev/guides/customizing-metro/).

## ¿Por qué Internacionalizar tu Aplicación React Native?

Internacionalizar tu aplicación React Native es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes antecedentes lingüísticos.

## Configuración

El paquete `react-native-intlayer` funciona perfectamente con el paquete [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md), y el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/index.md). Consulta la documentación relevante para más información.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

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

Consulta un ejemplo de cómo incluir los plugins en tu configuración de Vite.

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

Intlayer proporciona muchas características para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas características, consulta la guía [Internacionalización (i18n) con Intlayer y React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_react_native+expo.md) para Aplicaciones React Native.**

## Leer sobre Intlayer

- [Sitio web de Intlayer](https://intlayer.org)
- [Documentación de Intlayer](https://intlayer.org/doc)
- [GitHub de Intlayer](https://github.com/aymericzip/intlayer)

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/docchat)
