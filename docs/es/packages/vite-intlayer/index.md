# vite-intlayer: Paquete NPM para internacionalizar (i18n) una aplicación Vite

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `vite-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin de Vite para establecer la configuración a través de variables de entorno en el [empacador de Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). También proporciona middleware para detectar la localidad preferida del usuario y redirigir al usuario a la URL apropiada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## ¿Por qué internacionalizar tu aplicación Vite?

Internacionalizar tu aplicación Vite es esencial para servir efectivamente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

## Configuración

El paquete `vite-intlayer` funciona sin problemas con el [paquete `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md) y el [paquete `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/index.md). Echa un vistazo a la documentación relevante para más información.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Ejemplo de uso

Mira un ejemplo de cómo incluir los plugins en tu configuración de vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> El plugin Vite `intlayerPlugin()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

> El `intLayerMiddlewarePlugin()` agrega enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la localidad actual basada en la URL y establecerá la cookie de localidad adecuada. Si no se especifica ninguna localidad, el plugin determinará la localidad más apropiada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna localidad, redirigirá a la localidad predeterminada.

## Dominando la internacionalización de tu aplicación Vite

Intlayer proporciona muchas características para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas características, consulta la guía [Internacionalización de React (i18n) con Intlayer y Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md) para la Aplicación Vite y React.**
