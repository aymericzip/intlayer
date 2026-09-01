---
createdAt: 2025-03-25
updatedAt: 2026-08-30
title: "TanStack Start + Solid i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación TanStack Start + Solid multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Enrutamiento de localización
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Comparar la resolución estática, dinámica y dinámica cacheada de los diccionarios de metadatos en las funciones head de las rutas"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Añadido para Tanstack Start Solid.js"
author: aymericzip
---

# Traduzca su sitio web Tanstack Start con Solid.js usando Intlayer | Internacionalización (i18n)

## Tabla de contenidos

<TOC/>

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos Tanstack Start con Solid.js, enrutamiento consciente de la localización, soporte de TypeScript y prácticas de desarrollo modernas.

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `react-i18next` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>
<Accordion header="Soporte completo de TanStack Start">

Intlayer está optimizado para funcionar perfectamente con TanStack Start y Solid al ofrecer **enrutamiento multilingüe**, **mapa del sitio** y todas las funciones necesarias para escalar la internacionalización (i18n).

</Accordion>

<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en sus páginas, cargue solo el contenido necesario. Intlayer ayuda a **reducir el tamaño de su bundle y de sus páginas hasta en un 50%**.

</Accordion>

<Accordion header="Mantenibilidad">

Determinar el alcance del contenido de su aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puede duplicar o eliminar una sola carpeta de funciones sin la carga mental de revisar todo el código base de contenido. Además, Intlayer está **completamente escrito** para garantizar la precisión de su contenido.

</Accordion>

<Accordion header="Agente de IA">

La ubicación conjunta de contenido **reduce el contexto necesario** para los modelos de lenguajes grandes (LLM). Intlayer también viene con un conjunto de herramientas, como una **CLI** para comprobar si faltan traducciones,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para que la experiencia del desarrollador (DX) sea aún más fluida para los agentes de IA.

</Accordion>

<Accordion header="Automatización">

Utilice la automatización para traducir su canal de CI/CD utilizando el LLM de su elección al costo de su proveedor de IA. Intlayer también ofrece un **compilador** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) para ayudar a **traducir en segundo plano**.

</Accordion>

<Accordion header="Actuación">

La conexión de archivos JSON masivos a componentes puede provocar problemas de rendimiento y reactividad. Intlayer optimiza la carga de su contenido en el momento de la compilación.

</Accordion>

<Accordion header="Escalando sin ningún desarrollador">

Más que una simple solución i18n, Intlayer proporciona un **[editor visual] autohospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** para ayudarle a administrar su contenido multilingüe en **tiempo real**, lo que facilita la colaboración con traductores, redactores y otros miembros del equipo. El contenido se puede almacenar de forma local y/o remota.

</Accordion>
</AccordionGroup>

---

## Guía paso a paso para configurar Intlayer en una aplicación Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="¿La mejor solución i18n para Tanstack Start? Descubra Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar su aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ver [Plantilla de aplicación](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) en GitHub.

<Steps>

<Step number={1} title="Crear el proyecto">

