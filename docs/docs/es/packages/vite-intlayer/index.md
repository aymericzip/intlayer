---
docName: package__vite-intlayer
url: https://intlayer.org/doc/packages/vite-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/vite-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación del paquete | vite-intlayer
description: Descubre cómo usar el paquete vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# vite-intlayer: Paquete NPM para internacionalizar (i18n) una aplicación Vite

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `vite-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin de Vite para configurar a través de variables de entorno en el [empaquetador Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). También proporciona middleware para detectar el idioma preferido del usuario y redirigirlo a la URL adecuada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## ¿Por qué internacionalizar tu aplicación Vite?

Internacionalizar tu aplicación Vite es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes antecedentes lingüísticos.

## Configuración

El paquete `vite-intlayer` funciona perfectamente con el [paquete `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md) y el [paquete `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/index.md). Consulta la documentación relevante para obtener más información.

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

Consulta un ejemplo de cómo incluir los plugins en tu configuración de Vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> El plugin de Vite `intlayerPlugin()` se utiliza para integrar Intlayer con Vite. Garantiza la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

> El `intLayerMiddlewarePlugin()` agrega enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente el idioma actual basado en la URL y configurará la cookie de idioma adecuada. Si no se especifica un idioma, el plugin determinará el idioma más apropiado basado en las preferencias de idioma del navegador del usuario. Si no se detecta ningún idioma, redirigirá al idioma predeterminado.

## Dominando la internacionalización de tu aplicación Vite

Intlayer proporciona muchas características para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas características, consulta la guía [Internacionalización (i18n) con Intlayer y Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md) para aplicaciones Vite y React.**
