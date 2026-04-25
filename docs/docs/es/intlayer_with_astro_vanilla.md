---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vanilla JS i18n - Cómo traducir una aplicación Astro + Vanilla JS en 2026
description: Aprende cómo añadir internacionalización (i18n) a tu sitio web Astro + Vanilla JS usando Intlayer. Sigue esta guía para hacer tu sitio multilingüe.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - entorno
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentación inicial para Astro + Vanilla JS"
---

# Traduce tu sitio web Astro + Vanilla JS usando Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dynamícamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro + Vanilla JS

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
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

- **vanilla-intlayer**
  El paquete que integra Intlayer con aplicaciones de JavaScript / TypeScript puro. Proporciona un singleton pub/sub (`IntlayerClient`) y ayudantes basados en callbacks (`useIntlayer`, `useLocale`, etc.) para que cualquier parte de tus bloques `<script>` de Astro pueda reaccionar a los cambios de idioma sin necesidad de un framework de UI.

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

Añade el plugin de intlayer en tu configuración. No se necesita ninguna integración adicional de framework de UI para Vanilla JS.

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

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar tu contenido en Astro

Con Vanilla JS, toda la renderización se realiza directamente en el archivo `.astro` usando `getIntlayer` para la renderización inicial del servidor. Un bloque `<script>` inicializa luego `vanilla-intlayer` en el lado del cliente para el cambio de idioma.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Enlace canónico -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Enlaces Hreflang -->
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
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **Nota sobre la Configuración de Enrutamiento:**
> La estructura de directorios que utilices depende de la configuración `middleware.routing` en tu `intlayer.config.ts`:
>
> - **`prefix-no-default` (por defecto):** Mantiene el idioma por defecto en la raíz (sin prefijo) y prefija los otros. Usa `[...locale]` para capturar todos los casos.
> - **`prefix-all`:** Todas las URLs están prefijadas con el idioma. Puedes usar un `[locale]` estándar si no necesitas manejar la raíz por separado.
> - **`search-param` o `no-prefix`:** No se necesita carpeta de idioma. El idioma se maneja a través de parámetros de búsqueda o cookies.

### Paso 6: Añadir un Selector de Idioma

Con Vanilla JS en Astro, el selector de idioma se renderiza en el lado del servidor como enlaces de anclaje y se hidrata en el cliente a través de un bloque `<script>`. Cuando el usuario hace clic en un enlace de idioma, `vanilla-intlayer` establece la cookie de idioma a través de `setLocale` antes de navegar a la URL localizada.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- el marcado del lado del servidor se muestra en el Paso 5 anterior -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // Inicializar Intlayer en el cliente usando el idioma de la URL actual
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // Adjuntar controladores de clic a los enlaces de anclaje de idioma
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **Nota sobre la Persistencia:**
> `installIntlayer` inicializa el singleton de Intlayer con el idioma detectado por el servidor. `useLocale` con `onLocaleChange` establece luego la cookie de idioma a través del middleware antes de navegar, para que la preferencia del usuario sea recordada en futuras visitas.

> **Nota sobre la Mejora Progresiva:**
> Los enlaces de idioma funcionan como etiquetas `<a>` estándar incluso sin JavaScript. Cuando JS está disponible, la llamada a `setLocale` actualiza la cookie antes de la navegación para que el middleware pueda redirigir correctamente.

### Paso 7: Sitemap y Robots.txt

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
