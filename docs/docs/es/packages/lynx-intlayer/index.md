---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Documentación del Paquete | lynx-intlayer
description: Vea cómo usar el paquete lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# lynx-intlayer: Internacionalizar (i18n) una aplicación Lynx

**Intlayer** es un conjunto de paquetes diseñados específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `lynx-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin Metro para configurar mediante variables de entorno en el [Lynx bundler](https://lynxjs.org/index.html).

## ¿Por qué internacionalizar tu aplicación Lynx?

Internacionalizar tu aplicación Lynx es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

## Configuración

El paquete `lynx-intlayer` funciona perfectamente con el paquete [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) y el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/index.md). Consulta la documentación relevante para más información.

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Ejemplo de uso

Ve un ejemplo de cómo incluir los plugins en tu configuración de vite.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... otros plugins
    pluginIntlayerLynx(),
  ],
});
```

## Dominando la internacionalización de tu aplicación Vite

Intlayer ofrece muchas funcionalidades para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas funcionalidades, consulta la guía [Internacionalización React (i18n) con Intlayer y Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_lynx+react.md) para la aplicación Lynx.**

## Lee sobre Intlayer

- [Sitio web de Intlayer](https://intlayer.org)
- [Documentación de Intlayer](https://intlayer.org/doc)
- [GitHub de Intlayer](https://github.com/aymericzip/intlayer)

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/doc/chat)

## Historial de la documentación

- 5.5.10 - 2025-06-29: Historial inicial
