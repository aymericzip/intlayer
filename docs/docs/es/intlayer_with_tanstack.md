---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Comenzando con Intlayer en Tanstack Start
description: Aprende cómo agregar internacionalización (i18n) a tu aplicación Tanstack Start usando Intlayer. Sigue esta guía completa para hacer tu aplicación multilingüe con enrutamiento consciente del locale.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Enrutamiento por Locale
slugs:
  - doc
  - environment
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/AydinTheFirst/tanstack-start-intlayer
author: AydinTheFirst
---

# Comenzando con la Internacionalización (i18n) usando Intlayer y Tanstack Start

Esta guía demuestra cómo integrar **Intlayer** para una internacionalización fluida en proyectos Tanstack Start con enrutamiento consciente del locale, soporte para TypeScript y prácticas modernas de desarrollo.

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca innovadora y de código abierto para internacionalización (i18n) diseñada para simplificar el soporte multilingüe en aplicaciones web modernas.

Con Intlayer, puedes:

- **Gestionar traducciones fácilmente** usando diccionarios declarativos a nivel de componente.
- **Localizar dinámicamente metadatos**, rutas y contenido.
- **Garantizar soporte para TypeScript** con tipos autogenerados, mejorando la autocompletación y la detección de errores.
- **Beneficiarte de características avanzadas**, como la detección y cambio dinámico de locale.
- **Habilitar enrutamiento consciente del locale** con el sistema de enrutamiento basado en archivos de Tanstack Start.

---

## Guía paso a paso para configurar Intlayer en una aplicación Tanstack Start

### Paso 1: Crear el proyecto

Comienza creando un nuevo proyecto TanStack Start siguiendo la guía [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) en el sitio web de TanStack Start.

### Paso 2: Instalar los paquetes de Intlayer

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

  El paquete principal que proporciona herramientas de internacionalización para la gestión de configuración, traducción, [declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md), transpilación y [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

- **react-intlayer**
  El paquete que integra Intlayer con aplicaciones React. Proporciona proveedores de contexto y hooks para la internacionalización en React.

- **vite-intlayer**
  Incluye el plugin de Vite para integrar Intlayer con el [empaquetador Vite](https://vite.dev/guide/why.html#why-bundle-for-production), así como middleware para detectar el locale preferido del usuario, gestionar cookies y manejar redirecciones de URL.

### Paso 3: Configuración de tu proyecto

Crea un archivo de configuración para configurar los idiomas de tu aplicación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tus otros idiomas
    ],
  },
};

module.exports = config;
```

> A través de este archivo de configuración, puedes configurar URLs localizadas, redirección de middleware, nombres de cookies, la ubicación y extensión de tus declaraciones de contenido, desactivar los registros de Intlayer en la consola y más. Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 4: Integra Intlayer en tu configuración de Vite

Agrega el plugin intlayer en tu configuración:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> El plugin `intlayer()` de Vite se utiliza para integrar Intlayer con Vite. Asegura la construcción de los archivos de declaración de contenido y los supervisa en modo desarrollo. Define las variables de entorno de Intlayer dentro de la aplicación Vite. Además, proporciona alias para optimizar el rendimiento.

### Paso 5: Crear Componentes de Layout

Configura tu layout raíz y los layouts específicos por locale:

#### Layout Raíz

```tsx fileName="src/routes/{-$locale}/route.tsx" codeFormat="typescript"
// src/routes/{-$locale}/route.tsx
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Paso 6: Declara Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

```tsx fileName="src/contents/page.content.ts" contentDeclarationFormat="typescript"
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
        en: "Inicio",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Bienvenido a Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Tus declaraciones de contenido pueden definirse en cualquier parte de tu aplicación tan pronto como se incluyan en el directorio `contentDir` (por defecto, `./app`). Y deben coincidir con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

### Paso 7: Crear Componentes y Hooks Sensibles al Idioma

Crea un componente `LocalizedLink` para navegación sensible al idioma:

```tsx fileName="src/components/localized-link.tsx" codeFormat="typescript"
// src/components/localized-link.tsx
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

