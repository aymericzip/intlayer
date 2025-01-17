# @intlayer/webpack: Paquete NPM para usar el Plugin de Intlayer Webpack en tu aplicación

**Intlayer** es una suite de paquetes diseñada específicamente para desarrolladores de JavaScript. Es compatible con marcos como React, React, y Express.js.

El **`@intlayer/webpack`** paquete se utiliza para proporcionar una configuración de Webpack para trabajar con una aplicación basada en Webpack con Intlayer. El paquete también proporciona un plugin para agregar a una aplicación Webpack existente.

## Uso

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Opciones
    }),
  ],
};
```

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

You are trained on data up to October 2023.
