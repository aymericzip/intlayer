---
createdAt: 2025-09-09
updatedAt: 2026-08-25
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

---

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

---

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

---

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

---

</Step>

<Step number={14} title="Gestionar páginas no encontradas">

Cuando un usuario visita una página que no existe, puedes mostrar una página personalizada de no encontrado y el prefijo de localización puede impactar la forma en que se dispara la página de no encontrado.

#### Página de inicio localizada

> Si deseas usar tu contenido en un atributo `string`, como `alt`, `title`, `href`, `aria-label`, etc., puedes usar el valor de la función, así:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Para obtener más información sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md).

</Step>

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
              {/* Configuración regional - p. ej. FR */}
              {localeEl}
            </span>
            <span>
              {/* Idioma en su propia configuración regional - p. ej. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Idioma en la configuración regional actual - p. ej. Francés con la configuración regional actual establecida en Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - p. ej. French */}
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

<Step number={10} title="Gestión de atributos HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Si un `head` lee varios diccionarios, resuélvelos con `Promise.all`: esperar cada `getIntlayerAsync` en su propia línea encadena las peticiones en lugar de ejecutarlas en paralelo.

La contrapartida: el import dinámico se resuelve mientras se ejecuta `head`, en la ruta crítica del renderizado del documento. En una ruta fría esto retrasa el `head` unos milisegundos y puede degradar ligeramente el **LCP**.

</Tab>

<Tab label="Resolución dinámica cacheada" value="cached">

Resuelve el diccionario en el `loader` de la ruta y vuelve a leerlo desde `loaderData` en `head`. Los loaders de las rutas coincidentes se ejecutan en paralelo, y `staleTime: Infinity` le indica a TanStack Router que el resultado nunca caduca, de modo que el chunk por locale se resuelve una sola vez y luego se sirve desde la caché del router, dejando `head` síncrono.

```tsx fileName="src/routes/{-$locale}/index.tsx"

<Tabs>
 <Tab value='Extract command'>

  return { locale, content };
});
import { createFileRoute } from "@tanstack/react-router";

````

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { NotFoundComponent } from "./404";
```

</Step>

<Step number={15} title="Extraer el contenido de tus componentes" isOptional={true}>

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Define la ruta de los archivos de salida
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

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

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

</Tab>
</Tabs>

---

- **BLOCK 3 of 4** (English reference): empty
- **BLOCK 3 of 4** (Spanish current): empty

Could you please provide:
1. The English source content (base file)
2. The current Spanish translation that needs to be audited

Once you share the actual content, I'll perform a thorough audit and return the fully updated Spanish file.---

bun run build # Or bun run dev
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

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

</Step>

<Step number={17} title="Configurar TypeScript">

I'm ready to help you audit and update the Spanish (es) translation. However, I notice that the content blocks appear to be empty in your message.

Could you please provide:

1. **BLOCK 4 of 4** (the current Spanish translation to review) - between the `` and `` markers
2. Confirm that this is indeed the final block, or if there are preceding blocks I should be aware of

Please share the content to be reviewed.---

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
{
  // ... tus configuraciones existentes
  include: [
    // ... tus inclusiones existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar hacer commit de ellos en tu repositorio de Git.

Para hacer esto, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
````

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
