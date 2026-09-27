---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n en TanStack Start con Paraglide JS: Guía de configuración 2026"
description: "Traduce tu aplicación TanStack Start con Paraglide JS: estrategia de URL, reescritura del router, middleware SSR, hreflang, sitemap y robots.txt, además de datos reales de benchmark."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internacionalización
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versión inicial"
author: aymericzip
---

# Cómo internacionalizar tu aplicación TanStack Start usando Paraglide JS en 2026

## Tabla de contenidos

<TOC/>

## ¿Qué es Paraglide JS?

**Paraglide JS** (creado por inlang) es una biblioteca de i18n **basada en compilador**. En lugar de incluir un runtime que busca claves en un objeto JSON, compila cada mensaje en una función JavaScript tipada (`m.about_title()`). Los mensajes no utilizados pueden ser eliminados por el empaquetador (bundler), y un error tipográfico en una clave genera un error de compilación.

Paraglide es el enfoque de i18n utilizado en los ejemplos oficiales de TanStack Router, y se integra con TanStack Start a través de tres elementos:

- un **plugin de Vite** que compila los mensajes y el runtime en `src/paraglide`;
- un **middleware del servidor** que resuelve el locale de cada solicitud;
- una **reescritura del router (router rewrite)** que asigna URLs localizadas (`/fr/about`) a tu árbol de rutas (`/about`), de modo que no necesitas un segmento `$locale`.

