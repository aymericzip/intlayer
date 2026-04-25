---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Svelte i18n - Cómo traducir una aplicación Astro + Svelte en 2026
description: Aprende cómo añadir internacionalización (i18n) a tu sitio web Astro + Svelte usando Intlayer. Sigue esta guía para hacer tu sitio multilingüe.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Astro
  - Svelte
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - svelte
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentación inicial para Astro + Svelte"
---

# Traduce tu sitio web Astro + Svelte con Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro + Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Ver el [Modelo de Aplicación](https://github.com/aymericzip/intlayer-astro-template) en GitHub.

### Paso 1: Instalar Dependencias

Instala los paquetes necesarios usando tu gestor de paquetes:

```bash packageManager="npm"
npm install intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

bun x intlayer init
```

- **intlayer**
  El paquete central que proporciona herramientas de internacionalización para la gestión de la configuración, la traducción, la [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), la transpilación y los [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como un middleware para detectar el idioma preferido del usuario, gestionar cookies y gestionar la redirección de URL.

- **svelte**
  El paquete Svelte fundamental.

- **svelte-intlayer**
  El paquete que integra Intlayer con las aplicaciones Svelte. Proporciona `setupIntlayer`, `useIntlayer`, y los stores `useLocale` para la internacionalización de Svelte.

- **@astrojs/svelte**
  La integración oficial de Astro que permite el uso de islas de componentes Svelte.

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
      // Otros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Gracias a este archivo de configuración, puedes configurar URLs localizadas, la redirección del middleware, los nombres de las cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los logs de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integrar Intlayer en tu configuración de Astro

Añade el plugin de intlayer y la integración de Svelte en su configuración.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), svelte()],
});
```

> El plugin de integración de Astro `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo desarrollo. Define las variables de entorno de Intlayer en la aplicación Astro. Además, proporciona alias para optimizar el rendimiento.

> La integración `svelte()` permite utilizar islas de componentes Svelte a través de `client:only="svelte"`.

### Paso 4: Declarar tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar las traducciones:

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

> Tus declaraciones de contenido se pueden definir en cualquier lugar de tu aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar tu contenido en Astro

Puedes consumir los diccionarios directamente en los archivos `.astro` utilizando los ayudantes básicos exportados por `intlayer`. También deberías añadir metadatos SEO como los enlaces hreflang y canónicos a cada página, e integrar la isla Svelte para el contenido interactivo del lado del cliente.

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
import SvelteIsland from "../../components/svelte/SvelteIsland.svelte";

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

    <!-- Hreflang: Indica a Google todas las versiones localizadas -->
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

    <!-- x-default: Opción de respaldo para usuarios en idiomas no correspondientes -->
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
    <!-- La isla Svelte hace que todo el contenido sea interactivo, incluido el selector de idioma -->
    <SvelteIsland locale={locale} client:only="svelte" />
  </body>
</html>
```

> **Nota sobre la configuración del enrutamiento:**
> La estructura de directorios que utilices depende del parámetro `middleware.routing` de tu `intlayer.config.ts`:
>
> - **`prefix-no-default` (por defecto):** Mantiene el idioma predeterminado en la raíz (sin prefijo) y añade prefijos a los demás. Utiliza `[...locale]` para interceptar todos los casos.
> - **`prefix-all`:** Todas las URLs van precedidas del idioma. Puedes utilizar un `[locale]` estándar si no necesitas manejar la raíz por separado.
> - **`search-param` o `no-prefix`:** No se necesita una carpeta de idioma. El idioma se gestiona a través de parámetros de búsqueda o cookies.

### Paso 6: Crear el componente Isla Svelte

Crea el componente de isla que envuelve tu aplicación Svelte. `setupIntlayer` debe llamarse con el idioma detectado por el servidor antes de acceder a cualquier store.

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);

  const content = useIntlayer("app");
  const { locale: currentLocale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div>
  <h1>{$content.title}</h1>
  <!-- El selector de idioma se renderiza en línea en la isla -->
  <div class="locale-switcher">
    <span class="switcher-label">Cambiar idioma :</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          disabled={localeItem === $currentLocale}
          on:click={() => setLocale(localeItem)}
        >
          <span class="ls-own-name">{getLocaleName(localeItem)}</span>
          <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
```

> La prop `locale` se transmite de la página Astro (detectada por el servidor) y se utiliza para inicializar `setupIntlayer`, lo que la convierte en la locale inicial para todos los stores del componente.

### Paso 7: Añadir un Selector de Idioma

El selector de idioma está integrado directamente en la isla Svelte (visto en el paso 6). Utiliza `useLocale` de `svelte-intlayer` y navega a la URL localizada cuando el usuario elija un nuevo idioma:

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useLocale } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  // Reutilizar la misma configuración locale/setupIntlayer que en el paso 6 anterior...

  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Navegar a la URL localizada al cambiar de idioma
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div class="locale-switcher">
  <span class="switcher-label">Cambiar idioma :</span>
  <div class="locale-buttons">
    {#each availableLocales as localeItem}
      <button
        class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
        disabled={localeItem === $currentLocale}
        on:click={() => setLocale(localeItem)}
      >
        <span class="ls-own-name">{getLocaleName(localeItem)}</span>
        <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
        <span class="ls-code">{localeItem.toUpperCase()}</span>
      </button>
    {/each}
  </div>
</div>
```

> **Note sur la persistance :**
> L'utilisation de `onLocaleChange` pour rediriger via `window.location.href` garantit que l'URL de la nouvelle locale est visitée, permettant au middleware Intlayer de définir le cookie de locale et de mémoriser la préférence de l'utilisateur pour les visites futures.

> **Nota sobre la persistencia:**
> El uso de `onLocaleChange` para redirigir a través de `window.location.href` asegura que se visite la URL del nuevo idioma, permitiendo que el middleware de Intlayer establezca la cookie de idioma y recuerde la preferencia del usuario para futuras visitas.

### Paso 8: Sitemap y Robots.txt

Intlayer proporciona utilidades para generar dinámicamente sitemaps y archivos robots.txt localizados.

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

Crea `src/pages/robots.txt.ts` para controlar la indexación por parte de los motores de búsqueda.

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

Intlayer utiliza el aumento de módulo para beneficiarse de TypeScript y hacer que su base de código sea más robusta.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones de TypeScript existentes
  include: [
    // ... Tus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos auto-generados
  ],
}
```

### Configuration du Git

Se recomienda ignorar los archivos generados por Intlayer. Esto permite evitar subirlos a su repositorio de Git.

Para hacerlo, puede añadir las siguientes instrucciones a su archivo `.gitignore` :

```bash
# Ignorar los archivos generados por Intlayer
.intlayer
```

### Extension VS Code

Para mejorar su experiencia de desarrollo con Intlayer, puede instalar la **Extension VS Code officielle Intlayer**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Para más detalles sobre el uso de la extensión, consulte la [documentación de la extensión VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Ir más allá

Para ir más allá, puede implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar su contenido a través del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
