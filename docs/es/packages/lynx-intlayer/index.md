---
docName: package__lynx-intlayer
url: /doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentación del paquete | lynx-intlayer
description: Descubre cómo usar el paquete lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `lynx-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin Metro para configurar a través de variables de entorno en el [empaquetador Lynx](https://lynxjs.org/index.html).

## ¿Por qué internacionalizar tu aplicación Lynx?

Internacionalizar tu aplicación Lynx es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes antecedentes lingüísticos.

## Configuración

El paquete `lynx-intlayer` funciona perfectamente con el [paquete `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md), y el [paquete `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/intlayer/index.md). Consulta la documentación relevante para más información.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

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

Consulta un ejemplo de cómo incluir los plugins en tu configuración de Vite.

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

## Domina la internacionalización de tu aplicación Vite

Intlayer proporciona muchas características para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas características, consulta la guía [Internacionalización (i18n) con Intlayer y Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_lynx+react.md) para aplicaciones Lynx.**

## Lee sobre Intlayer

- [Sitio web de Intlayer](https://intlayer.org)
- [Documentación de Intlayer](https://intlayer.org/doc)
- [GitHub de Intlayer](https://github.com/aymericzip/intlayer)

- [Haz tus preguntas a nuestra documentación inteligente](https://intlayer.org/docchat)