Comience creando un nuevo proyecto TanStack Start siguiendo la guía [Iniciar nuevo proyecto](https://tanstack.com/start/latest/docs/framework/solid/quick-start) en el sitio web de TanStack Start.

</Step>

<Step number={2} title="Instalar los paquetes de Intlayer">

Instale los paquetes necesarios utilizando su gestor de paquetes preferido:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **solid-intlayer**
  El paquete que integra Intlayer con la aplicación Solid. Proporciona proveedores de contexto y hooks para la internacionalización de Solid.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

</Step>

<Step number={3} title="Configuración de su proyecto">

Cree un archivo de configuración para configurar los idiomas de su aplicación:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> A través de este archivo de configuración, puede configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de sus declaraciones de contenido, desactivar los registros de Intlayer en la consola, y más. Para una lista completa de los parámetros disponibles, consulte la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={4} title="Integrar Intlayer en su configuración de Vite">

Añada el plugin de intlayer en su configuración:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> El plugin de Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo de desarrollo. Define las variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

</Step>

<Step number={5} title="Crear el diseño raíz">

Configure su diseño raíz para soportar la internacionalización utilizando `useParams` para detectar el idioma actual y estableciendo los atributos `lang` y `dir` en la etiqueta `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Crear el diseño de idioma">

Cree un diseño que maneje el prefijo de idioma y realice la validación. Este diseño asegurará que solo se procesen idiomas válidos.

> Este paso es opcional si no necesita validar el prefijo de idioma a nivel de ruta.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Validar el prefijo de idioma
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Aquí, `{-$locale}` es un parámetro de ruta dinámico que se reemplaza con el idioma actual. Esta notación hace que el hueco sea opcional, permitiendo que funcione con modos de enrutamiento como `'prefix-no-default'`, etc.

> Tenga en cuenta que este hueco puede causar problemas si utiliza múltiples segmentos dinámicos en la misma ruta (por ejemplo, `/{-$locale}/otro-camino/$otroCaminoDinamico/...`).
> Para el modo `'prefix-all'`, puede preferir cambiar el hueco a `$locale` en su lugar.
> Para el modo `'no-prefix'` o `'search-params'`, puede eliminar el hueco por completo.

</Step>

<Step number={7} title="Declarar su contenido">

Cree y gestione sus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./app`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={8} title="Utilizar componentes y hooks conscientes del idioma">

Cree un componente `LocalizedLink` para una navegación consciente del idioma:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Este componente tiene dos objetivos:

- Eliminar el prefijo innecesario `{-$locale}` de la URL.
- Inyectar el parámetro de idioma en la URL para asegurar que el usuario sea redirigido directamente a la ruta localizada.

Luego podemos crear un hook `useLocalizedNavigate` para la navegación programática:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Utilizar Intlayer en sus páginas">

> Usa **`useIntlayer`** por defecto: es la forma recomendada de leer contenido dentro de los componentes, y el compilador lo resuelve a la locale que se está renderizando. Recurre a `getIntlayer` / `getIntlayerAsync` solo fuera del árbol de Solid: el `head` de las rutas, los loaders y las server functions.

Acceda a sus diccionarios de contenido en toda su aplicación:

#### Página de inicio localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> En Solid, `useIntlayer` devuelve contenido reactivo (por ejemplo, `content`). Puedes acceder a sus propiedades directamente.
>
> Para saber más sobre el hook `useIntlayer`, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Crear un componente selector de idioma">

Cree un componente para permitir a los usuarios cambiar de idioma:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> En Solid, `locale` de `useLocale` es un **signal accessor**. Use `locale()` (con paréntesis) para leer su valor actual de forma reactiva.
>
> Para saber más sobre el hook `useLocale`, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Gestión de atributos HTML">

Como vimos en el Paso 5, puede gestionar los atributos `lang` y `dir` de la etiqueta `html` utilizando `useParams` en su componente raíz. Esto asegura que se establezcan los atributos correctos tanto en el servidor como en el cliente.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

</Step>

<Step number={12} title="Añadir middleware">

También puede utilizar `intlayerProxy` para añadir enrutamiento del lado del servidor a su aplicación. Este plugin detectará automáticamente el idioma actual basándose en la URL y establecerá la cookie de idioma adecuada. Si no se especifica ningún idioma, el plugin determinará el idioma más apropiado basándose en las preferencias de idioma del navegador del usuario. Si no se detecta ningún idioma, redirigirá al idioma predeterminado.

> Tenga en cuenta que para utilizar `intlayerProxy` en producción, necesita cambiar el paquete `vite-intlayer` de `devDependencies` a `dependencies`.

> Desde Intlayer v9, `intlayerProxy()` está integrado directamente en el plugin `intlayer()` y habilitado por defecto a través de la opción `routing.enableProxy` (`true` por defecto). Registrarlo por separado como se muestra a continuación es ahora opcional: se mantiene para compatibilidad hacia atrás y para configuraciones que necesitan controlar el orden de los plugins. Establece `routing.enableProxy: false` para optar por no participar. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solid(),
  ],
});
```

</Step>

<Step number={13} title="Internacionalizar sus metadatos">

<Tabs>

<Tab label="Resolución estática" value="static">

`getIntlayer` se resuelve de forma síncrona contra el diccionario **fusionado**, el que contiene todas las locales declaradas. `head` sigue siendo síncrono y no se espera nada, pero todo el diccionario multilingüe se incluye en el chunk de la ruta que se envía al navegador.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Ideal para diccionarios de metadatos pequeños, pocas locales o durante el prototipado.

</Tab>

<Tab label="Resolución dinámica" value="dynamic">

`getIntlayerAsync` (disponible a partir de la **v9.4**) se comporta como `getIntlayer`, pero el plugin de build lo apunta al chunk por locale en `.intlayer/dynamic_dictionaries/` en lugar del diccionario fusionado. Así, una página solo envía la locale que renderiza. Como ese chunk se carga bajo demanda, `head` pasa a ser `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Si un `head` lee varios diccionarios, resuélvelos con `Promise.all`: esperar cada `getIntlayerAsync` en su propia línea encadena las peticiones en lugar de ejecutarlas en paralelo.

