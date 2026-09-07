---
createdAt: 2025-09-04
updatedAt: 2026-09-06
title: "React Router v7 i18n - Guía completa para traducir tu aplicación"
description: "Sin más i18next. La guía 2026 para construir una aplicación React Router v7 multilingüe (i18n). Traduce con agentes de IA y optimiza el tamaño del bundle, SEO y rendimiento."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Locale Routing
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API Solid useIntlayer al acceso directo de propiedades"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Agregar comando init"
  - version: 7.5.6
    date: 2025-12-27
    changes: "Actualizar Layout y manejar 404"
  - version: 6.1.5
    date: 2025-10-03
    changes: "Actualizar documentación"
  - version: 5.8.2
    date: 2025-09-04
    changes: "Agregado para React Router v7"
author: aymericzip
---

# Traduce tu sitio web de React Router v7 usando Intlayer | Internacionalización (i18n)

Esta guía demuestra cómo integrar **Intlayer** para internacionalización sin interrupciones en proyectos de React Router v7 con enrutamiento consciente de la configuración regional, soporte de TypeScript y prácticas modernas de desarrollo.

Cubre tanto **enrutamiento basado en configuración** (`routes.ts`) como **enrutamiento basado en sistema de archivos** (`@react-router/fs-routes`).

## Tabla de contenidos

<TOC/>

## ¿Por qué Intlayer sobre alternativas?

En comparación con soluciones principales como `react-i18next` o `i18next`, Intlayer es una solución que viene con optimizaciones integradas tales como:

<AccordionGroup>
<Accordion header="Cobertura completa de React Router">

Intlayer está optimizado para funcionar perfectamente con React Router ofreciendo **enrutamiento consciente de locale**, **middleware para detección de locale**, y todas las características necesarias para escalar internacionalización (i18n).

</Accordion>
<Accordion header="Tamaño del bundle">

En lugar de cargar archivos JSON masivos en tus páginas, carga solo el contenido necesario. Intlayer ayuda a **reducir tu bundle y tamaños de página hasta un 50%**.

</Accordion>
<Accordion header="Mantenibilidad">

Delimitar el contenido de tu aplicación **facilita el mantenimiento** para aplicaciones a gran escala. Puedes duplicar o eliminar una única carpeta de características sin la carga mental de revisar tu entire codebase de contenido. Además, Intlayer está **totalmente tipado** para garantizar la precisión de tu contenido.

</Accordion>
<Accordion header="AI Agent">

Co-ubicar contenido **reduce el contexto necesario** por Large Language Models (LLMs). Intlayer también viene con un conjunto de herramientas, como un **CLI** para probar traducciones faltantes, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**, y **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**, para hacer la experiencia del desarrollador (DX) aún más suave para agentes de IA.

</Accordion>
<Accordion header="Automatización">

Usa automatización para traducir en tu pipeline CI/CD usando el LLM de tu elección al costo de tu proveedor de IA. Intlayer también ofrece un **compiler** para automatizar la extracción de contenido, así como una [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) para ayudarte a **traducir en el background**.

</Accordion>
<Accordion header="Rendimiento">

Conectar archivos JSON masivos a componentes puede llevar a problemas de rendimiento y reactividad. Intlayer optimiza tu carga de contenido en tiempo de build.

</Accordion>
<Accordion header="Escala con non-dev">

Más que solo una solución i18n, Intlayer proporciona un **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) auto-hospedado** y un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)** para ayudarte a gestionar tu contenido multilingüe en **tiempo real**, haciendo la colaboración con traductores, redactores, y otros miembros del equipo sin fricciones. El contenido puede almacenarse localmente y/o remotamente.

</Accordion>
</AccordionGroup>

