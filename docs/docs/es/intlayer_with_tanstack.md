---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Cómo traducir tu Tanstack Start – guía i18n 2025
description: Aprende cómo agregar internacionalización (i18n) a tu aplicación Tanstack Start usando Intlayer. Sigue esta guía completa para hacer que tu aplicación sea multilingüe con enrutamiento consciente de la configuración regional.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Enrutamiento por Configuración Regional
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
history:
  - version: 5.8.1
    date: 2025-09-09
    changes: Añadido para Tanstack Start
---

# Traduce tu Tanstack Start con Intlayer | Internacionalización (i18n)

## Tabla de contenido

<TOC/>

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos Tanstack Start con enrutamiento consciente de la configuración regional, soporte para TypeScript y prácticas modernas de desarrollo.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección y el cambio dinámico de configuración regional.
- **Habilitar enrutamiento consciente de la configuración regional** con el sistema de enrutamiento basado en archivos de Tanstack Start.

---

## Guía paso a paso para configurar Intlayer en una aplicación Tanstack Start

### Paso 1: Crear proyecto

Comienza creando un nuevo proyecto TanStack Start siguiendo la guía [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) en el sitio web de TanStack Start.

### Paso 2: Instalar paquetes de Intlayer

Instala los paquetes necesarios usando tu gestor de paquetes preferido:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md), transpileación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **react-intlayer**
  El paquete que integra Intlayer con aplicaciones React. Proporciona proveedores de contexto y hooks para la internacionalización en React.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar la configuración regional preferida del usuario, gestionar cookies y manejar redirecciones de URL.

### Paso 3: Configuración de tu proyecto

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

> A través de este archivo de configuración, puede configurar URLs localizadas, redirección mediante middleware, nombres de cookies, la ubicación y extensión de sus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para una lista completa de los parámetros disponibles, consulte la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 4: Integra Intlayer en tu configuración de Vite

Agrega el plugin intlayer en tu configuración:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> El plugin `intlayer()` para Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los monitorea en modo desarrollo. Define variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 5: Crear Componentes de Diseño

Configura tu diseño raíz y los diseños específicos por localización:

#### Diseño Raíz

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Paso 6: Declara Tu Contenido

Crea y administra tus declaraciones de contenido para almacenar traducciones:

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
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación tan pronto como se incluyan en el directorio `contentDir` (por defecto, `./app`). Y deben coincidir con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

### Paso 7: Crear Componentes y Hooks Sensibles al Idioma

Crea un componente `LocalizedLink` para la navegación sensible al idioma:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react.intlayer";

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

- Eliminar el prefijo `{-$locale}` innecesario de la URL.
- Inyectar el parámetro de localización en la URL para asegurar que el usuario sea redirigido directamente a la ruta localizada.

Luego podemos crear un hook `useLocalizedNavigate` para la navegación programática:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useLocale } from "react.intlayer";
import { useNavigate } from "@tanstack/react-router";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  type StripLocalePrefix<T extends string> = T extends
    | `/${typeof LOCALE_ROUTE}`
    | `/${typeof LOCALE_ROUTE}/`
    ? "/"
    : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
      ? `/${Rest}`
      : never;

  type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

  interface LocalizedNavigate {
    (to: LocalizedTo): ReturnType<typeof navigate>;
    (
      opts: { to: LocalizedTo } & Record<string, unknown>
    ): ReturnType<typeof navigate>;
  }

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    if (typeof args === "string") {
      return navigate({ to: `/${LOCALE_ROUTE}${args}`, params: { locale } });
    }

    const { to, ...rest } = args;

    const localedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({ to: localedTo, params: { locale, ...rest } as any });
  };

  return localizedNavigate;
};
```

### Paso 8: Utiliza Intlayer en Tus Páginas

Accede a tus diccionarios de contenido a lo largo de toda tu aplicación:

#### Página de Inicio Localizada

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react.intlayer";

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

> Para aprender más sobre el hook `useIntlayer`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md).

### Paso 9: Crear un Componente Selector de Idioma

Crea un componente para permitir a los usuarios cambiar de idioma:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeEl)}`}
            onClick={() => setLocaleInStorage(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
          >
            <span>
              {/* Localización - por ejemplo FR */}
              {localeItem}
            </span>
            <span>
              {/* Idioma en su propia localización - por ejemplo Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Idioma en la localización actual - por ejemplo Francés con la localización actual configurada en Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Idioma en inglés - por ejemplo French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

### Paso 10: Añadir gestión de atributos HTML (Opcional)

Crea un hook para gestionar los atributos lang y dir del HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
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

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importar el hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // agregar esta línea

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Paso 11: Añadir middleware (Opcional)

También puedes usar el `intlayerMiddleware` para agregar enrutamiento del lado del servidor a tu aplicación. Este plugin detectará automáticamente la configuración regional actual basada en la URL y establecerá la cookie de configuración regional apropiada. Si no se especifica ninguna configuración regional, el plugin determinará la configuración regional más adecuada según las preferencias de idioma del navegador del usuario. Si no se detecta ninguna configuración regional, redirigirá a la configuración regional predeterminada.

> Ten en cuenta que para usar el `intlayerMiddleware` en producción, necesitas cambiar el paquete `vite-intlayer` de `devDependencies` a `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
    intlayerMiddleware(),
  ],
});
```

---

### Paso 12: Configurar TypeScript (Opcional)

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer tu base de código.

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

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacer esto, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

## Extensión de VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Más Allá

Para ir más allá, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de la Documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

Esta guía completa proporciona todo lo que necesitas para integrar Intlayer con Tanstack Start para una aplicación completamente internacionalizada con enrutamiento consciente de la configuración regional y soporte para TypeScript.
