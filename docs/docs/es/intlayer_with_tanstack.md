---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "TanStack Start i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para crear una aplicación TanStack Start multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Enrutamiento por configuración regional
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Comparar la resolución estática, dinámica y dinámica cacheada de los diccionarios de metadatos en las funciones head de las rutas"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Añadir comando init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Introducir validatePrefix y añadir el paso 14: Gestión de páginas 404 con rutas localizadas."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Añadir el paso 13: Obtener la configuración regional en tus acciones del servidor (Opcional)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Añadir el paso 13: Adaptar Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Corregir prefijo por defecto añadiendo la función getPrefix, useLocalizedNavigate, LocaleSwitcher y LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Actualizar documento"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Añadido para Tanstack Start"
author: aymericzip
---

# Traduce tu sitio web Tanstack Start usando Intlayer | Internacionalización (i18n)

## Tabla de contenidos

<TOC/>

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos Tanstack Start con enrutamiento consciente de la configuración regional, soporte para TypeScript y prácticas de desarrollo modernas.

## ¿Por qué Intlayer en lugar de alternativas?

En comparación con soluciones principales como `react-i18next` o `use-intl`, o `paraglide`, Intlayer es una solución que viene con optimizaciones integradas como:

<AccordionGroup>
<Accordion header="Soporte completo de TanStack Start">

Intlayer está completamente optimizado para TanStack Start y proporciona **enrutamiento multilingüe**, **administración de cookies**, **generación de mapas de sitio**, **carga de contenido dinámico** y todas las funciones necesarias para escalar sus esfuerzos de internacionalización (i18n).

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
  <Tab label="Vídeo" value="video">

<iframe title="¿La mejor solución i18n para Tanstack Start? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-tanstack-start-template) en GitHub.

<Steps>

<Step number={1} title="Crear proyecto">

Comienza creando un nuevo proyecto TanStack Start siguiendo la guía [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) en el sitio web de TanStack Start.

</Step>

<Step number={2} title="Instalar paquetes de Intlayer">

Instala los paquetes necesarios utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> la bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará su entorno e instalará los paquetes necesarios. Por ejemplo:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **react-intlayer**
  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y hooks para la internacionalización de React.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar la redirección de URL.

</Step>

<Step number={3} title="Configuración de tu proyecto">

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

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

> A través de este archivo de configuración, puedes establecer URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para obtener una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>

<Step number={4} title="Integrar Intlayer en tu configuración de Vite">

Añade el plugin intlayer en tu configuración:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
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
    viteReact(),
  ],
});

export default config;
```

> El plugin de Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los monitorea en modo desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

</Step>

<Step number={5} title="Crear el diseño raíz">

Configura tu diseño raíz para admitir la internacionalización mediante el uso de `useParams` para detectar la configuración regional actual y estableciendo los atributos `lang` y `dir` en la etiqueta `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="Crear el diseño de configuración regional">

Crea un diseño que maneje el prefijo de configuración regional y realice la validación.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Validar el prefijo de configuración regional
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Aquí, `{-$locale}` es un parámetro de ruta dinámica que se reemplaza con la configuración regional actual. Esta notación hace que el espacio sea opcional, permitiendo que funcione con modos de enrutamiento como `'prefix-no-default'`, etc.

> Ten en cuenta que este espacio puede causar problemas si utilizas múltiples segmentos dinámicos en la misma ruta (por ejemplo, `/{-$locale}/otra-ruta/$otroCaminoDinamico/...`).
> Para el modo `'prefix-all'`, es posible que prefieras cambiar el espacio a `$locale` en su lugar.
> Para el modo `'no-prefix'` o `'search-params'`, puedes eliminar el espacio por completo.

</Step>

