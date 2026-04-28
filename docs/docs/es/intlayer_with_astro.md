---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Astro i18n - Cómo traducir una aplicación Astro en 2026
description: Aprende a añadir internacionalización (i18n) a tu sitio Astro con Intlayer. Sigue esta guía para que tu sitio sea multilingüe.
keywords:
  - internacionalización
  - documentación
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Añadir comando init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Actualización de la integración, configuración y uso de Astro"
---

# Traducir tu sitio Astro con Intlayer | Internacionalización (i18n)

<Tabs defaultTab="code">
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo — intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una librería de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente**: Utilizando diccionarios declarativos a nivel de componente.
- **Localizar metadatos, rutas y contenidos dinámicamente**.
- **Asegurar el soporte de TypeScript**: Con tipos autogenerados para mejorar el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**: Como la detección dinámica de idioma y el cambio de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro

Consulta la [plantilla de aplicación](https://github.com/aymericzip/intlayer-astro-template) en GitHub.

### Paso 1: Instalar dependencias

Instala los paquetes necesarios utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opcional: si añades soporte para islas de React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Opcional: si añades soporte para islas de React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Opcional: si añades soporte para islas de React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  El paquete core que proporciona herramientas de i18n para la gestión de la configuración, traducciones, [declaración de contenidos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para conectar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar redirecciones de URL.

### Paso 2: Configurar tu proyecto

Crea un archivo de configuración para definir los idiomas de tu aplicación:

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

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirecciones de middleware, nombres de cookies, ubicación y extensiones de las declaraciones de contenido, desactivar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Astro

Añade el plugin `intlayer` a tu configuración de Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> El plugin de integración `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la generación de los archivos de declaración de contenido y los vigila en modo desarrollo. Define las variables de entorno de Intlayer dentro de la aplicación Astro y proporciona alias para optimizar el rendimiento.

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

> Las declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación, siempre que estén incluidas en el `contentDir` (por defecto `./src`) y coincidan con la extensión de los archivos de declaración de contenido (por defecto `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más información, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar el contenido en Astro

Puedes consumir los diccionarios directamente en tus archivos `.astro` utilizando los helpers core exportados por `intlayer`.

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback for users in unmatched languages -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

### Paso 6: Enrutamiento localizado

Crea segmentos de ruta dinámicos para servir páginas localizadas (ej: `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

La integración de Astro añade un middleware de Vite que ayuda con el enrutamiento sensible al idioma y las definiciones de entorno durante el desarrollo. También puedes crear enlaces entre idiomas utilizando tu propia lógica o herramientas de `intlayer` como `getLocalizedUrl`.

### Paso 7: Continúa usando tus frameworks favoritos

Sigue construyendo tu aplicación con el framework que prefieras.

- Intlayer + React: [Intlayer con React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer con Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer con Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer con Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer con Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+preact.md)

### Configuración de TypeScript

Intlayer utiliza el aumento de módulos (module augmentation) para aprovechar TypeScript, haciendo que tu código sea más robusto.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... tu configuración de TypeScript existente
  "include": [
    // ... tu configuración de TypeScript existente
    ".intlayer/**/*.ts", // Incluir tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto evita incluirlos en tu repositorio de Git.

Para hacerlo, añade las siguientes instrucciones a tu archivo `.gitignore`:

```bash
# Ignorar archivos generados por Intlayer
.intlayer
```

### Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **extensión oficial de Intlayer para VS Code**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualización en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más información sobre el uso de la extensión, consulta la [documentación de la extensión para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### (Opcional) Paso 15 : Extraer el contenido de tus componentes

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto de tu configuración
  compiler: {
    /**
     * Indica si el compilador debe estar habilitado.
     */
    enabled: true,

    /**
     * Define la ruta de los archivos de salida
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica si los componentes deben guardarse después de ser transformados. De esa manera, el compilador se puede ejecutar solo una vez para transformar la aplicación y luego se puede eliminar.
     */
    saveComponents: false,

    /**
     * Prefijo de clave de diccionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando de extracción'>

Ejecuta el extractor para transformar tus componentes y extraer el contenido

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Compilador Babel'>

Actualiza tu archivo `vite.config.ts` para incluir el plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Agrega el plugin del compilador
  ],
});
```

```bash packageManager="npm"
npm run build # O npm run dev
```

```bash packageManager="pnpm"
pnpm run build # O pnpm run dev
```

```bash packageManager="yarn"
yarn build # O yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

### Profundiza más

Si quieres saber más, también puedes implementar el [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o usar el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para externalizar tus contenidos.
