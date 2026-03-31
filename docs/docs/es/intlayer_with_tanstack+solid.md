---
createdAt: 2025-03-25
updatedAt: 2026-03-29
title: i18n Tanstack Start - Cómo traducir una aplicación Tanstack Start usando Solid.js en 2026
description: Aprenda cómo agregar internacionalización (i18n) a su aplicación Tanstack Start usando Intlayer y Solid.js. Siga esta guía completa para hacer que su aplicación sea multilingüe con enrutamiento consciente de la localización.
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
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Añadido para Tanstack Start Solid.js"
---

# Traduzca su sitio web Tanstack Start con Solid.js usando Intlayer | Internacionalización (i18n)

## Tabla de contenidos

<TOC/>

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos Tanstack Start con Solid.js, enrutamiento consciente de la localización, soporte de TypeScript y prácticas de desarrollo modernas.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puede:

- **Gestionar fácilmente las traducciones** utilizando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Asegurar el soporte de TypeScript** con tipos autogenerados, mejorando el autocompletado y la detección de errores.
- **Beneficiarse de funciones avanzadas**, como la detección y el cambio dinámico de idioma.
- **Habilitar el enrutamiento consciente de la localización** con el sistema de enrutamiento basado en archivos de Tanstack Start.

---

## Guía paso a paso para configurar Intlayer en una aplicación Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="¿La mejor solución i18n para Tanstack Start? Descubra Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cómo internacionalizar su aplicación usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ver [Plantilla de aplicación](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) en GitHub.

### Paso 1: Crear el proyecto

Comience creando un nuevo proyecto TanStack Start siguiendo la guía [Iniciar nuevo proyecto](https://tanstack.com/start/latest/docs/framework/solid/quick-start) en el sitio web de TanStack Start.

### Paso 2: Instalar los paquetes de Intlayer

Instale los paquetes necesarios utilizando su gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de la configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **solid-intlayer**
  El paquete que integra Intlayer con la aplicación Solid. Proporciona proveedores de contexto y hooks para la internacionalización de Solid.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como el middleware para detectar el idioma preferido del usuario, gestionar cookies y manejar la redirección de URL.

### Paso 3: Configuración de su proyecto

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

### Paso 4: Integrar Intlayer en su configuración de Vite

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> El plugin de Vite `intlayer()` se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los monitoriza en modo de desarrollo. Define las variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 5: Crear el diseño raíz (Root Layout)

Configure su diseño raíz para soportar la internacionalización utilizando `useMatches` para detectar el idioma actual y estableciendo los atributos `lang` y `dir` en la etiqueta `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // Intenta encontrar el idioma en los parámetros de cualquier coincidencia activa
  // Esto asume que utiliza el segmento dinámico "/{-$locale}" en su árbol de rutas
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Paso 6: Crear el diseño de idioma (Opcional)

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

### Paso 7: Declarar su contenido

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

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que estén incluidas en el directorio `contentDir` (por defecto, `./app`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Paso 8: Utilizar componentes y hooks conscientes del idioma

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

### Paso 9: Utilizar Intlayer en sus páginas

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
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> En Solid, `useIntlayer` devuelve una función **accessor** (por ejemplo, `content()`). Debe llamar a esta función para acceder al contenido reactivo.
>
> Para saber más sobre el hook `useIntlayer`, consulte la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useIntlayer.md).

### Paso 10: Crear un componente selector de idioma (Locale Switcher)

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

### Paso 11: Gestión de atributos HTML

Como vimos en el Paso 5, puede gestionar los atributos `lang` y `dir` de la etiqueta `html` utilizando `useMatches` en su componente raíz. Esto asegura que se establezcan los atributos correctos tanto en el servidor como en el cliente.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // Intenta encontrar el idioma en los parámetros de cualquier coincidencia activa
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Paso 12: Añadir middleware (Opcional)

También puede utilizar `intlayerProxy` para añadir enrutamiento del lado del servidor a su aplicación. Este plugin detectará automáticamente el idioma actual basándose en la URL y establecerá la cookie de idioma adecuada. Si no se especifica ningún idioma, el plugin determinará el idioma más apropiado basándose en las preferencias de idioma del navegador del usuario. Si no se detecta ningún idioma, redirigirá al idioma predeterminado.

> Tenga en cuenta que para utilizar `intlayerProxy` en producción, necesita cambiar el paquete `vite-intlayer` de `devDependencies` a `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // El proxy debe colocarse antes que el servidor si utiliza Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Paso 13: Internacionalizar sus metadatos (Opcional)

También puede utilizar la función `getIntlayer` para acceder a sus diccionarios de contenido dentro del cargador `head` para metadatos conscientes de la localización:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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

### Paso 13: Recuperar el idioma en sus acciones de servidor (Opcional)

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

---

### Paso 14: Gestionar páginas no encontradas (Opcional)

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

### (Opcional) Paso 15: Extraer el contenido de sus componentes

Si tiene una base de código existente, transformar miles de archivos puede llevar mucho tiempo.

Para facilitar este proceso, Intlayer propone un [compilador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md) para transformar sus componentes y extraer el contenido.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
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

---

### Paso 16: Generar un Sitemap (Opcional)

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

---

### Paso 17: Configurar TypeScript (Opcional)

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

---

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
