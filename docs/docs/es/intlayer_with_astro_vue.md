---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vue i18n - Cómo traducir una aplicación Astro + Vue en 2026
description: Aprende a añadir internacionalización (i18n) a tu sitio Astro + Vue con Intlayer. Sigue esta guía para que tu sitio sea multilingüe.
keywords:
  - internacionalización
  - documentación
  - Intlayer
  - Astro
  - Vue
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - vue
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentación inicial para Astro + Vue"
---

# Traducir tu sitio Astro + Vue con Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una librería de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente**: Utilizando diccionarios declarativos a nivel de componente.
- **Localizar metadatos, rutas y contenidos dinámicamente**.
- **Asegurar el soporte de TypeScript**: Con tipos autogenerados para mejorar el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**: Como la detección dinámica de idioma y el cambio de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro + Vue

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulta la [plantilla de aplicación](https://github.com/aymericzip/intlayer-astro-template) en GitHub.

### Paso 1: Instalar dependencias

Instala los paquetes necesarios utilizando tu gestor de paquetes preferido:

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
  El paquete core que proporciona herramientas de i18n para la gestión de la configuración, traducciones, [declaración de contenidos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para conectar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar redirecciones de URL.

- **vue**
  El paquete core de Vue.

- **vue-intlayer**
  Paquete para integrar Intlayer con aplicaciones de Vue. Proporciona `installIntlayer`, así como los composables `useIntlayer` y `useLocale` para la internacionalización en Vue.

- **@astrojs/vue**
  Integración oficial de Astro que permite el uso de islas (islands) de componentes Vue.

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

Añade el plugin `intlayer` y la integración de Vue a tu configuración de Astro.

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

> El plugin de integración `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la generación de los archivos de declaración de contenido y los vigila en modo desarrollo. Define las variables de entorno de Intlayer dentro de la aplicación Astro y proporciona alias para optimizar el rendimiento.

> La integración `vue()` permite usar islas de componentes Vue a través de `client:only="vue"`.

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

> Las declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación, siempre que estén incluidas en el `contentDir` (por defecto `./src`) y coincidan con la extensión de los archivos de declaración de contenido (por defecto `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más información, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar el contenido en Astro

Puedes consumir los diccionarios directamente en tus archivos `.astro` utilizando los helpers core exportados por `intlayer`. También deberías añadir metadatos SEO (como hreflang y enlaces canónicos) a cada página e introducir una isla de Vue para el contenido interactivo del lado del cliente.

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

    <!-- Enlace Canónico: informa a los buscadores sobre la versión principal de esta página -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: informa a Google sobre todas las versiones localizadas -->
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

    <!-- x-default: opción de respaldo cuando el idioma no coincide con el del usuario -->
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
    <!-- La isla de Vue renderiza todo el contenido interactivo, incluyendo el selector de idioma -->
    <VueIsland locale={locale} client:only="vue" />
  </body>
</html>
```

> **Nota sobre la configuración de rutas:**
> La estructura de directorios que utilices depende del ajuste `middleware.routing` en `intlayer.config.ts`:
>
> - **`prefix-no-default` (por defecto):** mantiene el idioma por defecto en la raíz (sin prefijo) y añade prefijos a los demás. Usa `[...locale]` para capturar todos los casos.
> - **`prefix-all`:** todos los URLs tienen prefijo de idioma. Puedes usar el estándar `[locale]` si no necesitas manejar la raíz por separado.
> - **`search-param` o `no-prefix`:** no se necesitan directorios de idioma. El idioma se maneja a través de parámetros de consulta o cookies.

### Paso 6: Crear un componente de isla de Vue

Crea un componente de isla que envuelva tu aplicación Vue y reciba el idioma detectado por el servidor. Debes llamar a `installIntlayer` para registrar el plugin de Intlayer en la instancia de Vue antes de usar los composables.

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
    <!-- El selector de idioma se renderiza directamente en la plantilla de la isla -->
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

> El atributo `locale` se pasa desde la página de Astro (detección en el servidor) y se usa para inicializar `installIntlayer`, lo que determina el idioma inicial para todos los composables dentro del árbol.

### Paso 7: Añadir un selector de idioma

La funcionalidad del selector de idioma está integrada directamente en la plantilla de la isla de Vue (véase el Paso 6 arriba). Utiliza el composable `useLocale` de `vue-intlayer` y navega a la URL localizada cuando el usuario selecciona un nuevo idioma:

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { useLocale } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

// Reutilizar los mismos props/setup app como se muestra en el Paso 6...

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

> **Nota sobre la persistencia:**
> Usar `onLocaleChange` para redirigir mediante `window.location.href` asegura que se visite la nueva URL del idioma, lo que permite al middleware de Intlayer establecer la cookie de idioma e informar la preferencia del usuario en futuras visitas.

### Paso 8: Sitemap y Robots.txt

Intlayer ofrece utilidades para crear dinámicamente tu sitemap localizado y tus archivos robots.txt.

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

### Profundiza más

Si quieres saber más, también puedes implementar el [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o usar el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para externalizar tus contenidos.