## Guía paso a paso para configurar Intlayer en una aplicación React Router v7

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="How to translate an React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code (Config-based)" value="code-config">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer (Config-based)"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Code (File-System Routes)" value="code-fs">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-fs-routes-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer (File-System Routes)"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo (Config-based)" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer React Router v7 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [plantilla de enrutamiento basado en configuración](https://github.com/aymericzip/intlayer-react-router-v7-template) o la [plantilla de rutas del sistema de archivos](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) en GitHub.

<Steps>
<Step number={1} title="Instalar dependencias">

Instala los paquetes necesarios usando tu gestor de paquetes preferido:

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

> La bandera `--interactive` es opcional. Usa `intlayer-cli init` si eres un agente de IA.

> Este comando detectará tu entorno e instalará los paquetes requeridos. Por ejemplo:

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

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación, y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **react-intlayer**
  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y hooks para la internacionalización de React.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar redirecciones de URL.

</Step>
<Step number={2} title="Configuración de tu proyecto">

<Tabs group="routing-type">
<Tab label="Enrutamiento basado en configuración" value="config-based">

### Arquitectura

En esta arquitectura, las rutas se definen programáticamente en `app/routes.ts` con segmentos dinámicos opcionales `/:locale?`. Las páginas localizadas, los layouts y las declaraciones de contenido se organizan dentro del directorio `app/`:

```bash
.
├── app
│   ├── components
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   ├── localized-link.tsx
│   │   ├── navbar.content.ts
│   │   └── navbar.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.tsx
│   ├── routes
│   │   ├── about
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── root.tsx                      # Root layout for IntlayerProvider
│   └── routes.ts                     # Route definition file
├── intlayer.config.ts
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

### Configuración

Crea un archivo de configuración `intlayer.config.ts` para declarar los idiomas compatibles con tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

</Tab>
<Tab label="Rutas del sistema de archivos" value="fs-routes">

### Arquitectura

En esta arquitectura, las rutas siguen las convenciones del sistema de archivos de React Router v7 utilizando `flatRoutes`, donde los puntos (`.`) representan segmentos de URL y `($locale)` denota el segmento localizado opcional:

```bash
.
├── app
│   ├── components
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   ├── localized-link.tsx
│   │   ├── navbar.content.ts
│   │   └── navbar.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.tsx
│   ├── routes
│   │   ├── ($locale)._index.content.ts
│   │   ├── ($locale)._index.tsx
│   │   ├── ($locale).about.content.ts
│   │   └── ($locale).about.tsx
│   ├── root.tsx                      # Root layout for IntlayerProvider
│   └── routes.ts                     # Route definition file using flatRoutes
├── intlayer.config.ts
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

### Configuración

Crea un archivo de configuración `intlayer.config.ts` para declarar los idiomas compatibles con tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

</Tab>
</Tabs>

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, deshabilitar logs de Intlayer en la consola, y más. Para una lista completa de parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Step>
<Step number={3} title="Integrar Intlayer en tu configuración de Vite">

Añade el plugin intlayer a tu configuración:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> El plugin Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de archivos de declaración de contenido y los monitorea en modo de desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

</Step>
<Step number={4} title="Configurar rutas de React Router v7">

<Tabs group="routing-type">
<Tab label="Enrutamiento basado en configuración" value="config-based">

Configura tu configuración de enrutamiento con rutas que tengan en cuenta la configuración regional:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:locale?", "routes/page.tsx"), // Página de inicio localizada
  route("/:locale?/about", "routes/about/page.tsx"), // Página acerca de localizada
] satisfies RouteConfig;
```

</Tab>
<Tab label="Rutas del sistema de archivos" value="fs-routes">

Configura tu configuración de enrutamiento para usar rutas basadas en el sistema de archivos con `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Ignora los archivos de declaración de contenido para que no se traten como rutas
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> La función `flatRoutes` de `@react-router/fs-routes` habilita el enrutamiento basado en el sistema de archivos, donde la estructura de archivos en el directorio `routes/` determina las rutas de tu aplicación. La opción `ignoredRouteFiles` asegura que los archivos de declaración de contenido de Intlayer (`.content.ts`, etc.) no se traten como archivos de ruta.

</Tab>
</Tabs>

</Step>
<Step number={5} title="Crear componentes de diseño">

Configura tu diseño raíz y diseños específicos de la configuración regional:

