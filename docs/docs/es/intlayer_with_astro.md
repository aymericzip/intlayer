---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: i18n Astro - Cómo traducir una aplicación Astro en 2026
description: Aprende cómo añadir internacionalización (i18n) a tu sitio web Astro usando Intlayer. Sigue esta guía para hacer tu sitio multilingüe.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - entorno
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Añadir comando init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Actualización para integración con Astro, configuración, uso"
---

# Traduce tu sitio web Astro usando Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Ver [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-astro-template) en GitHub.

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando tu gestor de paquetes:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opcional: añadir soporte para islas de React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Opcional: añadir soporte para islas de React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Opcional: añadir soporte para islas de React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

### Paso 2: Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Astro

Añade el plugin de intlayer en tu configuración.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> El plugin de integración de Astro `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Astro. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declarar tu contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar tu contenido en Astro

Puedes consumir diccionarios directamente en archivos `.astro` usando los ayudantes principales exportados por `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Paso 6: Enrutamiento localizado

Crea un segmento de ruta dinámico para servir páginas localizadas, por ejemplo `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

La integración de Astro añade un middleware de Vite durante el desarrollo que ayuda con el enrutamiento consciente del idioma y las definiciones de entorno. Aún puedes enlazar entre idiomas usando tu propia lógica, o funciones de utilidad como `getLocalizedUrl` de `intlayer`.

### Paso 7: Continúa usando tu framework favorito

Continúa usando tu framework favorito para construir tu aplicación.

- Intlayer + React: [Intlayer con React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer con Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer con Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer con Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer con Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+preact.md)

### Configurar TypeScript

Intlayer utiliza el aumento de módulos para beneficiarse de TypeScript y fortalecer tu base de código.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones de TypeScript existentes
  "include": [
    // ... Tus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar subirlos a tu repositorio de Git.

Para hacerlo, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```bash
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las llaves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión de VS Code de Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---
