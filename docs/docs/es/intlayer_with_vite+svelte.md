---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: Cómo traducir tu aplicación Vite y Svelte – Guía i18n 2025
description: Descubre cómo hacer tu sitio web Vite y Svelte multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 5.5.11
    date: 2025-11-19
    changes: Actualización de la documentación
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicio del historial
---

# Traduce tu sitio web Vite y Svelte usando Intlayer | Internacionalización (i18n)

> Este paquete está en desarrollo. Consulta el [issue](https://github.com/aymericzip/intlayer/issues/114) para más información. Muestra tu interés en Intlayer para Svelte dando like al issue

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar soporte para TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y cambio dinámico de locales.

---

## Guía Paso a Paso para Configurar Intlayer en una Aplicación Vite y Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-vite-svelte-template) en GitHub.

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpileación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **svelte-intlayer**
  El paquete que integra Intlayer con la aplicación Svelte. Proporciona proveedores de contexto y hooks para la internacionalización en Svelte.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar redirecciones de URL.

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
      // Tus otros locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección mediante middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integra Intlayer en tu configuración de Vite

Agrega el plugin intlayer en tu configuración.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> El plugin `intlayer()` para Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los supervisa en modo desarrollo. Define las variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 4: Declara tu contenido

Crea y administra tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Declaración del contenido de la aplicación
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Declaración del contenido de la aplicación
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación tan pronto como se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Utiliza Intlayer en tu código

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Renderizar contenido como contenido simple -->
<h1>{$content.title}</h1>
<!-- Para renderizar el contenido editable usando el editor -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Para renderizar el contenido como una cadena -->
<div aria-label={$content.title.value}></div>
```

### (Opcional) Paso 6: Cambiar el idioma de tu contenido

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Obtener información del locale y la función setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Manejar el cambio de locale
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (Opcional) Paso 7: Renderizar Markdown

Intlayer soporta renderizar contenido Markdown directamente en tu aplicación Svelte. Por defecto, Markdown se trata como texto plano. Para convertir Markdown en HTML enriquecido, puedes integrar `@humanspeak/svelte-markdown` u otro parser de markdown.

> Para ver cómo declarar contenido markdown usando el paquete `intlayer`, consulta la [documentación de markdown](https://github.com/aymericzip/intlayer/tree/main/docs/docs/es/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // renderizar el contenido markdown como una cadena
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> También puedes acceder a los datos del front-matter de tu markdown usando la propiedad `content.markdownContent.metadata.xxx`.

### (Opcional) Paso 8: Configurar el editor / CMS de intlayer

Para configurar el editor de intlayer, debes seguir la [documentación del editor de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

Para configurar el CMS de intlayer, debes seguir la [documentación del CMS de intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

En paralelo, en tu aplicación Svelte, debes agregar la siguiente línea en un layout, o en la raíz de tu aplicación:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (Opcional) Paso 7: Añadir enrutamiento localizado a tu aplicación

Para manejar el enrutamiento localizado en tu aplicación Svelte, puedes usar `svelte-spa-router` junto con `localeFlatMap` de Intlayer para generar rutas para cada locale.

Primero, instala `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
```

```bash packageManager="yarn"
yarn add svelte-spa-router
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Luego, crea un archivo `Router.svelte` para definir tus rutas:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Actualiza tu `main.ts` para montar el componente `Router` en lugar de `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Finalmente, actualiza tu `App.svelte` para recibir la propiedad `locale` y usarla con `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... resto de tu aplicación ... -->
</main>
```

#### Configurar el enrutamiento del lado del servidor (Opcional)

Paralelamente, también puedes usar `intlayerProxy` para añadir enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la locale actual basada en la URL y establecerá la cookie de locale correspondiente. Si no se especifica ninguna locale, el plugin determinará la locale más adecuada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna locale, redirigirá a la locale por defecto.

> Ten en cuenta que para usar `intlayerProxy` en producción, necesitas mover el paquete `vite-intlayer` de `devDependencies` a `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia la locale

Para permitir que los usuarios cambien de idioma y actualicen la URL en consecuencia, puedes crear un componente `LocaleSwitcher`. Este componente usará `getLocalizedUrl` de `intlayer` y `push` de `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Obtener información de la locale
const { locale, availableLocales } = useLocale();

// Manejar el cambio de locale
const changeLocale = (event: Event) => {
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Opcional) Paso 8: Cambiar la URL cuando cambia la configuración regional

Para permitir que los usuarios cambien de idioma y actualicen la URL en consecuencia, puedes crear un componente `LocaleSwitcher`. Este componente utilizará `getLocalizedUrl` de `intlayer` y `push` de `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Obtener información de la configuración regional
const { locale, availableLocales } = useLocale();

// Manejar el cambio de configuración regional
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la extensión oficial **Intlayer VS Code Extension**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión ofrece:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