#### Layout raíz

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  data,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

// ... Código de App, links y ErrorBoundary sin cambios

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  if (!locale) {
    throw data("Language not supported", { status: 404 });
  }

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={6} title="Declare Your Content">

Cree y administre sus declaraciones de contenido para almacenar traducciones:

```tsx fileName="app/routes/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      es: "Bienvenido a React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      es: "Aprender Sobre Nosotros",
      en: "Learn About Us",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      es: "Inicio",
      en: "Home",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Sus declaraciones de contenido pueden definirse en cualquier parte de su aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./app`). Y que coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Podría colocarse en `app/routes/($locale)._index.content.ts` en caso de usar enrutamiento basado en el sistema de archivos.

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

</Step>
<Step number={7} title="Create Locale-Aware Components">

Cree un componente `LocalizedLink` para navegación con conocimiento de locale:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

En caso de que desee navegar a rutas localizadas, puede usar el hook `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>
<Step number={8} title="Utilize Intlayer in Your Pages">

Acceda a sus diccionarios de contenido en toda su aplicación:

#### Página de inicio localizada

<Tabs group="routing-type">
<Tab label="Config-based routing" value="config-based">

```tsx fileName="app/routes/page.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/page";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Tab>
<Tab label="File-system routes" value="fs-routes">

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/($locale)._index";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Tab>
</Tabs>

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md).

> Si tu aplicación ya existe, puedes usar el [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md), así como el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md), para transformar miles de componentes en un segundo.

</Step>
<Step number={9} title="Crear un componente Locale Switcher">

Crea un componente para permitir que los usuarios cambien de idioma:

