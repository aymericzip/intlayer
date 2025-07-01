---
docName: package__react-scripts-intlayer
url: https://intlayer.org/doc/packages/react-scripts-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-scripts-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Paquete | react-scripts-intlayer
description: Vea cómo usar el paquete react-scripts-intlayer
keywords:
  - Intlayer
  - react-scripts-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# react-scripts-intlayer: Paquete NPM para usar Intlayer en una aplicación React Create App

**Intlayer** es una suite de paquetes diseñada específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `react-scripts-intlayer`** incluye los comandos y plugins de `react-scripts-intlayer` para integrar Intlayer con aplicaciones basadas en Create React App. Estos plugins están basados en [craco](https://craco.js.org/) e incluyen configuración adicional para el empaquetador [Webpack](https://webpack.js.org/).

## Configuración

El paquete `react-scripts-intlayer` funciona perfectamente con el paquete [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) y el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/index.md). Consulte la documentación correspondiente para más información.

## Instalación

Instale el paquete necesario usando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Uso

### Comandos CLI

El paquete `react-scripts-intlayer` proporciona los siguientes comandos CLI:

- `npx react-scripts-intlayer build`: Construye la aplicación React con la configuración de Intlayer.
- `npx react-scripts-intlayer start`: Inicia el servidor de desarrollo con la configuración de Intlayer.

### Reemplazar scripts en package.json

Para usar el paquete `react-scripts-intlayer`, debe reemplazar los scripts en `package.json` con los siguientes comandos:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Usar configuración personalizada de Webpack

`react-scripts-intlayer` está basado en [craco](https://craco.js.org/), que te permite personalizar la configuración de Webpack.
Si necesitas personalizar la configuración de Webpack, también puedes implementar tu propia configuración basada en el plugin craco de intlayer. [Ver ejemplo aquí](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lee la guía completa de Intlayer para React Create App

Intlayer ofrece muchas funcionalidades para ayudarte a internacionalizar tu aplicación React.
[Ver cómo usar intlayer con React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md).

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