<Step number={7} title="Declarar tu contenido">

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

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

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./app`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>

<Step number={7} title="Crear componentes y hooks conscientes de la configuración regional">

Crea un componente `LocalizedLink` para la navegación consciente de la configuración regional:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Este componente tiene dos objetivos:

- Eliminar el prefijo innecesario `{-$locale}` de la URL.
- Inyectar el parámetro de configuración regional en la URL para garantizar que el usuario sea redirigido directamente a la ruta localizada.

Luego podemos crear un hook `useLocalizedNavigate` para la navegación programática:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="Utilizar Intlayer en tus páginas">

> Usa **`useIntlayer`** por defecto: es la forma recomendada de leer contenido dentro de los componentes, y el compilador lo resuelve a la locale que se está renderizando. Recurre a `getIntlayer` / `getIntlayerAsync` solo fuera del árbol de React: el `head` de las rutas, los loaders y las server functions.

Accede a tus diccionarios de contenido en toda tu aplicación:

#### Página de Inicio Localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Si deseas usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., puedes usar el valor de la función, como:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para obtener más información sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Crear un Componente de Selector de Idioma">

Crea un componente para permitir que los usuarios cambien de idioma:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Idioma - p.ej. FR */}
              {localeEl}
            </span>
            <span>
              {/* Idioma en su propia localización - p.ej. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Idioma en la localización actual - p.ej. Francés con la localización actual establecida a Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - p.ej. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Para obtener más información sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Gestión de Atributos HTML">

Como se vio en el Paso 5, puedes gestionar los atributos `lang` y `dir` de la etiqueta `html` usando `useParams` en tu componente raíz. Esto asegura que los atributos correctos se establezcan en el servidor y cliente.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

</Step>

<Step number={11} title="Agregar middleware">

También puedes usar `intlayerProxy` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la localización actual basándose en la URL y establecerá la cookie de localización apropiada. Si no se especifica una localización, el plugin determinará la localización más apropiada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna localización, redirigirá a la localización predeterminada.

> Ten en cuenta que para usar `intlayerProxy` en producción, necesitas cambiar el package `vite-intlayer` de `devDependencies` a `dependencies`.

> Desde Intlayer v9, `intlayerProxy()` está agrupado directamente en el plugin `intlayer()` y habilitado de forma predeterminada mediante la opción `routing.enableProxy` (`true` de forma predeterminada). Registrarlo por separado como se muestra a continuación ahora es opcional: se mantiene para compatibilidad hacia atrás y para configuraciones que necesitan controlar el orden del plugin. Establece `routing.enableProxy: false` para optar por no participar. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

</Step>

<Step number={12} title="Internacionalizar tus Metadatos">

<Tabs>

<Tab label="Resolución estática" value="static">

`getIntlayer` se resuelve de forma sincrónica contra el diccionario **combinado**, el que contiene todas las localizaciones declaradas. `head` permanece sincrónico y no se espera nada, pero todo el diccionario multilingüe se extrae en el chunk de ruta enviado al navegador.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // La ruta para esta página

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Enlace canónico: Apunta a la página localizada actual
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Informa a Google sobre todas las versiones localizadas
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Para usuarios en idiomas no coincidentes
        // Define la localización de reserva predeterminada (normalmente tu idioma principal)
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

Mejor para diccionarios de metadatos pequeños, un puñado de localizaciones, o mientras prototipas.

</Tab>

<Tab label="Resolución dinámica" value="dynamic">

`getIntlayerAsync` (disponible desde **v9.4**) se comporta como `getIntlayer`, pero el plugin de compilación lo apunta al chunk por localización en `.intlayer/dynamic_dictionaries/` en lugar del diccionario combinado. Una página, por lo tanto, envía solo la localización que renderiza. Porque ese chunk se carga bajo demanda, `head` se vuelve `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // La ruta para esta página

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Enlace canónico: Apunta a la página localizada actual
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Informa a Google sobre todas las versiones localizadas
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Para usuarios en idiomas no coincidentes
        // Define la localización de reserva predeterminada (normalmente tu idioma principal)
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

> Si un `head` lee varios diccionarios, resuélvelos con `Promise.all`: esperar cada `getIntlayerAsync` en su propia línea encadena las solicitudes en lugar de ejecutarlas en paralelo.

La compensación: la importación dinámica se resuelve mientras se ejecuta `head`, en la ruta crítica del renderizado del documento. En una ruta fría, esto retrasa el head por unos pocos milisegundos y puede degradar ligeramente el **LCP**.

</Tab>

<Tab label="Resolución dinámica en caché" value="cached">