<Tabs group="routing-type">
<Tab label="Config-based routing" value="config-based">

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  defaultLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - p. ej. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propia configuración regional - p. ej. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en la configuración regional actual - p. ej. Francés con la configuración regional actual establecida en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={defaultLocale}>
              {/* Idioma en inglés - p. ej. French */}
              {getLocaleName(localeItem, defaultLocale)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

</Tab>
<Tab label="File-system routes" value="fs-routes">

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  defaultLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            reloadDocument // Recarga la página para aplicar la nueva configuración regional
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - p. ej. FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propia configuración regional - p. ej. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en la configuración regional actual - p. ej. Francés con la configuración regional actual establecida en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={defaultLocale}>
              {/* Idioma en inglés - p. ej. French */}
              {getLocaleName(localeItem, defaultLocale)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

</Tab>
</Tabs>

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

</Step>
<Step number={10} title="Agregar gestión de atributos HTML">

Crea un hook para gestionar los atributos lang y dir de HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Luego úsalo en tu componente raíz:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // importa el hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // llama el hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

</Step>
<Step number={11} title="Agregar middleware">

También puedes usar `intlayerProxy` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la configuración regional actual basándose en la URL y establecerá la cookie de configuración regional apropiada. Si no se especifica una configuración regional, el plugin determinará la configuración regional más apropiada basándose en las preferencias de idioma del navegador del usuario. Si no se detecta ninguna configuración regional, redirigirá a la configuración regional predeterminada.

> Ten en cuenta que para usar `intlayerProxy` en producción, debes cambiar el paquete `vite-intlayer` de `devDependencies` a `dependencies`.

> Desde Intlayer v9, `intlayerProxy()` está incluido directamente en el plugin `intlayer()` y habilitado por defecto a través de la opción `routing.enableProxy` (`true` por defecto). Registrarlo por separado como se muestra a continuación ahora es opcional — se mantiene por compatibilidad con versiones anteriores y para configuraciones que necesitan controlar el orden de los plugins. Establece `routing.enableProxy: false` para optar por no participar. Consulta las [notas de la versión v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={12} title="Extraer el contenido de tus componentes" isOptional={true}>

Si tienes una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar tus componentes y extraer el contenido.

Para configurarlo, puedes agregar una sección `compiler` en tu archivo `intlayer.config.ts`:

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
     * Indica si los componentes deben guardarse después de ser transformados.
     *
     * - Si es `true`, el compilador reescribirá el archivo de componente en el disco. Entonces la transformación será permanente, y el compilador saltará la transformación para el próximo proceso. De esta manera, el compilador puede transformar la aplicación y luego puede ser removido.
     *
     * - Si es `false`, el compilador inyectará la llamada de función `useIntlayer()` en el código solo en la salida de compilación, y mantendrá la base de código intacta. La transformación se realizará solo en memoria.
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
 <Tab value='Extract command'>

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
 <Tab value='Babel compiler'>

> Desde v9, el `intlayerCompiler` está incluido en el plugin `intlayer`. Por lo tanto, no necesitas agregarlo manualmente.

Actualiza tu `vite.config.ts` para incluir el plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Agrega el plugin compilador
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

</Steps>

## Configurar TypeScript

Intlayer utiliza module augmentation para aprovechar los beneficios de TypeScript y fortalecer tu codebase.

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados:

```json5 fileName="tsconfig.json"
{
  // ... tus configuraciones existentes
  include: [
    // ... tus includes existentes
    ".intlayer/**/*.ts", // Incluye los tipos autogenerados
  ],
}
```

## Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar confirmarlos en tu repositorio de Git.

Para hacerlo, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

## Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión de Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

## Ir Más Lejos

Para ir más lejos, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Referencias de Documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de React Router v7](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

Esta guía completa te proporciona todo lo que necesitas para integrar Intlayer con React Router v7 para una aplicación completamente internacionalizada con enrutamiento consciente de la configuración regional y soporte para TypeScript.

## Preguntas frecuentes

<FAQ>

<Question title="¿Cuáles son las diferentes soluciones disponibles para internacionalizar una aplicación React Router v7?">

React Router v7 no incluye una capa de mensajes, por lo que debes emparejarla con una biblioteca i18n:

- **`react-i18next` / `i18next`**: espacios de nombres JSON cargados en tiempo de ejecución, con un detector de localidad separado para conectarlo al router.
- **`react-intl`** y **`Lingui`**: mensajes ICU con un paso de extracción.
- **`Intlayer`**: la solución más avanzada. Contenido declarado en cualquier lugar de tu codebase ([junto a cada componente o centralizado](https://intlayer.org/blog/per-component-vs-centralized-i18n)), compilado en tiempo de compilación, tipado de extremo a extremo, con ayudantes de enrutamiento conscientes de la localidad, traducción con IA, un editor visual y un CMS.

Consulta [por qué Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/interest_of_intlayer.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>
<Question title="¿Cuánto tamaño adicional agrega i18n al bundle de React Router?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador en tiempo de compilación reemplaza las llamadas a `useIntlayer` con las entradas exactas del diccionario que utiliza un componente, por lo que se descartan las claves no utilizadas e idiomas no utilizados, y los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) dividen el resto por localidad. Medido contra las alternativas usuales, Intlayer reduce el tamaño del bundle y la página hasta un 50%. Consulta la [optimización de bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

</Question>
<Question title="¿Puedo migrar desde `react-i18next` o `react-intl` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido progresivamente con la [guía de migración de react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_react-i18next_to_intlayer.md) o la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md). O puedes mantener tu API actual completamente: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `react-i18next`, `react-intl` e `i18next`, pero servida por diccionarios de Intlayer, por lo que las importaciones cambian y el código del componente no.

</Question>
<Question title="¿Puedo mantener mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como la fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para catálogos gettext, y los [archivos por localidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar localidades en un archivo.

</Question>
<Question title="¿Tengo que mover mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus componentes, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, para que revises un diff en lugar de copiar cadenas en un catálogo una por una. El paso 12 de esta guía lo explica.

Para una pipeline completamente automatizada, el [Compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación: escanea tu fuente JSX, TSX, Vue y Svelte en cada cambio, genera los diccionarios y los mantiene sincronizados a través del reemplazo de módulo en caliente, por lo que no hay claves que mantener manualmente en absoluto.

Hay dos límites que vale la pena conocer antes de activar el compilador. Funciona mediante análisis estático, por lo que las cadenas que solo existen en tiempo de ejecución, como códigos de error de API o campos de CMS, quedan fuera de alcance. Y tiene que distinguir el texto visible para el usuario de la lógica de la aplicación como `className="active"` o un código de estado, lo que requiere algunas anotaciones en una base de código grande. El [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) evita ambas cosas manteniéndote en el ciclo.

</Question>
<Question title="¿Qué herramientas de editor e IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave de `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta compilar, llenar, probar, push y pull desde la paleta de comandos o una pestaña dedicada de Intlayer.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: la misma conciencia en cualquier editor que hable LSP, con ir a definición, encontrar todas las referencias, vistas previas al pasar sobre un valor traducido, autocompleción de claves y campos, y una advertencia cuando una clave no se declara en ninguna parte. También resuelve llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda mientras migras.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, por lo que un asistente responde desde documentos actuales en lugar de adivinar, y puede ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades de agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades enfocadas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, más una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodos de contenido.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca cadenas codificadas, con más reglas para claves de diccionario estáticas y contenido no utilizado.

</Question>
<Question title="¿Cómo agrego un segmento de localidad a mis rutas?">

Declara un segmento `:locale` en tu árbol de rutas y deja que Intlayer lo resuelva. `validatePrefix` te dice si el segmento es una localidad declarada, por lo que un prefijo desconocido devuelve un 404 en lugar de renderizar una página duplicada, y `getLocalizedUrl` reescribe cualquier ruta al idioma de destino. Si utilizas rutas del sistema de archivos, prepend el segmento dinámico `($locale)` en tus nombres de archivo de ruta.

</Question>
<Question title="¿Tengo que poner la localidad en la URL?">

No. `routing.mode` acepta `"prefix-no-default"` (el predeterminado), `"prefix-all"`, `"no-prefix"` y `"search-params"`, y `routing.domains` mapea una localidad a su propio dominio. La localidad se persiste en una cookie de cualquier forma. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

</Question>
<Question title="¿Funciona con React Router en modo framework, con SSR y loaders?">

Sí. El contenido se resuelve durante la renderización del servidor, y la localidad activa está disponible en los loaders y actions, por lo que los datos del servidor se pueden localizar en el mismo paso que la página. La navegación del cliente mantiene la localidad sin una recarga completa.

</Question>
<Question title="¿Cómo agrego etiquetas hreflang para SEO?">

Construye el mapa de alternativas con `getMultilingualUrls` y emítelo desde tu exportación de ruta `meta` o `links`, incluida una entrada `x-default`. El mismo ayudante alimenta un `sitemap.xml` localizado.

</Question>
<Question title="¿Cómo construyo un selector de idioma que se mantenga en la página actual?">

Usa `useLocale` para las localidades activas y disponibles, y `getLocalizedUrl` para traducir la ruta actual a la localidad de destino. El usuario permanece en la misma ruta en lugar de ser enviado de vuelta a la página de inicio, lo que también evita perder la posición de desplazamiento y los parámetros de consulta.

</Question>
<Question title="¿Cómo traduzco la aplicación automáticamente con IA?">

Ejecuta `npx intlayer fill`, que completa las traducciones faltantes con el LLM de tu elección usando tu proveedor y clave de API. Consulta el [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) e [integración de CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md).

</Question>
<Question title="¿Intlayer soporta plurales, género y texto enriquecido?">

Sí: [formas plurales](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md), [contenido basado en género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender.md), condiciones, [inserciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown.md), y [formateadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) para números, fechas y monedas.

</Question>
<Question title="¿Cómo pueden los traductores editar el contenido sin tocar el código?">

A través del [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) autohospedado o el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md), que externaliza el contenido para que pueda cambiar sin una implementación.

</Question>
<Question title="¿Es Intlayer gratuito y de código abierto?">

Sí, bajo la licencia Apache 2.0, incluyendo el uso comercial. El CMS alojado es un servicio de pago opcional que también puede [ser autohospedado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

</Question>

</FAQ>