Esta guía configura estos tres componentes y luego cubre todo lo que Paraglide deja en tus manos: `lang` y `dir`, selector de idioma, metadatos traducidos, `canonical`, `hreflang` con `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, prerenderizado y páginas 404 localizadas.

> ¿Buscas otro stack?

- [guía de TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_use-intl.md)
- [guía de TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_lingui.md)
- [guía de TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

> ¿Comparando los dos enfoques basados en compilador? Lee [¿es Intlayer más ligero que Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/is_intlayer_lighter_than_paraglide.md).

> Para entender de dónde vienen estas bibliotecas, lee la historia del i18n en JavaScript.

- [La historia del i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/history_of_i18n.md)

## Lo que dice el benchmark sobre Paraglide en TanStack Start

El [benchmark de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) ejecuta la misma aplicación TanStack Start de 10 páginas y 10 locales con cada una de las principales bibliotecas y mide lo que el navegador realmente descarga.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Cifras clave para `@inlang/paraglide-js@2.15.1`, medidas el 2026-09-26 (gzip):

| Configuración       | Tamaño de la biblioteca | JS por página | Fuga de otros locales | Fuga de otras páginas | Carga de página |
| :------------------ | ----------------------: | ------------: | --------------------: | --------------------: | --------------: |
| Sin i18n (app base) |                       - |      111.0 KB |                    0% |                    0% |         15.7 ms |
| Paraglide JS        |                  1.8 KB |      125.1 KB |                 49.7% |                    0% |         22.1 ms |
| `react-intlayer`    |                  4.5 KB |      126.8 KB |                    0% |                    0% |         14.8 ms |
| `use-intl`          |                 75.9 KB |      128.7 KB |                    0% |                    0% |         17.4 ms |
| Lingui              |                 56.7 KB |      120.2 KB |                  8.6% |                    0% |         21.9 ms |

Puntos clave a considerar:

- **El runtime es diminuto y no hay fuga entre páginas.** El runtime se genera para tu configuración específica y los mensajes se importan donde se utilizan.
- **Fuga de locales.** Cada función de mensaje contiene todos los locales, por lo que aproximadamente la mitad de las cadenas traducidas enviadas a una página corresponden a idiomas que el visitante no utiliza. Cuantos más locales agregues, mayor será esta proporción.
- **La carga de página es la más lenta del grupo**, en parte porque el locale se resuelve mediante estrategias en cada llamada en lugar de leerse desde un contexto de React.

> Consulta los datos completos: [Informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) y el [repositorio del benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Comparación de características en TanStack Start

Cómo se compara Paraglide JS con las otras bibliotecas comúnmente utilizadas en TanStack Start:

| Característica                                  | `react-intlayer` (Intlayer)                | `use-intl`                | Paraglide JS                             | Lingui                         |
| ----------------------------------------------- | ------------------------------------------ | ------------------------- | ---------------------------------------- | ------------------------------ |
| **Traducciones junto a componentes**            | ✅ Colocalizadas                           | ❌ JSON centralizado      | ❌ Un archivo JSON por locale            | ⚠️ Texto fuente en componentes |
| **Integración con TypeScript**                  | ✅ Tipos autogenerados                     | ✅ Vía `AppConfig`        | ✅ Funciones de mensajes tipadas         | ⚠️ Solo macros                 |
| **Detección de traducciones faltantes**         | ✅ Errores de tipo y advertencias de build | ⚠️ Fallback en runtime    | ⚠️ Recurre al locale base                | ⚠️ Recurre al texto fuente     |
| **Contenido enriquecido (JSX, Markdown)**       | ✅ Soporte directo                         | ⚠️ Etiquetas vía `t.rich` | ⚠️ Cadenas de texto                      | ✅ JSX dentro de `<Trans>`     |
| **Enrutamiento localizado**                     | ✅ Integrado                               | ❌ Manual `{-$locale}`    | ✅ `urlPatterns` + reescritura de router | ❌ Manual `{-$locale}`         |
| **Cambio de locale sin recarga**                | ✅ Sí                                      | ✅ Sí                     | ❌ Recarga completa de página            | ✅ Sí                          |
| **Pluralización**                               | ✅ Basada en enumeración                   | ✅ ICU                    | ✅ Variantes                             | ✅ ICU                         |
| **ICU MessageFormat**                           | ✅ Vía `format: "icu"`                     | ✅ Nativo                 | ⚠️ Vía plugin de inlang                  | ✅ Nativo                      |
| **Formatos de contenido**                       | ✅ `.ts`, `.json`, `.md`, `.yaml`...       | ⚠️ `.json`                | ⚠️ JSON de inlang                        | ✅ PO, JSON, CSV               |
| **Traducción con IA**                           | ✅ Tu propio proveedor y clave             | ❌ No                     | ❌ No                                    | ❌ No                          |
| **Editor visual / CMS**                         | ✅ Editor local + CMS opcional             | ❌ Plataformas externas   | ⚠️ Apps del ecosistema inlang            | ❌ Plataformas externas        |
| **Ayudantes SEO (hreflang, sitemap)**           | ✅ Integrados                              | ❌ Manual                 | ⚠️ URLs localizadas, resto manual        | ❌ Manual                      |
| **Tamaño de runtime (gzip, benchmark)**         | 4.5 KB                                     | 75.9 KB                   | 1.8 KB                                   | 56.7 KB                        |
| **Fuga, mejor configuración (locale / página)** | 0% / 0%                                    | 0% / 0%                   | 49.7% / 0%                               | 8.6% / 0%                      |
| **Traducciones faltantes en CI**                | ✅ `npx intlayer test`                     | ⚠️ No integrado           | ⚠️ No integrado                          | ✅ `lingui compile --strict`   |

> Las cifras de tamaño de runtime y fuga provienen del [benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md). La fuga se mide en la mejor configuración de cada biblioteca.

> Otras guías de TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)

## Prácticas recomendadas

- **Establece `lang` y `dir` en `<html>`** a partir del locale resuelto, en el servidor.
- **Mantén una URL por locale** con una estrategia de prefijo (`/fr/about`), para que cada versión de idioma sea indexable.
- **Coloca `url` primero en tu estrategia de locales**, de modo que la URL sea la fuente de verdad y los rastreadores obtengan la página solicitada.
- **Usa claves de mensaje planas y descriptivas** (`about_title`) que se asignen de forma limpia a nombres de funciones.
- **Haz commit de tus archivos `messages/*.json`, no de la carpeta generada `src/paraglide`**, para evitar conflictos de fusión en archivos autogenerados.
- **Traduce tus metadatos** y declara `canonical`, `hreflang` y `x-default` en cada página.
- **Genera un sitemap multilingüe y robots.txt**, y prerenderiza cada locale.
- **Usa enlaces reales para el selector de idioma**, para que los rastreadores descubran todos los idiomas.

- [internacionalización y SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md)
- [guía de hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/hreflang_guide_multilingual_seo.md)

## Guía paso a paso para configurar Paraglide JS en una aplicación TanStack Start

Esta es la estructura de proyecto que crearemos:

```bash
.
├── project.inlang
│   └── settings.json          # Locales y formato de mensajes
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generado, ignorado en git
    ├── server.ts              # Middleware de Paraglide
    ├── router.tsx             # Reescritura de URL
    ├── i18n
    │   ├── config.ts          # URL del sitio, helpers
    │   └── seo.ts             # Constructor de head()
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / y /fr
        ├── about.tsx          # /about y /fr/about
        ├── $.tsx              # 404 localizado
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Observa que no hay carpeta `$locale`: la reescritura del router elimina el prefijo antes de la coincidencia de rutas.

<Steps>
<Step number={1} title="Instalar dependencias">

Comienza desde un proyecto TanStack Start y luego inicializa Paraglide. El comando init crea `project.inlang/settings.json`, un primer `messages/en.json` e instala el paquete.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: el compilador y su plugin de Vite. No hay ningún paquete de runtime que instalar: el runtime se genera dentro de tu proyecto.

</Step>
<Step number={2} title="Configurar tus locales">

`project.inlang/settings.json` es la fuente única de verdad para los locales. El plugin de formato de mensajes lee un archivo JSON por locale.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Configurar el plugin de Vite y la estrategia de URL">

El plugin compila los mensajes en cada cambio. Tres opciones son fundamentales para TanStack Start:

- **`strategy`**: la lista ordenada de lugares donde leer el locale. `url` en primer lugar hace que la URL sea la fuente de verdad. `cookie` y `preferredLanguage` son utilizados por el middleware cuando la URL no determina el locale.
- **`urlPatterns`**: cómo se asigna un locale a una URL. Los locales no predeterminados se listan primero, ya que el primer patrón coincidente gana. Aquí el locale predeterminado se mantiene sin prefijo (`/about`), y los otros locales llevan prefijo (`/fr/about`).
- **`outputStructure: "message-modules"`**: un módulo por mensaje, lo que permite al empaquetador descartar los mensajes que una página no importa.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Añade la carpeta generada a `.gitignore`. Se reconstruye en `dev` y `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Crear tus archivos de traducción">

Cada clave se convierte en una función exportada desde `src/paraglide/messages`. Las claves planas en snake_case generan los nombres de función más limpios. Las variables utilizan marcadores de posición `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Los plurales utilizan la sintaxis de variantes del formato de mensajes de inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Añadir el middleware del servidor">

El middleware resuelve el locale de cada solicitud con tu estrategia y lo pone a disposición de `getLocale()` para todo el renderizado del servidor, a través de un ámbito `AsyncLocalStorage`. Esto es lo que garantiza la seguridad en solicitudes concurrentes en diferentes idiomas.

En TanStack Start, envuelve la entrada de servidor predeterminada:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Reescribir URLs localizadas en el router">

La opción `rewrite` de TanStack Router traduce las URLs en los límites del router:

- **input**: `/fr/about` se deslocaliza a `/about` antes de la coincidencia, por lo que una única ruta `about.tsx` sirve a todos los idiomas;
- **output**: cada `href` generado (enlaces, redirecciones, navegación) se localiza para el locale activo, por lo que `<Link to="/about">` renderiza `/fr/about` en una página en francés.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Dado que los enlaces se localizan mediante la reescritura, no necesitas un componente `LocalizedLink` personalizado: usa el `Link` de TanStack Router como de costumbre.

</Step>
<Step number={7} title="Crear el documento raíz">

`getLocale()` devuelve el locale resuelto por el middleware en el servidor y el locale de la URL en el navegador, por lo que `lang` y `dir` son idénticos en el HTML del servidor y tras la hidratación.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Utilizar traducciones en tus páginas">

Los mensajes son funciones estándar: importa `m`, llama a la función y pasa las variables como un objeto. Todo está tipado, incluidas las variables.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Una función de mensaje también acepta un locale explícito: `m.about_title({}, { locale: "fr" })`. Esto es útil en código del servidor que renderiza un idioma diferente al de la solicitud, como los correos electrónicos.

</Step>
<Step number={9} title="Cambiar el idioma de tu contenido" isOptional={true}>

Renderiza el selector como **enlaces** con `localizeHref`, para que los rastreadores descubran todos los idiomas. `setLocale` guarda la elección en la cookie y recarga la página en el nuevo idioma: una recarga completa es el comportamiento esperado de Paraglide, ya que las funciones de mensajes leen el locale en cada llamada en lugar de suscribirse a un estado de React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Internacionalizar tus metadatos" isOptional={true}>

Cada versión de idioma puede posicionarse por sí misma, siempre que cada página exponga:

- un `<title>` y `description` **traducidos**;
- una URL **canónica** que apunte a sí misma;
- un **`hreflang` alternativo por cada locale**, más **`x-default`**;
- etiquetas **Open Graph** `og:locale`, `og:locale:alternate` y `og:url`;
- **JSON-LD** con `inLanguage`.

La función `localizeUrl` de Paraglide construye las URLs alternativas a partir de tus `urlPatterns`, evitando desfases con el enrutamiento real:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="Internacionalizar tu Sitemap" isOptional={true}>

Un sitemap multilingüe lista cada URL de cada locale, y cada entrada declara todas sus alternativas con `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="Internacionalizar tu robots.txt" isOptional={true}>

Las rutas privadas existen en todos los idiomas, por lo que las reglas `Disallow` deben cubrir cada ruta localizada. Elimina `public/robots.txt` si la plantilla de inicio creó uno y luego sírvelo desde una ruta:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="Prerenderizar cada locale" isOptional={true}>

Enumera la ruta localizada de cada página para que TanStack Start prerenderice todas las versiones de idioma. `localizeHref` es código generado sin dependencias del navegador, por lo que puede ejecutarse en `vite.config.ts`, pero el archivo solo existe tras una primera compilación. Listar las rutas manualmente, como se muestra a continuación, evita este problema de orden:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Debido a que el selector renderiza enlaces reales, `crawlLinks: true` también descubrirá las páginas que hayas olvidado listar.

</Step>
<Step number={14} title="Manejar páginas 404 localizadas" isOptional={true}>

Con la reescritura, `/fr/does-not-exist` coincide como `/does-not-exist`, y `getLocale()` sigue devolviendo `fr`, por lo que el `notFoundComponent` raíz del paso 7 se renderiza en francés. Una ruta comodín (catch-all) garantiza que las rutas profundas también lleguen a él. Marca la página como `noindex`: React 19 eleva la etiqueta `<meta>` al `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Acceder al locale en funciones del servidor" isOptional={true}>

Las funciones del servidor se ejecutan dentro del ámbito del middleware de Paraglide, por lo que `getLocale()` también funciona allí:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Comparación con Intlayer" isOptional={true}>

No existe un adaptador directo de Paraglide a Intlayer, porque ambos siguen el mismo concepto: compilar el contenido en tiempo de compilación e incluir la menor cantidad posible de runtime. Las diferencias radican en lo que llega al navegador y cómo se organiza el contenido:

- **Locales**: Intlayer carga [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) por locale (0% de fuga de locales en el benchmark), mientras que cada función de mensaje de Paraglide incluye todos los locales (49.7%).
- **Organización del contenido**: el contenido puede residir en archivos `.content.ts` junto a cada componente, o en archivos centralizados. Consulta [i18n por componente vs centralizado](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md).
- **Cambio de locale**: el contenido se lee desde un contexto de React, por lo que cambiar de locale vuelve a renderizar sin necesidad de recargar la página.
- **Código generado**: no se genera nada dentro de `src`, por lo que no hay nada que regenerar antes de hacer commit.

Si vienes de otra biblioteca en lugar de Paraglide, los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) mantienen la API de `use-intl`, `next-intl`, `react-i18next`, `react-intl` o Lingui e intercambian el runtime.

Consulta [¿es Intlayer más ligero que Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/is_intlayer_lighter_than_paraglide.md) y la [guía de Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Automatizar tus traducciones usando Intlayer" isOptional={true}>

Paraglide renderiza traducciones, pero no te ayuda a **producirlas**. Intlayer es **gratuito** y de **código abierto**, y sus herramientas son útiles incluso en un proyecto con Paraglide:

- **Traduce con IA** utilizando tu propia clave y proveedor de API. Consulta [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md) y la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).
- **Mantén tus archivos JSON** como la fuente de verdad con el [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md).
- **Prueba traducciones faltantes** en CI. Consulta [probar tus traducciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md).
- **Analiza tu sitio desplegado** en busca de `hreflang` faltantes, etiquetas canonical erróneas y fugas de locales con el [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/scan.md).

</Step>
</Steps>

## Preguntas frecuentes

<FAQ>

<Question title="¿Es Paraglide JS una buena opción para TanStack Start?">

Es una opción sólida: se utiliza en los ejemplos oficiales de TanStack Router, tiene el runtime más pequeño del [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) (~1.8 KB gzip) y los mensajes están completamente tipados. Las contrapartidas son que cada función de mensaje contiene todos los locales, lo que genera una fuga de aproximadamente la mitad de las cadenas traducidas a visitantes de otros idiomas, y que cambiar de locale recarga la página.

</Question>
<Question title="¿Necesito un segmento de ruta $locale con Paraglide?">

No. La reescritura (`rewrite`) del router elimina el prefijo de locale antes de la coincidencia de rutas y lo vuelve a añadir a los enlaces generados, por lo que un único `about.tsx` sirve a `/about`, `/fr/about` y `/es/about`.

</Question>
<Question title="¿Por qué al cambiar de idioma se recarga la página?">

Las funciones de mensajes leen el locale en el momento en que se llaman; no están suscritas a un estado de React. Por lo tanto, `setLocale` recarga la página por defecto para que cada mensaje se vuelva a renderizar en el nuevo idioma. Puedes pasar `{ reload: false }`, pero en ese caso deberás volver a renderizar el árbol tú mismo.

</Question>
<Question title="¿Debería hacer commit de la carpeta generada src/paraglide?">

Es preferible no hacerlo. La carpeta se regenera en cada `dev` y `build`, y versionarla provoca conflictos de fusión en archivos autogenerados. Haz commit de `messages/*.json` y `project.inlang/settings.json` en su lugar.

</Question>
<Question title="¿Cómo añado etiquetas hreflang con Paraglide?">

Usa `localizeUrl` para construir una URL absoluta por locale en el `head()` de la ruta, y añade un `x-default` que apunte al locale base. El paso 10 proporciona una función auxiliar reutilizable, y el paso 11 añade los mismos enlaces alternativos al sitemap.

</Question>
<Question title="¿Aplica Paraglide tree-shaking a las traducciones no utilizadas?">

Los **mensajes** no utilizados se eliminan cuando usas `outputStructure: "message-modules"`, por lo que el contenido de otras páginas no se filtra. Los **locales** no utilizados no se eliminan: cada función de mensaje contiene todas las traducciones, razón por la cual el benchmark mide un 49.7% de fuga de locales.

</Question>
<Question title="¿Puedo migrar de Paraglide a Intlayer?">

Sí. Ambos se basan en compilador, por lo que el modelo conceptual es muy cercano. Mantén tus archivos JSON con el [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md), y luego reemplaza las llamadas `m.key()` con `useIntlayer`, página por página. Consulta la [guía de Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md).

</Question>

</FAQ>
