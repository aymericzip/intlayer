---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Cómo traducir tu aplicación Tanstack Start – Guía i18n 2026
description: Aprende a añadir la internacionalización (i18n) a tu aplicación Tanstack Start utilizando Intlayer. Sigue esta guía completa para hacer que tu aplicación sea multilingüe con enrutamiento consciente de la configuración regional.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Enrutamiento por configuración regional
slugs:
  - doc
  - entorno
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Añadir comando init
  - version: 7.4.0
    date: 2025-12-11
    changes: Introducir validatePrefix y añadir el paso 14: Gestión de páginas 404 con rutas localizadas.
  - version: 7.3.9
    date: 2025-12-05
    changes: Añadir el paso 13: Obtener la configuración regional en tus acciones del servidor (Opcional)
  - version: 7.2.3
    date: 2025-11-18
    changes: Añadir el paso 13: Adaptar Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Corregir prefijo por defecto añadiendo la función getPrefix, useLocalizedNavigate, LocaleSwitcher y LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: Actualizar documento
  - version: 5.8.1
    date: 2025-09-09
    changes: Añadido para Tanstack Start
---

# Traduce tu sitio web Tanstack Start usando Intlayer | Internacionalización (i18n)

## Tabla de contenidos

<TOC/>

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos Tanstack Start con enrutamiento consciente de la configuración regional, soporte para TypeScript y prácticas de desarrollo modernas.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar fácilmente las traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarte de funciones avanzadas**, como la detección y el cambio dinámico de la configuración regional.
- **Habilitar el enrutamiento consciente de la configuración regional** con el sistema de enrutamiento basado en archivos de Tanstack Start.

---

## Guía paso a paso para configurar Intlayer en una aplicación Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="¿La mejor solución i18n para Tanstack Start? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar tu aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Consulta la [Plantilla de Aplicación](https://github.com/aymericzip/intlayer-tanstack-start-template) en GitHub.

### Paso 1: Crear proyecto

Comienza creando un nuevo proyecto TanStack Start siguiendo la guía [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) en el sitio web de TanStack Start.

### Paso 2: Instalar paquetes de Intlayer

Instala los paquetes necesarios utilizando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **react-intlayer**
  El paquete que integra Intlayer con la aplicación React. Proporciona proveedores de contexto y hooks para la internacionalización de React.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar la redirección de URL.

### Paso 3: Configuración de tu proyecto

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

### Paso 4: Integrar Intlayer en tu configuración de Vite

Añade el plugin intlayer en tu configuración:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> El plugin de Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los monitorea en modo desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 5: Crear el diseño raíz (Root Layout)

Configura tu diseño raíz para admitir la internacionalización mediante el uso de `useMatches` para detectar la configuración regional actual y estableciendo los atributos `lang` y `dir` en la etiqueta `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Intenta encontrar la configuración regional en los parámetros de cualquier coincidencia activa
  // Esto supone que utilizas el segmento dinámico "/{-$locale}" en tu árbol de rutas
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

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

### Paso 6: Crear el diseño de configuración regional (Locale Layout)

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

### Paso 7: Declarar tu contenido

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

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./app`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 7: Crear componentes y hooks conscientes de la configuración regional

Crea un componente `LocalizedLink` para la navegación consciente de la configuración regional:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Utilidad principal
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Ayudantes
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

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
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

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

### Paso 8: Utilizar Intlayer en tus páginas

Accede a tus diccionarios de contenido en toda tu aplicación:

#### Página de inicio localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
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

> Para obtener más información sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md).

### Paso 9: Crear un componente selector de idioma (Locale Switcher)

Crea un componente para permitir a los usuarios cambiar de idioma:

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

### Paso 10: Gestión de atributos HTML

Como se vio en el Paso 5, puedes gestionar los atributos `lang` y `dir` de la etiqueta `html` utilizando `useMatches` en tu componente raíz. Esto garantiza que los atributos correctos se establezcan en el servidor y el cliente.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Intenta encontrar la configuración regional en los parámetros de cualquier coincidencia activa
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Paso 11: Añadir middleware (Opcional)

También puedes usar el `intlayerProxy` para añadir enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la configuración regional actual basada en la URL y establecerá la cookie de configuración regional adecuada. Si no se especifica ninguna configuración regional, el plugin determinará la más adecuada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna, redirigirá a la configuración regional predeterminada.

> Ten en cuenta que para usar el `intlayerProxy` en producción, necesitas cambiar el paquete `vite-intlayer` de `devDependencies` a `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // El proxy debe colocarse antes que el servidor si utilizas Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Paso 12: Internacionalizar tus metadatos (Opcional)

También puedes usar el hook `getIntlayer` para acceder a tus diccionarios de contenido en toda tu aplicación:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Paso 13: Recuperar la configuración regional en tus acciones del servidor (Opcional)

Es posible que desees acceder a la configuración regional actual desde dentro de tus acciones del servidor o endpoints de la API.
Puedes hacerlo utilizando el asistente `getLocale` de `intlayer`.

Aquí tienes un ejemplo utilizando las funciones del servidor de TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Obtener la cookie de la solicitud (por defecto: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obtener el encabezado de la solicitud (por defecto: 'x-intlayer-locale')
    // Respaldo mediante negociación Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Recuperar algún contenido usando getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Paso 14: Gestionar páginas no encontradas (Opcional)

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

---

### Paso 15: Configurar TypeScript (Opcional)

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

---

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar confirmarlos en tu repositorio de Git.

Para ello, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

## Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para las traducciones que faltan.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para obtener más detalles sobre cómo utilizar la extensión, consulta la [documentación de la extensión de VS Code de Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Ir más allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido utilizando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de la documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [Declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