Resuelve el diccionario en el `loader` de la ruta y léelo desde `loaderData` en `head`. Los loaders de las rutas coincidentes se ejecutan en paralelo, y `staleTime: Infinity` le dice a TanStack Router que el resultado nunca queda obsoleto, por lo que el chunk por localización se resuelve una sola vez y se sirve desde la caché del router después, dejando `head` sincrónico.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resuelto en paralelo con las otras rutas coincidentes, fuera de la ruta crítica del head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // El diccionario nunca cambia para una localización dada: resuelve el chunk una sola vez
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // La ruta para esta página

    return {
      links: [
        // Enlace canónico: Apunta a la página localizada actual
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Informa a Google sobre todas las versiones localizadas
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Para usuarios en idiomas no coincidentes
        // Define la localización de reserva predeterminada (normalmente tu idioma principal)
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

> `head` puede ser llamado antes de que el loader se resuelva, por lo que `loaderData` se tipifica como posiblemente `undefined`. Mantén el optional chaining, o devuelve un título de reserva.

Mantienes el chunk por localización sin pagar su costo en la ruta crítica del head. El precio es la experiencia del desarrollador: el contenido debe pasarse explícitamente desde el loader al `head` a través de `loaderData`.

</Tab>

</Tabs>

### ¿Qué resolución debo elegir?

|                               | Resolución estática   | Resolución dinámica        | Resolución dinámica en caché           |
| ----------------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                           | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| Firma de `head`               | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales enviados              | every declared locale | requested locale only      | requested locale only                  |
| Navegaciones de cliente       | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Experiencia del desarrollador | simplest              | one `await`                | content threaded through `loaderData`  |

</Step>

<Step number={13} title="Recuperar la localización en tus acciones de servidor">

Puede que quieras acceder a la localización actual desde tus acciones de servidor o puntos finales de API.
Puedes hacerlo usando el helper `getLocale` de `intlayer`.

Aquí hay un ejemplo usando funciones de servidor de TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Obtén la cookie de la solicitud (por defecto: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obtén el encabezado de la solicitud (por defecto: 'x-intlayer-locale')
    // Fallback usando negociación Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recupera contenido usando getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={14} title="Gestionar páginas no encontradas">

Cuando un usuario visita una página que no existe, puedes mostrar una página de no encontrado personalizada y el prefijo de configuración regional puede afectar la forma en que se activa la página de no encontrado.

#### Entender el manejo de 404 de TanStack Router con prefijos de configuración regional

En TanStack Router, el manejo de páginas 404 con rutas localizadas requiere un enfoque multicapa:

1. **Ruta 404 dedicada**: Una ruta específica para mostrar la interfaz de usuario 404.
2. **Validación a nivel de ruta**: Valida los prefijos de configuración regional y redirige los inválidos a 404.
3. **Ruta catch-all**: Captura cualquier ruta no coincidente dentro del segmento de configuración regional.

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Esto crea una ruta dedicada /[locale]/404
// Se utiliza tanto como una ruta directa como importada como componente en otros archivos
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Exportado por separado para que pueda reutilizarse en notFoundComponent y rutas catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad se ejecuta antes de que la ruta se renderice (tanto en el servidor como en el cliente)
  // Es el lugar ideal para validar el prefijo de configuración regional
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix comprueba si la configuración regional es válida según tu configuración de intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefijo de configuración regional inválido - redirigir a la página 404 con un prefijo de configuración regional válido
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent se llama cuando una ruta hija no existe
  // p. ej., /en/pagina-inexistente activa esto dentro del diseño /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// La ruta $ (splat/catch-all) coincide con cualquier ruta que no coincida con otras rutas
// p. ej., /en/algun/camino/profundo/anidado/invalido
// Esto garantiza que TODAS las rutas no coincidentes dentro de una configuración regional muestren la página 404
// Sin esto, las rutas profundas no coincidentes podrían mostrar una página en blanco o un error
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Extraer el contenido de tus componentes" isOptional={true}> isOptional={true}>

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
 <Tab value="Comando de extracción">

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
 <Tab value="Compilador Babel">

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Actualiza tu archivo `vite.config.ts` para incluir el plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Generar un Sitemap">

Intlayer viene con un generador de sitemap integrado para ayudarte a crear fácilmente un sitemap para tu aplicación. Maneja las rutas localizadas y agrega los metadatos necesarios para los motores de búsqueda.

> El sitemap generado por Intlayer admite el espacio de nombres `xhtml:link` (Hreflang XML Extensions). A diferencia de los generadores de sitemap predeterminados que solo enumeran URL sin procesar, Intlayer crea automáticamente los enlaces bidireccionales necesarios entre todas las versiones de idioma de una página (por ejemplo, `/about`, `/about?lang=fr` y `/about?lang=es`). Esto garantiza que los motores de búsqueda indexen y sirvan correctamente la versión de idioma adecuada a la audiencia adecuada.

Para usarlo, primero debes configurar tu archivo `vite.config.ts` para habilitar el prerrenderizado de tus rutas localizadas y deshabilitar la generación de sitemap predeterminada de TanStack Start.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
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
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

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

Intlayer utiliza la ampliación de módulos para obtener los beneficios de TypeScript y fortalecer tu base de código.

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados:

```json5 fileName="tsconfig.json"
{
  // ... tus configuraciones existentes
  include: [
    // ... tus inclusiones existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

</Step>

</Steps>

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar confirmarlos en tu repositorio de Git.

Para ello, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

## Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones inline** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de Documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

## Preguntas frecuentes

<FAQ>

<Question title="¿Qué soluciones existen para internacionalizar una aplicación de TanStack Start?">

TanStack Start no incluye ninguna capa de i18n propia, así que la elección es una biblioteca:

- **`i18next` / `react-i18next`** y **`react-intl`**: catálogos de mensajes agnósticos al framework, conectados manualmente al router.
- **`Lingui`**: mensajes ICU con un paso de compilación.
- **`Intlayer`**: contenido declarado junto a cada componente y compilado en tiempo de compilación, con claves tipadas, enrutamiento por idioma, generación de sitemap, traducción con IA, un editor visual y un CMS.

La diferencia que importa en TanStack Start es el enrutamiento y el renderizado en el servidor. Intlayer se integra con el router basado en archivos, la función `head` y la pasada de prerenderizado, en lugar de dejarte montar a mano un proveedor, un detector de idioma y un sitemap. Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark de i18n de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md).

</Question>

<Question title="¿Cuánto añade la i18n al tamaño del bundle de mi aplicación TanStack Start?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md).

</Question>

<Question title="¿Puedo migrar desde `react-i18next` o `react-intl` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md) o la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `react-i18next`, `react-intl` y `i18next`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

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

<Question title="¿Intlayer admite el renderizado en el servidor y el prerenderizado en TanStack Start?">

Sí. El contenido se resuelve durante el SSR, y la guía cubre la configuración de prerenderizado que emite un documento estático por ruta localizada. El paso 16 muestra cómo activar `prerender` en `vite.config.ts` y generar un sitemap localizado a partir de la misma tabla de rutas.

</Question>

<Question title="¿Cómo añado etiquetas hreflang y un sitemap localizado?">

Usa la función `generateSitemap` integrada en una ruta `src/routes/sitemap[.]xml.ts`. A diferencia de una lista simple de URL, emite el espacio de nombres `xhtml:link`, así que cada versión de idioma de una página enlaza bidireccionalmente con las demás y los motores de búsqueda indexan la correcta para cada audiencia. Los metadatos localizados de `head` se cubren en el paso 12.

</Question>

<Question title="¿Tengo que poner el idioma en la URL?">

No. `routing.mode` controla el esquema de URL: `"prefix-no-default"` (el valor por defecto, `/about` y `/fr/about`), `"prefix-all"` (`/en/about`), `"no-prefix"` (resuelto a partir de cookie, cabecera o dominio) o `"search-params"` (`/about?locale=fr`). Los idiomas también se pueden asignar a dominios distintos con `routing.domains`. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>

<Question title="¿Cómo creo un selector de idioma que conserve la ruta actual?">

Usa `useLocale` junto con el componente de enlace localizado descrito en el paso 9. `useLocale` expone el idioma activo, los idiomas disponibles y un setter que conserva la elección, mientras que `getLocalizedUrl` reescribe la ruta actual al idioma de destino para que el usuario permanezca en la misma página en lugar de aterrizar en la página de inicio.

</Question>

<Question title="¿Cómo gestiono las páginas 404 en rutas localizadas?">

Lo cubre el paso 14. `validatePrefix` te indica si el segmento de idioma de la URL es un idioma declarado, así que `/xx/about` devuelve un 404 real en lugar de tratarse como una ruta. Sin él, un prefijo desconocido se resuelve en silencio y los motores de búsqueda indexan una página duplicada.

</Question>

<Question title="¿Cómo traduzco una aplicación TanStack Start automáticamente con IA?">

Ejecuta `npx intlayer fill`. La CLI encuentra las traducciones que faltan y las rellena con el LLM de tu elección, usando tu propio proveedor y tu clave de API. Añade `--git-diff` para traducir solo el contenido modificado en la rama actual, lo que mantiene baratas las ejecuciones de CI. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) y la [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>

<Question title="¿Intlayer admite plurales, género y texto enriquecido?">

Sí. Las declaraciones de contenido admiten [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido según el género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md) y [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md) para texto extenso, con [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>

<Question title="¿Cómo pueden los traductores editar el contenido sin tocar el código?">

A través del [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md), que se ejecuta en tu propia infraestructura y permite que cualquiera edite texto en su sitio en el sitio en ejecución, o del [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), que externaliza el contenido para que pueda cambiar sin un despliegue.

</Question>

<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, uso comercial incluido. El CMS alojado es un servicio de pago opcional que también puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
