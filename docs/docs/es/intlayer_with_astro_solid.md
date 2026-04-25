---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Solid i18n - Cómo traducir una aplicación Astro + Solid en 2026
description: Aprende cómo añadir internacionalización (i18n) a tu sitio web Astro + Solid usando Intlayer. Sigue esta guía para hacer tu sitio multilingüe.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Astro
  - Solid
  - i18n
  - JavaScript
slugs:
  - doc
  - entorno
  - astro
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Documentación inicial para Astro + Solid"
---

# Traduce tu sitio web Astro + Solid con Intlayer | Internacionalización (i18n)

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de idioma.

---

## Guía paso a paso para configurar Intlayer en Astro + Solid

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
npm install intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

bun x intlayer init
```

- **intlayer**
  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **astro-intlayer**
  Incluye el plugin de integración de Astro para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como un middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

- **solid-js**
  El paquete Solid fundamental.

- **solid-intlayer**
  El paquete que integra Intlayer con las aplicaciones Solid. Proporciona `IntlayerProvider`, y las primitivas `useIntlayer` y `useLocale` para la internacionalización de Solid.

- **@astrojs/solid-js**
  La integración oficial de Astro que permite el uso de islas de componentes Solid.

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

Añade el plugin de intlayer y la integración de Solid en tu configuración.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), solid()],
});
```

> El plugin de integración de Astro `intlayer()` se utiliza para integrar Intlayer con Astro. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo desarrollo. Define las variables de entorno de Intlayer en la aplicación Astro. Además, proporciona alias para optimizar el rendimiento.

> La integración `solid()` permite utilizar islas de componentes Solid a través de `client:only="solid-js"`.

### Paso 4: Declarar tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar las traducciones:

```tsx fileName="src/app.content.tsx"
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

> Tus declaraciones de contenido se pueden definir en cualquier parte de su aplicación, siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`) y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 5: Usar tu contenido en Astro

Puedes consumir los diccionarios directamente en los archivos `.astro` utilizando los ayudantes básicos exportados por `intlayer`. También deberías añadir metadatos SEO como los enlaces hreflang y canónicos a cada página, e integrar la isla Solid para el contenido interactivo del lado del cliente.

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
import { SolidIsland } from "../../components/solid/SolidIsland";

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
    <!-- La isla Solid hace que todo el contenido sea interactivo, incluido el selector de idioma -->
    <SolidIsland locale={locale} client:only="solid-js" />
  </body>
</html>
```

> **Nota sobre la configuración del enrutamiento:**
> La estructura de directorios que utilices depende del parámetro `middleware.routing` de tu `intlayer.config.ts`:
>
> - **`prefix-no-default` (por defecto):** Mantiene el idioma predeterminado en la raíz (sin prefijo) y añade prefijos a los demás. Utiliza `[...locale]` para interceptar todos los casos.
> - **`prefix-all`:** Todas las URLs van precedidas del idioma. Puedes utilizar un `[locale]` estándar si no necesitas manejar la raíz por separado.
> - **`search-param` o `no-prefix`:** No se necesita una carpeta de idioma. El idioma se gestiona a través de parámetros de búsqueda o cookies.

### Paso 6: Crear el componente Isla Solid

Crea el componente de isla que envuelve tu aplicación Solid y recibe la locale detectada por el servidor:

```tsx fileName="src/components/solid/SolidIsland.tsx"
/** @jsxImportSource solid-js */
import { IntlayerProvider, useIntlayer } from "solid-intlayer";
import { type LocalesValues } from "intlayer";
import { LocaleSwitcher } from "./LocaleSwitcher";

function App() {
  const content = useIntlayer("app");

  return (
    <div>
      <h1>{content().title}</h1>
      <LocaleSwitcher />
    </div>
  );
}

export function SolidIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <App />
    </IntlayerProvider>
  );
}
```

> La prop `locale` se transmite de la página Astro (detectada por el servidor) a `IntlayerProvider`, lo que la convierte en la locale inicial para todas las primitivas Solid del árbol.

> En Solid, `useIntlayer` devuelve una función **accessor** (por ejemplo, `content()`). Debes llamar a esta función para acceder al contenido reactivo.

### Paso 7: Añadir un Selector de Idioma

Crea un componente Solid `LocaleSwitcher` que lea los idiomas disponibles y navegue a la URL localizada cuando el usuario elija un nuevo idioma:

```tsx fileName="src/components/solid/LocaleSwitcher.tsx"
/** @jsxImportSource solid-js */
import { useLocale } from "solid-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

export function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Navegar a la URL localizada al cambiar de idioma
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">Cambiar idioma:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale() ? "active" : ""}`}
            disabled={localeItem === locale()}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale())}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

> **Nota sobre la reactividad de Solid:**
> En Solid, `locale` es un accesor de señal reactivo — llámalo siempre como `locale()` cuando leas su valor actual.

> **Nota sobre la persistencia:**
> El uso de `onLocaleChange` para redirigir a través de `window.location.href` asegura que se visite la URL del nuevo idioma, permitiendo que el middleware de Intlayer establezca la cookie de idioma y recuerde la preferencia del usuario para futuras visitas.

> El `LocaleSwitcher` debe renderizarse dentro de `IntlayerProvider` — úsalo dentro de tu componente de isla (como se muestra en el paso 6).

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

### Configuración del Git

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

Para ir más allá, puede implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar su contenido a través del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