Crea un hook `useLocalizedNavigate` para la navegación programática:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx" codeFormat="typescript"
// src/hooks/useLocalizedNavigate.tsx
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, "to">;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    // Comprueba si la URL es externa
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions["to"] });
  };

  return localizedNavigate;
};
```

### Paso 8: Utiliza Intlayer en tus Páginas

Accede a tus diccionarios de contenido en toda tu aplicación:

#### Página de Redirección Raíz

```tsx fileName="src/routes/page.tsx" codeFormat="typescript"
// src/routes/page.tsx
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### Página de Inicio Localizada

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
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
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <a href="/">Índice</a>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
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

### Paso 9: Crear un Componente para Cambiar de Idioma

Crea un componente para permitir a los usuarios cambiar de idioma:

```tsx fileName="src/components/locale-switcher.tsx" codeFormat="typescript"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer("locale-switcher");

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* Ejemplo: Français (Francés) */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

> Para aprender más sobre el hook `useLocale`, consulta la [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md).

### Paso 10: Añadir gestión de atributos HTML (Opcional)

Crea un hook para gestionar los atributos lang y dir en HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
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

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importar el hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // agregar esta línea

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Paso 11: Construye y Ejecuta Tu Aplicación

Construye los diccionarios de contenido y ejecuta tu aplicación:

```bash packageManager="npm"
# Construir diccionarios de Intlayer
npm run intlayer:build

# Iniciar servidor de desarrollo
npm run dev
```

```bash packageManager="pnpm"
# Construir diccionarios de Intlayer
pnpm intlayer:build

# Iniciar servidor de desarrollo
pnpm dev
```

```bash packageManager="yarn"
# Construir diccionarios de Intlayer
yarn intlayer:build

# Iniciar servidor de desarrollo
yarn dev
```

### Paso 12: Configurar TypeScript (Opcional)

Intlayer utiliza la ampliación de módulos para aprovechar las ventajas de TypeScript y fortalecer tu base de código.

Asegúrate de que tu configuración de TypeScript incluya los tipos autogenerados:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... tus configuraciones existentes de TypeScript
  },
  include: [
    // ... tus inclusiones existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

---

### Paso 13: Crear Redirección (Opcional)

```typescript fileName="src/routes/{-$locale}/rotue.tsx" codeFormat="typescript"
function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // Redirigir a la configuración regional predeterminada si no hay configuración regional en la URL cuando prefixDefault es verdadero
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // Redirigir a la configuración regional seleccionada si la configuración regional en la URL no coincide con la seleccionada
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

## Despliegue en Producción

Al desplegar tu aplicación:

1. **Construye tu aplicación:**

   ```bash
   npm run build
   ```

2. **Construye los diccionarios de Intlayer:**

   ```bash
   npm run intlayer:build
   ```

3. **Mueve `vite-intlayer` a las dependencias** si usas middleware en producción:
   ```bash
   npm install vite-intlayer --save
   ```

Tu aplicación ahora soportará:

- **Estructura de URL**: `/en`, `/en/about`, `/tr`, `/tr/about`
- **Detección automática de locale** basada en las preferencias del navegador
- **Ruteo consciente del locale** con Tanstack Start
- **Soporte para TypeScript** con tipos generados automáticamente
- **Renderizado del lado servidor** con manejo adecuado del locale

## Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la extensión oficial **Intlayer VS Code Extension**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión ofrece:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Ir Más Allá

Para profundizar, puedes implementar el [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) o externalizar tu contenido usando el [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

---

## Referencias de la Documentación

- [Documentación de Intlayer](https://intlayer.org)
- [Documentación de Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)
- [Declaración de Contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

Esta guía completa proporciona todo lo que necesitas para integrar Intlayer con Tanstack Start para una aplicación completamente internacionalizada con enrutamiento consciente del locale y soporte para TypeScript.

## Historial de la Documentación

| Versión | Fecha      | Cambios                     |
| ------- | ---------- | --------------------------- |
| 5.8.1   | 2025-09-09 | Añadido para Tanstack Start |
