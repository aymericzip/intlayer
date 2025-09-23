---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Paquete | vite-intlayer
description: Vea cómo usar el paquete vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: Paquete NPM para internacionalizar (i18n) una aplicación Vite

**Intlayer** es una suite de paquetes diseñada específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, React y Express.js.

**El paquete `vite-intlayer`** te permite internacionalizar tu aplicación Vite. Incluye el plugin de Vite para configurar mediante variables de entorno en el [empaquetador Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). También proporciona middleware para detectar la configuración regional preferida del usuario y redirigirlo a la URL adecuada según lo especificado en la [configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## ¿Por qué internacionalizar tu aplicación Vite?

Internacionalizar tu aplicación Vite es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

## Configuración

El paquete `vite-intlayer` funciona perfectamente con el paquete [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) y el paquete [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/index.md). Consulta la documentación correspondiente para más información.

## Instalación

Instala el paquete necesario usando tu gestor de paquetes preferido:

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
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddlewarePlugin()],
});
```

> El plugin `intlayer()` para Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los supervisa en modo desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

> El plugin `intlayerMiddlewarePlugin()` añade enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la configuración regional actual basada en la URL y establecerá la cookie de localización apropiada. Si no se especifica ninguna localización, el plugin determinará la localización más adecuada basándose en las preferencias de idioma del navegador del usuario. Si no se detecta ninguna localización, redirigirá a la localización predeterminada.

## Dominando la internacionalización de tu aplicación Vite

Intlayer ofrece muchas funcionalidades para ayudarte a internacionalizar tu aplicación Vite.

**Para aprender más sobre estas funcionalidades, consulta la guía [Internacionalización (i18n) en React con Intlayer, Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md) para aplicaciones Vite y React.**

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
