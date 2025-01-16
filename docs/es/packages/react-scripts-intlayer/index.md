# react-scripts-intlayer: Paquete NPM para usar Intlayer en una aplicación de Create React App

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `react-scripts-intlayer`** incluye los comandos y complementos de `react-scripts-intlayer` para integrar Intlayer con la aplicación basada en Create React App. Estos complementos se basan en [craco](https://craco.js.org/) e incluyen configuración adicional para el empaquetador [Webpack](https://webpack.js.org/).

## Configuración

El paquete `react-scripts-intlayer` funciona a la perfección con el [paquete `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md) y el [paquete `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/index.md). Consulta la documentación relevante para más información.

## Instalación

Instala el paquete necesario usando tu administrador de paquetes preferido:

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

- `npx react-scripts-intlayer build`: Compila la aplicación React con la configuración de Intlayer.
- `npx react-scripts-intlayer start`: Inicia el servidor de desarrollo con la configuración de Intlayer.

### Reemplazar scripts de package.json

Para usar el paquete `react-scripts-intlayer`, necesitas reemplazar los scripts de `package.json` con los siguientes comandos:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Usar configuración personalizada de Webpack

`react-scripts-intlayer` se basa en [craco](https://craco.js.org/), que te permite personalizar la configuración de Webpack.  
Si necesitas personalizar la configuración de Webpack, también puedes implementar tu propia configuración basada en el complemento craco de intlayer. [Consulta el ejemplo aquí](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Lee la guía completa de Intlayer para Create React App

Intlayer proporciona muchas características para ayudarte a internacionalizar tu aplicación React.  
[Consulta cómo usar intlayer con Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md).