La contrapartida: el import dinámico se resuelve mientras se ejecuta `head`, en la ruta crítica del renderizado del documento. En una ruta fría esto retrasa el `head` unos milisegundos y puede degradar ligeramente el **LCP**.

</Tab>

<Tab label="Resolución dinámica cacheada" value="cached">

Resuelve el diccionario en el `loader` de la ruta y vuelve a leerlo desde `loaderData` en `head`. Los loaders de las rutas coincidentes se ejecutan en paralelo, y `staleTime: Infinity` le indica a TanStack Router que el resultado nunca caduca, de modo que el chunk por locale se resuelve una sola vez y luego se sirve desde la caché del router, dejando `head` síncrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` puede llamarse antes de que el loader se resuelva, por lo que `loaderData` está tipado como posiblemente `undefined`. Mantén el encadenamiento opcional o devuelve un título de reserva.

Conservas el chunk por locale sin pagar su coste en la ruta crítica del `head`. El precio es la experiencia de desarrollo: el contenido debe pasarse explícitamente del loader al `head` a través de `loaderData`.

</Tab>

</Tabs>

### ¿Qué resolución debo elegir?

|                           | Resolución estática          | Resolución dinámica                       | Resolución dinámica cacheada           |
| ------------------------- | ---------------------------- | ----------------------------------------- | -------------------------------------- |
| API                       | `getIntlayer`                | `getIntlayerAsync` (v9.4+)                | `getIntlayerAsync` en `loader` (v9.4+) |
| Firma de `head`           | síncrona                     | `async`                                   | síncrona, lee `loaderData`             |
| Locales enviadas          | todas las locales declaradas | solo la locale solicitada                 | solo la locale solicitada              |
| Navegaciones en cliente   | nada que resolver            | se vuelve a ejecutar en cada coincidencia | servido desde la caché del router      |
| Experiencia de desarrollo | la más simple                | un solo `await`                           | contenido pasado por `loaderData`      |

</Step>

<Step number={13} title="Recuperar el idioma en sus acciones de servidor">

Es posible que desee acceder al idioma actual desde sus acciones de servidor o endpoints de API.
Puede hacerlo utilizando el ayudante `getLocale` de `intlayer`.

Aquí tiene un ejemplo utilizando las funciones de servidor de TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Obtener la cookie de la solicitud (predeterminado: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obtener la cabecera de la solicitud (predeterminado: 'x-intlayer-locale')
    // Respaldado mediante negociación Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recuperar algo de contenido utilizando getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={14} title="Gestionar páginas no encontradas">

Cuando un usuario visita una página inexistente, puede mostrar una página 404 personalizada y el prefijo de idioma puede afectar a la forma en que se activa la página no encontrada.

#### Entendiendo el manejo de 404 de TanStack Router con prefijos de idioma

En TanStack Router, el manejo de páginas 404 con rutas localizadas requiere un enfoque de múltiples capas:

1. **Ruta 404 dedicada**: Una ruta específica para mostrar la interfaz de usuario 404.
2. **Validación a nivel de ruta**: Valida los prefijos de idioma y redirige los inválidos a 404.
3. **Ruta catch-all**: Captura cualquier ruta que no coincida dentro del segmento de idioma.

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Esto crea una ruta dedicada /[locale]/404
// Se utiliza tanto como una ruta directa como importada como componente en otros archivos
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Exportado por separado para que pueda ser reutilizado en notFoundComponent y rutas catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad se ejecuta antes de que la ruta se renderice (tanto en el servidor como en el cliente)
  // Es el lugar ideal para validar el prefijo de idioma
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix comprueba si el idioma es válido según su configuración de intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefijo de idioma no válido: redirigir a la página 404 con un prefijo de idioma válido
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent se llama cuando una ruta hija no existe
  // ej., /en/pagina-inexistente activa esto dentro del diseño /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// La ruta $ (splat/catch-all) coincide con cualquier ruta que no coincida con otras rutas
// ej., /en/alguna/ruta/profundamente/anidada/invalida
// Esto asegura que TODAS las rutas no coincidentes dentro de un idioma muestren la página 404
// Sin esto, las rutas profundas no coincidentes podrían mostrar una página en blanco o un error
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Extraer el contenido de sus componentes" isOptional={true}>

Si tiene una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar sus componentes y extraer el contenido.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto de su configuración
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
     * Indica si los componentes deben guardarse después de ser transformados.
     *
     * - Si es `true`, el compilador reescribirá el archivo del componente en el disco. Así la transformación será permanente, y el compilador omitirá la transformación para el siguiente proceso. De esa manera, el compilador puede transformar la aplicación, y luego puede ser eliminado.
     *
     * - Si es `false`, el compilador inyectará la llamada a la función `useIntlayer()` en el código de la salida de construcción solamente, y mantendrá la base de código intacta. La transformación se hará solo en memoria.
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
 <Tab value='Comando extract'>

Ejecute el extractor para transformar sus componentes y extraer el contenido

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Actualice su `vite.config.ts` para incluir el plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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
bun run build # O bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Generar un Sitemap">

Intlayer viene con un generador de sitemap integrado para ayudarte a crear fácilmente un sitemap para tu aplicación. Maneja las rutas localizadas y agrega los metadatos necesarios para los motores de búsqueda.

> El sitemap generado por Intlayer admite el espacio de nombres `xhtml:link` (Hreflang XML Extensions). A diferencia de los generadores de sitemap predeterminados que solo enumeran URL sin procesar, Intlayer crea automáticamente los enlaces bidireccionales necesarios entre todas las versiones de idioma de una página (por ejemplo, `/about`, `/about?lang=fr` y `/about?lang=es`). Esto garantiza que los motores de búsqueda indexen y sirvan correctamente la versión de idioma adecuada a la audiencia adecuada.

Para usarlo, primero debes configurar tu archivo `vite.config.ts` para habilitar el prerrenderizado de tus rutas localizadas y deshabilitar la generación de sitemap predeterminada de TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... otras importaciones

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... otros plugins
    tanstackStart({
      // ... otras configuraciones
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Luego, crea una ruta `src/routes/sitemap[.]xml.ts` que use la función `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="Configurar TypeScript">

