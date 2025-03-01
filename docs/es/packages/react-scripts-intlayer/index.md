# react-scripts-intlayer: Paquete NPM para usar Intlayer en una aplicación de React Create App

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `react-scripts-intlayer`** incluye los comandos y plugins de `react-scripts-intlayer` para integrar Intlayer con la aplicación basada en Create React App. Estos plugins están basados en [craco](https://craco.js.org/) e incluyen configuración adicional para el empaquetador [Webpack](https://webpack.js.org/).

## Configuración

El paquete `react-scripts-intlayer` funciona perfectamente con el [paquete `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md), y el [paquete `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/index.md). Consulte la documentación relevante para obtener más información.

## Instalación

Instale el paquete necesario utilizando su gestor de paquetes preferido:

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

Para usar el paquete `react-scripts-intlayer`, necesita reemplazar los scripts de `package.json` con los siguientes comandos:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Usar configuración personalizada de Webpack

`react-scripts-intlayer` está basado en [craco](https://craco.js.org/), lo que le permite personalizar la configuración de Webpack.
Si necesita personalizar la configuración de Webpack, también puede implementar su propia configuración basada en el plugin craco de Intlayer. [Vea un ejemplo aquí](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lea la guía completa de Intlayer para React Create App

Intlayer proporciona muchas características para ayudarle a internacionalizar su aplicación React.
[Vea cómo usar Intlayer con React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md).
