---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vue i18n - Cómo traducir una aplicación Astro + Vue en 2026
description: Aprende cómo añadir internacionalización (i18n) a tu sitio web Astro + Vue usando Intlayer. Sigue esta guía para hacer tu sitio multilingüe.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Astro
  - Vue
  - i18n
  - JavaScript
slugs:
  - doc
  - entorno
  - astro
  - vue
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentación inicial para Astro + Vue"
---

# Traduce tu sitio web Astro + Vue usando Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro + Vue

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
npm install intlayer astro-intlayer vue vue-intlayer @astrojs/vue

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

bun x intlayer init
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

- **vue**
  El paquete principal de Vue.

- **vue-intlayer**
  El paquete que integra Intlayer con aplicaciones de Vue. Proporciona `installIntlayer` y los composables `useIntlayer` y `useLocale` para la internacionalización en Vue.

- **@astrojs/vue**
  La integración oficial de Astro que permite el uso de islas de componentes de Vue.

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

Añade el plugin de intlayer y la integración de Vue en tu configuración.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), vue()],
});
```

> El plugin de integración de Astro `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Astro. Además, proporciona alias para optimizar el rendimiento.

> La integración `vue()` permite el uso de islas de componentes de Vue a través de `client:only="vue"`.

### Paso 4: Declarar tu contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/app.content.ts"
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

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar tu contenido en Astro

Puedes consumir diccionarios directamente en archivos `.astro` usando los ayudantes principales exportados por `intlayer`. También debes añadir metadatos de SEO como hreflang y enlaces canónicos a cada página, e incrustar la isla de Vue para contenido interactivo en el lado del cliente.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import VueIsland from "../../components/vue/VueIsland.vue";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Enlace canónico: Indica a los motores de búsqueda cuál es la versión principal de esta página -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Informa a Google sobre todas las versiones localizadas -->
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

    <!-- x-default: Opción de respaldo para usuarios en idiomas que no coinciden -->
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
    <!-- La isla de Vue renderiza todo el contenido interactivo, incluido el selector de idioma -->
    <VueIsland locale={locale} client:only="vue" />
  </body>
</html>
```

> **Nota sobre la Configuración de Enrutamiento:**
> La estructura de directorios que utilices depende de la configuración `middleware.routing` en tu `intlayer.config.ts`:
>
> - **`prefix-no-default` (por defecto):** Mantiene el idioma por defecto en la raíz (sin prefijo) y prefija los otros. Usa `[...locale]` para capturar todos los casos.
> - **`prefix-all`:** Todas las URLs están prefijadas con el idioma. Puedes usar un `[locale]` estándar si no necesitas manejar la raíz por separado.
> - **`search-param` o `no-prefix`:** No se necesita carpeta de idioma. El idioma se maneja a través de parámetros de búsqueda o cookies.

### Paso 6: Crear el componente de Isla de Vue

Crea el componente de isla que envuelve tu aplicación de Vue y recibe el idioma detectado por el servidor. `installIntlayer` debe llamarse para registrar el plugin de Intlayer en la instancia de Vue antes de usar cualquier composable.

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useIntlayer, useLocale, installIntlayer } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

const props = defineProps<{ locale: LocalesValues }>();

const app = getCurrentInstance()?.appContext.app;
if (app) {
  installIntlayer(app, { locale: props.locale });
}

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

const count = ref(0);
const { title } = useIntlayer("app");
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- El selector de idioma se renderiza en línea en la plantilla de la isla -->
    <div class="locale-switcher">
      <span class="switcher-label">Cambiar idioma:</span>
      <div class="locale-buttons">
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem"
          :class="['locale-btn', { active: localeItem === currentLocale }]"
          :disabled="localeItem === currentLocale"
          @click="setLocale(localeItem)"
        >
          <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
          <span class="ls-current-name">{{
            getLocaleName(localeItem, currentLocale)
          }}</span>
          <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
```

> La prop `locale` se pasa desde la página de Astro (detectada por el servidor) y se utiliza para inicializar `installIntlayer`, lo que convierte el idioma en el predeterminado para todos los composables en el árbol de componentes.

### Paso 7: Añadir un Selector de Idioma

El selector de idioma está incrustado directamente en la plantilla de la isla de Vue (visto en el Paso 6). Utiliza `useLocale` de `vue-intlayer` y navega a la URL localizada cuando el usuario elige un nuevo idioma:

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { useLocale } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

// Reutiliza la misma configuración de props/app que en el Paso 6 anterior...

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    // Navegar a la URL localizada al cambiar el idioma
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});
</script>

<template>
  <div class="locale-switcher">
    <span class="switcher-label">Cambiar idioma:</span>
    <div class="locale-buttons">
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem"
        :class="['locale-btn', { active: localeItem === currentLocale }]"
        :disabled="localeItem === currentLocale"
        @click="setLocale(localeItem)"
      >
        <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
        <span class="ls-current-name">{{
          getLocaleName(localeItem, currentLocale)
        }}</span>
        <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
```

> **Nota sobre la Persistencia:**
> Usar `onLocaleChange` para redirigir a través de `window.location.href` asegura que se visite la nueva URL de idioma, permitiendo que el middleware de Intlayer establezca la cookie de idioma y recuerde la preferencia del usuario en futuras visitas.

### Paso 8: Sitemap y Robots.txt

Intlayer proporciona utilidades para generar sitemaps y archivos robots.txt localizados dinámicamente.

#### Sitemap

Crea `src/pages/sitemap.xml.ts` para generar un sitemap que incluya todas tus rutas localizadas.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Crea `src/pages/robots.txt.ts` para controlar el rastreo de los motores de búsqueda.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Configurar TypeScript

Intlayer utiliza el aumento de módulos para beneficiarse de TypeScript y fortalecer tu base de código.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones de TypeScript existentes
  include: [
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