Intlayer utiliza el aumento de módulos para aprovechar las ventajas de TypeScript y hacer que su base de código sea más robusta.

Asegúrese de que su configuración de TypeScript incluya los tipos autogenerados:

```json5 fileName="tsconfig.json"
{
  // ... sus configuraciones existentes
  include: [
    // ... sus inclusiones existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

</Step>

</Steps>

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto le permite evitar subirlos a su repositorio Git.

Para hacerlo, puede añadir las siguientes instrucciones a su archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar archivos generados por Intlayer
.intlayer
```

---

## Extensión de VS Code

Para mejorar su experiencia de desarrollo con Intlayer, puede instalar la **Extensión oficial de Intlayer VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo utilizar la extensión, consulte la [documentación de la extensión Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir más allá

Para ir más allá, puede implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar su contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de Tanstack Start](https://tanstack.com/start/latest)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useLocale.md)
- [Declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación de TanStack Start y Solid?">

TanStack Start no incluye ninguna capa de i18n, y las opciones del ecosistema de Solid son escasas:

- **`@solid-primitives/i18n`**: un diccionario plano que montas y conectas al router tú mismo.
- **`i18next`** con un envoltorio para Solid: catálogos maduros, pero sin integración con el router de TanStack, la función `head` ni la pasada de prerenderizado.
- **`Intlayer`**: contenido declarado junto a cada componente y compilado en tiempo de compilación, con enrutamiento por idioma, generación de sitemap, traducción con IA, un editor visual y un CMS.

Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark de i18n de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación TanStack Start?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md).

</Question>

<Question title="¿Puedo migrar desde `@solid-primitives/i18n` o `i18next` sin reescribir mis componentes?">

En gran medida. Sigue la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md) para trasladar el contenido. También puedes migrar de forma gradual: el [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus catálogos JSON existentes como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, de modo que ambas capas se mantienen sincronizadas mientras trasladas los componentes uno a uno.

</Question>

<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

</Question>

<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus componentes, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. El paso 15 de esta guía lo explica paso a paso.

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación: escanea tu código JSX, TSX, Vue y Svelte en cada cambio, genera los diccionarios y los mantiene sincronizados mediante el reemplazo de módulos en caliente, así que no hay ninguna clave que mantener a mano.

Conviene conocer dos límites antes de activar el compilador. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución, como los códigos de error de la API o los campos del CMS, quedan fuera de su alcance. Y tiene que distinguir el texto visible para el usuario de la lógica de la aplicación, como `className="active"` o un código de estado, lo que requiere unas pocas anotaciones en una base de código grande. El [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) evita ambos manteniéndote en el proceso.

</Question>

<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>

<Question title="¿Intlayer admite el renderizado en el servidor y el prerenderizado aquí?">

Sí. El contenido se resuelve durante el SSR, y el paso 16 cubre la configuración de prerenderizado que emite un documento estático por ruta localizada, además del sitemap localizado generado a partir de la misma tabla de rutas.

</Question>

<Question title="¿Cambiar el idioma vuelve a renderizar toda mi aplicación?">

No. El contenido se respalda con señales de Solid, así que cambiar de idioma actualiza solo los nodos del DOM que leen los valores modificados.

</Question>

<Question title="¿Cómo añado etiquetas hreflang y un sitemap localizado?">

Usa la función `generateSitemap` integrada en una ruta `src/routes/sitemap[.]xml.ts`. Emite el espacio de nombres `xhtml:link`, así que cada versión de idioma de una página enlaza bidireccionalmente con las demás. Los metadatos localizados de `head` se cubren en el paso 12.

</Question>

<Question title="¿Cómo gestiono las páginas 404 en rutas localizadas?">

Lo cubre el paso 14. `validatePrefix` te indica si el segmento de idioma de la URL es un idioma declarado, así que `/xx/about` devuelve un 404 real en lugar de indexarse como una página duplicada.

</Question>

<Question title="¿Tengo que poner el idioma en la URL?">

No. `routing.mode` acepta `"prefix-no-default"` (el valor por defecto), `"prefix-all"`, `"no-prefix"` y `"search-params"`, y `routing.domains` asigna cada idioma a su propio dominio. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Cómo creo un selector de idioma que conserve la ruta actual?">

El paso 9 muestra el componente. `useLocale` expone el idioma activo, los idiomas disponibles y un setter que conserva la elección, mientras que `getLocalizedUrl` reescribe la ruta actual al idioma de destino para que el usuario permanezca en la misma página.

</Question>

<Question title="¿Cómo traduzco la aplicación automáticamente con IA?">

Ejecuta `npx intlayer fill`. Rellena las traducciones que faltan con el LLM de tu elección, usando tu propio proveedor y tu clave de API, y `--git-diff` limita la ejecución al contenido modificado en la rama. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Intlayer admite plurales, género y texto enriquecido?">

Sí: [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido según el género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md) y [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>

<Question title="¿Cómo pueden los traductores editar el contenido sin tocar el código?">

A través del [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), que se ejecuta en tu propia infraestructura y permite que cualquiera edite texto en su sitio en la aplicación en ejecución, o del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), que externaliza el contenido para que pueda cambiar sin un despliegue.

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, uso comercial incluido. El CMS alojado es un servicio de pago opcional que también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
